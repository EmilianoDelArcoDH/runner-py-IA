// useValidateExercise.js
import { exercises } from '../utils/exercises';
import { CodeSimulator, SyntaxValidator } from "../validator/validations/validations.js";
import { getContextFromEnunciados } from "../utils/enunciadosLoader";

/**
 * Opciones:
 * - runPy: ejecutar Pyodide si lang === "python"
 * - runIA: llamar backend IA y mostrar en BorderRight via window.mostrarResultadoHTML
 * - obtenerContexto: fn() => { enunciado, clase, idioma } (si no, se usa enunciados.json por exerciseId)
 * - onPyOutput: fn(text) para mostrar stdout/stderr donde quieras
 * - setEditorValue: fn(code) para inyectar código base si está vacío
 */

export const useValidateExercise = async (
  exerciseId,
  editors,
  lang,
  postEvent,
  stateToPost,
  {
    runPy = true,
    runIA = true,
    obtenerContexto = null,
    onPyOutput = null,
    setEditorValue = null,
  } = {}
) => {
  const failureReasons = [];
  let syntaxErrorsFound = false;
  let simulationErrorsFound = false;

  try {
    const exercise = exercises.find((ex) => ex.id === exerciseId);
    if (!exercise) throw new Error("No se encontró el ejercicio");

    const codeEditor = editors.find((ed) => ed.id === exercise.mainEditor);
    if (!codeEditor) throw new Error("Editor principal no encontrado");

    let { code } = codeEditor;

    // === (1) Traer contexto desde enunciados.json por defecto ===
    let contexto;
    if (typeof obtenerContexto === "function") {
      contexto = obtenerContexto(); // { enunciado, clase, idioma }
    } else {
      const { enunciado, clase, codigoBase } = await getContextFromEnunciados(exerciseId, lang);
      contexto = { enunciado, clase, idioma: (lang || "es") };
      // Si hay base y editor está vacío, inyectar (opcional)
      if (codigoBase && !String(code || "").trim() && typeof setEditorValue === "function") {
        setEditorValue(codigoBase);
        code = codigoBase; // actualizar variable local para pasos siguientes
      }
    }

    // === (2) Validación de Sintaxis (AST) ===
    if (exercise.validationAST) {
      const syntaxValidate = await SyntaxValidator(code);
      const syntaxValidationErrors = syntaxValidate.theseStories(
        lang,
        ...exercise.validationAST
      );
      Object.values(syntaxValidationErrors).forEach((lista) => {
        lista.forEach((error) => {
          const msg = error[lang] || error["en"];
          failureReasons.push(msg);
        });
      });
      syntaxErrorsFound = failureReasons.length > 0;
    }

    // === (3) Simulación ===
    if (exercise.validationCodeSimulator) {
      const safeCode = JSON.stringify(code);
      const codeSimulator = new CodeSimulator(safeCode);
      const simulationResults = await codeSimulator.simulate(
        lang,
        exercise.validationCodeSimulator
      );
      simulationResults.forEach((r) => {
        if (!r.success) {
          simulationErrorsFound = true;
          failureReasons.push(`${r.error}`);
        }
      });
    }
    console.log("Resultados de simulación:", { simulationErrorsFound, failureReasons });

    // === (4) Ejecutar Python vía Pyodide (opcional) ===
    if (runPy && (lang || "").toLowerCase() === "python") {
      const pyText = await runPythonWithCapture(code);
      if (typeof onPyOutput === "function") onPyOutput(pyText);
      // Si querés también mostrarlo en el panel IA, descomentá:
      // if (window.mostrarResultadoHTML) {
      //   window.mostrarResultadoHTML(
      //     `<details><summary>Salida de ejecución</summary><pre>${escapeHtml(pyText)}</pre></details>`
      //   );
      // }
    }

    // === (5) Resultado preliminar ===
    const isOk = !syntaxErrorsFound && !simulationErrorsFound;

    if (isOk) {
      // (5a) Mostrar "Cumple la consigna" en el panel, sin IA
      if (runIA) {
        await analizarConGroq(contexto.enunciado, code, contexto.clase, contexto.idioma || "es", { forceSuccess: true });
      }
      // (6) Evento SUCCESS
      postEvent("SUCCESS", "Has completado el ejercicio", [], stateToPost);
      return;
    }

    // Si llegamos acá, hubo errores => pedir feedback de IA
    if (runIA) {
      await analizarConGroq(contexto.enunciado, code, contexto.clase, contexto.idioma || "es");
    }
    throw new Error("Falló la validación de sintaxis o simulación");


    // postEvent("SUCCESS", "Has completado el ejercicio", [], stateToPost);
  } catch (_err) {
    const failureReasonsFiltrado = failureReasons.filter(r =>
      !r.includes("El código debe corregir los errores")
    );
    postEvent("FAILURE", "El ejercicio está incompleto", failureReasonsFiltrado, stateToPost);
  }
};

/* ================= Helpers Pyodide & IA ================= */

let __pyodide;
async function ensurePyodide() {
  if (__pyodide) return __pyodide;
  if (window.pyodide) {
    __pyodide = window.pyodide;
    return __pyodide;
  }
  if (typeof loadPyodide !== "function") {
    throw new Error("Pyodide no está disponible (falta loadPyodide).");
  }
  __pyodide = await loadPyodide();
  __pyodide.setStdin({
    stdin: () => window.prompt("") ?? "",
    prompt: (msg) => window.prompt(msg) ?? ""
  });
  window.pyodide = __pyodide;
  return __pyodide;
}

async function runPythonWithCapture(code) {
  const py = await ensurePyodide();
  let stdout = "", stderr = "";

  const restoreOut = py.setStdout({
    batched: (s) => { stdout += s.split("\n").map(l => l.trim()).join("\n") + "\n"; }
  });
  const restoreErr = py.setStderr({ batched: (s) => { stderr += s; } });

  let finalText = "";
  try {
    const result = await py.runPythonAsync(code);
    if (stdout.trim()) {
      finalText = stdout
        .split("\n")
        .filter(l => l.trim().length > 0)
        .map((l, i) => `${i + 1}: ${l}`)
        .join("\n");
    }
    if (!stdout.trim() && result !== undefined && result !== null && String(result).length) {
      finalText += String(result);
    }
    if (stderr.trim()) {
      finalText += (finalText ? "\n" : "") + "❌ STDERR:\n" + stderr;
    }
  } catch (err) {
    finalText = `❌ Error:\n${String(err)}`;
  } finally {
    if (typeof restoreOut === "function") restoreOut();
    if (typeof restoreErr === "function") restoreErr();
  }
  return finalText || "(Sin salida)";
}

async function analizarConGroq(enunciado, code, clase, idioma = "es", opts = {}) {
  const { forceSuccess = false } = opts;
  const mostrar = (html) => {
    if (typeof window.mostrarResultadoHTML === "function") {
      window.mostrarResultadoHTML(html);
    }
  };

  try {
    if (!clase) {
      mostrar("<pre>⚠️ Elegí una clase antes de analizar.</pre>");
      throw new Error("Clase no definida");
    }

    console.log("Enviando a RAG:", { enunciado, clase, idioma, forceSuccess });
    // Detecta si estás en entorno local (localhost o 127.0.0.1)
    const isLocal =
      window.location.hostname.includes("localhost") ||
      window.location.hostname.includes("127.0.0.1");

    const API_URL = isLocal
      ? "http://127.0.0.1:8000" // dev local
      : "https://admissions-barbie-clock-recognition.trycloudflare.com"; // túnel

    const response = await fetch(`${API_URL}/consejo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enunciado, codigo: code, idioma, clase, force_success: forceSuccess })
    });

    if (!response.ok) {
      const txt = await response.text();
      mostrar(`<pre>Error: ${escapeHtml(txt)}</pre>`);
      return;
    }

    const data = await response.json();
    const html = data.consejo_html
      ? data.consejo_html
      : fallbackFormatCodeFences(data.consejo || "⚠️ No se recibió un consejo.");

    let finalHTML = html;
    if (data.fuentes?.length) {
      const LABELS = {
        es: "Clase",
        en: "Class",
        pt: "Aula"
      };
      const label = LABELS[idioma] || "Clase";
      const fuentesHTML = data.fuentes
        .map(([c, s]) => `<li>${label} ${escapeHtml(String(c))}, Slide ${escapeHtml(String(s))}</li>`)
        .join("");
      const labelByLang = { es: "📚 Fuentes:", en: "📚 Sources:", pt: "📚 Fontes:" };
      const fuentesLabel = labelByLang[(idioma || "es")] || labelByLang.es;

      finalHTML += `
  <div style="margin-top:12px; background:#f9f9f9; border-left:4px solid #4caf50; padding:10px 14px; border-radius:6px;">
    <strong style="color:#333;">${fuentesLabel}</strong>
    <ul style="margin-top:6px; padding-left:20px; line-height:1.6; list-style-type:disc;">
      ${fuentesHTML}
    </ul>
  </div>`;
    }
    mostrar(finalHTML);
  } catch (error) {
    console.error("Error al conectar con el backend RAG:", error);
    mostrar("<pre>❌ Error al analizar el código con IA.</pre>");
  }
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
function fallbackFormatCodeFences(text) {
  const regex = /```python([\s\S]*?)```/g;
  return text.replace(regex, (_m, code) =>
    `<pre><code class="language-python">${escapeHtml(code.trim())}</code></pre>`
  );
}

// BorderRight.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import './BorderRight.css';

const STRINGS = {
  es: {
    title: "💡 Feedback generado por la IA",
    empty: "No hay feedback generado aún.",
    success: "✅ Cumple la consigna.",
    ask: "Pedir feedback de IA",
    sending: "Enviando...",
    noHandler: "⚠️ No se encontró el disparador de IA. Asegurate de definir window.solicitarFeedbackIA."
  },
  en: {
    title: "💡 AI-generated Feedback",
    empty: "No feedback generated yet.",
    success: "✅ Meets the requirement.",
    ask: "Ask AI for feedback",
    sending: "Sending...",
    noHandler: "⚠️ IA trigger not found. Please define window.solicitarFeedbackIA."
  },
  pt: {
    title: "💡 Feedback gerado pela IA",
    empty: "Nenhum feedback gerado ainda.",
    success: "✅ Cumpre a consigna.",
    ask: "Pedir feedback da IA",
    sending: "Enviando...",
    noHandler: "⚠️ Disparador de IA não encontrado. Defina window.solicitarFeedbackIA."
  },
};

function isSuccess(x) {
  const norm = String(x || "").trim().toUpperCase();
  return ["SUCCESS", "SUCCES", "OK", "DONE"].includes(norm);
}

const BorderRight = ({ mode, lang = 'es', eventTypePG }) => {
  const themeClass = mode === 'dark' ? 'dark-mode' : 'light-mode';
  const L = STRINGS[lang] || STRINGS.es;

  const [iaMessages, setIaMessages] = useState("");
  const [asking, setAsking] = useState(false);
  const [askVisible, setAskVisible] = useState(true);

  // ---- Estado local de éxito, que puede venir por props o por eventos globales
  const [localState, setLocalState] = useState(() => (isSuccess(eventTypePG) ? "SUCCESS" : ""));
  const successRef = useRef(isSuccess(eventTypePG));
  useEffect(() => {
    const s = isSuccess(eventTypePG) ? "SUCCESS" : "";
    setLocalState(s);
    successRef.current = s === "SUCCESS";
    if (successRef.current) {
      setAskVisible(false);
      setAsking(false);
      setIaMessages(""); // limpiar feedback IA previo
    }
  }, [eventTypePG]);

  // ---- Exponer un setter global opcional por si el runner quiere “avisar” sin re-render:
  useEffect(() => {
    window.setEventTypePG = (state) => {
      const s = isSuccess(state) ? "SUCCESS" : "";
      setLocalState(s);
      successRef.current = s === "SUCCESS";
      if (successRef.current) {
        setAskVisible(false);
        setAsking(false);
        setIaMessages("");
      }
    };
    return () => { delete window.setEventTypePG; };
  }, []);

  // ---- Escuchar mensajes de PGEvent vía postMessage (window.top.postMessage)
  useEffect(() => {
    const onMessage = (ev) => {
      // ev.data debería ser { event, id, reasons, message, state } (según tu PGEvent)
      const d = ev?.data;
      if (!d) return;
      // Si trae "state", lo usamos
      if (typeof d.state === "string") {
        const s = isSuccess(d.state) ? "SUCCESS" : "";
        if (s) {
          setLocalState("SUCCESS");
          successRef.current = true;
          setAskVisible(false);
          setAsking(false);
          setIaMessages("");
        } else if (d.state === "FAILURE" || d.state === "RUN_START") {
          // Si querés resetear el panel al empezar una nueva corrida:
          successRef.current = false;
          setLocalState("");
          setAskVisible(true);
          // opcional: limpiar o mantener el iaMessages
        }
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // ---- (Opcional) Escuchar un CustomEvent 'pg:state' por si preferís despacharlo así:
  useEffect(() => {
    const onPgState = (e) => {
      const state = e?.detail?.state;
      if (!state) return;
      if (isSuccess(state)) {
        setLocalState("SUCCESS");
        successRef.current = true;
        setAskVisible(false);
        setAsking(false);
        setIaMessages("");
      } else if (state === "FAILURE" || state === "RUN_START") {
        successRef.current = false;
        setLocalState("");
        setAskVisible(true);
      }
    };
    window.addEventListener("pg:state", onPgState);
    return () => window.removeEventListener("pg:state", onPgState);
  }, []);

  // Reemplazar mostrarResultadoHTML con guard: si ya es SUCCESS, ignorar pushes del servidor
  useEffect(() => {
    window.mostrarResultadoHTML = (html) => {
      if (successRef.current) return; // ignorar si ya aprobó
      const txt = html || "";
      setIaMessages(txt);
      setAsking(false);
      if (String(txt).trim() !== "") setAskVisible(false);
    };
  }, []);

  const shouldShowAsk = useMemo(() => {
    return !successRef.current && askVisible && !iaMessages;
  }, [askVisible, iaMessages]);

  const handleAsk = async () => {
    if (asking) return;
    setAsking(true);

    if (typeof window.solicitarFeedbackIA === "function") {
      try {
        await window.solicitarFeedbackIA(); // opcional: pasar { forceSuccess: true } si querés
        // el botón se oculta cuando llega el resultado por mostrarResultadoHTML
      } catch {
        setAsking(false);
      }
    } else {
      if (typeof window.mostrarResultadoHTML === "function") {
        window.mostrarResultadoHTML(`<pre>${L.noHandler}</pre>`);
      }
      setAsking(false);
    }
  };

  const contentHTML = successRef.current
    ? `<div class="ia-success">${L.success}</div>`
    : (iaMessages || L.empty);

  return (
    <div className={`border-right-container ${themeClass}`} lang={lang}>
      <div className="ia-panel">
        <h2 className="ia-title">{L.title}</h2>

        {shouldShowAsk && (
          <button
            type="button"
            className="ia-ask-btn"
            onClick={handleAsk}
            disabled={asking}
            title="Enviar el código actual a la IA para recibir feedback"
            style={{
              margin: "6px 0 12px",
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
              cursor: asking ? "not-allowed" : "pointer",
              fontWeight: 600,
              opacity: asking ? 0.6 : 1,
            }}
          >
            {asking ? L.sending : L.ask}
          </button>
        )}

        <div
          id="iaResult"
          className="ia-result"
          dangerouslySetInnerHTML={{ __html: contentHTML }}
        />
      </div>
    </div>
  );
};

BorderRight.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']).isRequired,
  lang: PropTypes.oneOf(['es', 'en', 'pt']),
  eventTypePG: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default BorderRight;

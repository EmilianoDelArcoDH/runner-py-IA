import { result } from "lodash";

// "def es_palindromo(palabra):\n    # Completa la función para ignorar mayúsculas\n    return  # Agrega la lógica aquí\n",
let seguirValidando = true;
export const exercises = [
  {
    "id": "ex-seaborn",
    "prompt": "Ejecuta el ejemplo.",
    "mainEditor": "main.py",
    "packages": ["micropip", "pandas", "matplotlib", "numpy"],
    "editors": {
      "main.py": {
        "code": {
          es: `import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Cargar el conjunto de datos\ndata = sns.load_dataset("iris")\n\n# Crear un gráfico de dispersión\nsns.scatterplot(x="sepal_length", y="sepal_width", hue="species", data=data)\n\n# Mostrar el gráfico\nplt.show()`,
          en: `import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Load the dataset\ndata = sns.load_dataset("iris")\n\n# Create a scatter plot\nsns.scatterplot(x="sepal_length", y="sepal_width", hue="species", data=data)\n\n# Show the plot\nplt.show()`,
          "isReadOnly": false
        },
      }
    }
  },


  {
    "id": "intro-01",
    "prompt": "",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": { es: `# Historias para elegir:\n\n# Historia 1\n# La historia se sitúa en el pueblo ficticio de Hawkins, en el estado de Indiana, Estados Unidos, durante los años ochenta,\n# cuando un niño de doce años llamado Will Byers desaparece misteriosamente.\n# Poco después, Eleven, una niña aparentemente fugitiva y con poderes telequinéticos,\n# se encuentra con Mike, Dustin y Lucas, amigos de Will, y los ayuda en la búsqueda de su amigo desaparecido.\n\n# Historia 2\n# La serie sigue la historia de Johnny Lawrence, exestudiante del dojo Cobra Kai,\n# quien busca la redención reabriendo el infame dojo y reavivando, en el proceso,\n# su rivalidad con un ahora exitoso Daniel LaRusso.\n# Este enemigo ha estado luchando por mantener el equilibrio en su vida sin la guía de su mentor, el señor Miyagi.\n# La serie trata sobre dos hombres que enfrentan sus demonios del pasado y\n# resuelven las frustraciones del presente de la única manera en que saben hacerlo: a través del karate.`, en: `# Choose one of these stories:\n\n# Story 1\n# This story takes place in the fictional town of Hawkins, Indiana, US, during the 80's,\n# when a 12-year-old boy called Will Byers mysteriously goes missing.\n# Shortly after, Eleven, an apparently fugitive girl with telekinetic powers, \n# meets Mike, Dustin, and Lucas, Will's friends, and helps them search for their missing friend. \n\n# Story 2\n# This series follows the story of Johnny Lawrence, a former student at the Cobra Kai dojo.\n# He is now seeking redemption by reopening the infamous dojo,\n# while reigniting old rivalries with the currently successful Daniel LaRusso.\n# This rival has been struggling to maintain balance in his life without the guidance of his mentor, Mr. Miyagi.\n# The series is about two men confronting their past demons and\n# dealing with present frustrations in the only way they know: through karate.`, pt: `# Escolha uma dessas histórias:\n\n# História 1\n# A história se passa na cidade fictícia de Hawkins, Indiana, EUA, durante os anos 80,\n# quando um menino de 12 anos chamado Will Byers desaparece misteriosamente.\n# Pouco depois, Eleven, uma garota aparentemente fugitiva com poderes telecinéticos,\n# encontra Mike, Dustin e Lucas, amigos de Will, e os ajuda a procurar seu amigo desaparecido.\n\n# História 2\n# Esta série segue a história de Johnny Lawrence, um ex-aluno do dojo Cobra Kai.\n# Ele está agora buscando redenção ao reabrir o infame dojo,\n# enquanto reacende antigas rivalidades com o atualmente bem-sucedido Daniel LaRusso.\n# Este rival tem lutado para manter o equilíbrio em sua vida sem a orientação de seu mentor, Sr. Miyagi.\n# A série é sobre dois homens confrontando seus demônios do passado e\n# lidando com frustrações presentes da única maneira que conhecem: através do caratê.` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe seguir los pasos para crear una historia loca basada en una de las dos historias proporcionadas.",
        "test": (assert) => assert
          .$custom(code => {
            const norm = code.replace(/\r/g, "");

            // 1) Verificar que existan al menos 5 palabras entre []
            const palabrasMarcadas = norm.match(/\[.*?\]/g) || [];
            if (palabrasMarcadas.length < 5) {
              return [{
                es: "Debe marcar al menos cinco palabras entre corchetes [].",
                en: "You must mark at least five words between brackets [].",
                pt: "Você deve marcar pelo menos cinco palavras entre colchetes []."
              }];
            }

            // 2) Detectar inputs y variables
            const inputMatches = [...norm.matchAll(/^\s*([A-Za-z_]\w*)\s*=\s*input\s*\(\s*["'][\s\S]*?["']\s*\)\s*$/gm)];
            const varNames = inputMatches.map(m => m[1]);
            const uniqueVarNames = [...new Set(varNames)];

            if (uniqueVarNames.length < 5) {
              return [{
                es: "Debes tener al menos 5 entradas con input() asignadas a variables distintas.",
                en: "You must have at least 5 input() entries assigned to distinct variables.",
                pt: "Você deve ter pelo menos 5 entradas com input() atribuídas a variáveis distintas."
              }];
            }

            // 3) Validar título (cualquier print con “Historia”)
            const hasTitle = /print\s*\(\s*["'][^"']*historia[^"']*["']\s*\)/i.test(norm);
            if (!hasTitle) {
              return [{
                es: "Incluí un título para la historia usando print(), por ejemplo: print(\"Historia 1\") o print(\"Historia Loca\").",
                en: "Include a title for the story using print(), e.g., print(\"Historia 1\") or print(\"Historia Loca\").",
                pt: "Inclua um título para a história usando print(), por exemplo: print(\"História 1\") ou print(\"História Louca\")."
              }];
            }

            // 4) Extraer el contenido de los print()
            const printArgs = [...norm.matchAll(/print\s*\(([\s\S]*?)\)\s*$/gm)].map(m => m[1]);
            if (printArgs.length === 0) {
              return [{
                es: "Debes mostrar la historia con al menos un print().",
                en: "You must show the story with at least one print().",
                pt: "Você deve mostrar a história com pelo menos um print()."
              }];
            }

            // 5) Comprobar que las variables aparecen en la historia (en cualquier print)
            const allPrintBody = printArgs.join("\n");
            const missing = uniqueVarNames.filter(v => {
              const re = new RegExp(`(?<![A-Za-z0-9_])${v}(?![A-Za-z0-9_])`);
              return !re.test(allPrintBody);
            });

            if (missing.length > 0) {
              return [{
                es: `Estas variables pedidas por input no aparecen en la historia impresa: ${missing.join(", ")}.`,
                en: `These input variables do not appear in the printed story: ${missing.join(", ")}.`,
                pt: `Estas variáveis de input não aparecem na história impressa: ${missing.join(", ")}.`
              }];
            }

            // 6) Verificar que haya al menos rastros de una de las dos historias originales
            const hayRastrosHistoria1 = /Hawkins|Will\s+Byers|Eleven|Mike|Dustin|Lucas/i.test(norm);
            const hayRastrosHistoria2 = /Johnny\s+Lawrence|Cobra\s+Kai|LaRusso|Miyagi|karate/i.test(norm);
            if (!hayRastrosHistoria1 && !hayRastrosHistoria2) {
              return [{
                es: "Debes mantener al menos una de las dos historias como base en los comentarios del código.",
                en: "You must keep at least one of the two base stories in the code comments.",
                pt: "Você deve manter pelo menos uma das duas histórias-base nos comentários do código."
              }];
            }


            //VERSION VIEJA
            // // Verificar que las historias se incluyan en el código
            // const historia1 = "Hawkins.*Indiana.*Will Byers desaparece.*Eleven.*Mike.*Dustin.*Lucas";
            // const historia2 = "Johnny Lawrence.*Cobra Kai.*Daniel LaRusso.*Miyagi.*karate";
            // if (!new RegExp(historia1, "s").test(code) && !new RegExp(historia2, "s").test(code)) {
            //   return [{
            //     es: "En tu código debes tener las dos historias brindadas por el ejercicio, revisa no haberlas borrado o modificado. Puedes restaurar el ejercicio para recuperar el código original.",
            //     en: "In your code you must have the two stories provided by the exercise, check that you have not deleted or modified them. You can restore the exercise to recover the original code.",
            //     pt: "No seu código, você deve ter as duas histórias fornecidas pelo exercício, verifique se você não as excluiu ou modificou. Você pode restaurar o exercício para recuperar o código original."
            //   }];
            // }

            // // Verificar que al menos 5 palabras estén marcadas con []
            // const palabrasMarcadas = code.match(/\[.*?\]/g) || [];
            // if (palabrasMarcadas.length < 5) {
            //   return [{
            //     es: "Debe marcar al menos cinco palabras con [].",
            //     en: "It must mark at least five words with [].",
            //     pt: "Deve marcar pelo menos cinco palavras com []."
            //   }];
            // }

            // // Verificar que hay 5 inputs para reemplazar palabras
            // const inputs = code.match(/input\(/g) || [];
            // if (inputs.length < 5) {
            //   return [{
            //     es: "Debe incluir cinco inputs para reemplazar las palabras seleccionadas.",
            //     en: "It must include five inputs to replace the selected words.",
            //     pt: "Deve incluir cinco inputs para substituir as palavras selecionadas."
            //   }];
            // }

            // // Verificar si se genera un título
            // if (!code.includes("print(") && !code.match(/print\(.*"Historia Loca".*\)/)) {
            //   return [{
            //     es: "Debe incluir un título para la historia con un print().",
            //     en: "It must include a title for the story with a print().",
            //     pt: "Deve incluir um título para a história com um print()."
            //   }];
            // }
            // const inputLines = code.match(/(\w+)\s*=\s*input\(["'].*?["']\)/gs) || [];
            // // console.log("Inputs encontrados:", inputLines);

            // const variablesInput = inputLines.map(line => line.split('=')[0].trim());

            // // console.log("Variables encontradas:", variablesInput);

            // // Buscar el último print() que contiene concatenación
            // const printMatches = code.match(/print\((["'].*?\+.*?["'].*?)+\)/gs);

            // if (!printMatches) {
            //   return [{
            //     es: "Debe incluir un print() con la historia concatenada y las palabras reemplazadas.",
            //     en: "It must include a print() with the concatenated story and replaced words.",
            //     pt: "Deve incluir um print() com a história concatenada e as palavras substituídas."
            //   }];
            // }

            // // Seleccionar el último print
            // const ultimoPrint = printMatches[0];

            // const variablesNoReemplazadas = variablesInput.filter(variable => {
            //   const regexVariable = new RegExp("\\+" + variable + "\\+");
            //   return !regexVariable.test(ultimoPrint.replace(/\s/g, ""));
            // });

            // if (variablesNoReemplazadas.length > 0) {
            //   // console.log(`Las siguientes variables no se reemplazaron correctamente:`, variablesNoReemplazadas);
            //   return [{
            //     es: `Las siguientes variables no fueron reemplazadas: ${variablesNoReemplazadas.join(', ')}`,
            //     en: `The following variables were not correctly replaced: ${variablesNoReemplazadas.join(', ')}`,
            //     pt: `As seguintes variáveis não foram corretamente substituídas: ${variablesNoReemplazadas.join(', ')}`
            //   }];
            // }

          })
      }
    ]
  },
  {
    "id": "tipoDatos-01-01",
    "prompt": "Corrige los errores y realiza las tareas según las actividades indicadas.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": { es: 'print("---Actividad 01 - Errores ---"); \n# --- ERROR 1 ---\n# Queremos saber el total de la suma de los números a y b.\nnumA = 2\nnumB = "3"\ntotal = numA + numB\nprint(total)', en: 'print("---Activity 01 - Errors ---"); \n# --- ERROR 1 ---\n# We want to know the total sum of the numbers a and b.\nnumA = 2\nnumB = "3"\ntotal = numA + numB\nprint(total)', pt: 'print("---Atividade 01 - Erros ---"); \n# --- ERRO 1 ---\n# Queremos saber o total da soma dos números a e b.\nnumA = 2\nnumB = "3"\ntotal = numA + numB\nprint(total)' },
        "isReadOnly": false
      }
    },
    validationAST: [
      {
        "description": "El código debe corregir los errores que se encuentran en la actividad.",
        "test": (assert) => assert
          .$custom(code => {
            const norm = code.replace(/\r/g, "");

            // === 1. numA = 2 debe existir ===
            if (!/^\s*numA\s*=\s*2(\.0)?\s*$/m.test(norm)) {
              return [{
                es: "Debes mantener 'numA' con el valor 2.",
                en: "You must keep 'numA' with value 2.",
                pt: "Você deve manter 'numA' com valor 2."
              }];
            }

            // === 2. Detectar si numB está como texto ("3") ===
            const numB_esTexto = /numB\s*=\s*["']\d+["']/.test(norm);

            // === 3. Detectar si hay conversión en algún punto ===
            const usaConversion = /(int|float)\s*\(\s*numB\s*\)/.test(norm) || /numB\s*=\s*(int|float)\s*\(/.test(norm);

            // Si es texto y nunca se convierte, marcar error
            if (numB_esTexto && !usaConversion) {
              return [{
                es: "La variable 'numB' está como texto y no se convierte a número. Usa int(numB) o float(numB).",
                en: "Variable 'numB' is a string and is not converted to a number. Use int(numB) or float(numB).",
                pt: "A variável 'numB' é texto e não foi convertida em número. Use int(numB) ou float(numB)."
              }];
            }

            // === 4. Validar suma numérica (total = numA + numB o con int(numB)) ===
            const validSum =
              /(total|result)\s*=\s*.*numA.*\+.*numB|numB.*\+.*numA/.test(norm) ||
              /(total|result)\s*=\s*.*(int|float)\s*\(\s*numB\s*\)/.test(norm);

            if (!validSum) {
              return [{
                es: "Debes sumar numA y numB de forma numérica (por ejemplo: total = numA + int(numB)).",
                en: "You must add numA and numB numerically (e.g., total = numA + int(numB)).",
                pt: "Você deve somar numA e numB numericamente (ex: total = numA + int(numB))."
              }];
            }

            // === 5. Debe imprimirse el resultado ===
            if (!/print\s*\([^)]*(total|result)[^)]*\)/.test(norm)) {
              return [{
                es: "Debes imprimir el valor del resultado (print(total) o print(result)).",
                en: "You must print the result value (print(total) or print(result)).",
                pt: "Você deve imprimir o valor do resultado (print(total) ou print(result))."
              }];
            }

            // 5) (Opcional, suave) La cabecera puede o no estar; si querés hacerla obligatoria, descomenta el return.
            // if (!/print\s*\(\s*["']---\s*Actividad\s*01\s*-\s*Errores\s*---["']\s*\)\s*;?\s*/.test(norm)) {
            //   return [{ es: "Incluí el encabezado: print(\"---Actividad 01 - Errores ---\");", en: "...", pt: "..." }];
            // }

            // Si llega acá, pasa

            //VALIDACION VIEJA
            // console.log(code.match(/numA\s*=\s*2/));

            // let match = code.match(/numB\s*=\s*"(\d+)"/)
            // if (match) {
            //   if (typeof match[1] === 'string') {
            //     seguirValidando = false

            //     return [{
            //       es: "La variable 'numB' debe convertirse en número entero.",
            //       en: "The variable 'numB' should be converted to an integer.",
            //       pt: "A variável 'numB' deve ser convertida para um número inteiro."
            //     }]

            //   }
            // }
            // let matchNumA = code.match(/numA\s*=\s*2/)
            // if (!matchNumA) {
            //   return [{
            //     es: "Debes tener la variable numA con el valor 2. Recuerda no debes eliminar el codigo existente solo corregir el error.",
            //     en: "You should have the variable numA with the value 2. Remember you should not delete the existing code, just correct the error.",
            //     pt: "Você deve ter a variável numA com o valor 2. Lembre-se de não excluir o código existente, apenas corrigir o erro."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('total=numA+numB') && !code.replace(/\s/g, '').trim().includes('result=numB+numA') && !code.replace(/\s/g, '').trim().includes('total=numA+int(numB)') && !code.replace(/\s/g, '').trim().includes('result=int(numB)+numA') && !code.replace(/\s/g, '').trim().includes('total=int(numB)+numA') && !code.replace(/\s/g, '').trim().includes('result=numA+int(numB)')) {
            //   return [{
            //     es: "Debes sumar numA y numB y guardar el resultado en la variable total. Recuerda no debes eliminar el codigo existente solo corregir el error.",
            //     en: "You should add numA and numB and save the result in the total variable. Remember you should not delete the existing code, just correct the error.",
            //     pt: "Você deve adicionar numA e numB e salvar o resultado na variável total. Lembre-se de não excluir o código existente, apenas corrigir o erro."

            //   }]
            // } else if (!code.includes('print(total)') && !code.includes('print(result)')) {
            //   return [{
            //     es: "Debes imprimir el valor de la variable total. Recuerda no debes eliminar el codigo existente solo corregir el error.",
            //     en: "You should print the value of the total variable. Remember you should not delete the existing code, just correct the error.",
            //     pt: "Você deve imprimir o valor da variável total. Lembre-se de não excluir o código existente, apenas corrigir o erro."
            //   }]
            // }

          })
      },
    ],

  },
  {
    "id": "tipoDatos-01-02",
    "prompt": "Corrige los errores y realiza las tareas según las actividades indicadas.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": { es: '# --- ERROR 2 ---\n# Queremos mostrar por consola el sabor de helado ingresado por el usuario.\n\nsabor = int(input("Ingrese su sabor de helado favorito: "))\nprint("El sabor ingresado por consola es: " + sabor)', en: '# --- ERROR 2 ---\n# We want to show the ice cream flavor entered by the user on the console.\n\nflavor = int(input("Enter your favorite ice cream flavor: "))\nprint("The flavor entered on the console is: " + flavor)', pt: '# --- ERRO 2 ---\n# Queremos mostrar na tela o sabor do sorvete inserido pelo usuário.\n\nsabor = int(input("Digite seu sabor de sorvete favorito: "))\nprint("O sabor inserido no console é: " + sabor)' },
        "isReadOnly": false
      }
    },


    "validationAST": [
      {
        "description": "El código debe corregir los errores que se encuentran en la actividad.",
        "test": (assert) => assert
          .$custom(code => {

            const norm = code.replace(/\r/g, "");

            // 1) Capturar una variable asignada desde input(...), en cualquier idioma/variable
            //    (ej: sabor = input("..."), flavor = input("..."))
            const mInput = [...norm.matchAll(/^\s*([A-Za-z_]\w*)\s*=\s*(.+input\s*\(\s*["'][\s\S]*?["']\s*\).*)$/gm)];
            if (mInput.length === 0) {
              return [{
                es: "Debes leer el sabor con input(...) y guardarlo en una variable.",
                en: "You must read the flavor with input(...) and store it in a variable.",
                pt: "Você deve ler o sabor com input(...) e armazená-lo em uma variável."
              }];
            }

            // Tomamos la primera variable que venga de input()
            const varFromInput = mInput[0][1];
            const rhsInput = mInput[0][2];

            // 2) Error: NO permitir int(input(...)) ni float(input(...))
            if (/(?:^|[^A-Za-z_])(int|float)\s*\(\s*input\s*\(/.test(rhsInput)) {
              return [{
                es: "Lo que se obtiene de input() no debe convertirse con int() ni float().",
                en: "The value from input() must not be converted with int() or float().",
                pt: "O valor de input() não deve ser convertido com int() ou float()."
              }];
            }

            // 3) Debe imprimirse la variable proveniente de input(), aceptando varios estilos:
            //    - print("... " + var)
            //    - print("...", var)
            //    - print(f"... {var} ...")
            //    - print("... {}".format(var))
            //    - print(var)
            const varRe = new RegExp(`(?<![A-Za-z0-9_])${varFromInput}(?![A-Za-z0-9_])`);

            const prints = [...norm.matchAll(/print\s*\(([\s\S]*?)\)\s*$/gm)].map(m => m[1]);
            if (prints.length === 0) {
              return [{
                es: "Debes imprimir el sabor ingresado usando print().",
                en: "You must print the entered flavor using print().",
                pt: "Você deve imprimir o sabor inserido usando print()."
              }];
            }

            // ¿Algún print incluye la variable (de manera directa o en f-string/format/coma)?
            let printedOK = false;
            for (const body of prints) {
              const hasVarDirect = varRe.test(body);                         // print(var) / print("...", var) / f-string contiene {var} (nombre aparece)
              const hasFString = /f["'][\s\S]*?{[\s\S]*?}[\s\S]*?["']/.test(body) && hasVarDirect;
              const hasFormat = /\.format\s*\([\s\S]*\)/.test(body) && hasVarDirect;
              const hasPlus = /\+/.test(body) && hasVarDirect;
              const hasComma = /,/.test(body) && hasVarDirect;

              if (hasVarDirect && (hasFString || hasFormat || hasPlus || hasComma || /^\s*([A-Za-z_]\w*)\s*$/.test(body.trim()))) {
                printedOK = true;
                break;
              }
            }

            if (!printedOK) {
              return [{
                es: `Debes imprimir la variable '${varFromInput}' que proviene de input(). Puedes usar concatenación, comas, f-strings o .format().`,
                en: `You must print the '${varFromInput}' variable coming from input(). You can use concatenation, commas, f-strings, or .format().`,
                pt: `Você deve imprimir a variável '${varFromInput}' que vem de input(). Pode usar concatenação, vírgulas, f-strings ou .format().`
              }];
            }

            // Si llegó hasta acá, aprueba




            //VALIDACION VIEJA
            // let match = code.match(/\bint\s*\(\s*input\(/)
            // //console.log(match)
            // if (match) {
            //   return [{
            //     es: "Lo que se obtiene de la función 'input' no debe convertirse a número entero.",
            //     en: "What is obtained from the 'input' function should not be converted to an integer.",
            //     pt: "O que é obtido da função 'input' não deve ser convertido para um inteiro."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('print("Elsaboringresadoporconsolaes:"+sabor)') && !code.replace(/\s/g, '').trim().includes('print("Theflavorenteredontheconsoleis:"+flavor)')) {
            //   return [{
            //     es: "Debes imprimir el valor de la variable 'sabor'. Recuerda no debes eliminar el codigo existente solo corregir el error.",
            //     en: "You should print the value of the 'flavor' variable. Remember you should not delete the existing code, just correct the error.",
            //     pt: "Você deve imprimir o valor da variável 'sabor'. Lembre-se de não excluir o código existente, apenas corrigir o erro."
            //   }]
            // }
          })
      },
    ],
  },
  {
    "id": "tipoDatos-01-03",
    "prompt": "Corrige los errores y realiza las tareas según las actividades indicadas.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": { es: '# --- ERROR 3 ---\n# Queremos mostrar por consola el total de la multiplicación de dos números, numA y numB\n\nnumA = input("Ingrese número A: ")\nnumB = input("Ingrese número B: ")\nresultado = numA * numB\nprint("El resultado es: " + resultado)', en: '# --- ERROR 3 ---\n# We want to show the total multiplication of two numbers, numA and numB\n\nnumA = input("Enter number A: ")\nnumB = input("Enter number B: ")\nresult = numA * numB\nprint("The result is: " + result)', pt: '# --- ERRO 3 ---\n# Queremos mostrar na tela o total da multiplicação de dois números, numA e numB\n\nnumA = input("Digite o número A: ")\nnumB = input("Digite o número B: ")\nresultado = numA * numB\nprint("O resultado é: " + resultado)' },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe corregir los errores que se encuentran en la actividad.",
        "test": (assert) => assert
          .$custom(code => {

            const norm = code.replace(/\r/g, "");

            // 1) Debe leerse numA y numB desde input (con o sin cast en esa línea)
            const reInputA = /^\s*numA\s*=\s*(?:[A-Za-z_]\w*\s*\(\s*)?input\s*\(\s*["'][\s\S]*?["']\s*\)\s*\)?\s*$/m;
            const reInputB = /^\s*numB\s*=\s*(?:[A-Za-z_]\w*\s*\(\s*)?input\s*\(\s*["'][\s\S]*?["']\s*\)\s*\)?\s*$/m;
            if (!reInputA.test(norm) || !reInputB.test(norm)) {
              return [{ es: "Debes leer numA y numB con input() (con o sin int()/float())." }];
            }

            // 2) ¿Hay conversión a número en algún punto? (en input o en operación)
            const castOnAssignA = /^\s*numA\s*=\s*(?:int|float)\s*\(\s*input\s*\(/m.test(norm);
            const castOnAssignB = /^\s*numB\s*=\s*(?:int|float)\s*\(\s*input\s*\(/m.test(norm);

            // 3) Buscar asignación del resultado (resultado|result) = ...
            const resultAssigns = [...norm.matchAll(/^\s*(resultado|result)\s*=\s*(.+)$/gm)];
            if (resultAssigns.length === 0) {
              return [{ es: "Debes guardar el producto en 'resultado' o 'result'." }];
            }

            const usesNumericProduct = (rhs) => {
              if (!/\*/.test(rhs)) return false;
              const hasA = /\bnumA\b/.test(rhs) || /(int|float)\s*\(\s*numA\s*\)/.test(rhs);
              const hasB = /\bnumB\b/.test(rhs) || /(int|float)\s*\(\s*numB\s*\)/.test(rhs);
              if (!(hasA && hasB)) return false;
              if (!castOnAssignA && !castOnAssignB) {
                const castInOpA = /(int|float)\s*\(\s*numA\s*\)/.test(rhs);
                const castInOpB = /(int|float)\s*\(\s*numB\s*\)/.test(rhs);
                if (!(castInOpA || castInOpB)) return false;
              }
              return true;
            };

            let resultVar = null;
            let okProduct = false;
            for (const m of resultAssigns) {
              const lhs = m[1];   // resultado | result
              const rhs = m[2];
              if (usesNumericProduct(rhs)) {
                okProduct = true;
                resultVar = lhs;
                break;
              }
            }

            if (!okProduct) {
              return [{ es: "Debes multiplicar numA y numB como números (con int()/float() en input u operación)." }];
            }

            // 4) Debe imprimirse el resultado correctamente
            const prints = [...norm.matchAll(/print\s*\(([\s\S]*?)\)\s*$/gm)].map(m => m[1]);
            if (prints.length === 0) {
              return [{ es: "Debes imprimir el resultado con print()." }];
            }

            const resName = resultVar || "resultado|result";
            const resRe = new RegExp(`\\b(${resName})\\b`);

            const isFStringWithVar = (body) =>
              /f["']/.test(body) && new RegExp(`\\{[^}]*\\b(${resName})\\b[^}]*\\}`).test(body);

            const containsVar = (body) => resRe.test(body);
            const hasFormat = (body) => /\.format\s*\(/.test(body) && containsVar(body);
            const hasComma = (body) => /,/.test(body) && containsVar(body);
            const isDirect = (body) => body.trim().match(new RegExp(`^${resName}$`));

            const usesPlus = (body) => /\+/.test(body);
            const hasStringLiteral = (body) => /["'][\s\S]*?["']/.test(body);
            const hasStrWrap = (body) => new RegExp(`str\\s*\\(\\s*${resName}\\s*\\)`).test(body);

            // ❌ Caso a bloquear: "texto" + resultado  (sin str(resultado))
            const badConcat = prints.some(body =>
              usesPlus(body) && hasStringLiteral(body) && containsVar(body) && !hasStrWrap(body)
            );
            if (badConcat) {
              return [{ es: "Si concatenás texto con el resultado, debés usar str(resultado). Ej.: print('El resultado es: ' + str(resultado))." }];
            }

            // ✅ Formas válidas
            const printedOK = prints.some(body =>
              isFStringWithVar(body) || hasFormat(body) || hasComma(body) || isDirect(body) ||
              (usesPlus(body) && hasStrWrap(body)) // concatenación correcta con str(...)
            );

            if (!printedOK) {
              return [{ es: "Debes imprimir la variable del resultado (acepta comas, f-strings, .format o concatenación con str(...))." }];
            }

            // Si llegó hasta acá, aprueba


            //VALIDACION VIEJA
            // // Expresión regular para detectar la conversión directa de input a int
            // let regexInputToInt = /\bnum[AB]\s*=\s*int\s*\(\s*input\s*\([^)]+\)\s*\)/;

            // // Expresión regular para detectar la conversión al momento de operar
            // let regexOperationToInt = /resultado\s*=\s*int\s*\(\s*num[AB]\s*\)\s*\*\s*int\s*\(\s*num[AB]\s*\)/;
            // let regexOperationToInt2 = /result\s*=\s*int\s*\(\s*num[AB]\s*\)\s*\*\s*int\s*\(\s*num[AB]\s*\)/;

            // // Validar si existe alguna de las dos maneras
            // let matchInputToInt = code.match(regexInputToInt);
            // let matchOperationToInt = code.match(regexOperationToInt);
            // let matchOperationToInt2 = code.match(regexOperationToInt2);

            // if (matchInputToInt) {
            //   //console.log("El código convierte correctamente las entradas de input a un entero.");
            // } else if (matchOperationToInt || matchOperationToInt2) {
            //   //console.log("El código convierte correctamente las variables a entero durante la operación.");
            // } else {
            //   seguirValidando = false;
            //   //console.log("Error: El código no convierte las entradas o variables a entero de forma válida.");
            //   return [{
            //     es: "Recuerda que las entradas de input o las variables deben convertirse a enteros.",
            //     en: "Remember that input entries or variables must be converted to integers.",
            //     pt: "Lembre-se de que as entradas de input ou as variáveis devem ser convertidas para inteiros."
            //   }]
            // }

            // // Expresión regular para detectar el uso de str() en el print
            // let regexStrConversion = /print\s*\(\s*".*"\s*\+\s*str\s*\(\s*resultado\s*\)\s*\)/;
            // let regexStrConversion2 = /print\s*\(\s*".*"\s*\+\s*str\s*\(\s*result\s*\)\s*\)/;
            // // console.log(regexStrConversion);

            // if (regexStrConversion.test(code) || regexStrConversion2.test(code)) {
            //   //console.log("El código convierte correctamente el resultado a una cadena usando str().");
            // } else {
            //   //console.log("Error: El código no convierte el resultado a una cadena usando str().");
            //   return [{
            //     es: "Para ver el resultado de la multiplicación debe convertirse a cadena usando str().",
            //     en: "To see the multiplication result it must be converted to a string using str().",
            //     pt: "Para ver o resultado da multiplicação deve ser convertido para uma string usando str()."
            //   }]
            // }
          })
      },
    ],
  },
  {
    "id": "tipoDatos-02",
    "prompt": `# 1.- Crear una variable y preguntarle al usuario qué edad tiene.
                # 2.- Transformar el tipo de dato del input() a número entero.
                # 3.- Crear otra variable donde se guarde la suma de la variable anterior más el número 18.
                # 4.- Transformar el tipo de dato de la variable anterior a texto para poder concatenar el resultado.
                # 5.- Hacer un print() con el texto → “Tu edad dentro de 18 años será: ______ “`,
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debes crear una variable 'edad' que almacene el valor ingresado por el usuario.",
        "test": (assert) => assert
          .$custom(code => {
            const norm = code.replace(/\r/g, "");

            // === 1) Capturar variable con input() ===
            const inputMatches = [...norm.matchAll(/^\s*([A-Za-z_]\w*)\s*=\s*(.+input\s*\(\s*["'][\s\S]*?["']\s*\).*)$/gm)];
            if (inputMatches.length === 0) {
              return [{ es: "Debes leer la edad con input() y guardarla en una variable (p. ej., 'edad')." }];
            }

            const ageVar = inputMatches[0][1];
            const rhsInput = inputMatches[0][2];

            // === 2) Validar que el texto del input mencione edad o años ===
            const promptText = (rhsInput.match(/input\s*\(\s*["']([\s\S]*?)["']\s*\)/) || [])[1] || "";
            if (!/edad|años|age|old/i.test(promptText)) {
              return [{
                es: `La pregunta del input debe mencionar "edad"/"años" (o "age"/"old"). Actual: "${promptText}".`
              }];
            }

            // === 3) Verificar conversión a número (en input o en operación) ===
            const castOnAssign = new RegExp(`^\\s*${ageVar}\\s*=\\s*(?:int|float)\\s*\\(\\s*input\\s*\\(`, "m").test(norm);

            // === 4) Verificar edadFutura = edad + 18 (con posible conversión) ===
            const futureNames = ["edadFutura", "futureAge"];
            const assigns = [...norm.matchAll(/^\s*([A-Za-z_]\w*)\s*=\s*(.+)$/gm)];

            let futureVar = null;
            let okFutureAssign = false;

            const usesValidFutureExpr = (rhs) => {
              if (!/\+/.test(rhs) || !/(^|[^0-9])18([^0-9]|$)/.test(rhs)) return false;
              const hasAgeDirect = new RegExp(`(?<![A-Za-z0-9_])${ageVar}(?![A-Za-z0-9_])`).test(rhs);
              const hasAgeCasted = new RegExp(`(int|float)\\s*\\(\\s*${ageVar}\\s*\\)`).test(rhs);
              if (!castOnAssign && !hasAgeCasted) return false;
              return hasAgeDirect || hasAgeCasted;
            };

            for (const m of assigns) {
              const lhs = m[1];
              const rhs = m[2];
              if (futureNames.includes(lhs) && usesValidFutureExpr(rhs)) {
                futureVar = lhs;
                okFutureAssign = true;
                break;
              }
            }

            if (!okFutureAssign) {
              return [{
                es: "Debes crear 'edadFutura' sumando 18 a la edad. Si no convertiste en el input, convierte en la operación."
              }];
            }

            // === 5) Validar el print ===
            const prints = [...norm.matchAll(/print\s*\(([\s\S]*?)\)\s*$/gm)].map(m => m[1]);
            if (prints.length === 0) {
              return [{ es: "Debes imprimir el resultado con print()." }];
            }

            const resName = futureVar;
            const containsRes = (body) => new RegExp(`(?<![A-Za-z0-9_])${resName}(?![A-Za-z0-9_])`).test(body);
            const hasPhrase = (body) => /tu\s*edad\s*dentro\s*de\s*18/i.test(body);

            const isFStringWithRes = (body) => /f["']/.test(body) && new RegExp(`\\{[^}]*\\b${resName}\\b[^}]*\\}`).test(body);
            const hasFormat = (body) => /\.format\s*\(/.test(body) && containsRes(body);
            const hasComma = (body) => /,/.test(body) && containsRes(body);
            const isDirect = (body) => new RegExp(`^\\s*${resName}\\s*$`).test(body.trim());
            const usesPlus = (body) => /\+/.test(body);
            const hasStringLiteral = (body) => /["'][\s\S]*?["']/.test(body);
            const hasStrWrap = (body) => new RegExp(`str\\s*\\(\\s*${resName}\\s*\\)`).test(body);

            // ❌ Bloquear concatenación sin str()
            const badConcat = prints.some(body =>
              usesPlus(body) && hasStringLiteral(body) && containsRes(body) && !hasStrWrap(body)
            );
            if (badConcat) {
              return [{
                es: `Si concatenás texto con ${resName}, usá str(${resName}). Ej.: print("Tu edad dentro de 18..." + str(${resName})).`
              }];
            }

            // ✅ Validar frase + variable correcta
            const printedOK = prints.some(body =>
              hasPhrase(body) && (
                isFStringWithRes(body) || hasFormat(body) || hasComma(body) || isDirect(body) ||
                (usesPlus(body) && hasStrWrap(body))
              )
            );

            if (!printedOK) {
              return [{
                es: "El print debe incluir la frase 'Tu edad dentro de 18' y mostrar la variable convertida a texto."
              }];
            }

            // Listo, aprobó




            //VALIDACION VIEJA
            // if (!code.replace(/\s/g, '').trim().includes("edad=") && !code.replace(/\s/g, '').trim().includes("age=")) {
            //   return [{
            //     es: "Debes crearse una variable 'edad' que almacene el valor ingresado por el usuario como entero.",
            //     en: "A variable 'age' that stores the value entered by the user as an integer must be created.",
            //     pt: "Uma variável 'edad' que armazena o valor inserido pelo usuário como inteiro deve ser criada."
            //   }]
            // } else if (code.replace(/\s/g, '').trim().includes("edad=int(input(") || code.replace(/\s/g, '').trim().includes("edad=input(")) {

            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   // console.log(lineasInput[0]);

            //   const preguntaEs = lineasInput[0].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la preguntaEs
            //   if (preguntaEs.length < 1) {
            //     return [{
            //       es: "El input no debe estar vacío, debes solicitar al usuario que ingrese su edad.",
            //       en: "The input must not be empty, you must ask the user to enter their age.",
            //       pt: "A entrada não deve estar vazia, você deve pedir ao usuário para inserir sua idade."
            //     }]
            //   }
            //   if (preguntaEs) {
            //     const contieneEdadOAnios = /edad|años/i.test(preguntaEs);
            //     if (!contieneEdadOAnios) {
            //       seguirValidando = false
            //       // console.log("La pregunta del input no es válida porque no menciona 'edad' o 'años'.");
            //       return [{
            //         es: 'La pregunta del input "' + preguntaEs + '" no es válida porque no menciona "edad" o "años".',
            //         en: 'The input question ' + preguntaEs + ' is not valid because it does not mention "age" or "years".',
            //         pt: 'A pergunta do input ' + preguntaEs + ' não é válida porque não menciona "idade" ou "anos".'
            //       }]
            //     }

            //   }
            // } else {
            //   if (code.replace(/\s/g, '').trim().includes("age=int(input(") || code.replace(/\s/g, '').trim().includes("age=input(")) {

            //     const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //     // console.log(lineasInput[0]);

            //     const preguntaEn = lineasInput[0].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la preguntaEn
            //     if (preguntaEn.length < 1) {
            //       return [{
            //         es: "El input no debe estar vacío, debes solicitar al usuario que ingrese su edad.",
            //         en: "The input must not be empty, you must ask the user to enter their age.",
            //         pt: "A entrada não deve estar vazia, você deve pedir ao usuário para inserir sua idade."
            //       }]
            //     }
            //     if (preguntaEn) {
            //       const contieneEdadOAnios = /age|old/i.test(preguntaEn);
            //       if (!contieneEdadOAnios) {
            //         seguirValidando = false
            //         // console.log("La pregunta del input no es válida porque no menciona 'edad' o 'años'.");
            //         return [{
            //           es: 'La pregunta del input "' + preguntaEn + '" no es válida porque no menciona "edad" o "años".',
            //           en: 'The input question ' + preguntaEn + ' is not valid because it does not mention "age" or "old".',
            //           pt: 'A pergunta do input ' + preguntaEn + ' não é válida porque não menciona "idade" ou "anos".'
            //         }]
            //       }
            //     }
            //   } else {
            //     return [{
            //       es: "Debe solicitar al usuario que ingrese su edad.",
            //       en: "You must ask the user to enter their age.",
            //       pt: "Você deve pedir ao usuário para inserir sua idade."
            //     }]
            //   }
            // }

            // if (!code.replace(/\s/g, '').trim().includes("edadFutura=edad+18") && !code.replace(/\s/g, '').trim().includes("edadFutura=int(edad)+18") && !code.replace(/\s/g, '').trim().includes("futureAge=age+18") && !code.replace(/\s/g, '').trim().includes("futureAge=int(age)+18") && !code.replace(/\s/g, '').trim().includes("edadFutura=18+edad") && !code.replace(/\s/g, '').trim().includes("edadFutura=18+int(edad)") && !code.replace(/\s/g, '').trim().includes("futureAge=18+age") && !code.replace(/\s/g, '').trim().includes("futureAge=18+int(age)")) {
            //   return [{
            //     es: "Debes crearse una variable llamada edadFutura que sume la 'edad' del usuario mas 18.",
            //     en: "A variable called futureAge that adds the user's 'age' plus 18 must be created.",
            //     pt: "Uma variável chamada futureAge que adiciona a 'idade' do usuário mais 18 deve ser criada."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('print("Tuedaddentrode18añosserá:"+str(edadFutura))') && !code.replace(/\s/g, '').trim().includes('print("Youragedin18yearswillbe:"+str(futureAge))') && !code.replace(/\s/g, '').trim().includes("print('Tuedaddentrode18añosserá:'+str(edadFutura))") && !code.replace(/\s/g, '').trim().includes("print('Youragedin18yearswillbe:'+str(futureAge))")) {
            //   return [{
            //     es: "Debes imprimir un mensaje que contenga 'edadFutura' convertida a texto.",
            //     en: "A message containing 'futureAge' converted to text must be printed.",
            //     pt: "Uma mensagem contendo 'edadFutura' convertida para texto deve ser impressa."
            //   }]
            // }

          })
      },
    ]
  },
  {
    "id": "modulo-01",
    "prompt": ` # El print() vacío se usa para generar un espacio en la consola.
                # 1.- Importar el módulo random.
                # 2.- Crear 5 variables, donde cada una guarde un número aleatorio (no se puede repetir el rango seleccionado).
                # 3.- Hacer un print() de cada número.
                # 4.- Sumar los números generados y guardar el resultado en una variable llamada total.
                # 5.- Hacer un print() con el texto "La suma de los números generados es: " y concatenar el resultado de la suma.`,
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe importar el módulo 'random'.",
        "test": (assert) => assert
          .$custom(code => {

            const norm = code.replace(/\r/g, "");

            // 1) Importación válida del módulo random
            const hasImportRandom = /\bimport\s+random\b/.test(norm);
            const hasFromRandint = /\bfrom\s+random\s+import\s+(?:\*|randint)\b/.test(norm);
            const hasAliasImport = /\bimport\s+random\s+as\s+([A-Za-z_]\w*)\b/.exec(norm);
            const aliasName = hasAliasImport ? hasAliasImport[1] : null;

            if (!(hasImportRandom || hasFromRandint)) {
              return [{
                es: "Debe importar el módulo 'random' (por ejemplo: 'import random' o 'from random import randint').",
                en: "You must import the 'random' module (e.g., 'import random' or 'from random import randint').",
                pt: "Você deve importar o módulo 'random' (por exemplo: 'import random' ou 'from random import randint')."
              }];
            }

            // 2) Capturar 5 variables distintas asignadas con randint(0,20)
            //    Acepta: random.randint(...), <alias>.randint(...), o randint(...) (from random import randint)
            const aliasMatch = /\bimport\s+random\s+as\s+([A-Za-z_]\w*)\b/.exec(norm);
            const aliasNameMatch = aliasMatch ? aliasMatch[1] : null;

            // Armamos un prefijo que cubra random, alias (si hay), o nada (randint importado)
            const prefixPart = aliasNameMatch ? `(?:random|${aliasNameMatch})\\.` : `(?:random\\.)?`;

            // Regex sin ^$ para encontrar asignaciones en cualquier lugar del código
            const reAnyRandintAnywhere = new RegExp(
              String.raw`([A-Za-z_]\w*)\s*=\s*(?:` +
              `${prefixPart}` + String.raw`randint\s*\(\s*0\s*,\s*20\s*\)` +
              `)`,
              "g"
            );

            const vars = new Set();
            for (const m of norm.matchAll(reAnyRandintAnywhere)) {
              vars.add(m[1]); // nombre de variable a la izquierda del =
            }

            if (vars.size < 5) {
              return [{
                es: "Debes crear 5 variables distintas usando randint(0, 20).",
                en: "You must create 5 distinct variables using randint(0, 20).",
                pt: "Você deve criar 5 variáveis distintas usando randint(0, 20)."
              }];
            }

            // Nos quedamos exactamente con las 5 primeras encontradas para validar impresiones y suma
            const firstFive = [...vars].slice(0, 5);

            // 3) Cada número debe imprimirse al menos una vez
            const allPrintBodies = [...norm.matchAll(/print\s*\(([\s\S]*?)\)\s*$/gm)].map(m => m[1]);
            if (allPrintBodies.length === 0) {
              return [{ es: "Debes imprimir cada número generado usando print()." }];
            }
            const printedEach = firstFive.every(v =>
              allPrintBodies.some(body => new RegExp(`(?<![A-Za-z0-9_])${v}(?![A-Za-z0-9_])`).test(body))
            );
            if (!printedEach) {
              return [{
                es: "Debes imprimir los cinco números generados (cada variable al menos una vez).",
                en: "You must print all five generated numbers (each variable at least once).",
                pt: "Você deve imprimir os cinco números gerados (cada variável ao menos uma vez)."
              }];
            }

            // 4) total como suma: aceptar + o sum([...])
            const assignTotal = [...norm.matchAll(/^\s*total\s*=\s*(.+)$/gm)];
            if (assignTotal.length === 0) {
              return [{
                es: "Debes crear la variable 'total' con la suma de los cinco números.",
                en: "You must create the 'total' variable with the sum of the five numbers.",
                pt: "Você deve criar a variável 'total' com a soma dos cinco números."
              }];
            }

            const usesValidTotal = (rhs) => {
              // Caso sum([...])
              const listMatch = rhs.match(/\bsum\s*\(\s*\[\s*([^\]]+)\s*\]\s*\)/);
              if (listMatch) {
                const inside = listMatch[1];
                // Deben aparecer las 5 variables en cualquier orden
                return firstFive.every(v => new RegExp(`(?<![A-Za-z0-9_])${v}(?![A-Za-z0-9_])`).test(inside));
              }
              // Caso con '+'
              if (/\+/.test(rhs)) {
                return firstFive.every(v => new RegExp(`(?<![A-Za-z0-9_])${v}(?![A-Za-z0-9_])`).test(rhs));
              }
              return false;
            };

            let totalOK = false;
            for (const m of assignTotal) {
              const rhs = m[1];
              if (usesValidTotal(rhs)) { totalOK = true; break; }
            }
            if (!totalOK) {
              return [{
                es: "La variable 'total' debe ser la suma de las cinco variables (con '+' o con sum([...])).",
                en: "The 'total' variable must be the sum of the five variables (with '+' or sum([...])).",
                pt: "A variável 'total' deve ser a soma das cinco variáveis (com '+' ou sum([...]))."
              }];
            }

            // 5) Print final con frase requerida y total correcto
            if (allPrintBodies.length === 0) {
              return [{ es: "Debes imprimir el resultado final con print()." }];
            }

            const phraseRe = /la\s*suma\s*de\s*los\s*n[uú]meros\s*generados\s*es/i; // tolera 'números'/'numeros'
            const containsTotal = (body) => /\btotal\b/.test(body);

            const usesPlus = (body) => /\+/.test(body);
            const hasStringLiteral = (body) => /["'][\s\S]*?["']/.test(body);
            const hasStrTotal = (body) => /str\s*\(\s*total\s*\)/.test(body);

            const isFStringWithTotal = (body) => /f["']/.test(body) && /\{[^}]*\btotal\b[^}]*\}/.test(body);
            const hasFormat = (body) => /\.format\s*\(/.test(body) && containsTotal(body);
            const hasComma = (body) => /,/.test(body) && containsTotal(body);
            const isDirect = (body) => /^\s*total\s*$/.test(body.trim());

            // Bloquear concatenación texto + total sin str(total)
            const badConcat = allPrintBodies.some(body =>
              usesPlus(body) && hasStringLiteral(body) && containsTotal(body) && !hasStrTotal(body)
            );
            if (badConcat) {
              return [{
                es: "Si concatenás texto con el resultado, usá str(total). Ej.: print(\"La suma de los números generados es: \" + str(total)).",
                en: "If you concatenate text with the result, use str(total). E.g., print(\"The sum of the generated numbers is: \" + str(total)).",
                pt: "Se concatenar texto com o resultado, use str(total). Ex.: print(\"A soma dos números gerados é: \" + str(total))."
              }];
            }

            // Debe existir un print que tenga la frase requerida y muestre total correctamente
            const printedOK = allPrintBodies.some(body =>
              phraseRe.test(body) && (
                isFStringWithTotal(body) || hasFormat(body) || hasComma(body) || isDirect(body) ||
                (usesPlus(body) && hasStrTotal(body))
              )
            );
            if (!printedOK) {
              return [{
                es: "El print final debe incluir la frase “La suma de los números generados es” y mostrar 'total' correctamente (con comas, f-string, .format o + str(total)).",
                en: "The final print must include the phrase “La suma de los números generados es” and show 'total' correctly (commas, f-string, .format, or + str(total)).",
                pt: "O print final deve incluir a frase “La suma de los números generados es” e mostrar 'total' corretamente (vírgulas, f-string, .format ou + str(total))."
              }];
            }

            // Todo OK


            // VALIDACION VIEJA
            // if (!code.includes("import random")) {
            //   return [{
            //     es: "Debe importar el módulo 'random'.",
            //     en: "The 'random' module must be imported.",
            //     pt: "O módulo 'random' deve ser importado."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("num1=random.randint(0,20)")) {
            //   return [{
            //     es: "Debe crearse una variable 'num1' que guarde un número aleatorio entre 0 y 20.",
            //     en: "A variable 'num1' that stores a random number between 0 and 20 must be created.",
            //     pt: "Uma variável 'num1' que armazena um número aleatório entre 0 e 20 deve ser criada."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("num2=random.randint(0,20)")) {
            //   return [{
            //     es: "Debe crearse una variable 'num2' que guarde un número aleatorio entre 0 y 20.",
            //     en: "A variable 'num2' that stores a random number between 0 and 20 must be created.",
            //     pt: "Uma variável 'num2' que armazena um número aleatório entre 0 e 20 deve ser criada."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("num3=random.randint(0,20)")) {
            //   return [{
            //     es: "Debe crearse una variable 'num3' que guarde un número aleatorio entre 0 y 20.",
            //     en: "A variable 'num3' that stores a random number between 0 and 20 must be created.",
            //     pt: "Uma variável 'num3' que armazena um número aleatório entre 0 e 20 deve ser criada."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("num4=random.randint(0,20)")) {
            //   return [{
            //     es: "Debe crearse una variable 'num4' que guarde un número aleatorio entre 0 y 20.",
            //     en: "A variable 'num4' that stores a random number between 0 and 20 must be created.",
            //     pt: "Uma variável 'num4' que armazena um número aleatório entre 0 e 20 deve ser criada."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("num5=random.randint(0,20)")) {
            //   return [{
            //     es: "Debe crearse una variable 'num5' que guarde un número aleatorio entre 0 y 20.",
            //     en: "A variable 'num5' that stores a random number between 0 and 20 must be created.",
            //     pt: "Uma variável 'num5' que armazena um número aleatório entre 0 e 20 deve ser criada."
            //   }]
            // } else if (!code.includes("print(num1)")) {
            //   return [{
            //     es: "Debe imprimir el valor de 'num1'.",
            //     en: "The value of 'num1' must be printed.",
            //     pt: "O valor de 'num1' deve ser impresso."
            //   }]
            // } else if (!code.includes("print(num2)")) {
            //   return [{
            //     es: "Debe imprimir el valor de 'num2'.",
            //     en: "The value of 'num2' must be printed.",
            //     pt: "O valor de 'num2' deve ser impresso."
            //   }]
            // } else if (!code.includes("print(num3)")) {
            //   return [{
            //     es: "Debe imprimir el valor de 'num3'.",
            //     en: "The value of 'num3' must be printed.",
            //     pt: "O valor de 'num3' deve ser impresso."
            //   }]
            // } else if (!code.includes("print(num4)")) {
            //   return [{
            //     es: "Debe imprimir el valor de 'num4'.",
            //     en: "The value of 'num4' must be printed.",
            //     pt: "O valor de 'num4' deve ser impresso."
            //   }]
            // } else if (!code.includes("print(num5)")) {
            //   return [{
            //     es: "Debe imprimir el valor de 'num5'.",
            //     en: "The value of 'num5' must be printed.",
            //     pt: "O valor de 'num5' deve ser impresso."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("total=num1+num2+num3+num4+num5")) {
            //   return [{
            //     es: "Debe crearse una variable 'total' que sume los valores de 'num1', 'num2', 'num3', 'num4' y 'num5'.",
            //     en: "A variable 'total' that adds the values of 'num1', 'num2', 'num3', 'num4', and 'num5' must be created.",
            //     pt: "Uma variável 'total' que soma os valores de 'num1', 'num2', 'num3', 'num4' e 'num5' deve ser criada."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('print("Lasumadelosnúmerosgeneradoses:"+str(total)') && !code.replace(/\s/g, '').trim().includes('print("Thesumofthegeneratednumbersis:"+str(total)')) {
            //   return [{
            //     es: "Debe imprimir un mensaje que contenga 'total' convertida a texto. Recuerda utilizar el metodo str() para convertir a texto.",
            //     en: "A message containing 'total' converted to text must be printed. Remember to use the str() method to convert to text.",
            //     pt: "Uma mensagem contendo 'total' convertida para texto deve ser impressa. Lembre-se de usar o método str() para converter para texto."
            //   }]
            // }

          })
      }
    ]
  },
  {
    "id": "modulo-02",
    "prompt": ``,
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe importar el módulo 'datetime'.",
        "test": (assert) => assert
          .$custom(code => {
            const norm = code.replace(/\r/g, "");

            // Helpers
            const hasVar = (name) => new RegExp(`(?<![A-Za-z0-9_])${name}(?![A-Za-z0-9_])`).test(norm);
            const anyPrintBodies = [...norm.matchAll(/print\s*\(([\s\S]*?)\)\s*$/gm)].map(m => m[1]);
            const printsSomething = (name) =>
              anyPrintBodies.some(b => new RegExp(`(?<![A-Za-z0-9_])${name}(?![A-Za-z0-9_])`).test(b));

            const printedPhrase = (re) => anyPrintBodies.some(b => re.test(b));

            // 1) Import datetime: aceptar "import datetime" o "from datetime import datetime"
            const hasImportDatetime =
              /\bimport\s+datetime\b/.test(norm) || /\bfrom\s+datetime\s+import\s+datetime\b/.test(norm);
            if (!hasImportDatetime) {
              return [{ es: "Debe importar el módulo 'datetime' (por ejemplo, 'import datetime' o 'from datetime import datetime')." }];
            }

            // 2) ahora/now = datetime.datetime.now() o datetime.now()
            const reNowAssign = [
              /^\s*(ahora|now)\s*=\s*datetime\.datetime\.now\s*\(\s*\)\s*$/m,
              /^\s*(ahora|now)\s*=\s*datetime\.now\s*\(\s*\)\s*$/m
            ];
            let nowVar = null;
            if (reNowAssign.some(r => r.test(norm))) {
              const m = norm.match(/^\s*(ahora|now)\s*=/m);
              nowVar = m ? m[1] : "ahora";
            } else {
              return [{ es: "Debe asignar la fecha y hora actual, por ejemplo: ahora = datetime.datetime.now() o ahora = datetime.now()." }];
            }

            // Debe imprimirse 'ahora'
            if (!printsSomething(nowVar)) {
              return [{ es: `Debes imprimir el valor de '${nowVar}'.` }];
            }

            // 3) fecha/date = datetime.datetime(YYYY, M, D) o datetime(YYYY, M, D)
            // Capturamos la llamada y verificamos que sean enteros simples (flexible con espacios)
            const reFechaAssign =
              /^\s*(fecha|date)\s*=\s*(?:datetime\.datetime|datetime)\s*\(\s*([^)]+?)\s*\)\s*$/m;
            const mFecha = norm.match(reFechaAssign);
            let fechaVar = null;
            if (!mFecha) {
              return [{ es: "Debe crear una variable 'fecha' (o 'date') con datetime.datetime(YYYY, M, D) o datetime(YYYY, M, D)." }];
            } else {
              fechaVar = mFecha[1];
              const inside = mFecha[2].split(",").map(s => s.trim());
              const numsOK = inside.length >= 3 && inside.every(x => /^\d+$/.test(x));
              if (!numsOK) {
                return [{ es: "Los valores de datetime(...) deben ser números enteros (por ejemplo, 2000, 5, 15)." }];
              }
            }

            // Debe imprimirse 'fecha'
            if (!printsSomething(fechaVar)) {
              return [{ es: `Debes imprimir el valor de '${fechaVar}'.` }];
            }

            // 4) diferencia/difference = ahora - fecha (aceptamos orden estándar ahora - fecha)
            const reDiffAssign =
              /^\s*(diferencia|difference)\s*=\s*([A-Za-z_]\w*)\s*-\s*([A-Za-z_]\w*)\s*$/m;
            const mDiff = norm.match(reDiffAssign);
            let diffVar = null;
            if (!mDiff) {
              return [{ es: "Debe crear 'diferencia' (o 'difference') como resta entre las fechas, por ejemplo: diferencia = ahora - fecha." }];
            } else {
              diffVar = mDiff[1];
              // (No forzamos el orden, pero sugerimos ahora - fecha en la consigna.)
            }

            // Debe imprimirse 'diferencia'
            if (!printsSomething(diffVar)) {
              return [{ es: `Debes imprimir el valor de '${diffVar}'.` }];
            }

            // 5) diferenciaEnDias/differenceInDays = diferencia.days
            const reDaysAssign =
              /^\s*(diferenciaEnDias|differenceInDays)\s*=\s*([A-Za-z_]\w*)\s*\.\s*days\s*$/m;
            const mDays = norm.match(reDaysAssign);
            let daysVar = null;
            if (!mDays) {
              return [{ es: "Debe crear 'diferenciaEnDias' (o 'differenceInDays') con la propiedad '.days' de la diferencia." }];
            } else {
              daysVar = mDays[1];
            }

            // Debe imprimirse 'diferenciaEnDias'
            if (!printsSomething(daysVar)) {
              return [{ es: `Debes imprimir el valor de '${daysVar}'.` }];
            }

            // 6) anios/years = diferenciaEnDias / 365  (aceptamos / 365, / 365.0 o // 365)
            const reYearsAssign =
              /^\s*(anios|years)\s*=\s*([A-Za-z_]\w*)\s*(?:\/|\/\/)\s*365(?:\.0)?\s*$/m;
            const mYears = norm.match(reYearsAssign);
            let yearsVar = null;
            if (!mYears) {
              return [{ es: "Debe crear 'anios' (o 'years') dividiendo los días por 365 (por ejemplo: anios = diferenciaEnDias / 365)." }];
            } else {
              yearsVar = mYears[1];
            }

            // Debe imprimirse 'anios/years'
            if (!printsSomething(yearsVar)) {
              return [{ es: `Debes imprimir el valor de '${yearsVar}'.` }];
            }

            // 7) Mensaje final: "Tengo ... años" con entero
            // Aceptamos:
            //  - print("Tengo ..." + str(int(anios)))
            //  - print("Tengo ...", int(anios))
            //  - print(f"Tengo {int(anios)} ...")
            //  - print("Tengo {} años".format(int(anios)))
            //
            // La frase debe contener "Tengo ... años" (toleramos espacios/acentos/casing)
            const phraseRe = /tengo[\s\S]*a[nñ]os/i;

            // ¿Algún print contiene la frase "Tengo ... años"?
            const hasPhraseSomewhere = printedPhrase(phraseRe);
            if (!hasPhraseSomewhere) {
              return [{ es: "El mensaje final debe incluir la frase “Tengo … años”." }];
            }

            // Y además debe mostrar un entero de 'anios/years'
            const yearsName = yearsVar;
            const yearsNameRe = new RegExp(`(?<![A-Za-z0-9_])${yearsName}(?![A-Za-z0-9_])`);

            const okFinal = anyPrintBodies.some(body => {
              if (!phraseRe.test(body)) return false;

              const hasIntWrap = new RegExp(`int\\s*\\(\\s*${yearsName}\\s*\\)`).test(body);
              const hasDirectYears = yearsNameRe.test(body);

              // Si no se redondeó con int(), aceptamos otras formas válidas:
              // - f-strings con int()
              const isFString = /f["']/.test(body);
              const fWithYears = isFString && (hasIntWrap || yearsNameRe.test(body));

              // - .format con int()
              const hasFormat = /\.format\s*\(/.test(body) && (hasIntWrap || yearsNameRe.test(body));

              // - con comas: print("Tengo ...", int(anios), "años")
              const hasComma = /,/.test(body) && (hasIntWrap || yearsNameRe.test(body));

              // - concatenación + str(int(anios))
              const usesPlus = /\+/.test(body);
              const hasStringLiteral = /["'][\s\S]*?["']/.test(body);
              const hasStrInt = new RegExp(`str\\s*\\(\\s*int\\s*\\(\\s*${yearsName}\\s*\\)\\s*\\)`).test(body);

              // Bloquear concatenación texto + years sin str(...)
              const badConcat =
                usesPlus && hasStringLiteral && yearsNameRe.test(body) && !/str\s*\(/.test(body);

              if (badConcat) return false;

              // Reglas de aprobación:
              // a) si hay int(anios), aprobar en cualquier estilo
              if (hasIntWrap) return true;

              // b) si no hay int(), pero igual aparece years → permitir solo si usó coma o .format o f-string (texto seguro)
              if (fWithYears || hasFormat || hasComma) return true;

              // c) concatenación explícita: debe ser con str(int(...))
              if (usesPlus && hasStrInt) return true;

              return false;
            });

            if (!okFinal) {
              return [{
                es: "El mensaje final debe decir “Tengo … años” y mostrar un entero (usa int(anios)). Acepta comas, f-strings, .format o + str(int(anios))."
              }];
            }

            // Si llega acá, aprobó




            // VALIDACION VIEJA
            // if (!code.includes("import datetime")) {
            //   return [{
            //     es: "Debe importar el módulo 'datetime'.",
            //     en: "The 'datetime' module must be imported.",
            //     pt: "O módulo 'datetime' deve ser importado."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("ahora=") && !code.replace(/\s/g, '').trim().includes("now=")) {
            //   return [{
            //     es: "Debe crearse una variable 'ahora' que guarde la fecha actual.",
            //     en: "A variable 'now' that stores the current date must be created.",
            //     pt: "Uma variável 'agora' que armazena a data atual deve ser criada."
            //   }]

            // } else if (!code.replace(/\s/g, '').trim().includes("ahora=datetime.datetime.now()") && !code.replace(/\s/g, '').trim().includes("now=datetime.datetime.now()")) {
            //   return [{
            //     es: "La variable 'ahora' debe guardar la fecha actual.",
            //     en: "The 'now' variable must store the current date.",
            //     pt: "A variável 'agora' deve armazenar a data atual."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("ahora=datetime.datetime.now()print(ahora)") && !code.replace(/\s/g, '').trim().includes("now=datetime.datetime.now()print(now)")) {
            //   return [{
            //     es: "Debes imprimir el valor de la variable 'ahora'.",
            //     en: "The value of the 'now' variable must be printed.",
            //     pt: "O valor da variável 'agora' deve ser impresso."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("fecha=") && !code.replace(/\s/g, '').trim().includes("date=")) {
            //   return [{
            //     es: "Debe crearse una variable 'fecha' que guarde la fecha de tu cumpleaños.",
            //     en: "A variable 'date' that stores your birthday date must be created.",
            //     pt: "Uma variável 'data' que armazena a data de seu aniversário deve ser criada."
            //   }]
            // }
            // else if (code.replace(/\s/g, '').trim().includes("fecha=datetime.datetime(") || code.replace(/\s/g, '').trim().includes("date=datetime.datetime(")) {
            //   // Expresión regular para capturar el contenido dentro de datetime.datetime(...)
            //   const match = code.match(/datetime\.datetime\((.*?)\)/);

            //   if (match) {
            //     const contenido = match[1]; // Obtener el contenido dentro de los paréntesis
            //     // Verificar si todos los valores separados por comas son números
            //     const numerosValidos = contenido.split(",").every(part => {
            //       const valor = part.trim(); // Quitar espacios
            //       return /^\d+$/.test(valor) && !/^0\d+/.test(valor); // Es un número y no empieza con 0
            //     });
            //     // console.log(numerosValidos);

            //     if (numerosValidos) {
            //       // console.log("El contenido contiene solo números.");
            //     } else {
            //       return [{
            //         es: "Los valores dentro de la función datetime.datetime() deben ser números enteros y no deben empezar con 0.",
            //         en: "The values inside the datetime.datetime() function must be integers and must not start with 0.",
            //         pt: "Os valores dentro da função datetime.datetime() devem ser inteiros e não devem começar com 0."
            //       }]
            //     }
            //   }
            // }
            // if (!code.replace(/\s/g, '').trim().includes("print(fecha)") && !code.replace(/\s/g, '').trim().includes("print(date)")) {
            //   return [{
            //     es: "Debes imprimir el valor de 'fecha'.",
            //     en: "The value of 'date' must be printed.",
            //     pt: "O valor da variável 'data' deve ser impresso."
            //   }]
            // }
            // else if (!code.replace(/\s/g, '').trim().includes("diferencia=ahora-fecha") && !code.replace(/\s/g, '').trim().includes("difference=now-date")) {
            //   return [{
            //     es: "Debe crearse una variable 'diferencia' que guarde la resta de las fechas.",
            //     en: "A variable 'difference' that stores the subtraction of the dates must be created.",
            //     pt: "Uma variável 'diferença' que armazena a subtração das datas deve ser criada."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("diferencia=ahora-fechaprint(diferencia)") && !code.replace(/\s/g, '').trim().includes("difference=now-dateprint(difference)")) {
            //   return [{
            //     es: "Debes imprimir el valor de 'diferencia'.",
            //     en: "The value of 'difference' must be printed.",
            //     pt: "O valor da variável 'diferença' deve ser impresso."
            //   }]
            // }
            // else if (!code.replace(/\s/g, '').trim().includes("diferenciaEnDias=diferencia.days") && !code.replace(/\s/g, '').trim().includes("differenceInDays=difference.days")) {
            //   return [{
            //     es: "Debe crearse una variable 'diferenciaEnDias' que guarde solo los días de la diferencia.",
            //     en: "A variable 'differenceInDays' that stores only the days of the difference must be created.",
            //     pt: "Uma variável 'differenceInDays' que armazena apenas os dias da diferença deve ser criada."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("diferenciaEnDias=diferencia.daysprint(diferenciaEnDias)") && !code.replace(/\s/g, '').trim().includes("differenceInDays=difference.daysprint(differenceInDays)")) {
            //   return [{
            //     es: "Debes imprimir el valor de 'diferenciaEnDias'.",
            //     en: "The value of 'differenceInDays' must be printed.",
            //     pt: "O valor da variável 'differenceInDays' deve ser impresso."
            //   }]
            // }
            // else if (!code.replace(/\s/g, '').trim().includes("anios=diferenciaEnDias/365") && !code.replace(/\s/g, '').trim().includes("years=differenceInDays/365")) {
            //   return [{
            //     es: "Debe crearse una variable 'anios' que divida 'diferenciaEnDias' por 365.",
            //     en: "A variable 'years' that divides 'differenceInDays' by 365 must be created.",
            //     pt: "Uma variável 'anos' que divide 'differenceInDays' por 365 deve ser criada."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("anios=diferenciaEnDias/365print(anios)") && !code.replace(/\s/g, '').trim().includes("years=differenceInDays/365print(years)")) {
            //   return [{
            //     es: "Debes imprimir el valor de 'anios'.",
            //     en: "The value of 'years' must be printed.",
            //     pt: "O valor da variável 'anos' deve ser impresso."
            //   }]
            // }
            // else if (!code.replace(/\s/g, '').trim().includes('print("Tengo"+str(int(anios))+"años")') && !code.replace(/\s/g, '').trim().includes("print('Tengo'+str(int(anios))+'años')") && !code.replace(/\s/g, '').trim().includes('print("Iam"+str(int(years))+"years")') && !code.replace(/\s/g, '').trim().includes("print('Iam'+str(int(years))+'years')")) {
            //   return [{
            //     es: "Debe imprimir un mensaje que contenga 'anios' convertida a texto. Recuerda utilizar el metodo int() para quitar los decimales.",
            //     en: "A message containing 'years' converted to text must be printed. Remember to use the int() method to remove the decimals.",
            //     pt: "Uma mensagem contendo 'anos' convertida para texto deve ser impressa. Lembre-se de usar o método int() para remover as casas decimais."
            //   }]
            // }
          })
      }
    ]
  },
  {
    "id": "funciones-01",
    "prompt": "Realiza las tareas según la Actividad 01.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe definir una función llamada 'calcular_densidad' que reciba dos argumentos: 'masa' y 'volumen'.",
        "test": (assert) => assert
          .$custom(code => {
            const norm = code.replace(/\r/g, "");

            // === Helpers ===
            const printBodies = [...norm.matchAll(/print\s*\(([\s\S]*?)\)\s*$/gm)].map(m => m[1]);
            const hasPrintVar = (name) =>
              printBodies.some(body =>
                new RegExp(`(?<![A-Za-z0-9_])${name}(?![A-Za-z0-9_])`).test(body)
              );

            // === 1) Definición de la función ===
            const hasFuncES = /def\s+calcular_densidad\s*\(\s*masa\s*,\s*volumen\s*\)\s*:/m.test(norm);
            const hasFuncEN = /def\s+calculate_density\s*\(\s*mass\s*,\s*volume\s*\)\s*:/m.test(norm);

            if (!hasFuncES && !hasFuncEN) {
              return [{
                es: "Debes definir una función llamada 'calcular_densidad' que reciba 'masa' y 'volumen'.",
                en: "You must define a function called 'calculate_density' that receives 'mass' and 'volume'.",
                pt: "Você deve definir uma função chamada 'calcular_densidade' que receba 'massa' e 'volume'."
              }];
            }

            // Debe retornar masa/volumen o mass/volume
            const returnsES = /def\s+calcular_densidad\s*\(\s*masa\s*,\s*volumen\s*\)\s*:[\s\S]*?return\s+masa\s*\/\s*volumen/m.test(norm);
            const returnsEN = /def\s+calculate_density\s*\(\s*mass\s*,\s*volume\s*\)\s*:[\s\S]*?return\s+mass\s*\/\s*volume/m.test(norm);

            if (hasFuncES && !returnsES) {
              return [{
                es: "La función 'calcular_densidad' debe retornar 'masa / volumen'.",
                en: "The 'calcular_densidad' function must return 'masa / volumen'.",
                pt: "A função 'calcular_densidade' deve retornar 'massa / volume'."
              }];
            } else if (hasFuncEN && !returnsEN) {
              return [{
                es: "La función 'calculate_density' debe retornar 'mass / volume'.",
                en: "The 'calculate_density' function must return 'mass / volume'.",
                pt: "A função 'calculate_density' deve retornar 'mass / volume'."
              }];
            }

            const usingES = hasFuncES;

            // === 2) Calcular densidad1 ===
            const callD1ES = /densidad1\s*=\s*calcular_densidad\s*\(\s*10\s*,\s*2\s*\)/;
            const callD1EN = /density1\s*=\s*calculate_density\s*\(\s*10\s*,\s*2\s*\)/;
            if (!callD1ES.test(norm) && !callD1EN.test(norm)) {
              return [{
                es: "Debe calcular y guardar en 'densidad1' (o 'density1') la densidad de masa 10 y volumen 2.",
                en: "You must compute and store in 'density1' (or 'densidad1') the density of mass 10 and volume 2.",
                pt: "Você deve calcular e armazenar em 'densidade1' (ou 'density1') a densidade com massa 10 e volume 2."
              }];
            }

            const d1Name = usingES ? "densidad1" : "density1";
            if (!hasPrintVar(d1Name)) {
              return [{
                es: `Luego de calcular '${d1Name}', debes mostrar su valor por consola con print().`,
                en: `After computing '${d1Name}', you must display its value in the console with print().`,
                pt: `Depois de calcular '${d1Name}', você deve exibir seu valor no console com print().`
              }];
            }

            // === 3) Calcular densidad2 ===
            const callD2ES = /densidad2\s*=\s*calcular_densidad\s*\(\s*270\s*,\s*33\s*\)/;
            const callD2EN = /density2\s*=\s*calculate_density\s*\(\s*270\s*,\s*33\s*\)/;
            if (!callD2ES.test(norm) && !callD2EN.test(norm)) {
              return [{
                es: "Debe calcular y guardar en 'densidad2' (o 'density2') la densidad de masa 270 y volumen 33.",
                en: "You must compute and store in 'density2' the density of mass 270 and volume 33.",
                pt: "Você deve calcular e armazenar em 'densidade2' a densidade com massa 270 e volume 33."
              }];
            }

            const d2Name = usingES ? "densidad2" : "density2";
            if (!hasPrintVar(d2Name)) {
              return [{
                es: `Luego de calcular '${d2Name}', debes mostrar su valor por consola con print().`,
                en: `After computing '${d2Name}', you must display its value in the console with print().`,
                pt: `Depois de calcular '${d2Name}', você deve exibir seu valor no console com print().`
              }];
            }

            // === 4) Suma de densidades y mensaje final ===
            const phraseEs = /la\s*densidad\s*total\s*es/i;
            const phraseEn = /the\s*total\s*density\s*is/i;

            const sumVarName = usingES ? "densidad" : "density";
            const d1Re = new RegExp(`(?<![A-Za-z0-9_])${d1Name}(?![A-Za-z0-9_])`);
            const d2Re = new RegExp(`(?<![A-Za-z0-9_])${d2Name}(?![A-Za-z0-9_])`);

            // Puede existir una variable total = densidad1 + densidad2
            const totalAssign = [...norm.matchAll(/^\s*([A-Za-z_]\w*)\s*=\s*(.+)$/gm)];
            let totalVar = null;
            for (const m of totalAssign) {
              const lhs = m[1];
              const rhs = m[2];
              if (/\+/.test(rhs) && d1Re.test(rhs) && d2Re.test(rhs)) {
                totalVar = lhs; // e.g., 'total' o algo similar
                break;
              }
            }

            // Chequeos para prints
            const usesPlus = (body) => /\+/.test(body);
            const hasStringLiteral = (body) => /["'][\s\S]*?["']/.test(body);
            const hasStrCall = (body) => /str\s*\(/.test(body);
            const containsTotalVar = (body) =>
              totalVar && new RegExp(`(?<![A-Za-z0-9_])${totalVar}(?![A-Za-z0-9_])`).test(body);
            const containsBothDensities = (body) => d1Re.test(body) && d2Re.test(body);

            const isFString = (body) => /f["']/.test(body);
            const hasFormat = (body) => /\.format\s*\(/.test(body);
            const hasComma = (body) => /,/.test(body);

            // Detectar MAL: "texto" + densidad1/densidad2/total sin str()
            const badConcat = printBodies.some(body => {
              if (!usesPlus(body) || !hasStringLiteral(body)) return false;
              const hasNumericPieces = containsTotalVar(body) || containsBothDensities(body);
              if (!hasNumericPieces) return false;
              // Si concatena texto + algo numérico y no veo 'str(', lo considero incorrecto
              return !hasStrCall(body);
            });
            if (badConcat) {
              return [{
                es: "Si concatenás texto con un número (densidades o total), debés usar str(...). Ej.: str(densidad1 + densidad2) o str(total).",
                en: "If you concatenate text with a number (densities or total), you must use str(...). e.g., str(density1 + density2) or str(total).",
                pt: "Se concatenar texto com um número (densidades ou total), deve usar str(...). Ex.: str(densidade1 + densidade2) ou str(total)."
              }];
            }

            // Buscar un print final que:
            //  - contenga la frase (ES o EN)
            //  - muestre la suma de densidad1+densidad2 (ya sea a través de 'total' o directamente)
            const finalOK = printBodies.some(body => {
              const hasPhrase = phraseEs.test(body) || phraseEn.test(body);
              if (!hasPhrase) return false;

              const showsTotal =
                (totalVar && containsTotalVar(body)) ||
                containsBothDensities(body); // densidad1 y densidad2 presentes

              if (!showsTotal) return false;

              // Aceptamos:
              // - f-string con densidades o total
              // - .format(...)
              // - print("...", total) con coma
              // - print("...", str(...)) con +
              const okF = isFString(body) && (containsTotalVar(body) || containsBothDensities(body));
              const okFormat = hasFormat(body);
              const okComma = hasComma(body) && (containsTotalVar(body) || containsBothDensities(body));
              const okPlusStr = usesPlus(body) && hasStrCall(body); // ya filtramos badConcat arriba

              return okF || okFormat || okComma || okPlusStr;
            });

            if (!finalOK) {
              return [{
                es: 'Debes sumar ambas densidades y mostrarlas con el texto "La densidad total es: ..." (o "The total density is: ..."), asegurando convertir el resultado a texto.',
                en: 'You must add both densities and display them with the text "The total density is: ...", ensuring the result is converted to text.',
                pt: 'Você deve somar ambas as densidades e exibi-las com o texto "A densidade total é: ...", convertendo o resultado para texto.'
              }];
            }

            // Si llegó hasta acá, está todo bien 🎉






            // VALIDACION VIEJA
            // if (!code.replace(/\s/g, '').trim().includes("defcalcular_densidad(masa,volumen):") && !code.replace(/\s/g, '').trim().includes("defcalculate_density(mass,volume):")) {
            //   return [{
            //     es: "Debes definir una función llamada 'calcular_densidad' que reciba dos argumentos: 'masa' y 'volumen'.",
            //     en: "You must define a function called 'calculate_density' that receives two arguments: 'mass' and 'volume'.",
            //     pt: "Você deve definir uma função chamada 'calcular_densidade' que receba dois argumentos: 'massa' e 'volume'."

            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("defcalcular_densidad(masa,volumen):returnmasa/volumen") && !code.replace(/\s/g, '').trim().includes("defcalculate_density(mass,volume):returnmass/volume")) {
            //   return [{
            //     es: "La función 'calcular_densidad' debe retornar la división de 'masa' entre 'volumen'.",
            //     en: "The 'calculate_density' function must return the division of 'mass' by 'volume'.",
            //     pt: "A função 'calcular_densidade' deve retornar a divisão de 'massa' por 'volume'."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("densidad1=calcular_densidad(10,2)") && !code.replace(/\s/g, '').trim().includes("density1=calculate_density(10,2)")) {
            //   return [{
            //     es: "Debe calcular y guardar en 'densidad1' la densidad de un objeto de masa 10 kg y volumen 2 m³.",
            //     en: "It must calculate and store in 'density1' the density of an object with mass 10 kg and volume 2 m³.",
            //     pt: "Deve calcular e armazenar em 'densidade1' a densidade de um objeto com massa de 10 kg e volume de 2 m³."
            //   }]
            // } else if (!code.includes("print(densidad1)") && !code.includes("print(density1)")) {
            //   return [{
            //     es: "Luego de calcular y guardar el resultado en la variable 'densidad1', debes mostrar su valor por consola.",
            //     en: "After calculating and storing the result in the 'density1' variable, you must display its value in the console.",
            //     pt: "Após calcular e armazenar o resultado na variável 'densidade1', você deve exibir seu valor no console."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("densidad2=calcular_densidad(270,33)") && !code.replace(/\s/g, '').trim().includes("density2=calculate_density(270,33)")) {
            //   return [{
            //     es: "Debe calcular y guardar en 'densidad2' la densidad de un objeto de masa 270 kg y volumen 33 m³.",
            //     en: "It must calculate and store in 'density2' the density of an object with mass 270 kg and volume 33 m³.",
            //     pt: "Deve calcular e armazenar em 'densidade2' a densidade de um objeto com massa de 270 kg e volume de 33 m³."
            //   }]
            // } else if (!code.includes("print(densidad2)") && !code.includes("print(density2)")) {
            //   return [{
            //     es: "Luego de calcular y guardar el resultado en la variable 'densidad2', debes mostrar su valor por consola.",
            //     en: "After calculating and storing the result in the 'density2' variable, you must display its value in the console.",
            //     pt: "Após calcular e armazenar o resultado na variável 'densidade2', você deve exibir seu valor no console."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("print('Ladensidadtotales:'+str(densidad1+densidad2)") && !code.replace(/\s/g, '').trim().includes('print("Ladensidadtotales:"+str(densidad1+densidad2)') && !code.replace(/\s/g, '').trim().includes("print('Thetotaldensityis:'+str(density1+density2)") && !code.replace(/\s/g, '').trim().includes('print("Thetotaldensityis:"+str(density1+density2)')) {
            //   return [{
            //     es: 'Debes sumar ambas densidades y mostrarlas con el texto "La densidad total es: _____ ".',
            //     en: 'You must add both densities and display them with the text "The total density is: _____ ".',
            //     pt: 'Você deve adicionar ambas as densidades e exibi-las com o texto "A densidade total é: _____ ".'
            //   }]
            // }
          })

      }

    ]
  },
  {
    "id": "funciones-02",
    "prompt": "Realiza las tareas según la Actividad 02.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe importar el módulo 'random'.",
        test: (assert) => assert.$custom((code) => {
          const errors = [];
          const norm = code.replace(/\r/g, "");
          const codeNoSpaces = norm.replace(/\s/g, "").trim();

          // === 1) Validar import random (flexible) ===
          const hasImportRandom =
            /\bimport\s+random\b/.test(norm) ||
            /\bimport\s+random\s+as\s+[A-Za-z_]\w*/.test(norm) ||
            /\bfrom\s+random\s+import\s+(?:\*|randint)\b/.test(norm);

          if (!hasImportRandom) {
            errors.push({
              es: "Debe importar el módulo 'random'.",
              en: "The 'random' module must be imported.",
              pt: "O módulo 'random' deve ser importado."
            });
          }

          // === 2) Validar variable puntos_vida_dragon numérica ===
          if (
            !codeNoSpaces.includes("puntos_vida_dragon=") &&
            !codeNoSpaces.includes("dragon_life_points=")
          ) {
            errors.push({
              es: "Debe crear una variable 'puntos_vida_dragon' con un valor inicial.",
              en: "A 'dragon_life_points' variable with an initial value must be created.",
              pt: "Uma variável 'pontos_vida_dragon' com um valor inicial deve ser criada."
            });
          } else {
            const match1 = norm.match(/puntos_vida_dragon\s*=\s*(.+)/);
            const match2 = norm.match(/dragon_life_points\s*=\s*(.+)/);

            const valorAsignado = match1?.[1]?.trim();
            const valorAsignado2 = match2?.[1]?.trim();
            const valor = valorAsignado ?? valorAsignado2;

            if (valor) {
              // cortar comentarios si hubiera
              const sinComentario = valor.split("#")[0].trim();
              if (!/^\d+$/.test(sinComentario)) {
                errors.push({
                  es: `El valor de 'puntos_vida_dragon' no es un número. Está definido como: ${sinComentario}`,
                  en: `The value of 'dragon_life_points' is not a number. It is defined as: ${sinComentario}`,
                  pt: `O valor de 'pontos_vida_dragon' não é um número. Está definido como: ${sinComentario}`
                });
              }
            }
          }

          // === 3) Validar función tirarDado / rollDice ===
          if (
            !codeNoSpaces.includes("deftirarDado(lados):") &&
            !codeNoSpaces.includes("defrollDice(sides):")
          ) {
            errors.push({
              es: "Debe definir una función 'tirarDado' que reciba un argumento para la cantidad de lados.",
              en: "A 'rollDice' function that receives an argument for the number of sides must be defined.",
              pt: "Uma função 'tirarDado' que receba um argumento para o número de lados deve ser definida."
            });
          } else {
            // Aceptar: random.randint, rd.randint o randint directo
            if (
              !codeNoSpaces.includes("returnrandom.randint(1,lados)") &&
              !codeNoSpaces.includes("returnrandom.randint(1,sides)") &&
              !codeNoSpaces.includes("returnrd.randint(1,lados)") &&
              !codeNoSpaces.includes("returnrd.randint(1,sides)") &&
              !codeNoSpaces.includes("returnrandint(1,lados)") &&
              !codeNoSpaces.includes("returnrandint(1,sides)")
            ) {
              errors.push({
                es: "La función 'tirarDado' debe retornar un número aleatorio entre 1 y la cantidad de lados.",
                en: "The 'rollDice' function must return a random number between 1 and the number of sides.",
                pt: "A função 'tirarDado' deve retornar um número aleatório entre 1 e o número de lados."
              });
            }
          }

          // === 4) Validar función atacarDragon / attackDragon ===
          if (
            !codeNoSpaces.includes("defatacarDragon():") &&
            !codeNoSpaces.includes("defattackDragon():")
          ) {
            errors.push({
              es: "Debe definir una función 'atacarDragon' que retorne la suma de 'tirarDado(20)' y 'tirarDado(4)'.",
              en: "An 'attackDragon' function that returns the sum of 'rollDice(20)' and 'rollDice(4)' must be defined.",
              pt: "Uma função 'atacarDragon' que retorne a soma de 'tirarDado(20)' e 'tirarDado(4)' deve ser definida."
            });
          } else {
            if (
              !codeNoSpaces.includes("ataque=") &&
              !codeNoSpaces.includes("attack=")
            ) {
              errors.push({
                es: "Debes crear una variable 'ataque' que guarde el resultado de la suma de 'tirarDado(20)' y 'tirarDado(4)'.",
                en: "You must create an 'attack' variable that stores the result of the sum of 'rollDice(20)' and 'rollDice(4)'.",
                pt: "Você deve criar uma variável 'ataque' que armazene o resultado da soma de 'tirarDado(20)' e 'tirarDado(4)'."
              });
            } else if (
              !(
                codeNoSpaces.includes("ataque=tirarDado(20)+tirarDado(4)") ||
                codeNoSpaces.includes("ataque=tirarDado(4)+tirarDado(20)") ||
                codeNoSpaces.includes("attack=rollDice(20)+rollDice(4)") ||
                codeNoSpaces.includes("attack=rollDice(4)+rollDice(20)")
              )
            ) {
              errors.push({
                es: "La variable 'ataque' debe guardar la suma de 'tirarDado(20)' y 'tirarDado(4)'.",
                en: "The 'attack' variable must store the sum of 'rollDice(20)' and 'rollDice(4)'.",
                pt: "A variável 'ataque' deve armazenar a soma de 'tirarDado(20)' e 'tirarDado(4)'."
              });
            }
          }

          // === 5) Validar actualización de puntos de vida ===
          if (
            !(
              codeNoSpaces.includes("puntos_vida_dragon-=atacarDragon()") ||
              codeNoSpaces.includes("puntos_vida_dragon=puntos_vida_dragon-atacarDragon()") ||
              codeNoSpaces.includes("dragon_life_points-=attackDragon()") ||
              codeNoSpaces.includes("dragon_life_points=dragon_life_points-attackDragon()") ||
              codeNoSpaces.includes("dragon_life_points-=attack()") ||
              codeNoSpaces.includes("dragon_life_points=dragon_life_points-attack()")
            )
          ) {
            errors.push({
              es: "Debe actualizar los puntos de vida del dragón restando el resultado de 'atacarDragon()'.",
              en: "You must update the dragon's life points by subtracting the result of 'attackDragon()'.",
              pt: "Você deve atualizar os pontos de vida do dragão subtraindo o resultado de 'atacarDragon()'."
            });
          }

          // === 6) Validar print final de puntos de vida ===
          if (
            !(
              codeNoSpaces.includes("print('Lospuntosdevidadeldragónson:'+str(puntos_vida_dragon))") ||
              codeNoSpaces.includes('print("Lospuntosdevidadeldragónson:"+str(puntos_vida_dragon))') ||
              codeNoSpaces.includes("print('Thedragon'slifepointsare:'+str(dragon_life_points))") ||
              codeNoSpaces.includes('print("Thedragon\'slifepointsare:"+str(dragon_life_points))')
            )
          ) {
            errors.push({
              es: 'Debes mostrar utilizando un print() los puntos de vida del dragón con el texto "Los puntos de vida del dragón son: ".',
              en: 'You must display the dragon\'s life points using a print() with the text "The dragon\'s life points are: ".',
              pt: 'Você deve exibir os pontos de vida do dragão usando um print() com o texto "Os pontos de vida do dragão são: ".'
            });
          }

          if (errors.length > 0) {
            return errors;
          }
          return [];
        }),
      }

    ]
  },
  {
    "id": "condicionales-01",
    "prompt": "Realiza las tareas según la Actividad 01 - Conducir.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe crear una variable llamada 'edad' que almacene la edad ingresada por el usuario.",
        "test": (assert) => assert
          .$custom(code => {
            const norm = code.replace(/\r/g, "");

            // === 1) Variable edad/age con int(input(...)) ===
            const hasEdadInt = /edad\s*=\s*int\s*\(\s*input\s*\(/.test(norm);
            const hasAgeInt = /age\s*=\s*int\s*\(\s*input\s*\(/.test(norm);

            if (!hasEdadInt && !hasAgeInt) {
              return [{
                es: "Debes crear la variable 'edad' (o 'age') usando int(input(...)) para almacenar la edad ingresada por el usuario.",
                en: "You must create the 'edad' (or 'age') variable using int(input(...)) to store the user's age.",
                pt: "Você deve criar a variável 'edad' (ou 'age') usando int(input(...)) para armazenar a idade do usuário."
              }];
            }

            // Extraer la primera llamada a input(...) y analizar el texto de la pregunta
            const inputMatch = code.match(/input\(["'](.*?)["']\)/);
            if (!inputMatch) {
              return [{
                es: "Debes usar input() para pedir la edad al usuario.",
                en: "You must use input() to ask the user for their age.",
                pt: "Você deve usar input() para pedir a idade do usuário."
              }];
            }

            const pregunta = inputMatch[1]; // texto entre comillas
            if (!pregunta || pregunta.trim().length === 0) {
              return [{
                es: "La pregunta del input no puede estar vacía. Debes pedir la edad del usuario.",
                en: "The input question cannot be empty. You must ask for the user's age.",
                pt: "A pergunta do input não pode estar vazia. Você deve pedir a idade do usuário."
              }];
            }

            // Validar que mencione edad/años o age/old, respetando idioma según variable usada
            if (hasEdadInt) {
              const contieneEdadOAnios = /edad|años/i.test(pregunta);
              if (!contieneEdadOAnios) {
                return [{
                  es: `La pregunta del input "${pregunta}" no es válida porque no menciona "edad" o "años".`,
                  en: `The input question "${pregunta}" is not valid because it does not mention "edad" or "años".`,
                  pt: `A pergunta do input "${pregunta}" não é válida porque não menciona "edad" ou "años".`
                }];
              }
            } else if (hasAgeInt) {
              const contieneAgeOld = /age|old/i.test(pregunta);
              if (!contieneAgeOld) {
                return [{
                  es: `La pregunta del input "${pregunta}" no es válida porque no menciona "age" o "old".`,
                  en: `The input question "${pregunta}" is not valid because it does not mention "age" or "old".`,
                  pt: `A pergunta do input "${pregunta}" não é válida porque não menciona "age" ou "old".`
                }];
              }
            }

            // === 2) Estructura condicional if edad >= 16 (o age >= 16) ===
            const hasIfEdad16 = /if\s*edad\s*>=\s*16\s*:/.test(norm);
            const hasIfAge16 = /if\s*age\s*>=\s*16\s*:/.test(norm);

            if (!hasIfEdad16 && !hasIfAge16) {
              return [{
                es: "Debe incluir una estructura condicional para verificar si el usuario tiene 16 años o más (if edad >= 16:).",
                en: "You must include a conditional structure to check if the user is 16 or older (if age >= 16:).",
                pt: "Deve incluir uma estrutura condicional para verificar se o usuário tem 16 anos ou mais (if idade >= 16:)."
              }];
            }

            // === 3) else presente ===
            if (!/\belse\s*:/.test(norm)) {
              return [{
                es: "Debes incluir un 'else:' para el caso en que la edad sea menor a 16.",
                en: "You must include an 'else:' for the case when the age is less than 16.",
                pt: "Você deve incluir um 'else:' para o caso em que a idade seja menor que 16."
              }];
            }

            // === 4) Mensaje si puede conducir ===
            // Aceptamos solo texto exacto de consigna (ES o EN):
            // "Tienes permitido conducir" o "You are allowed to drive"
            const hasPrintPermitES = /print\s*\(\s*["']Tienes permitido conducir["']\s*\)/.test(norm);
            const hasPrintPermitEN = /print\s*\(\s*["']You are allowed to drive["']\s*\)/.test(norm);

            if (!hasPrintPermitES && !hasPrintPermitEN) {
              return [{
                es: "Debe mostrar el mensaje 'Tienes permitido conducir' si el usuario tiene 16 años o más.",
                en: "You must display the message 'You are allowed to drive' if the user is 16 or older.",
                pt: "Deve exibir a mensagem 'Você tem permissão para dirigir' se o usuário tiver 16 anos ou mais."
              }];
            }

            // === 5) Mensaje si NO puede conducir ===
            const hasPrintNoPermitES = /print\s*\(\s*["']No tienes permitido conducir["']\s*\)/.test(norm);
            const hasPrintNoPermitEN = /print\s*\(\s*["']You are not allowed to drive["']\s*\)/.test(norm);

            if (!hasPrintNoPermitES && !hasPrintNoPermitEN) {
              return [{
                es: "Debe mostrar el mensaje 'No tienes permitido conducir' si el usuario tiene menos de 16 años.",
                en: "You must display the message 'You are not allowed to drive' if the user is under 16.",
                pt: "Deve exibir a mensagem 'Você não tem permissão para dirigir' se o usuário tiver menos de 16 anos."
              }];
            }

            // Si todo está OK, no devolvemos errores
            return [];





            // VALIDACION VIEJA
            // if (!code.replace(/\s/g, '').trim().includes("edad=") && !code.replace(/\s/g, '').trim().includes("age=")) {
            //   return [{
            //     es: "Debes crear la variable 'edad' que almacene la edad ingresada por el usuario.",
            //     en: "It must create the 'edad' variable to store the user's entered age.",
            //     pt: "Deve criar a variável 'edad' para armazenar a idade inserida pelo usuário."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("edad=int(input(") && !code.replace(/\s/g, '').trim().includes("age=int(input(")) {
            //   return [{
            //     es: "La edad ingresada por el usuario debe estar en formato de número entero.",
            //     en: "The age entered by the user must be in integer number format.",
            //     pt: "A idade inserida pelo usuário deve estar no formato de número inteiro."
            //   }]
            // } else if (code.replace(/\s/g, '').trim().includes("edad=int(input(")) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   // console.log(lineasInput);

            //   if (lineasInput) {
            //     const pregunta = lineasInput[0].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la pregunta
            //     if (pregunta) {
            //       // Validar si contiene "edad" o "años"
            //       const contieneEdadOAnios = /edad|años/i.test(pregunta);
            //       if (contieneEdadOAnios) {
            //         // console.log(`La pregunta "${pregunta}" es válida porque menciona "edad" o "años".`);
            //       } else {
            //         return [{
            //           es: `La pregunta del input "${pregunta}" no es válida porque no menciona "edad" o "años".`,
            //           en: `The input question "${pregunta}" is not valid because it does not mention "edad" or "años".`,
            //           pt: `A pergunta do input "${pregunta}" não é válida porque não menciona "edad" ou "años".`

            //           // console.log(`La pregunta "${pregunta}" no es válida porque no menciona "edad" ni "años".`);
            //         }]
            //       }
            //     }
            //   }
            // }
            // if (code.replace(/\s/g, '').trim().includes("age=int(input(")) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   // console.log(lineasInput);

            //   if (lineasInput) {
            //     const pregunta = lineasInput[0].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la pregunta
            //     if (pregunta.length < 1) {
            //       return [{
            //         es: "La pregunta del input no puede estar vacía.",
            //         en: "The input question cannot be empty.",
            //         pt: "A pergunta do input não pode estar vazia."
            //       }]
            //     }
            //     if (pregunta) {
            //       // Validar si contiene "edad" o "años"
            //       const contieneEdadOAnios = /age|old/i.test(pregunta);
            //       if (contieneEdadOAnios) {
            //         // console.log(`La pregunta "${pregunta}" es válida porque menciona "edad" o "años".`);
            //       } else {
            //         return [{
            //           es: `La pregunta del input "${pregunta}" no es válida porque no menciona "edad" o "años".`,
            //           en: `The input question "${pregunta}" is not valid because it does not mention "age" or "old".`,
            //           pt: `A pergunta do input "${pregunta}" não é válida porque não menciona "edad" ou "años".`

            //           // console.log(`La pregunta "${pregunta}" no es válida porque no menciona "edad" ni "años".`);
            //         }]
            //       }
            //     }
            //   }
            // }
            // if (!code.replace(/\s/g, '').trim().includes("ifedad>=16:") && !code.replace(/\s/g, '').trim().includes("ifage>=16:")) {
            //   return [{
            //     es: "Debe incluir una estructura condicional para verificar si el usuario tiene 16 años o más.",
            //     en: "It must include a conditional structure to check if the user is 16 years old or older.",
            //     pt: "Deve incluir uma estrutura condicional para verificar se o usuário tem 16 anos ou mais."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('print("Tienespermitidoconducir")') && !code.replace(/\s/g, '').trim().includes("print('Tienespermitidoconducir')") && !code.replace(/\s/g, '').trim().includes('print("Youareallowedtodrive")') && !code.replace(/\s/g, '').trim().includes("print('Youareallowedtodrive')")) {
            //   return [{
            //     es: "Debe mostrar el mensaje 'Tienes permitido conducir' si el usuario tiene 16 años o más.",
            //     en: "It must display the message 'You are allowed to drive' if the user is 16 years old or older.",
            //     pt: "Deve exibir a mensagem 'Você tem permissão para dirigir' se o usuário tiver 16 anos ou mais."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("ifedad>=16:print(\"Tienespermitidoconducir\")") && !code.replace(/\s/g, '').trim().includes("ifedad>=16:print('Tienespermitidoconducir')") && !code.replace(/\s/g, '').trim().includes("ifage>=16:print(\"Youareallowedtodrive\")") && !code.replace(/\s/g, '').trim().includes("ifage>=16:print('Youareallowedtodrive')")) {
            //   return [{
            //     es: 'Si la edad ingresada es mayor o igual a 16, debes mostrar el mensaje "Tienes permitido conducir".',
            //     en: 'If the entered age is 16 or older, you must display the message "You are allowed to drive".',
            //     pt: 'Se a idade inserida for 16 ou mais, você deve exibir a mensagem "Você tem permissão para dirigir".'
            //   }]
            // } else if (!code.includes("else:")) {
            //   return [{
            //     es: "Debe incluir una estructura condicional para verificar si el usuario tiene 16 años o más.",
            //     en: "It must include a conditional structure to check if the user is 16 years old or older.",
            //     pt: "Deve incluir uma estrutura condicional para verificar se o usuário tem 16 anos ou mais."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('print("Notienespermitidoconducir")') && !code.replace(/\s/g, '').trim().includes("print('Notienespermitidoconducir')") && !code.replace(/\s/g, '').trim().includes('print("Youarenotallowedtodrive")') && !code.replace(/\s/g, '').trim().includes("print('Youarenotallowedtodrive')")) {
            //   return [{
            //     es: "Debe mostrar el mensaje 'No tienes permitido conducir' si el usuario tiene menos de 16 años.",
            //     en: "It must display the message 'You are not allowed to drive' if the user is under 16 years old.",
            //     pt: "Deve exibir a mensagem 'Você não tem permissão para dirigir' se o usuário tiver menos de 16 anos."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('else:print("Notienespermitidoconducir")') && !code.replace(/\s/g, '').trim().includes("else:print('Notienespermitidoconducir')") && !code.replace(/\s/g, '').trim().includes('else:print("Youarenotallowedtodrive")') && !code.replace(/\s/g, '').trim().includes("else:print('Youarenotallowedtodrive')")) {
            //   return [{
            //     es: 'Si la edad ingresada es menor a 16, debes mostrar el mensaje "No tienes permitido conducir".',
            //     en: 'If the entered age is less than 16, you must display the message "You are not allowed to drive".',
            //     pt: 'Se a idade inserida for menor que 16, você deve exibir a mensagem "Você não tem permissão para dirigir".'
            //   }]
            // }
          })
      }

    ],

  },
  {
    "id": "condicionales-02",
    "prompt": "Realiza las tareas según la Actividad 02 - Helado.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe crear una variable llamada 'gustoHelado' que almacene el gusto de helado ingresado por el usuario.",
        "test": (assert) => assert
          .$custom(code => {
            const norm = code.replace(/\r/g, "");

            // === 1) Variable gustoHelado / iceCreamFlavor con input() ===
            const hasGusto = /gustoHelado\s*=\s*input\s*\(/.test(norm);
            const hasFlavor = /iceCreamFlavor\s*=\s*input\s*\(/.test(norm);

            if (!hasGusto && !hasFlavor) {
              return [{
                es: "Debe crear la variable 'gustoHelado' (o 'iceCreamFlavor') que almacene el gusto de helado ingresado por el usuario.",
                en: "You must create the 'gustoHelado' (or 'iceCreamFlavor') variable to store the ice cream flavor entered by the user.",
                pt: "Você deve criar a variável 'gustoHelado' (ou 'iceCreamFlavor') para armazenar o sabor do sorvete inserido pelo usuário."
              }];
            }

            // Extraer texto del input
            const inputMatch = code.match(/input\(["'](.*?)["']\)/);
            if (!inputMatch) {
              return [{
                es: "Debe usar input() para pedir el gusto de helado al usuario.",
                en: "You must use input() to ask the user for their ice cream flavor.",
                pt: "Você deve usar input() para pedir ao usuário o sabor do sorvete."
              }];
            }

            const pregunta = inputMatch[1];
            if (!pregunta || pregunta.trim().length === 0) {
              return [{
                es: "La pregunta del input no puede estar vacía. Debes pedir el gusto de helado.",
                en: "The input question cannot be empty. You must ask for the ice cream flavor.",
                pt: "A pergunta do input não pode estar vazia. Você deve pedir o sabor do sorvete."
              }];
            }

            if (hasGusto) {
              const okPreguntaES = /gusto|sabor/i.test(pregunta);
              if (!okPreguntaES) {
                return [{
                  es: `La pregunta del input "${pregunta}" no es válida porque no menciona "gusto" o "sabor".`,
                  en: `The input question "${pregunta}" is not valid because it does not mention "gusto" or "sabor".`,
                  pt: `A pergunta do input "${pregunta}" não é válida porque não menciona "gusto" ou "sabor".`
                }];
              }
            } else if (hasFlavor) {
              const okPreguntaEN = /flavor/i.test(pregunta);
              if (!okPreguntaEN) {
                return [{
                  es: `La pregunta del input "${pregunta}" no es válida porque no menciona "flavor".`,
                  en: `The input question "${pregunta}" is not valid because it does not mention "flavor".`,
                  pt: `A pergunta do input "${pregunta}" não é válida porque não menciona "flavor".`
                }];
              }
            }

            const varName = hasGusto ? "gustoHelado" : "iceCreamFlavor";

            // Helper para buscar comparaciones if/elif == "sabor"
            const hasCheck = (flavor) => {
              const reES = new RegExp(`\\b(if|elif)\\s+${varName}\\s*==\\s*["']${flavor}["']\\s*:`);
              return reES.test(norm);
            };

            // Helper para buscar prints "Sí, hay " + variable (o "Yes, there is ")
            const hasPrintYes = (flavor) => {
              const reES = new RegExp(
                `\\b(if|elif)\\s+${varName}\\s*==\\s*["']${flavor}["']\\s*:[\\s\\S]*?print\\s*\\(\\s*["']Sí, hay\\s*["']\\s*\\+\\s*${varName}\\s*\\)`,
                "m"
              );
              const reEN = new RegExp(
                `\\b(if|elif)\\s+${varName}\\s*==\\s*["']${flavor}["']\\s*:[\\s\\S]*?print\\s*\\(\\s*["']Yes, there is\\s*["']\\s*\\+\\s*${varName}\\s*\\)`,
                "m"
              );
              return reES.test(norm) || reEN.test(norm);
            };

            // === 2) Condicionales para cada sabor ===
            const sabores = ["chocolate", "vainilla", "fresa", "pistacho"];

            for (const sabor of sabores) {
              if (!hasCheck(sabor)) {
                return [{
                  es: `Debe incluir una condición que evalúe si el gusto de helado coincide con la opción "${sabor}".`,
                  en: `You must include a condition that checks if the ice cream flavor matches the "${sabor}" option.`,
                  pt: `Você deve incluir uma condição que verifique se o sabor do sorvete corresponde à opção "${sabor}".`
                }];
              }
              if (!hasPrintYes(sabor)) {
                return [{
                  es: `Si el gusto es "${sabor}", debes mostrar el mensaje "Sí, hay " (o "Yes, there is ") seguido del gusto de helado.`,
                  en: `If the flavor is "${sabor}", you must display the message "Yes, there is " (or "Sí, hay ") followed by the ice cream flavor.`,
                  pt: `Se o sabor for "${sabor}", você deve exibir a mensagem "Sim, há " (ou "Sí, hay ") seguida do sabor do sorvete.`
                }];
              }
            }

            // === 3) else con "No hay ..." / "There is no ..." ===
            if (!/\belse\s*:/.test(norm)) {
              return [{
                es: "Debe incluir un 'else:' para el caso en que el gusto no esté en la lista.",
                en: "You must include an 'else:' for the case when the flavor is not in the list.",
                pt: "Você deve incluir um 'else:' para o caso em que o sabor não esteja na lista."
              }];
            }

            const reElsePrintES = new RegExp(
              `else\\s*:[\\s\\S]*?print\\s*\\(\\s*["']No hay\\s*["']\\s*\\+\\s*${varName}\\s*\\)`,
              "m"
            );
            const reElsePrintEN = new RegExp(
              `else\\s*:[\\s\\S]*?print\\s*\\(\\s*["']There is no\\s*["']\\s*\\+\\s*${varName}\\s*\\)`,
              "m"
            );

            if (!reElsePrintES.test(norm) && !reElsePrintEN.test(norm)) {
              return [{
                es: 'En el caso "else" debes mostrar el mensaje "No hay " (o "There is no ") seguido del gusto ingresado.',
                en: 'In the "else" case you must display the message "There is no " (or "No hay ") followed by the entered flavor.',
                pt: 'No caso "else" você deve exibir a mensagem "Não há " (ou "There is no ") seguida do sabor inserido.'
              }];
            }

            // Todo OK
            return [];



            //VALIDACION VIEJA
            // if (!code.replace(/\s/g, '').trim().includes("gustoHelado=") && !code.replace(/\s/g, '').trim().includes("iceCreamFlavor=")) {
            //   return [{
            //     es: "Debe crear la variable 'gustoHelado' que almacene el gusto de helado ingresado por el usuario.",
            //     en: "You must create the 'iceCreamFlavor' variable to store the ice cream flavor entered by the user.",
            //     pt: "Você deve criar a variável 'gustoHelado' para armazenar o sabor do sorvete inserido pelo usuário."
            //   }]
            // } else if (code.replace(/\s/g, '').trim().includes("gustoHelado=input(")) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   // console.log(lineasInput[0]);

            //   const pregunta = lineasInput[0].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la pregunta
            //   if (pregunta) {
            //     const contieneEdadOAnios = /gusto|sabor/i.test(pregunta);
            //     if (!contieneEdadOAnios) {
            //       seguirValidando = false
            //       // console.log("La pregunta del input no es válida porque no menciona 'gusto' o 'sabor'.");
            //       return [{
            //         es: 'La pregunta del input "' + pregunta + '" no es válida porque no menciona "gusto" o "sabor".',
            //         en: 'The input question ' + pregunta + ' is not valid because it does not mention "gusto" or "sabor".',
            //         pt: 'A pergunta do input ' + pregunta + ' não é válida porque não menciona "gusto" ou "sabor".'
            //       }]
            //     }

            //   }
            // } else if (code.replace(/\s/g, '').trim().includes("iceCreamFlavor=input(")) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   // console.log(lineasInput[0]);
            //   const pregunta = lineasInput[0].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la pregunta
            //   if (pregunta.length < 1) {
            //     return [{
            //       es: "La pregunta del input no puede estar vacía.",
            //       en: "The input question cannot be empty.",
            //       pt: "A pergunta do input não pode estar vazia."
            //     }]
            //   }
            //   if (pregunta) {
            //     const contieneEdadOAnios = /flavor/i.test(pregunta);
            //     if (!contieneEdadOAnios) {
            //       seguirValidando = false
            //       // console.log("La pregunta del input no es válida porque no menciona 'gusto' o 'sabor'.");
            //       return [{
            //         es: 'La pregunta del input "' + pregunta + '" no es válida porque no menciona "gusto" o "sabor".',
            //         en: 'The input question ' + pregunta + ' is not valid because it does not mention "flavor".',
            //         pt: 'A pergunta do input ' + pregunta + ' não é válida porque não menciona "gusto" ou "sabor".'
            //       }]
            //     }
            //   }
            // }
            // else {
            //   return [{
            //     es: "Debe solicitar al usuario que ingrese el gusto de helado.",
            //     en: "You must ask the user to enter the ice cream flavor.",
            //     pt: "Você deve pedir ao usuário para inserir o sabor do sorvete."
            //   }]
            // }

            // if (!code.replace(/\s/g, '').trim().includes('ifgustoHelado=="chocolate":') && !code.replace(/\s/g, '').trim().includes('ificeCreamFlavor=="chocolate":')) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe incluir una estructura condicional que evalúe si el gusto de helado coincide con la opción chocolate.",
            //     en: "It must include a conditional structure to check if the ice cream flavor matches the chocolate option.",
            //     pt: "Deve incluir uma estrutura condicional para verificar se o sabor de sorvete corresponde à opção chocolate."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('ifgustoHelado=="chocolate":print("Sí,hay"+gustoHelado)') && !code.replace(/\s/g, '').trim().includes(`ificeCreamFlavor=="chocolate":print("Yes,thereis"+iceCreamFlavor)`)) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debes mostrar el mensaje 'Sí, hay ' seguido del gusto de helado ingresado por el usuario si coincide con el gusto chocolate.",
            //     en: "It must display the message 'Yes, there is ' followed by the ice cream flavor entered by the user if it matches the chocolate flavor.",
            //     pt: "Deve exibir a mensagem 'Sim, há ' seguida do sabor de sorvete inserido pelo usuário se corresponder ao sabor chocolate."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('elifgustoHelado=="vainilla":') && !code.replace(/\s/g, '').trim().includes('elificeCreamFlavor=="vainilla":')) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe incluir una estructura condicional que evalúe si el gusto de helado coincide con la opción vainilla.",
            //     en: "It must include a conditional structure to check if the ice cream flavor matches the vanilla option.",
            //     pt: "Deve incluir uma estrutura condicional para verificar se o sabor de sorvete corresponde à opção baunilha."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('elifgustoHelado=="vainilla":print("Sí,hay"+gustoHelado)') && !code.replace(/\s/g, '').trim().includes(`elificeCreamFlavor=="vainilla":print("Yes,thereis"+iceCreamFlavor)`)) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe mostrar el mensaje 'Sí, hay ' seguido del gusto de helado ingresado por el usuario si coincide con el gusto vainilla.",
            //     en: "It must display the message 'Yes, there is ' followed by the ice cream flavor entered by the user if it matches the vanilla flavor.",
            //     pt: "Deve exibir a mensagem 'Sí, há ' seguida do sabor de sorvete inserido pelo usuário se corresponder ao sabor baunilha."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('elifgustoHelado=="fresa":') && !code.replace(/\s/g, '').trim().includes('elificeCreamFlavor=="fresa":')) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe incluir una estructura condicional que evalúe si el gusto de helado coincide con la opción fresa.",
            //     en: "It must include a conditional structure to check if the ice cream flavor matches the strawberry option.",
            //     pt: "Deve incluir uma estrutura condicional para verificar se o sabor de sorvete corresponde à opção morango."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('elifgustoHelado=="fresa":print("Sí,hay"+gustoHelado)') && !code.replace(/\s/g, '').trim().includes(`elificeCreamFlavor=="fresa":print("Yes,thereis"+iceCreamFlavor)`)) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe mostrar el mensaje 'Sí, hay ' seguido del gusto de helado ingresado por el usuario si coincide con el gusto fresa.",
            //     en: "It must display the message 'Yes, there is ' followed by the ice cream flavor entered by the user if it matches the strawberry flavor.",
            //     pt: "Deve exibir a mensagem 'Sí, há ' seguida do sabor de sorvete inserido pelo usuário se corresponder ao sabor morango."

            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('elifgustoHelado=="pistacho":') && !code.replace(/\s/g, '').trim().includes('elificeCreamFlavor=="pistacho":')) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe incluir una estructura condicional que evalúe si el gusto de helado coincide con la opción pistacho.",
            //     en: "It must include a conditional structure to check if the ice cream flavor matches the lemon option.",
            //     pt: "Deve incluir uma estrutura condicional para verificar se o sabor de sorvete corresponde à opção limão."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('elifgustoHelado=="pistacho":print("Sí,hay"+gustoHelado)') && !code.replace(/\s/g, '').trim().includes(`elificeCreamFlavor=="pistacho":print("Yes,thereis"+iceCreamFlavor)`)) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe mostrar el mensaje 'Sí, hay ' seguido del gusto de helado ingresado por el usuario si coincide con el gusto pistacho.",
            //     en: "It must display the message 'Yes, there is ' followed by the ice cream flavor entered by the user if it matches the pistachio flavor.",
            //     pt: "Deve exibir a mensagem 'Sí, há ' seguida do sabor de sorvete inserido pelo usuário se corresponder ao sabor pistache."
            //   }]
            // }
            // else if (!code.includes("else:")) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe incluir una estructura condicional que evalúe si el gusto de helado coincide con las opciones disponibles.",
            //     en: "It must include a conditional structure to check if the ice cream flavor matches the available options.",
            //     pt: "Deve incluir uma estrutura condicional para verificar se o sabor de sorvete corresponde às opções disponíveis."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('else:print("Nohay"+gustoHelado)') && !code.replace(/\s/g, '').trim().includes('else:print("Thereisno"+iceCreamFlavor)')) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe mostrar el mensaje 'No hay ' seguido del gusto de helado ingresado por el usuario.",
            //     en: "It must display the message 'There is no ' followed by the ice cream flavor entered by the user.",
            //     pt: "Deve exibir a mensagem 'Não há ' seguida do sabor de sorvete inserido pelo usuário."
            //   }]
            // }
          })
      }

    ]
  },
  {
    "id": "while-01",
    "prompt": "Realiza las tareas según la Actividad 01 - Dados.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe importar la función 'randint' del módulo 'random'.",
        "test": (assert) => assert
          .$custom(code => {

            const norm = code.replace(/\r/g, "");

            // Helpers
            const noSpace = norm.replace(/\s/g, "");
            const has = (re) => re.test(norm);

            const errors = [];

            // === 1) Importar randint de random ===
            if (!/from\s+random\s+import\s+randint\b/.test(norm)) {
              errors.push({
                es: "Debe importar la función 'randint' del módulo 'random'.",
                en: "You must import the 'randint' function from the 'random' module.",
                pt: "Você deve importar a função 'randint' do módulo 'random'."
              });
            }

            // === 2) Variables inicializadas en 0 ===
            const hasDado0 = /\b(dado|dice)\s*=\s*0\b/.test(norm);
            const hasCont0 = /\b(contador|counter)\s*=\s*0\b/.test(norm);
            const hasScore0 = /\b(puntaje|score)\s*=\s*0\b/.test(norm);

            if (!hasDado0) {
              errors.push({
                es: "Debe crear la variable 'dado' inicializada en 0.",
                en: "You must create the 'dice' variable initialized to 0.",
                pt: "Você deve criar a variável 'dado' inicializada em 0."
              });
            }
            if (!hasCont0) {
              errors.push({
                es: "Debe crear la variable 'contador' inicializada en 0.",
                en: "You must create the 'counter' variable initialized to 0.",
                pt: "Você deve criar a variável 'contador' inicializada em 0."
              });
            }
            if (!hasScore0) {
              errors.push({
                es: "Debe crear la variable 'puntaje' inicializada en 0.",
                en: "You must create the 'score' variable initialized to 0.",
                pt: "Você deve criar a variável 'puntaje' inicializada em 0."
              });
            }

            // Detectar nombres según idioma (para reutilizar en regex)
            const dadoName = /\bdado\s*=/.test(norm) ? "dado" : "dice";
            const contadorName = /\bcontador\s*=/.test(norm) ? "contador" : "counter";
            const scoreName = /\bpuntaje\s*=/.test(norm) ? "puntaje" : "score";

            // === 3) while contador < 10 and puntaje < 38 ===
            const reWhile = new RegExp(
              `while\\s+${contadorName}\\s*<\\s*10\\s*and\\s*${scoreName}\\s*<\\s*38\\s*:`
            );
            if (!reWhile.test(norm)) {
              errors.push({
                es: "Debe incluir un bucle while que evalúe las condiciones 'contador < 10' y 'puntaje < 38'.",
                en: "You must include a while loop that checks 'counter < 10' and 'score < 38'.",
                pt: "Você deve incluir um loop while que verifique 'contador < 10' e 'pontuação < 38'."
              });
            }

            // === 4) Asignar valor aleatorio al dado: dado = randint(1, 6) ===
            const reDadoRand = new RegExp(
              `${dadoName}\\s*=\\s*randint\\s*\\(\\s*1\\s*,\\s*6\\s*\\)`
            );
            if (!reDadoRand.test(norm)) {
              errors.push({
                es: "Debe crear la variable del dado con un número aleatorio entre 1 y 6 usando randint(1, 6).",
                en: "You must create the dice variable with a random number between 1 and 6 using randint(1, 6).",
                pt: "Você deve criar a variável do dado com um número aleatório entre 1 e 6 usando randint(1, 6)."
              });
            }

            // === 5) Mostrar el valor del dado en cada iteración (print(dado)) ===
            if (!new RegExp(`print\\s*\\(\\s*${dadoName}\\s*\\)`).test(norm)) {
              errors.push({
                es: "Debe mostrar el valor del dado en cada iteración del bucle (print(dado)).",
                en: "You must display the dice value in each loop iteration (print(dice)).",
                pt: "Você deve exibir o valor do dado em cada iteração do loop (print(dado))."
              });
            }

            // === 6) Sumar valor del dado al puntaje: puntaje += dado ===
            const reAddScore = new RegExp(
              `${scoreName}\\s*\\+=\\s*${dadoName}`
            );
            if (!reAddScore.test(norm)) {
              errors.push({
                es: "Debe sumar el valor del dado al puntaje en cada iteración del bucle (puntaje += dado).",
                en: "You must add the dice value to the score in each loop iteration (score += dice).",
                pt: "Você deve adicionar o valor do dado ao placar em cada iteração do loop (pontuação += dado)."
              });
            }

            // === 7) Incrementar contador: contador += 1 ===
            const reIncCount = new RegExp(
              `${contadorName}\\s*\\+=\\s*1`
            );
            if (!reIncCount.test(norm)) {
              errors.push({
                es: "Debe incrementar el contador en 1 en cada iteración del bucle (contador += 1).",
                en: "You must increment the counter by 1 in each loop iteration (counter += 1).",
                pt: "Você deve incrementar o contador em 1 em cada iteração do loop (contador += 1)."
              });
            }

            // === 8) Print del puntaje total ===
            const rePrintTotalES = new RegExp(
              `print\\s*\\(\\s*["']El puntaje total es:\\s*["']\\s*\\+\\s*str\\s*\\(\\s*${scoreName}\\s*\\)\\s*\\)`
            );
            const rePrintTotalEN = new RegExp(
              `print\\s*\\(\\s*["']The total score is:\\s*["']\\s*\\+\\s*str\\s*\\(\\s*${scoreName}\\s*\\)\\s*\\)`
            );
            if (!rePrintTotalES.test(norm) && !rePrintTotalEN.test(norm)) {
              errors.push({
                es: 'Debe mostrar el puntaje total al finalizar el bucle con el texto "El puntaje total es: " y concatenar str(puntaje).',
                en: 'You must display the total score at the end of the loop with the text "The total score is: " and concatenate str(score).',
                pt: 'Você deve exibir a pontuação total ao final do loop com o texto "O placar total é: " e concatenar str(score).'
              });
            }

            // === 9) if puntaje >= 38 ===
            const reIfWin = new RegExp(
              `if\\s*${scoreName}\\s*>=\\s*38\\s*:`
            );
            if (!reIfWin.test(norm)) {
              errors.push({
                es: "Debe incluir una estructura condicional para verificar si el puntaje es mayor o igual a 38.",
                en: "You must include a conditional structure to check if the score is greater than or equal to 38.",
                pt: "Você deve incluir uma estrutura condicional para verificar se a pontuação é maior ou igual a 38."
              });
            }

            // === 10) Mensaje de ganar ===
            const hasWinES = /print\s*\(\s*["']Ganaste["']\s*\)/.test(norm);
            const hasWinEN = /print\s*\(\s*["']You\s*won["']\s*\)/.test(norm);

            if (!hasWinES && !hasWinEN) {
              errors.push({
                es: "Debe mostrar el mensaje 'Ganaste' si el puntaje es mayor o igual a 38.",
                en: "You must display the message 'You won' if the score is greater than or equal to 38.",
                pt: "Você deve exibir a mensagem 'Você ganhou' se a pontuação for maior ou igual a 38."
              });
            }

            // === 11) else + mensaje de perder ===
            if (!/\belse\s*:/.test(norm)) {
              errors.push({
                es: "Debe incluir un 'else:' para el caso en que el puntaje sea menor a 38.",
                en: "You must include an 'else:' for the case when the score is less than 38.",
                pt: "Você deve incluir um 'else:' para o caso em que a pontuação seja menor que 38."
              });
            }

            const hasLoseES = /print\s*\(\s*["']Perdiste["']\s*\)/.test(norm);
            const hasLoseEN = /print\s*\(\s*["']You\s*lost["']\s*\)/.test(norm);

            if (!hasLoseES && !hasLoseEN) {
              errors.push({
                es: "Debe mostrar el mensaje 'Perdiste' si el puntaje es menor a 38.",
                en: "You must display the message 'You lost' if the score is less than 38.",
                pt: "Você deve exibir a mensagem 'Você perdeu' se a pontuação for menor que 38."
              });
            }
            console.log(errors[0]);

            // === Resultado ===
            if (errors.length > 0) {
              return [errors[0]];
            }
            return [];




            //VALIDACION VIEJA
            // if (!code.includes("from random import randint")) {
            //   return [{
            //     es: "Debe importar la función 'randint' del módulo 'random'.",
            //     en: "It must import the 'randint' function from the 'random' module.",
            //     pt: "Deve importar a função 'randint' do módulo 'random'."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("dado=0") && !code.replace(/\s/g, '').trim().includes("dice=0")) {
            //   return [{
            //     es: "Debe crear la variable 'dado' inicializada en 0.",
            //     en: "It must create the 'dice' variable initialized to 0.",
            //     pt: "Deve criar a variável 'dado' inicializada em 0."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("contador=0") && !code.replace(/\s/g, '').trim().includes("counter=0")) {
            //   return [{
            //     es: "Debe crear la variable 'contador' inicializada en 0.",
            //     en: "It must create the 'counter' variable initialized to 0.",
            //     pt: "Deve criar a variável 'contador' inicializada em 0."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("puntaje=0") && !code.replace(/\s/g, '').trim().includes("score=0")) {
            //   return [{
            //     es: "Debe crear la variable 'puntaje' inicializada en 0.",
            //     en: "It must create the 'score' variable initialized to 0.",
            //     pt: "Deve criar a variável 'puntaje' inicializada em 0."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("whilecontador<10andpuntaje<38:") && !code.replace(/\s/g, '').trim().includes("whilecounter<10andscore<38:")) {
            //   return [{
            //     es: "Debe incluir un bucle while que evalúe las condiciones 'contador < 10' y 'puntaje < 38'.",
            //     en: "It must include a while loop that evaluates the 'counter < 10' and 'score < 38' conditions.",
            //     pt: "Deve incluir um loop while que avalie as condições 'contador < 10' e 'puntaje < 38'."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("dado=randint(1,6)") && !code.replace(/\s/g, '').trim().includes("dice=randint(1,6)")) {
            //   return [{
            //     es: "Debe crear la variable 'dado' con un número aleatorio entre 1 y 6.",
            //     en: "It must create the 'dice' variable with a random number between 1 and 6.",
            //     pt: "Deve criar a variável 'dado' com um número aleatório entre 1 e 6."
            //   }]
            // } else if (!code.includes("print(dado)") && !code.includes("print(dice)")) {
            //   return [{
            //     es: "Debe mostrar el valor del dado en cada iteración del bucle.",
            //     en: "It must display the die value in each loop iteration.",
            //     pt: "Deve exibir o valor do dado em cada iteração do loop."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("puntaje+=dado") && !code.replace(/\s/g, '').trim().includes("score+=dice")) {
            //   return [{
            //     es: "Debe sumar el valor del dado al puntaje en cada iteración del bucle.",
            //     en: "It must add the die value to the score in each loop iteration.",
            //     pt: "Deve adicionar o valor do dado ao placar em cada iteração do loop."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("contador+=1") && !code.replace(/\s/g, '').trim().includes("counter+=1")) {
            //   return [{
            //     es: "Debe incrementar el contador en 1 en cada iteración del bucle.",
            //     en: "It must increment the counter by 1 in each loop iteration.",
            //     pt: "Deve incrementar o contador em 1 em cada iteração do loop."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('print("Elpuntajetotales:"+str(puntaje))') && !code.replace(/\s/g, '').trim().includes('print("Thetotalscoreis:"+str(score))')) {
            //   return [{
            //     es: "Debe mostrar el puntaje total al finalizar el bucle.",
            //     en: "It must display the total score at the end of the loop.",
            //     pt: "Deve exibir o placar total ao final do loop."
            //   }]
            // }
            // else if (!code.replace(/\s/g, '').trim().includes("ifpuntaje>=38") && !code.replace(/\s/g, '').trim().includes("ifscore>=38")) {
            //   return [{
            //     es: "Debe incluir una estructura condicional para verificar si el puntaje es mayor o igual a 38.",
            //     en: "It must include a conditional structure to check if the score is greater than or equal to 38.",
            //     pt: "Deve incluir uma estrutura condicional para verificar se o placar é maior ou igual a 38."
            //   }]
            // } else if (!code.includes('print("Ganaste")') && !code.includes('print("Youwon")')) {
            //   return [{
            //     es: "Debe mostrar el mensaje '¡Ganaste!' si el puntaje es mayor o igual a 38.",
            //     en: "It must display the message 'You won!' if the score is greater than or equal to 38.",
            //     pt: "Deve exibir a mensagem 'Você ganhou!' se o placar for maior ou igual a 38."
            //   }]
            // } else if (!code.includes("else:")) {
            //   return [{
            //     es: "Debe incluir una estructura condicional para verificar si el puntaje es mayor o igual a 38.",
            //     en: "It must include a conditional structure to check if the score is greater than or equal to 38.",
            //     pt: "Deve incluir uma estrutura condicional para verificar se o placar é maior ou igual a 38."
            //   }]
            // } else if (!code.includes('print("Perdiste")') && !code.includes('print("Youlost")')) {
            //   return [{
            //     es: "Debe mostrar el mensaje 'Perdiste' si el puntaje es menor a 38.",
            //     en: "It must display the message 'You lost' if the score is less than 38.",
            //     pt: "Deve exibir a mensagem 'Você perdeu' se o placar for menor que 38."
            //   }]
            // }

          })
      }
    ]
  },
  {
    "id": "while-02",
    "prompt": "Realiza las tareas según la Actividad 02 - Contraseña.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe crear una variable llamada 'clave' con el valor 'DigitalHouse'.",
        "test": (assert) => assert
          .$custom(code => {
            // console.log(code.replace(/\s/g, '').trim().includes('clave="DigitalHouse"password=input('));

            const norm = code.replace(/\r/g, "");
            const compact = norm.replace(/\s/g, "");

            // === 1) clave / key = "DigitalHouse" ===
            const matchClave = norm.match(/\b(clave|key)\s*=\s*["']DigitalHouse["']/);
            if (!matchClave) {
              return [{
                es: "Debe crear una variable llamada 'clave' (o 'key') con el valor 'DigitalHouse'.",
                en: "You must create a variable called 'clave' (or 'key') with the value 'DigitalHouse'.",
                pt: "Você deve criar uma variável chamada 'clave' (ou 'key') com o valor 'DigitalHouse'."
              }];
            }
            const keyName = matchClave[1]; // 'clave' o 'key'

            // === 2) password = input(...) ===
            const matchPassword = norm.match(/\bpassword\s*=\s*input\s*\(\s*["'](.*?)["']\s*\)/);
            if (!matchPassword) {
              return [{
                es: "Debe crear una variable llamada 'password' inicializada con un input() para solicitar la contraseña.",
                en: "You must create a variable named 'password' initialized with an input() to request the password.",
                pt: "Você deve criar uma variável chamada 'password' inicializada com um input() para solicitar a senha."
              }];
            }

            const pregunta1 = matchPassword[1] || "";
            if (!/contraseña|password/i.test(pregunta1)) {
              return [{
                es: `La pregunta del primer input "${pregunta1}" no es válida porque no menciona "contraseña" o "password".`,
                en: `The first input question "${pregunta1}" is not valid because it does not mention "password".`,
                pt: `A pergunta do primeiro input "${pregunta1}" não é válida porque não menciona "senha" ou "password".`
              }];
            }

            // === 3) while password != clave (o key) ===
            const reWhile = new RegExp(
              `while\\s*(?:password\\s*!=\\s*${keyName}|${keyName}\\s*!=\\s*password)\\s*:`
            );
            if (!reWhile.test(norm)) {
              return [{
                es: "Debe incluir un bucle while que evalúe 'clave != password' (o 'key != password').",
                en: "You must include a while loop that evaluates 'key != password'.",
                pt: "Você deve incluir um loop while que avalie 'chave != senha'."
              }];
            }

            // === 4) Dentro del while: otro input pidiendo la contraseña ===
            const inputs = [...norm.matchAll(/input\s*\(\s*["'](.*?)["']\s*\)/g)];
            if (inputs.length < 2) {
              return [{
                es: "Dentro del while debe volver a solicitar la contraseña con otro input().",
                en: "Inside the while loop you must request the password again with another input().",
                pt: "Dentro do while você deve solicitar a senha novamente com outro input()."
              }];
            }

            const preguntaWhile = inputs[1][1] || "";
            if (!/contraseña|password/i.test(preguntaWhile)) {
              return [{
                es: `La pregunta del input dentro del while "${preguntaWhile}" no es válida porque no menciona "contraseña" o "password".`,
                en: `The input question inside the while "${preguntaWhile}" is not valid because it does not mention "password".`,
                pt: `A pergunta do input dentro do while "${preguntaWhile}" não é válida porque não menciona "senha" ou "password".`
              }];
            }

            // === 5) Mensaje final de contraseña correcta ===
            const okFinalES = compact.includes('print("Lacontraseñaingresadaescorrecta")') ||
              compact.includes("print('Lacontraseñaingresadaescorrecta')");
            const okFinalEN = compact.includes('print("Thepasswordenterediscorrect")') ||
              compact.includes("print('Thepasswordenterediscorrect')");

            if (!okFinalES && !okFinalEN) {
              return [{
                es: "Debe mostrar el mensaje 'La contraseña ingresada es correcta' al salir del bucle.",
                en: "You must display the message 'The password entered is correct' after exiting the loop.",
                pt: "Você deve exibir a mensagem 'A senha inserida está correta' após sair do loop."
              }];
            }

            // ✅ Si llegó hasta acá, está todo bien (no retornamos nada)



            //VALIDACION VIEJA
            // if (!code.replace(/\s/g, '').trim().includes('clave="DigitalHouse"') && !code.replace(/\s/g, '').trim().includes('key="DigitalHouse"')) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe crear una variable llamada 'clave' con el valor 'DigitalHouse'.",
            //     en: "It must create a variable named 'key' with the value 'DigitalHouse'.",
            //     pt: "Deve criar uma variável chamada 'chave' com o valor 'DigitalHouse'."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes('password=')) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe crear una variable llamada 'password' para almacenar el valor ingresado por consola.",
            //     en: "It must create a variable named 'password' to store the value entered by the user.",
            //     pt: "Deve criar uma variável chamada 'senha' para armazenar o valor inserido pelo usuário."
            //   }]
            // } else if (code.replace(/\s/g, '').trim().includes('clave="DigitalHouse"password=input(')) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   const pregunta = lineasInput[0].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la pregunta
            //   if (pregunta) {
            //     const contieneContraseña = /contraseña|password/i.test(pregunta);
            //     if (!contieneContraseña) {
            //       seguirValidando = false
            //       // console.log("La pregunta del input no es válida porque no menciona 'contraseña' o 'password'.");
            //       seguirValidando = false
            //       return [{
            //         es: 'La pregunta del primer input "' + pregunta + '" no es válida porque no menciona "contraseña" o "password".',
            //         en: 'The first input question ' + pregunta + ' is not valid because it does not mention "contraseña" or "password".',
            //         pt: 'A pergunta do primeiro input ' + pregunta + ' não é válida porque não menciona "senha" ou "password".'
            //       }]
            //     }

            //   }
            // } else if (code.replace(/\s/g, '').trim().includes('key="DigitalHouse"password=input(')) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   const pregunta = lineasInput[0].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la pregunta
            //   if (pregunta.length < 1) {
            //     seguirValidando = false
            //     return [{
            //       es: "Debe incluir una pregunta en el input.",
            //       en: "It must include a question in the input.",
            //       pt: "Deve incluir uma pergunta no input."
            //     }]
            //   }
            //   if (pregunta) {
            //     const contieneContraseña = /password/i.test(pregunta);
            //     if (!contieneContraseña) {
            //       seguirValidando = false
            //       // console.log("La pregunta del input no es válida porque no menciona 'contraseña' o 'password'.");
            //       seguirValidando = false
            //       return [{
            //         es: 'La pregunta del primer input "' + pregunta + '" no es válida porque no menciona "contraseña" o "password".',
            //         en: 'The first input question ' + pregunta + ' is not valid because it does not mention "password".',
            //         pt: 'A pergunta do primeiro input ' + pregunta + ' não é válida porque não menciona "senha".'
            //       }]
            //     }

            //   }
            // }
            // else {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe crear una variable llamada 'password' inicializada con un input() para solicitar la contraseña.",
            //     en: "It must create the 'password' variable initialized with an input() to request the password.",
            //     pt: "Deve criar a variável 'password' inicializada com um input() para solicitar a senha."
            //   }]
            // }

            // if (!code.replace(/\s/g, '').trim().includes("whilepassword!=clave:") && !code.replace(/\s/g, '').trim().includes("whileclave!=password:") && !code.replace(/\s/g, '').trim().includes("whilepassword!=key:") && !code.replace(/\s/g, '').trim().includes("whilekey!=password:")) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe incluir un bucle while que evalúe 'clave != password'.",
            //     en: "It must include a while loop that evaluates 'key != password'.",
            //     pt: "Deve incluir um loop while que avalie 'chave != senha'."
            //   }]
            // } else if (code.replace(/\s/g, '').trim().includes("whilepassword!=clave:password=input(") || code.replace(/\s/g, '').trim().includes("whileclave!=password:password=input(")) {
            //   const lineasInputWhile = code.match(/input\(["'].*?["']\)/g);
            //   // console.log(lineasInputWhile);
            //   const preguntaWhile = lineasInputWhile[1].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la preguntaWhile
            //   if (preguntaWhile.length < 1) {
            //     seguirValidando = false
            //     return [{
            //       es: "Debe incluir una pregunta en el input dentro del while.",
            //       en: "It must include a question in the input inside the while.",
            //       pt: "Deve incluir uma pergunta no input dentro do while."
            //     }]
            //   }
            //   if (preguntaWhile) {
            //     const contieneContraWhile = /contraseña|password/i.test(preguntaWhile);
            //     if (!contieneContraWhile) {
            //       seguirValidando = false
            //       // console.log("La pregunta del input no es válida porque no menciona 'contraseña' o 'password'.");
            //       seguirValidando = false
            //       return [{
            //         es: 'La pregunta del input dentro de while: "' + preguntaWhile + '" no es válida porque no menciona "contraseña" o "password".',
            //         en: 'The input question inside while: ' + preguntaWhile + ' is not valid because it does not mention "password".',
            //         pt: 'A pergunta do input dentro do while: ' + preguntaWhile + ' não é válida porque não menciona "senha" ou "password".'
            //       }]
            //     }

            //   }
            // } else if (code.replace(/\s/g, '').trim().includes("whilekey!=password:password=input(")) {
            //   const lineasInputWhile = code.match(/input\(["'].*?["']\)/g);
            //   // console.log(lineasInputWhile);
            //   const preguntaWhile = lineasInputWhile[1].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la preguntaWhile
            //   if (preguntaWhile.length < 1) {
            //     seguirValidando = false
            //     return [{
            //       es: "Debe incluir una pregunta en el input dentro del while.",
            //       en: "It must include a question in the input inside the while.",
            //       pt: "Deve incluir uma pergunta no input dentro do while."
            //     }]
            //   }
            //   if (preguntaWhile) {
            //     const contieneContraWhile = /password/i.test(preguntaWhile);
            //     if (!contieneContraWhile) {
            //       seguirValidando = false
            //       // console.log("La pregunta del input no es válida porque no menciona 'contraseña' o 'password'.");
            //       seguirValidando = false
            //       return [{
            //         es: 'La pregunta del input dentro de while: "' + preguntaWhile + '" no es válida porque no menciona "password".',
            //         en: 'The input question inside while: ' + preguntaWhile + ' is not valid because it does not mention "password".',
            //         pt: 'A pergunta do input dentro do while: ' + preguntaWhile + ' não é válida porque não menciona "senha".'
            //       }]
            //     }
            //   }
            // }
            // else {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe incluir un bucle while que evalúe 'clave != password'.",
            //     en: "It must include a while loop that evaluates 'key != password'.",
            //     pt: "Deve incluir um loop while que avalie 'chave != senha'."
            //   }]
            // }

            // if (!code.replace(/\s/g, '').trim().includes('print("Lacontraseñaingresadaescorrecta")') && !code.replace(/\s/g, '').trim().includes('print("Thepasswordenterediscorrect")') && !code.replace(/\s/g, '').trim().includes("print('Lacontraseñaingresadaescorrecta')") && !code.replace(/\s/g, '').trim().includes("print('Thepasswordenterediscorrect')")) {
            //   seguirValidando = false
            //   return [{
            //     es: "Debe mostrar el mensaje 'La contraseña ingresada es correcta' al salir del bucle.",
            //     en: "It must display the message 'The password entered is correct' after exiting the loop.",
            //     pt: "Deve exibir a mensagem 'A senha inserida está correta' após sair do loop."
            //   }]
            // }

          })

      }
    ]
  },
  {
    "id": "listas01-01",
    "prompt": "Realiza las tareas según la Actividad 01 - Promedio.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": { es: "notas = [10, 4, 6, 5, 10, 8, 9, 4]", en: 'grades = [10, 4, 6, 5, 10, 8, 9, 4]' },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe crear una lista llamada 'notas' con las notas proporcionadas.",
        "test": (assert) => assert
          .$custom(code => {
            // console.log(code.replace(/\s+/g, '').trim())
            const norm = code.replace(/\r/g, "");

            // Helper: obtener cuerpos de los print()
            const printBodies = [...norm.matchAll(/print\s*\(([\s\S]*?)\)\s*$/gm)].map(m => m[1]);

            const hasPrintWithPhraseAndVar = (phraseRe, varName) => {
              const varRe = new RegExp(`(?<![A-Za-z0-9_])${varName}(?![A-Za-z0-9_])`);

              return printBodies.some(body => {
                if (!phraseRe.test(body)) return false;
                if (!varRe.test(body)) return false;

                const usesPlus = /\+/.test(body);
                const hasStr = /str\s*\(/.test(body);
                const isFString = /f["']/.test(body);
                const hasComma = /,/.test(body);
                const hasFormat = /\.format\s*\(/.test(body);

                // Si usa + con texto y la variable, exigir str()
                if (usesPlus && /["']/.test(body) && varRe.test(body) && !hasStr) {
                  return false;
                }

                // Aceptamos:
                // - f-string
                // - .format()
                // - print("texto", var)
                // - print("texto " + str(var))
                return isFString || hasFormat || hasComma || (usesPlus && hasStr);
              });
            };

            // === 1) Lista de notas / grades ===
            const reNotas = /\bnotas\s*=\s*\[\s*10\s*,\s*4\s*,\s*6\s*,\s*5\s*,\s*10\s*,\s*8\s*,\s*9\s*,\s*4\s*]/;
            const reGrades = /\bgrades\s*=\s*\[\s*10\s*,\s*4\s*,\s*6\s*,\s*5\s*,\s*10\s*,\s*8\s*,\s*9\s*,\s*4\s*]/;

            let listName = null;
            if (reNotas.test(norm)) {
              listName = "notas";
            } else if (reGrades.test(norm)) {
              listName = "grades";
            } else {
              return [{
                es: "En tu código debes tener la lista de notas brindada por el ejercicio. Puedes reiniciar el código para recuperarla.",
                en: "In your code you must have the list of grades provided by the exercise. You can reset the code to recover it.",
                pt: "No seu código, você deve ter a lista de notas fornecida pelo exercício. Você pode redefinir o código para recuperá-la."
              }];
            }

            // === 2) Variable de suma: sumaNotas / sumGrades ===
            let sumName = null;
            if (/\bsumaNotas\b/.test(norm)) {
              sumName = "sumaNotas";
            } else if (/\bsumGrades\b/.test(norm)) {
              sumName = "sumGrades";
            } else {
              return [{
                es: "En tu código debes declarar la variable 'sumaNotas' (o 'sumGrades').",
                en: "In your code you must declare the 'sumGrades' (or 'sumaNotas') variable.",
                pt: "No seu código, você deve declarar a variável 'sumGrades' (ou 'sumaNotas')."
              }];
            }

            const reSum = new RegExp(`\\b${sumName}\\s*=\\s*sum\\s*\\(\\s*${listName}\\s*\\)`);
            if (!reSum.test(norm)) {
              return [{
                es: "Debes almacenar la suma de los valores de la lista en la variable de suma usando sum(...).",
                en: "You must store the sum of the list values in the sum variable using sum(...).",
                pt: "Você deve armazenar a soma dos valores da lista na variável de soma usando sum(...)."
              }];
            }

            // === 3) Print de la suma ===
            const phraseSumEs = /La\s*suma\s*de\s*las\s*notas\s*es\s*:/i;
            const phraseSumEn = /The\s*sum\s*of\s*the\s*grades\s*is\s*:/i;

            if (!hasPrintWithPhraseAndVar(phraseSumEs, sumName) &&
              !hasPrintWithPhraseAndVar(phraseSumEn, sumName)) {
              return [{
                es: "Debe mostrar la suma con el mensaje 'La suma de las notas es: _____'.",
                en: "It must display the sum with the message 'The sum of the grades is: _____'.",
                pt: "Deve exibir a soma com a mensagem 'A soma das notas é: _____'."
              }];
            }

            // === 4) Variable de cantidad: cantidadNotas / amountGrades ===
            let countName = null;
            if (/\bcantidadNotas\b/.test(norm)) {
              countName = "cantidadNotas";
            } else if (/\bamountGrades\b/.test(norm)) {
              countName = "amountGrades";
            } else {
              return [{
                es: "En tu código debes declarar la variable 'cantidadNotas' (o 'amountGrades').",
                en: "In your code you must declare the 'amountGrades' (or 'cantidadNotas') variable.",
                pt: "No seu código, você deve declarar a variável 'amountGrades' (ou 'cantidadNotas')."
              }];
            }

            const reLen = new RegExp(`\\b${countName}\\s*=\\s*len\\s*\\(\\s*${listName}\\s*\\)`);
            if (!reLen.test(norm)) {
              return [{
                es: "Debes calcular la cantidad de notas usando len(...) y guardarla en la variable correspondiente.",
                en: "You must calculate the number of grades using len(...) and store it in the corresponding variable.",
                pt: "Você deve calcular a quantidade de notas usando len(...) e armazená-la na variável correspondente."
              }];
            }

            // === 5) Print de la cantidad ===
            const phraseCountEs = /La\s*cantidad\s*de\s*notas\s*es\s*:/i;
            const phraseCountEn = /The\s*amount\s*of\s*grades\s*is\s*:/i;

            if (!hasPrintWithPhraseAndVar(phraseCountEs, countName) &&
              !hasPrintWithPhraseAndVar(phraseCountEn, countName)) {
              return [{
                es: "Debe mostrar la cantidad con el mensaje 'La cantidad de notas es: _____'.",
                en: "It must display the amount with the message 'The amount of grades is: _____'.",
                pt: "Deve exibir a quantidade com a mensagem 'A quantidade de notas é: _____'."
              }];
            }

            // === 6) Variable de promedio: promedio / average ===
            let avgName = null;
            if (/\bpromedio\b/.test(norm)) {
              avgName = "promedio";
            } else if (/\baverage\b/.test(norm)) {
              avgName = "average";
            } else {
              return [{
                es: "Debe calcular el promedio y almacenarlo en la variable 'promedio' (o 'average').",
                en: "You must calculate the average and store it in the 'average' (or 'promedio') variable.",
                pt: "Você deve calcular a média e armazená-la na variável 'average' (ou 'promedio')."
              }];
            }

            // Verificamos que promedio sea suma / cantidad (en cualquier orden)
            const reAvgAssign = new RegExp(`\\b${avgName}\\s*=([^\\n]+)`);
            const mAvg = norm.match(reAvgAssign);
            if (!mAvg) {
              return [{
                es: "Debe asignar a la variable de promedio una división entre la suma y la cantidad de notas.",
                en: "You must assign to the average variable a division between the sum and the number of grades.",
                pt: "Você deve atribuir à variável de média uma divisão entre a soma e a quantidade de notas."
              }];
            } else {
              const rhs = mAvg[1];
              const hasSlash = /\//.test(rhs);
              const usesSum = new RegExp(`\\b${sumName}\\b`).test(rhs);
              const usesCount = new RegExp(`\\b${countName}\\b`).test(rhs);
              if (!hasSlash || !usesSum || !usesCount) {
                return [{
                  es: "El promedio debe calcularse dividiendo la suma de las notas por la cantidad de notas.",
                  en: "The average must be calculated by dividing the sum of the grades by the number of grades.",
                  pt: "A média deve ser calculada dividindo a soma das notas pela quantidade de notas."
                }];
              }
            }

            // === 7) Print del promedio ===
            const phraseAvgEs = /El\s*promedio\s*de\s*las\s*notas\s*es\s*:/i;
            const phraseAvgEn = /The\s*average\s*of\s*the\s*grades\s*is\s*:/i;

            if (!hasPrintWithPhraseAndVar(phraseAvgEs, avgName) &&
              !hasPrintWithPhraseAndVar(phraseAvgEn, avgName)) {
              return [{
                es: "Debe mostrar el promedio con el mensaje 'El promedio de las notas es: _____'.",
                en: "It must display the average with the message 'The average of the grades is: _____'.",
                pt: "Deve exibir a média com a mensagem 'A média das notas é: _____'."
              }];
            }

            // ✅ Si llegó hasta acá, todo OK (no retornamos nada)


            //VALIDACION VIEJA
            // if (!code.replace(/\s+/g, '').trim().includes("notas=[10,4,6,5,10,8,9,4]") && !code.replace(/\s+/g, '').trim().includes("grades=[10,4,6,5,10,8,9,4]")) {
            //   return [{
            //     es: "En tu código debes tener la lista de notas brindado por el ejercicio. Puedes reiniciar el código para recuperarlo.",
            //     en: "In your code you must have the list of grades provided by the exercise. You can reset the code to recover it.",
            //     pt: "No seu código, você deve ter a lista de notas fornecida pelo exercício. Você pode redefinir o código para recuperá-lo."

            //   }]
            // }
            // if (!code.replace(/\s+/g, '').trim().includes("sumaNotas=") && !code.replace(/\s+/g, '').trim().includes("sumGrades=")) {
            //   return [{
            //     es: "En tu código debes declarar la variable sumaNotas.",
            //     en: "In your code you must declare the sumGrades variable.",
            //     pt: "No seu código, você deve declarar a variável sumGrades."
            //   }]
            // }

            // if (!code.replace(/\s+/g, '').trim().includes("sumaNotas=sum(notas)") && !code.replace(/\s+/g, '').trim().includes("sumGrades=sum(grades)")) {
            //   return [{
            //     es: "En tu código debes almacenar la suma de los valores de la lista notas dentro de la variable sumaNotas. Recuerda utilizar el método correspondiente.",
            //     en: "In your code you must store the sum of the values of the grades list within the sumGrades variable. Remember to use the corresponding method.",
            //     pt: "No seu código, você deve armazenar a soma dos valores da lista de notas dentro da variável sumGrades. Lembre-se de usar o método correspondente."
            //   }]
            // }
            // if (!code.replace(/\s+/g, '').trim().includes('print("Lasumadelasnotases:"+str(sumaNotas)') && !code.replace(/\s+/g, '').trim().includes('print("Thesumofthegradesis:"+str(sumGrades)')) {
            //   return [{
            //     es: "Debe mostrar la suma con el mensaje 'La suma de las notas es: _____'.",
            //     en: "It must display the sum with the message 'The sum of the grades is: _____'.",
            //     pt: "Deve exibir a soma com a mensagem 'A soma das notas é: _____'."
            //   }]
            // }
            // if (!code.replace(/\s+/g, '').trim().includes("cantidadNotas=") && !code.replace(/\s+/g, '').trim().includes("amountGrades=")) {
            //   return [{
            //     es: "En tu código debes declarar la variable cantidadNotas.",
            //     en: "In your code you must declare the amountGrades variable.",
            //     pt: "No seu código, você deve declarar a variável amountGrades."
            //   }]
            // }
            // if (!code.replace(/\s+/g, '').trim().includes("cantidadNotas=len(notas)") && !code.replace(/\s+/g, '').trim().includes("amountGrades=len(grades)")) {
            //   return [{
            //     es: "Debe calcular la cantidad de notas y almacenarla en la variable 'cantidadNotas'.",
            //     en: "It must calculate the number of grades and store it in the 'amountGrades' variable.",
            //     pt: "Deve calcular a quantidade de notas e armazená-la na variável 'amountGrades'."
            //   }]
            // }
            // if (!code.replace(/\s+/g, '').trim().includes('print("Lacantidaddenotases:"+str(cantidadNotas)') && !code.replace(/\s+/g, '').trim().includes('print("Theamountofgradesis:"+str(amountGrades)')) {
            //   return [{
            //     es: "Debe mostrar la cantidad con el mensaje 'La cantidad de notas es: _____'.",
            //     en: "It must display the amount with the message 'The amount of grades is: _____'.",
            //     pt: "Deve exibir a quantidade com a mensagem 'A quantidade de notas é: _____'."
            //   }]
            // }

            // if (!code.replace(/\s+/g, '').trim().includes("promedio=") && !code.replace(/\s+/g, '').trim().includes("average=")) {
            //   return [{
            //     es: "Debe calcular el promedio y almacenarlo en la variable 'promedio'.",
            //     en: "It must calculate the average and store it in the 'average' variable.",
            //     pt: "Deve calcular a média e armazená-la na variável 'average'."
            //   }]
            // }
            // if (!code.replace(/\s+/g, '').trim().includes("promedio=sumaNotas/cantidadNotas") && !code.replace(/\s+/g, '').trim().includes("average=sumGrades/amountGrades")) {
            //   return [{
            //     es: "Debe mostrar el promedio con el mensaje 'El promedio de las notas es: _____'.",
            //     en: "It must display the average with the message 'The average of the grades is: _____'.",
            //     pt: "Deve exibir a média com a mensagem 'A média das notas é: _____'."
            //   }]
            // }

          })
      }
    ]
  },
  {
    "id": "listas01-02",
    "prompt": "Realiza las tareas según la Actividad 02 - Veterinaria.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": { es: "animales = [\"Avestruz\", \"León\", \"Elefante\", \"Gorila\", \"Ballenas\", \"Caballo\", \"Gallina\", \"Hámster\", \"Perro\", \"Gato\"]", en: 'animals = ["Ostrich", "Lion", "Elephant", "Gorilla", "Whales", "Horse", "Hen", "Hamster", "Dog", "Cat"]' },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe extraer los animales domésticos, ordenarlos y almacenarlos en una variable.",
        "test": (assert) => assert
          .$custom(code => {
            const norm = code.replace(/\r/g, "");

            // === 1) Lista original de animales / animals ===
            const reEs = /\banimales\s*=\s*\[\s*"Avestruz"\s*,\s*"León"\s*,\s*"Elefante"\s*,\s*"Gorila"\s*,\s*"Ballenas"\s*,\s*"Caballo"\s*,\s*"Gallina"\s*,\s*"Hámster"\s*,\s*"Perro"\s*,\s*"Gato"\s*]/;
            const reEn = /\banimals\s*=\s*\[\s*"Ostrich"\s*,\s*"Lion"\s*,\s*"Elephant"\s*,\s*"Gorilla"\s*,\s*"Whales"\s*,\s*"Horse"\s*,\s*"Hen"\s*,\s*"Hamster"\s*,\s*"Dog"\s*,\s*"Cat"\s*]/;

            let baseName = null;
            if (reEs.test(norm)) {
              baseName = "animales";
            } else if (reEn.test(norm)) {
              baseName = "animals";
            } else {
              return [{
                es: "En tu código debes tener la lista de animales brindada por el ejercicio. Puedes reiniciar el código para recuperarla.",
                en: "In your code you must have the list of animals provided by the exercise. You can reset the code to recover it.",
                pt: "No seu código, você deve ter a lista de animais fornecida pelo exercício. Você pode redefinir o código para recuperá-la."
              }];
            }

            // === 2) Variable de domésticos ===
            let domName = null;
            if (/\banimalesDomesticos\b/.test(norm)) {
              domName = "animalesDomesticos";
            } else if (/\bdomesticAnimals\b/.test(norm)) {
              domName = "domesticAnimals";
            } else {
              return [{
                es: "En tu código debes declarar la variable 'animalesDomesticos' (o 'domesticAnimals').",
                en: "In your code you must declare the 'domesticAnimals' (or 'animalesDomesticos') variable.",
                pt: "No seu código, você deve declarar a variável 'domesticAnimals' (ou 'animalesDomesticos')."
              }];
            }

            // Debe ser un slice desde índice 5 hacia adelante, ej: base[5:] o base[5:10]
            const reDomSlice = new RegExp(
              `\\b${domName}\\s*=\\s*${baseName}\\s*\\[\\s*5\\s*:\\s*[^\\]]*\\]`
            );
            if (!reDomSlice.test(norm)) {
              return [{
                es: "Debes extraer los animales domésticos desde el índice 5 en adelante usando slicing sobre la lista original.",
                en: "You must extract the domestic animals from index 5 onwards using slicing on the original list.",
                pt: "Você deve extrair os animais domésticos a partir do índice 5 usando slicing na lista original."
              }];
            }

            // Debe ordenarse: domName.sort()
            const reDomSort = new RegExp(`\\b${domName}\\s*\\.\\s*sort\\s*\\(`);
            if (!reDomSort.test(norm)) {
              return [{
                es: "Debes ordenar los animales domésticos usando el método sort().",
                en: "You must sort the domestic animals using the sort() method.",
                pt: "Você deve ordenar os animais domésticos usando o método sort()."
              }];
            }

            // === 3) Variable de salvajes ===
            let wildName = null;
            if (/\banimalesSalvajes\b/.test(norm)) {
              wildName = "animalesSalvajes";
            } else if (/\bwildAnimals\b/.test(norm)) {
              wildName = "wildAnimals";
            } else {
              return [{
                es: "En tu código debes declarar la variable 'animalesSalvajes' (o 'wildAnimals').",
                en: "In your code you must declare the 'wildAnimals' (or 'animalesSalvajes') variable.",
                pt: "No seu código, você deve declarar a variável 'wildAnimals' (ou 'animalesSalvajes')."
              }];
            }

            // Slice de los primeros 5: [:5] o [0:5]
            const reWildSlice = new RegExp(
              `\\b${wildName}\\s*=\\s*${baseName}\\s*\\[(?:\\s*0\\s*:\\s*5\\s*|\\s*:\\s*5\\s*)\\]`
            );
            if (!reWildSlice.test(norm)) {
              return [{
                es: "Debes extraer los animales salvajes tomando los primeros 5 elementos de la lista original ([:5] o [0:5]).",
                en: "You must extract the wild animals using the first 5 elements of the original list ([:5] or [0:5]).",
                pt: "Você deve extrair os animais selvagens usando os primeiros 5 elementos da lista original ([:5] ou [0:5])."
              }];
            }

            // Debe ordenarse: wildName.sort()
            const reWildSort = new RegExp(`\\b${wildName}\\s*\\.\\s*sort\\s*\\(`);
            if (!reWildSort.test(norm)) {
              return [{
                es: "Debes ordenar los animales salvajes usando el método sort().",
                en: "You must sort the wild animals using the sort() method.",
                pt: "Você deve ordenar os animais selvagens usando o método sort()."
              }];
            }

            // === 4) Prints: mostrar ambas listas ===
            const hasPrintDom = new RegExp(`print\\s*\\(\\s*${domName}\\s*\\)`).test(norm);
            if (!hasPrintDom) {
              return [{
                es: "Debes usar print() para mostrar el contenido de la lista de animales domésticos.",
                en: "You must use print() to show the contents of the domestic animals list.",
                pt: "Você deve usar print() para mostrar o conteúdo da lista de animais domésticos."
              }];
            }

            const hasPrintWild = new RegExp(`print\\s*\\(\\s*${wildName}\\s*\\)`).test(norm);
            if (!hasPrintWild) {
              return [{
                es: "Debes usar print() para mostrar el contenido de la lista de animales salvajes.",
                en: "You must use print() to show the contents of the wild animals list.",
                pt: "Você deve usar print() para mostrar o conteúdo da lista de animais selvagens."
              }];
            }

            // ✅ Si llegó hasta acá, todo OK





            //VALIDACION VIEJA
            // if (!code.replace(/\s+/g, '').trim().includes('animales=[\"Avestruz\",\"León\",\"Elefante\",\"Gorila\",\"Ballenas\",\"Caballo\",\"Gallina\",\"Hámster\",\"Perro\",\"Gato\"]') && !code.replace(/\s+/g, '').trim().includes('animals=[\"Ostrich\",\"Lion\",\"Elephant\",\"Gorilla\",\"Whales\",\"Horse\",\"Hen\",\"Hamster\",\"Dog\",\"Cat\"]')) {
            //   return [{
            //     es: "En tu código debes tener la lista de animales brindado por el ejercicio. Puedes reiniciar el código para recuperarlo",
            //     en: "In your code you must have the list of animals provided by the exercise. You can reset the code to recover it.",
            //     pt: "No seu código, você deve ter a lista de animais fornecida pelo exercício. Você pode redefinir o código para recuperá-lo."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("animalesDomesticos=") && !code.replace(/\s+/g, '').trim().includes("domesticAnimals=")) {
            //   return [{
            //     es: "En tu código debes declarar la variable animalesDomesticos.",
            //     en: "In your code you must declare the domesticAnimals variable.",
            //     pt: "No seu código, você deve declarar a variável animalesDomesticos."
            //   }]
            // }
            // else if (!code.replace(/\s+/g, '').trim().includes("animalesDomesticos=animales[5:]") && !code.replace(/\s+/g, '').trim().includes("domesticAnimals=animals[5:]")) {
            //   return [{
            //     es: "En tu código debes extraer los animales domésticos presentes en la variable animalesDomesticos. Recuerda utilizar la técnica correspondiente.",
            //     en: "In your code you must extract the domestic animals present in the domesticAnimals variable. Remember to use the corresponding technique.",
            //     pt: "No seu código, você deve extrair os animais domésticos presentes na variável animalesDomesticos. Lembre-se de usar a técnica correspondente."

            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("animalesDomesticos.sort()") && !code.replace(/\s+/g, '').trim().includes("domesticAnimals.sort()")) {
            //   return [{
            //     es: "Debe ordenar los animales domésticos correctamente.",
            //     en: "It must sort the domestic animals correctly.",
            //     pt: "Deve ordenar os animais domésticos corretamente."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("animalesSalvajes=") && !code.replace(/\s+/g, '').trim().includes("wildAnimals=")) {
            //   return [{
            //     es: "En tu código debes declarar la variable animalesSalvajes.",
            //     en: "In your code you must declare the wildAnimals variable.",
            //     pt: "No seu código, você deve declarar a variável animalesSalvajes."
            //   }]
            // }
            // else if (!code.replace(/\s+/g, '').trim().includes("animalesSalvajes=animales[:5]") && !code.replace(/\s+/g, '').trim().includes("wildAnimals=animals[:5]") && !code.replace(/\s+/g, '').trim().includes("animalesSalvajes=animales[0:5]") && !code.replace(/\s+/g, '').trim().includes("wildAnimals=animals[0:5]")) {
            //   return [{
            //     es: "En tu código debes extraer los animales salvajes presentes en la variable animalesSalvajes. Recuerda utilizar la técnica correspondiente.",
            //     en: "In your code you must extract the wild animals present in the animals variable. Remember to use the corresponding technique.",
            //     pt: "No seu código, você deve extrair os animais selvagens presentes na variável animalesSalvajes. Lembre-se de usar a técnica correspondente."
            //   }]
            // } else if (!code.includes("animalesSalvajes.sort()") && !code.includes("wildAnimals.sort()")) {
            //   return [{
            //     es: "Debes aplicar el método correspondiente sobre la variable animalesSalvajes para ordenar su contenido alfabéticamente.",
            //     en: "You must apply the corresponding method on the wildAnimals variable to sort its content alphabetically.",
            //     pt: "Você deve aplicar o método correspondente na variável wildAnimals para classificar seu conteúdo em ordem alfabética."
            //   }]
            // } else if (!code.includes("print(animalesDomesticos)") && !code.includes("print(domesticAnimals)")) {
            //   return [{
            //     es: "En tu código debes utilizar el método print() para mostrar el valor almacenado en la variable animalesDomesticos.",
            //     en: "In your code you must use the print() method to display the value stored in the domesticAnimals variable.",
            //     pt: "No seu código, você deve usar o método print() para exibir o valor armazenado na variável animalesDomesticos."
            //   }]
            // } else if (!code.includes("print(animalesSalvajes)") && !code.includes("print(wildAnimals)")) {
            //   return [{
            //     es: "En tu código debes utilizar el método print() para mostrar el valor almacenado en la variable animalesSalvajes.",
            //     en: "In your code you must use the print() method to display the value stored in the wildAnimals variable.",
            //     pt: "No seu código, você deve usar o método print() para exibir o valor armazenado na variável animalesSalvajes."
            //   }]
            // }

          })
      }
    ]
  },
  {
    "id": "listas01-03",
    "prompt": "Realiza las tareas según la Actividad 03 - Verdulería.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": { es: "frutas = [\"pistacho\", \"Mandarina\", \"Patata\", \"Naranja\", \"Pomelo\", \"Coco\", \"Tomate\", \"Kiwi\", \"Mango\", \"Cebolla\"]", en: 'fruits = ["pistachio", "mandarin", "potato", "orange", "grapefruit", "coconut", "tomato", "kiwi", "mango", "onion"]' },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe cambiar 'Patata' por 'Fresa', 'Tomate' por 'Manzana' y 'Cebolla' por 'Durazno'.",
        "test": (assert) => assert
          .$custom(code => {

            const norm = code.replace(/\r/g, "");
            const compact = norm.replace(/\s+/g, "").trim();

            // === 1) Lista base de frutas / fruits ===
            const baseEs = /frutas\s*=\s*\[\s*"pistacho"\s*,\s*"Mandarina"\s*,\s*"Patata"\s*,\s*"Naranja"\s*,\s*"Pomelo"\s*,\s*"Coco"\s*,\s*"Tomate"\s*,\s*"Kiwi"\s*,\s*"Mango"\s*,\s*"Cebolla"\s*]/;
            const baseEn = /fruits\s*=\s*\[\s*"pistachio"\s*,\s*"mandarin"\s*,\s*"potato"\s*,\s*"orange"\s*,\s*"grapefruit"\s*,\s*"coconut"\s*,\s*"tomato"\s*,\s*"kiwi"\s*,\s*"mango"\s*,\s*"onion"\s*]/;

            let listName = null;
            if (baseEs.test(norm)) {
              listName = "frutas";
            } else if (baseEn.test(norm)) {
              listName = "fruits";
            } else {
              return [{
                es: "En tu código debes tener la lista de frutas brindada por el ejercicio. Puedes reiniciar el código para recuperarla.",
                en: "In your code you must have the list of fruits provided by the exercise. You can reset the code to recover it.",
                pt: "No seu código, você deve ter a lista de frutas fornecida pelo exercício. Você pode redefinir o código para recuperá-la."
              }];
            }

            const isES = (listName === "frutas");

            // === 2) Reemplazos por índice ===
            // índice 2: Patata -> Fresa / Potato -> Strawberry
            const expectedIdx2 = isES
              ? `${listName}[2]="Fresa"`
              : `${listName}[2]="Strawberry"`;
            if (!compact.includes(expectedIdx2)) {
              return [{
                es: 'Debes modificar la lista de frutas, reemplazando "Patata" por "Fresa" en el índice 2.',
                en: 'You must modify the fruits list, replacing "Potato" with "Strawberry" at index 2.',
                pt: 'Você deve modificar a lista de frutas, substituindo "Batata" por "Morango" no índice 2.'
              }];
            }

            // índice 6: Tomate -> Manzana / Tomato -> Apple
            const expectedIdx6 = isES
              ? `${listName}[6]="Manzana"`
              : `${listName}[6]="Apple"`;
            if (!compact.includes(expectedIdx6)) {
              return [{
                es: 'Debes modificar la lista de frutas, reemplazando "Tomate" por "Manzana" en el índice 6.',
                en: 'You must modify the fruits list, replacing "Tomato" with "Apple" at index 6.',
                pt: 'Você deve modificar a lista de frutas, substituindo "Tomate" por "Maçã" no índice 6.'
              }];
            }

            // índice 9: Cebolla -> Durazno / Onion -> Peach
            const expectedIdx9 = isES
              ? `${listName}[9]="Durazno"`
              : `${listName}[9]="Peach"`;
            if (!compact.includes(expectedIdx9)) {
              return [{
                es: 'Debes modificar la lista de frutas, reemplazando "Cebolla" por "Durazno" en el índice 9.',
                en: 'You must modify the fruits list, replacing "Onion" with "Peach" at index 9.',
                pt: 'Você deve modificar a lista de frutas, substituindo "Cebola" por "Pêssego" no índice 9.'
              }];
            }

            // === 3) Ordenar alfabéticamente con sort() ===
            const sortRe = new RegExp(`\\b${listName}\\s*\\.\\s*sort\\s*\\(`);
            if (!sortRe.test(norm)) {
              return [{
                es: "Debes aplicar el método sort() sobre la lista de frutas para ordenarla alfabéticamente.",
                en: "You must apply the sort() method on the fruits list to sort it alphabetically.",
                pt: "Você deve aplicar o método sort() na lista de frutas para ordená-la alfabeticamente."
              }];
            }

            // === 4) Mostrar lista tras ordenar ===
            const printSorted = new RegExp(`print\\s*\\(\\s*${listName}\\s*\\)`);
            if (!printSorted.test(norm)) {
              return [{
                es: "Debes usar print() para mostrar la lista de frutas después de ordenarla.",
                en: "You must use print() to show the fruits list after sorting it.",
                pt: "Você deve usar print() para mostrar a lista de frutas após ordená-la."
              }];
            }

            // === 5) Condicional: "maracuyá" in lista ===
            const condRe = new RegExp(`if\\s*["']maracuyá["']\\s*in\\s*${listName}`);
            if (!condRe.test(compact)) {
              return [{
                es: 'Debes declarar un condicional que evalúe si "maracuyá" se encuentra en la lista de frutas usando la sintaxis: if "maracuyá" in frutas:',
                en: 'You must declare a conditional that checks if "maracuyá" is in the fruits list using the syntax: if "maracuyá" in fruits:',
                pt: 'Você deve declarar um condicional que verifica se "maracuyá" está na lista de frutas usando a sintaxe: if "maracuyá" in fruits:'
              }];
            }

            // Mensaje si hay maracuyá
            const msgYesEs = 'print("Sí,haymaracuyá")';
            const msgYesEn = 'print("Yes,thereismaracuyá")';
            if (!compact.includes(msgYesEs) && !compact.includes(msgYesEn)) {
              return [{
                es: 'Si el resultado es verdadero, debes imprimir: "Sí, hay maracuyá".',
                en: 'If the result is true, you must print: "Yes, there is maracuyá".',
                pt: 'Se o resultado for verdadeiro, você deve imprimir: "Sim, há maracuyá".'
              }];
            }

            // Debe haber else
            if (!/\belse\s*:/.test(norm)) {
              return [{
                es: "Debes utilizar un bloque else para manejar el caso en que no haya maracuyá.",
                en: "You must use an else block to handle the case when there is no maracuyá.",
                pt: "Você deve usar um bloco else para tratar o caso em que não há maracuyá."
              }];
            }

            // Mensaje si NO hay maracuyá
            const msgNoEs = 'print("Nohaymaracuyá")';
            const msgNoEn = 'print("Thereisnomaracuyá")';
            if (!compact.includes(msgNoEs) && !compact.includes(msgNoEn)) {
              return [{
                es: 'Si el resultado es falso, debes imprimir: "No hay maracuyá".',
                en: 'If the result is false, you must print: "There is no maracuyá".',
                pt: 'Se o resultado for falso, você deve imprimir: "Não há maracuyá".'
              }];
            }

            // === 6) Invertir la lista y mostrarla ===
            const reverseRe = new RegExp(`\\b${listName}\\s*\\.\\s*reverse\\s*\\(`);
            if (!reverseRe.test(norm)) {
              return [{
                es: "Debes aplicar el método reverse() sobre la lista de frutas para invertir su orden.",
                en: "You must apply the reverse() method on the fruits list to invert its order.",
                pt: "Você deve aplicar o método reverse() na lista de frutas para inverter sua ordem."
              }];
            }

            // Algún print(lista) (idealmente luego de reverse, pero al menos que exista)
            const printAny = new RegExp(`print\\s*\\(\\s*${listName}\\s*\\)`);
            if (!printAny.test(norm)) {
              return [{
                es: "Debes utilizar print() para mostrar la lista de frutas después de invertir su orden.",
                en: "You must use print() to show the fruits list after reversing its order.",
                pt: "Você deve usar print() para mostrar a lista de frutas depois de inverter sua ordem."
              }];
            }

            // ✅ Si llegó hasta acá, todo OK


            //VALIDACION VIEJA
            // if (!code.replace(/\s+/g, '').trim().includes('frutas=[\"pistacho\",\"Mandarina\",\"Patata\",\"Naranja\",\"Pomelo\",\"Coco\",\"Tomate\",\"Kiwi\",\"Mango\",\"Cebolla\"]') && !code.replace(/\s+/g, '').trim().includes('fruits=[\"pistachio\",\"mandarin\",\"potato\",\"orange\",\"grapefruit\",\"coconut\",\"tomato\",\"kiwi\",\"mango\",\"onion"]')) {
            //   return [{
            //     es: "En tu código debes tener la lista de frutas brindado por el ejercicio. Puedes reiniciar el código para recuperarlo.",
            //     en: "In your code you must have the list of fruits provided by the exercise. You can reset the code to recover it.",
            //     pt: "No seu código, você deve ter a lista de frutas fornecida pelo exercício. Você pode redefinir o código para recuperá-lo."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("frutas[2]=\"Fresa\"") && !code.replace(/\s+/g, '').trim().includes("fruits[2]=\"Strawberry\"")) {
            //   return [{
            //     es: ' En tu código debes modificar la lista de frutas, remplazando "Patata" por "Fresa".',
            //     en: ' In your code you must modify the list of fruits, replacing "Potato" with "Strawberry".',
            //     pt: ' No seu código, você deve modificar a lista de frutas, substituindo "Batata" por "Morango".'
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("frutas[6]=\"Manzana\"") && !code.replace(/\s+/g, '').trim().includes("fruits[6]=\"Apple\"")) {
            //   return [{
            //     es: 'En tu código debes modificar la lista de frutas, remplazando "Tomate" por "Manzana".',
            //     en: 'In your code you must modify the list of fruits, replacing "Tomato" with "Apple".',
            //     pt: 'No seu código, você deve modificar a lista de frutas, substituindo "Tomate" por "Maçã".'
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("frutas[9]=\"Durazno\"") && !code.replace(/\s+/g, '').trim().includes("fruits[9]=\"Peach\"")) {
            //   return [{
            //     es: 'En tu código debes modificar la lista de frutas, remplazando "Cebolla" por "Durazno".',
            //     en: 'In your code you must modify the list of fruits, replacing "Onion" with "Peach".',
            //     pt: 'No seu código, você deve modificar a lista de frutas, substituindo "Cebola" por "Pêssego".'
            //   }]
            // } else if (!code.includes("frutas.sort()") && !code.includes("fruits.sort()")) {
            //   return [{
            //     es: "Debes aplicar el método correspondiente sobre la variable frutas para ordenar su contenido alfabéticamente.",
            //     en: "You must apply the corresponding method on the fruits variable to sort its content alphabetically.",
            //     pt: "Você deve aplicar o método correspondente na variável fruits para classificar seu conteúdo em ordem alfabética."
            //   }]
            // } else if (!code.includes("print(frutas)") && !code.includes("print(fruits)")) {
            //   return [{
            //     es: "En tu código debes utilizar el método print() para mostrar el valor almacenado en la variable frutas luego de haber ordenado su contenido.",
            //     en: "In your code you must use the print() method to display the value stored in the fruits variable after sorting its content.",
            //     pt: "No seu código, você deve usar o método print() para exibir o valor armazenado na variável frutas após ordenar seu conteúdo."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes('if"maracuyá"infrutas') && !code.replace(/\s+/g, '').trim().includes('if"maracuyá"infruits')) {
            //   return [{
            //     es: 'Debes declarar un condicional que evalúe si "maracuyá" se encuentra en frutas. Revisa colocar correctamente su sintaxís',
            //     en: 'You must declare a conditional that evaluates if "maracuyá" is in fruits. Check to correctly place its syntax',
            //     pt: 'Você deve declarar um condicional que avalie se "maracuyá" está em frutas. Verifique se coloca corretamente sua sintaxe'
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes('print("Sí,haymaracuyá")') && !code.replace(/\s+/g, '').trim().includes('print("Yes,thereismaracuyá")')) {
            //   return [{
            //     es: 'Dentro del condicional, si el resultado es verdadero debe imprimirse en consola el texto: Sí, hay maracuyá.',
            //     en: 'Within the conditional, if the result is true, the text must be printed on the console: Yes, there is maracuyá.',
            //     pt: 'Dentro do condicional, se o resultado for verdadeiro, o texto deve ser impresso no console: Sim, há maracuyá.'
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes('if"maracuyá"infrutas:print("Sí,haymaracuyá")') && !code.replace(/\s+/g, '').trim().includes('if"maracuyá"infruits:print("Yes,thereismaracuyá")')) {
            //   return [{
            //     es: 'Dentro del condicional, si el resultado es verdadero debe imprimirse en consola el texto: Sí, hay uvas.',
            //     en: 'Within the conditional, if the result is true, the text must be printed on the console: Yes, there are grapes.',
            //     pt: 'Dentro do condicional, se o resultado for verdadeiro, o texto deve ser impresso no console: Sim, há uvas.'
            //   }]
            // }
            // else if (!code.includes("else:")) {
            //   return [{
            //     es: "Debes utilizar un else para mostrar el mensaje 'No hay maracuyá' si no está en la lista.",
            //     en: "You must use an else to display the message 'There is no maracuyá' if it is not in the list.",
            //     pt: "Você deve usar um else para exibir a mensagem 'Não há maracuyá' se não estiver na lista."
            //   }]
            // }
            // else if (!code.replace(/\s+/g, '').trim().includes('print("Nohaymaracuyá")') && !code.replace(/\s+/g, '').trim().includes('print("Thereisnomaracuyá")')) {
            //   return [{
            //     es: 'Dentro del condicional, si el resultado es falso debe imprimirse en consola el texto: No hay maracuyá.',
            //     en: 'Within the conditional, if the result is false, the text must be printed on the console: There is no maracuyá.',
            //     pt: 'Dentro do condicional, se o resultado for falso, o texto deve ser impresso no console: Não há maracuyá.'
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("frutas.reverse()") && !code.includes("fruits.reverse()")) {
            //   return [{
            //     es: "Debes aplicar el método correspondiente sobre la variable frutas para invertir el orden de su contenido.",
            //     en: "You must apply the corresponding method on the fruits variable to reverse the order of its content.",
            //     pt: "Você deve aplicar o método correspondente na variável frutas para inverter a ordem de seu conteúdo."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("print(frutas)") && !code.replace(/\s+/g, '').trim().includes("print(fruits)")) {
            //   return [{
            //     es: "En tu código debes utilizar el método print() para mostrar el valor almacenado en la variable frutas.",
            //     en: "In your code you must use the print() method to display the value stored in the fruits variable.",
            //     pt: "No seu código, você deve usar o método print() para exibir o valor armazenado na variável frutas."
            //   }]
            // }


          })
      }

    ]
  },
  {
    "id": "listas02-01",
    "prompt": "Realiza las tareas según la Actividad 01 - Arcade 01.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe crear una lista con los puntajes.",
        "test": (assert) => assert
          .$custom(code => {

            const norm = code.replace(/\r/g, "");
            const compact = norm.replace(/\s+/g, "").trim();

            const errors = [];

            // === 1) Detectar nombres de variables (ES / EN) ===
            let listName = null;
            if (compact.includes("puntajes=[]")) {
              listName = "puntajes";
            } else if (compact.includes("scores=[]")) {
              listName = "scores";
            } else {
              errors.push({
                es: "Debe crear una lista vacía llamada 'puntajes'.",
                en: "You must create an empty list called 'scores'.",
                pt: "Você deve criar uma lista vazia chamada 'scores'."
              });
            }

            let counterName = null;
            if (compact.includes("contador=0")) {
              counterName = "contador";
            } else if (compact.includes("counter=0")) {
              counterName = "counter";
            } else {
              errors.push({
                es: "Debe crear una variable 'contador' con valor 0.",
                en: "You must create a 'counter' variable with value 0.",
                pt: "Você deve criar uma variável 'counter' com valor 0."
              });
            }

            let countVar = null;
            if (/cantidadPuntajes\s*=/.test(norm)) {
              countVar = "cantidadPuntajes";
            } else if (/scoreAmount\s*=/.test(norm)) {
              countVar = "scoreAmount";
            } else {
              errors.push({
                es: "Debes crear la variable 'cantidadPuntajes' para almacenar cuántos puntajes ingresará el usuario.",
                en: "You must create the 'scoreAmount' variable to store how many scores the user will enter.",
                pt: "Você deve criar a variável 'scoreAmount' para armazenar quantas pontuações o usuário irá inserir."
              });
            }

            // Si ya hay algún error de nombres, devolvemos el primero
            if (errors.length > 0) return [errors[0]];

            // === 2) Lista inicial y removes ===
            const app = (n) =>
              new RegExp(`${listName}\\.append\\s*\\(\\s*${n}\\s*\\)`).test(norm);

            if (!app(1000)) {
              return [{
                es: "Debe agregar el puntaje 1000 a la lista con append().",
                en: "You must add the score 1000 to the list with append().",
                pt: "Você deve adicionar a pontuação 1000 à lista com append()."
              }];
            }
            if (!app(920)) {
              return [{
                es: "Debe agregar el puntaje 920 a la lista con append().",
                en: "You must add the score 920 to the list with append().",
                pt: "Você deve adicionar a pontuação 920 à lista com append()."
              }];
            }
            if (!app(830)) {
              return [{
                es: "Debe agregar el puntaje 830 a la lista con append().",
                en: "You must add the score 830 to the list with append().",
                pt: "Você deve adicionar a pontuação 830 à lista com append()."
              }];
            }
            if (!app(750)) {
              return [{
                es: "Debe agregar el puntaje 750 a la lista con append().",
                en: "You must add the score 750 to the list with append().",
                pt: "Você deve adicionar a pontuação 750 à lista com append()."
              }];
            }

            const rem = (n) =>
              new RegExp(`${listName}\\.remove\\s*\\(\\s*${n}\\s*\\)`).test(norm);

            if (!rem(920) || !rem(830) || !rem(750)) {
              return [{
                es: "Debe eliminar de la lista los puntajes 920, 830 y 750 usando remove().",
                en: "You must remove the scores 920, 830 and 750 from the list using remove().",
                pt: "Você deve remover as pontuações 920, 830 e 750 da lista usando remove()."
              }];
            }

            // === 3) Primer input: cantidad de puntajes ===
            const inputs = [...norm.matchAll(/input\s*\(\s*["'](.*?)["']\s*\)/g)].map(m => m[1] ?? "");
            const firstQuestion = inputs[0] ?? "";

            if (!firstQuestion) {
              return [{
                es: "El mensaje del primer input (para la cantidad de puntajes) no puede estar vacío.",
                en: "The message of the first input (for the amount of scores) cannot be empty.",
                pt: "A mensagem do primeiro input (para a quantidade de pontuações) não pode estar vazia."
              }];
            }

            if (countVar === "cantidadPuntajes" && !/puntajes|puntaje/i.test(firstQuestion)) {
              return [{
                es: `La pregunta del primer input "${firstQuestion}" no es válida porque no menciona "puntajes" o "puntaje".`,
                en: `The first input question "${firstQuestion}" is not valid because it does not mention "scores".`,
                pt: `A pergunta do primeiro input "${firstQuestion}" não é válida porque não menciona "pontuações".`
              }];
            }

            if (countVar === "scoreAmount" && !/score|scores/i.test(firstQuestion)) {
              return [{
                es: `La pregunta del primer input "${firstQuestion}" no es válida porque no menciona "score" o "scores".`,
                en: `The first input question "${firstQuestion}" is not valid because it does not mention "score" or "scores".`,
                pt: `A pergunta do primeiro input "${firstQuestion}" não é válida porque não menciona "score" ou "scores".`
              }];
            }

            // === 4) while not cantidadPuntajes.isdigit() ===
            const whileDigit = `whilenot${countVar}.isdigit():`;
            if (!compact.includes(whileDigit)) {
              return [{
                es: `Debe incluir un bucle while para validar que ${countVar} sea un número usando .isdigit().`,
                en: `You must include a while loop to validate that ${countVar} is a number using .isdigit().`,
                pt: `Você deve incluir um loop while para validar que ${countVar} é um número usando .isdigit().`
              }];
            }

            // ✅ dentro de ese while, debe volver a pedir la cantidad
            if (!compact.includes(`${whileDigit}${countVar}=input(`)) {
              return [{
                es: "Dentro del while que valida .isdigit(), debes volver a solicitar la cantidad de puntajes al usuario.",
                en: "Inside the while that checks .isdigit(), you must request the amount of scores again.",
                pt: "Dentro do while que verifica .isdigit(), você deve solicitar novamente a quantidade de pontuações."
              }];
            }

            // 1) Tiene que existir el while
            if (
              !compact.includes(`whilecontador<int(cantidadPuntajes):`) &&
              !compact.includes(`whilecounter<int(scoreAmount):`)
            ) {
              return [{
                es: "Debes crear un bucle while que compare el contador con la cantidad de puntajes.",
                en: "You must create a while loop comparing counter with the amount of scores.",
                pt: "Você deve criar um loop while comparando o contador com a quantidade de pontuações."
              }];
            }

            // 2) Dentro del while debe aparecer contador+=1 (NO necesariamente en la misma línea)
            if (
              !compact.includes(`contador+=1`) &&
              !compact.includes(`counter+=1`)
            ) {
              return [{
                es: "Dentro del while debes incrementar el contador en 1 en cada iteración.",
                en: "Inside the while you must increment the counter by 1 on each iteration.",
                pt: "Dentro do while você deve incrementar o contador em 1 a cada iteração."
              }];
            }

            // === 6) Input de cada puntaje y append(int(puntaje)) ===
            const scoreVar = listName === "puntajes" ? "puntaje" : "score";

            const inputInsideWhile = new RegExp(`${counterName}\\+=1${scoreVar}=input\\(`);
            if (!inputInsideWhile.test(compact)) {
              return [{
                es: `Dentro del while, debes pedir cada ${scoreVar} al usuario con input().`,
                en: `Inside the while, you must ask the user for each ${scoreVar} with input().`,
                pt: `Dentro do while, você deve pedir cada ${scoreVar} ao usuário com input().`
              }];
            }

            // El mensaje de este input (último input del código)
            const lastQuestion = inputs[inputs.length - 1] ?? "";
            if (!lastQuestion) {
              return [{
                es: "El mensaje del input dentro del while no debe estar vacío.",
                en: "The input message inside the while must not be empty.",
                pt: "A mensagem do input dentro do while não deve estar vazia."
              }];
            }

            if (scoreVar === "puntaje" && !/puntaje|ingreseelpuntaje/i.test(lastQuestion)) {
              return [{
                es: `La pregunta del input "${lastQuestion}" no es válida porque no menciona "puntaje" o "ingrese el puntaje".`,
                en: `The input question "${lastQuestion}" is not valid because it does not mention "puntaje" or "ingrese el puntaje".`,
                pt: `A pergunta do input "${lastQuestion}" não é válida porque não menciona "pontuação" ou "insira a pontuação".`
              }];
            }

            if (scoreVar === "score" && !/score|enterthescore/i.test(lastQuestion)) {
              return [{
                es: `La pregunta del input "${lastQuestion}" no es válida porque no menciona "score" o "enter the score".`,
                en: `The input question "${lastQuestion}" is not valid because it does not mention "score" or "enter the score".`,
                pt: `A pergunta do input "${lastQuestion}" não é válida porque não menciona "score" ou "enter the score".`
              }];
            }

            // Append del puntaje como int
            const appendRe = new RegExp(`${listName}\\.append\\s*\\(\\s*int\\s*\\(\\s*${scoreVar}\\s*\\)\\s*\\)`);
            if (!appendRe.test(norm)) {
              return [{
                es: "Debes agregar el puntaje ingresado por el usuario a la lista convirtiéndolo a entero con int().",
                en: "You must add the score entered by the user to the list, converting it to integer with int().",
                pt: "Você deve adicionar a pontuação inserida pelo usuário à lista, convertendo-a para inteiro com int()."
              }];
            }

            // === 7) Mensaje final y print de la lista ===
            const msgReEs = /print\s*\(\s*["']Los mejores puntajes son:\s*["']\s*\)/;
            const msgReEn = /print\s*\(\s*["']The best scores are:\s*["']\s*\)/;

            if (!msgReEs.test(norm) && !msgReEn.test(norm)) {
              return [{
                es: "Debe mostrar el texto 'Los mejores puntajes son:' antes de imprimir la lista.",
                en: "You must display the text 'The best scores are:' before printing the list.",
                pt: "Você deve exibir o texto 'Os melhores pontuações são:' antes de imprimir a lista."
              }];
            }

            const printListRe = new RegExp(`print\\s*\\(\\s*${listName}\\s*\\)`);
            if (!printListRe.test(norm)) {
              return [{
                es: "Debe mostrar los puntajes por consola usando print(puntajes).",
                en: "You must display the scores in the console using print(scores).",
                pt: "Você deve exibir as pontuações no console usando print(scores)."
              }];
            }

            // ✅ Si llegó hasta acá, todo OK
            return [];




            //VALIDACION VIEJA
            // if (!code.replace(/\s/g, '').trim().includes("puntajes=[]") && !code.replace(/\s/g, '').trim().includes("scores=[]")) {
            //   return [{
            //     es: "Debe crear una lista llamada 'puntajes' vacia.",
            //     en: "It must create an empty list called 'scores'.",
            //     pt: "Deve criar uma lista vazia chamada 'scores'."
            //   }]
            // } else if (!code.includes("puntajes.append(1000)") && !code.includes("scores.append(1000)")) {
            //   return [{
            //     es: "Debe agregar el puntaje 1000 a la lista.",
            //     en: "It must add the score 1000 to the list.",
            //     pt: "Deve adicionar a pontuação 1000 à lista."
            //   }]
            // } else if (!code.includes("puntajes.append(920)") && !code.includes("scores.append(920)")) {
            //   return [{
            //     es: "Debe agregar el puntaje 920 a la lista.",
            //     en: "It must add the score 920 to the list.",
            //     pt: "Deve adicionar a pontuação 920 à lista."
            //   }]
            // } else if (!code.includes("puntajes.append(830)") && !code.includes("scores.append(830)")) {
            //   return [{
            //     es: "Debe agregar el puntaje 830 a la lista.",
            //     en: "It must add the score 830 to the list.",
            //     pt: "Deve adicionar a pontuação 830 à lista."
            //   }]
            // } else if (!code.includes("puntajes.append(750)") && !code.includes("scores.append(750)")) {
            //   return [{
            //     es: "Debe agregar el puntaje 750 a la lista.",
            //     en: "It must add the score 750 to the list.",
            //     pt: "Deve adicionar a pontuação 750 à lista."
            //   }]
            // }
            // else if (!code.includes("puntajes.remove(920)") && !code.includes("scores.remove(920)")) {
            //   return [{
            //     es: "Debe eliminar los puntajes 920, 830 y 750.",
            //     en: "It must remove the scores 920, 830 and 750.",
            //     pt: "Deve remover as pontuações 920, 830 e 750."
            //   }]
            // } else if (!code.includes("puntajes.remove(830)") && !code.includes("scores.remove(830)")) {
            //   return [{
            //     es: "Debe eliminar los puntajes 920, 830 y 750.",
            //     en: "It must remove the scores 920, 830 and 750.",
            //     pt: "Deve remover as pontuações 920, 830 e 750."
            //   }]
            // } else if (!code.includes("puntajes.remove(750)") && !code.includes("scores.remove(750)")) {
            //   return [{
            //     es: "Debe eliminar los puntajes 920, 830 y 750.",
            //     en: "It must remove the scores 920, 830 and 750.",
            //     pt: "Deve remover as pontuações 920, 830 e 750."
            //   }]
            // } else if (!code.replace(/\s/g, '').trim().includes("contador=0") && !code.replace(/\s/g, '').trim().includes("counter=0")) {
            //   return [{
            //     es: "Debe crear una variable contador con valor 0.",
            //     en: "It must create a counter variable with value 0.",
            //     pt: "Deve criar uma variável contador com valor 0."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("cantidadPuntajes=") && !code.replace(/\s+/g, '').trim().includes("scoreAmount=")) {
            //   return [{
            //     es: "Debes crear la variable cantidadPuntajes para almacenar los puntajes ingresado por el usuario.",
            //     en: "You must create the scoreAmount variable to store the scores entered by the user.",
            //     pt: "Você deve criar a variável scoreAmount para armazenar as pontuações inseridas pelo usuário."
            //   }]
            // }
            // if (code.replace(/\s+/g, '').trim().includes("cantidadPuntajes=input(")) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   // console.log(lineasInput[0]);

            //   const preguntaLista = lineasInput[0].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la preguntaLista
            //   if (preguntaLista.length < 1) {
            //     return [{
            //       es: "El mensaje del input no puede estar vacío.",
            //       en: "The input message cannot be empty.",
            //       pt: "A mensagem de entrada não pode estar vazia."
            //     }]
            //   }
            //   if (preguntaLista) {
            //     const contieneEdadOAnios = /puntajes|puntaje/i.test(preguntaLista);
            //     if (!contieneEdadOAnios) {
            //       seguirValidando = false
            //       // console.log("La pregunta del input no es válida porque no menciona 'puntajes' o 'puntaje'.");
            //       return [{
            //         es: 'La pregunta del input "' + preguntaLista + '" no es válida porque no menciona "puntajes" o "puntaje".',
            //         en: 'The input question ' + preguntaLista + ' is not valid because it does not mention "puntajes" or "puntaje".',
            //         pt: 'A pergunta do input ' + preguntaLista + ' não é válida porque não menciona "puntajes" ou "puntaje".'
            //       }]
            //     }

            //   }
            // } else if (code.replace(/\s+/g, '').trim().includes("scoreAmount=input(")) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   // console.log(lineasInput[0]);

            //   const preguntaLista = lineasInput[0].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la preguntaLista
            //   if (preguntaLista.length < 1) {
            //     return [{
            //       es: "El mensaje del input no puede estar vacío.",
            //       en: "The input message cannot be empty.",
            //       pt: "A mensagem de entrada não pode estar vazia."
            //     }]
            //   }
            //   if (preguntaLista) {
            //     const contieneEdadOAnios = /score|scores/i.test(preguntaLista);
            //     if (!contieneEdadOAnios) {
            //       seguirValidando = false
            //       // console.log("La pregunta del input no es válida porque no menciona 'puntajes' o 'puntaje'.");
            //       return [{
            //         es: 'La pregunta del input "' + preguntaLista + '" no es válida porque no menciona "puntajes" o "puntaje".',
            //         en: 'The input question ' + preguntaLista + ' is not valid because it does not mention "scores" or "score".',
            //         pt: 'A pergunta do input ' + preguntaLista + ' não é válida porque não menciona "puntajes" ou "puntaje".'
            //       }]
            //     }

            //   }
            // }
            // else {
            //   return [{
            //     es: "Debes solicitar la cantidad de puntajes al usuario.",
            //     en: "You must request the amount of scores from the user.",
            //     pt: "Você deve solicitar a quantidade de pontuações ao usuário."
            //   }]
            // }



            // if (!code.replace(/\s+/g, '').trim().includes("whilenotcantidadPuntajes.isdigit():") && !code.replace(/\s+/g, '').trim().includes("whilenotscoreAmount.isdigit():")) {
            //   return [{
            //     es: "Debe incluir un bucle while para validar que cantidadPuntajes sea un número.",
            //     en: "You must include a while loop to validate that scoreAmount is a number.",
            //     pt: "Você deve incluir um loop while para validar que scoreAmount é um número."
            //   }]
            // } else if (code.replace(/\s+/g, '').trim().includes("whilenotcantidadPuntajes.isdigit():cantidadPuntajes=input(")) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   // console.log(lineasInput[1]);
            //   const preguntaLista = lineasInput[1].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la preguntaLista
            //   if (preguntaLista) {
            //     const contieneEdadOAnios = /puntajes|puntaje/i.test(preguntaLista);
            //     if (!contieneEdadOAnios) {
            //       seguirValidando = false
            //       // console.log("La pregunta del input no es válida porque no menciona 'puntajes' o 'puntaje'.");
            //       return [{
            //         es: 'La pregunta del input "' + preguntaLista + '" no es válida porque no menciona "puntajes" o "puntaje".',
            //         en: 'The input question ' + preguntaLista + ' is not valid because it does not mention "puntajes" or "puntaje".',
            //         pt: 'A pergunta do input ' + preguntaLista + ' não é válida porque não menciona "puntajes" ou "puntaje".'
            //       }]
            //     }
            //   }
            // } else if (code.replace(/\s+/g, '').trim().includes("whilenotscoreAmount.isdigit():scoreAmount=input(")) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   // console.log(lineasInput[1]);
            //   const preguntaLista = lineasInput[1].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la preguntaLista
            //   if (preguntaLista.length < 1) {
            //     return [{
            //       es: "El mensaje del input dentro del while no puede estar vacío.",
            //       en: "The input message inside the while cannot be empty.",
            //       pt: "A mensagem de entrada dentro do while não pode estar vazia."
            //     }]
            //   }
            //   if (preguntaLista) {
            //     const contieneEdadOAnios = /score|scores/i.test(preguntaLista);
            //     if (!contieneEdadOAnios) {
            //       seguirValidando = false
            //       // console.log("La pregunta del input no es válida porque no menciona 'puntajes' o 'puntaje'.");
            //       return [{
            //         es: 'La pregunta del input "' + preguntaLista + '" no es válida porque no menciona "puntajes" o "puntaje".',
            //         en: 'The input question ' + preguntaLista + ' is not valid because it does not mention "scores" or "score".',
            //         pt: 'A pergunta do input ' + preguntaLista + ' não é válida porque não menciona "puntajes" ou "puntaje".'
            //       }]
            //     }
            //   }
            // }
            // else {
            //   return [{
            //     es: "En caso de que el usuario no ingrese un número, debes solicitar nuevamente la cantidad de puntajes nuevamente.",
            //     en: "If the user does not enter a number, you must request the number of scores again.",
            //     pt: "Se o usuário não inserir um número, você deve solicitar a quantidade de pontuações novamente."
            //   }]
            // }


            // if (!code.replace(/\s+/g, '').trim().includes("whilecontador<int(cantidadPuntajes):") && !code.replace(/\s+/g, '').trim().includes("whilecounter<int(scoreAmount):")) {
            //   return [{
            //     es: "Debes crear un bucle while que se ejecute mientras contador sea menor a cantidadPuntajes. Recuerda convertir cantidadPuntajes a entero.",
            //     en: "You must create a while loop that runs while counter is less than scoreAmount. Remember to convert scoreAmount to an integer.",
            //     pt: "Você deve criar um loop while que é executado enquanto o contador for menor que scoreAmount. Lembre-se de converter scoreAmount para um inteiro."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("whilecontador<int(cantidadPuntajes):contador+=1") && !code.replace(/\s+/g, '').trim().includes("whilecounter<int(scoreAmount):counter+=1")) {
            //   return [{
            //     es: "Dentro de while debes incrementar el contador en cada iteración.",
            //     en: "Within while you must increment the counter in each iteration.",
            //     pt: "Dentro do while você deve incrementar o contador em cada iteração."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("whilecontador<int(cantidadPuntajes):contador+=1puntaje=") && !code.replace(/\s+/g, '').trim().includes("whilecounter<int(scoreAmount):counter+=1score=")) {
            //   return [{
            //     es: "dentro de while, debes crear la variable puntaje para almacenar el puntaje ingresado por el usuario.",
            //     en: "within while, you must create the score variable to store the score entered by the user.",
            //     pt: "dentro do while, você deve criar a variável score para armazenar a pontuação inserida pelo usuário."
            //   }]
            // } else if (code.replace(/\s+/g, '').trim().includes("contador+=1puntaje=input(") || code.replace(/\s+/g, '').trim().includes("contador+=1puntaje=int(input(")) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   // console.log(lineasInput[2]);
            //   const preguntaLista = lineasInput[lineasInput.length - 1].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la preguntaLista
            //   if (preguntaLista.length < 1) {
            //     return [{
            //       es: "El mensaje del input dentro de while no debe estar vacío.",
            //       en: "The input message within the while cannot be empty.",
            //       pt: "A mensagem de entrada dentro do while não pode estar vazia."
            //     }]
            //   }

            //   if (preguntaLista) {
            //     const contieneEdadOAnios = /puntaje|ingrese el puntaje/i.test(preguntaLista);
            //     if (!contieneEdadOAnios) {
            //       seguirValidando = false
            //       // console.log("La pregunta del input no es válida porque no menciona 'puntaje' o 'ingrese el puntaje'.");
            //       return [{
            //         es: 'La pregunta del input "' + preguntaLista + '" no es válida porque no menciona "puntaje" o "ingrese el puntaje".',
            //         en: 'The input question ' + preguntaLista + ' is not valid because it does not mention "puntaje" or "ingrese el puntaje".',
            //         pt: 'A pergunta do input ' + preguntaLista + ' não é válida porque não menciona "puntaje" ou "ingrese el puntaje".'
            //       }]
            //     }

            //   }
            // } else if (code.replace(/\s+/g, '').trim().includes("counter+=1score=input(") || code.replace(/\s+/g, '').trim().includes("counter+=1score=int(input(")) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   // console.log(lineasInput[2]);
            //   const preguntaLista = lineasInput[lineasInput.length - 1].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la preguntaLista
            //   if (preguntaLista.length < 1) {
            //     return [{
            //       es: "El mensaje del input dentro de while no debe estar vacío.",
            //       en: "The input message within the while cannot be empty.",
            //       pt: "A mensagem de entrada dentro do while não pode estar vazia."
            //     }]
            //   }
            //   if (preguntaLista) {
            //     const contieneEdadOAnios = /score|enter the score/i.test(preguntaLista);
            //     if (!contieneEdadOAnios) {
            //       seguirValidando = false
            //       // console.log("La pregunta del input no es válida porque no menciona 'puntaje' o 'ingrese el puntaje'.");
            //       return [{
            //         es: 'La pregunta del input "' + preguntaLista + '" no es válida porque no menciona "puntaje" o "ingrese el puntaje".',
            //         en: 'The input question ' + preguntaLista + ' is not valid because it does not mention "score" or "enter the score".',
            //         pt: 'A pergunta do input ' + preguntaLista + ' não é válida porque não menciona "score" ou "insira a pontuação".'
            //       }]
            //     }

            //   }
            // }
            // else {
            //   return [{
            //     es: "Debes solicitar los puntajes al usuario.",
            //     en: "You must request the scores from the user.",
            //     pt: "Você deve solicitar as pontuações ao usuário."
            //   }]
            // }
            // if (!code.includes("puntajes.append(int(puntaje)") && !code.includes("scores.append(int(score)")) {
            //   return [{
            //     es: "Debes agregar el puntaje ingresado por el usuario a la lista. Recuerda convertirlo a entero.",
            //     en: "You must add the score entered by the user to the list. Remember to convert it to an integer.",
            //     pt: "Você deve adicionar a pontuação inserida pelo usuário à lista. Lembre-se de convertê-la para um inteiro."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes('print("Losmejorespuntajesson:")') && !code.replace(/\s+/g, '').trim().includes("print('Losmejorespuntajesson:')") && !code.replace(/\s+/g, '').trim().includes('print("Thebestscoresare:")') && !code.replace(/\s+/g, '').trim().includes("print('Thebestscoresare:')")) {
            //   return [{
            //     es: "Debe mostrar el texto 'Los mejores puntajes son: '.",
            //     en: "It must display the text 'The best scores are:'.",
            //     pt: "Deve exibir o texto 'Os melhores pontos são:'."
            //   }]
            // } else if (!code.includes("print(puntajes)") && !code.includes("print(scores)")) {
            //   return [{
            //     es: "Debe mostrar los puntajes por consola.",
            //     en: "It must display the scores on the console.",
            //     pt: "Deve exibir as pontuações no console."
            //   }]
            // }

          })
      }

    ]
  },
  {
    "id": "listas02-02",
    "prompt": "Realiza las tareas según la Actividad 02 - Arcade 02.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": { es: "# Lista de puntajes inicial \npuntajes = [850, 920, 670, 750, 830, 1000]", en: "# Initial scores list \nscores = [850, 920, 670, 750, 830, 1000]" },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe tener la lista de puntajes.",
        "test": (assert) => assert
          .$custom(code => {

            const norm = code.replace(/\r/g, "");
            const compact = norm.replace(/\s+/g, "").trim();
            const errors = [];

            // 1) Lista de puntajes inicial (no modificarla)
            const hasPuntajes = compact.includes("puntajes=[850,920,670,750,830,1000]");
            const hasScores = compact.includes("scores=[850,920,670,750,830,1000]");

            if (!hasPuntajes && !hasScores) {
              errors.push({
                es: "No debes eliminar ni modificar la lista llamada 'puntajes' con los puntajes proporcionados.",
                en: "You must not delete or modify the list called 'scores' with the provided scores.",
                pt: "Você não deve excluir ou modificar a lista chamada 'pontuações' com as pontuações fornecidas."
              });
            }

            const usingES = hasPuntajes; // true → usa 'puntajes', false → usa 'scores'
            const listName = usingES ? "puntajes" : "scores";

            // 2) mínimo / minimum
            if (!compact.includes("minimo=") && !compact.includes("minimum=")) {
              errors.push({
                es: "Debes crear la variable 'minimo' para almacenar el puntaje mínimo de la lista.",
                en: "You must create the 'minimum' variable to store the minimum score of the list.",
                pt: "Você deve criar a variável 'minimum' para armazenar a pontuação mínima da lista."
              });
            } else {
              const expectedMin = usingES
                ? `minimo=min(${listName})`
                : `minimum=min(${listName})`;
              if (!compact.includes(expectedMin)) {
                errors.push({
                  es: "Debes calcular el puntaje mínimo de la lista utilizando el método min() sobre la lista de puntajes.",
                  en: "You must calculate the minimum score of the list using min() on the scores list.",
                  pt: "Você deve calcular a pontuação mínima da lista usando min() na lista de pontuações."
                });
              }
            }

            // 3) máximo / maximum
            if (!compact.includes("maximo=") && !compact.includes("maximum=")) {
              errors.push({
                es: "Debes crear la variable 'maximo' para almacenar el puntaje máximo de la lista.",
                en: "You must create the 'maximum' variable to store the maximum score of the list.",
                pt: "Você deve criar a variável 'maximum' para armazenar a pontuação máxima da lista."
              });
            } else {
              const expectedMax = usingES
                ? `maximo=max(${listName})`
                : `maximum=max(${listName})`;
              if (!compact.includes(expectedMax)) {
                errors.push({
                  es: "Debes calcular el puntaje máximo de la lista utilizando el método max() sobre la lista de puntajes.",
                  en: "You must calculate the maximum score of the list using max() on the scores list.",
                  pt: "Você deve calcular a pontuação máxima da lista usando max() na lista de pontuações."
                });
              }
            }

            // 4) promedio / average
            const hasPromedioVar = compact.includes("promedio=") || compact.includes("average=");
            if (!hasPromedioVar) {
              errors.push({
                es: "Debes calcular el promedio y almacenarlo en la variable 'promedio'.",
                en: "You must calculate the average and store it in the 'average' variable.",
                pt: "Você deve calcular a média e armazená-la na variável 'average'."
              });
            } else {
              const expectedAvg = usingES
                ? "promedio=sum(puntajes)/len(puntajes)"
                : "average=sum(scores)/len(scores)";
              if (!compact.includes(expectedAvg)) {
                errors.push({
                  es: "Debes calcular el puntaje promedio realizando la operación con sum(lista) / len(lista).",
                  en: "You must calculate the average score using sum(list) / len(list).",
                  pt: "Você deve calcular a pontuação média usando sum(lista) / len(lista)."
                });
              }
            }

            // 5) Invertir lista con reverse() y mostrarla
            const reverseCallES = "puntajes.reverse()";
            const reverseCallEN = "scores.reverse()";
            const hasReverse = compact.includes(reverseCallES) || compact.includes(reverseCallEN);

            if (!hasReverse) {
              errors.push({
                es: "Debes invertir el orden de la lista de puntajes utilizando el método reverse().",
                en: "You must reverse the order of the scores list using the reverse() method.",
                pt: "Você deve inverter a ordem da lista de pontuações usando o método reverse()."
              });
            } else {
              // Queremos que haya al menos un print(puntajes) / print(scores) DESPUÉS del reverse
              const idxReverse = usingES
                ? norm.indexOf("puntajes.reverse()")
                : norm.indexOf("scores.reverse()");
              const idxPrintList = usingES
                ? norm.indexOf("print(puntajes)")
                : norm.indexOf("print(scores)");

              if (idxPrintList === -1 || idxReverse === -1 || idxPrintList < idxReverse) {
                errors.push({
                  es: "Debes mostrar por consola la lista invertida luego de llamar a reverse().",
                  en: "You must display the reversed list in the console after calling reverse().",
                  pt: "Você deve exibir a lista invertida no console após chamar reverse()."
                });
              }
            }

            // 6) Ordenar de menor a mayor con sort()
            const hasSort = compact.includes("puntajes.sort()") || compact.includes("scores.sort()");
            if (!hasSort) {
              errors.push({
                es: "Debes ordenar los puntajes de menor a mayor utilizando el método sort().",
                en: "You must sort the scores from lowest to highest using the sort() method.",
                pt: "Você deve ordenar as pontuações da menor para a maior usando o método sort()."
              });
            }

            // 7) Mensaje 'El TOP SCORE final es: ' / 'The TOP SCORE final is: '
            const hasTopMsg =
              compact.includes('print("ElTOPSCOREfinales:")') ||
              compact.includes("print('ElTOPSCOREfinales:')") ||
              compact.includes('print("TheTOPSCOREfinalis:")') ||
              compact.includes("print('TheTOPSCOREfinalis:')");

            if (!hasTopMsg) {
              errors.push({
                es: "Debe mostrar el texto 'El TOP SCORE final es: ' antes de mostrar la lista ordenada.",
                en: "It must display the text 'The TOP SCORE final is: ' before showing the sorted list.",
                pt: "Deve exibir o texto 'O TOP SCORE final é: ' antes de mostrar a lista ordenada."
              });
            } else {
              // Verificar que después del mensaje haya un print de la lista
              const idxMsg =
                norm.indexOf('print("El TOP SCORE final es:') !== -1
                  ? norm.indexOf('print("El TOP SCORE final es:')
                  : norm.indexOf("print('El TOP SCORE final es:");
              const idxMsgEn =
                norm.indexOf('print("The TOP SCORE final is:') !== -1
                  ? norm.indexOf('print("The TOP SCORE final is:')
                  : norm.indexOf("print('The TOP SCORE final is:");

              const idxMsgAny = Math.max(idxMsg, idxMsgEn); // el que exista

              const idxPrintFinal = usingES
                ? norm.lastIndexOf("print(puntajes)")
                : norm.lastIndexOf("print(scores)");

              if (idxMsgAny === -1 || idxPrintFinal === -1 || idxPrintFinal <= idxMsgAny) {
                errors.push({
                  es: "Luego del mensaje 'El TOP SCORE final es: ' en otro print() debes mostrar la lista de puntajes.",
                  en: "After the message 'The TOP SCORE final is: ' you must show the scores list in another print().",
                  pt: "Após a mensagem 'O TOP SCORE final é: ' você deve exibir a lista de pontuações em outro print()."
                });
              }
            }

            // ==== Devolver solo el primer error ====
            if (errors.length > 0) {
              return [errors[0]];
            }
            return [];


            // VALIDACION VIEJA
            // if (!code.replace(/\s+/g, '').trim().includes("puntajes=[850,920,670,750,830,1000]") && !code.replace(/\s+/g, '').trim().includes("scores=[850,920,670,750,830,1000]")) {
            //   return [{
            //     es: "No debes eliminar ni modificar la lista llamada 'puntajes' con los puntajes proporcionados.",
            //     en: "You must not delete or modify the list called 'scores' with the provided scores.",
            //     pt: "Você não deve excluir ou modificar a lista chamada 'pontuações' com as pontuações fornecidas."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("minimo=") && !code.replace(/\s+/g, '').trim().includes("minimum=")) {
            //   return [{
            //     es: "Debes crear la variable minimo para almacenar el calculo del puntaje mínimo de la lista.",
            //     en: "You must create the minimum variable to store the calculation of the minimum score of the list.",
            //     pt: "Você deve criar a variável minimum para armazenar o cálculo da pontuação mínima da lista."
            //   }]
            // }
            // else if (!code.replace(/\s+/g, '').trim().includes("minimo=min(puntajes)") && !code.replace(/\s+/g, '').trim().includes("minimum=min(scores)")) {
            //   return [{
            //     es: "Debes calcular el puntaje mínimo de la lista utilizando el método correcto.",
            //     en: "You must calculate the minimum score of the list using the correct method.",
            //     pt: "Você deve calcular a pontuação mínima da lista usando o método correto."
            //   }]
            // }
            // else if (!code.replace(/\s+/g, '').trim().includes("maximo=") && !code.replace(/\s+/g, '').trim().includes("maximum=")) {
            //   return [{
            //     es: "Debes crear la variable maximo para almacenar el calculo del puntaje máximo de la lista.",
            //     en: "You must create the maximum variable to store the calculation of the maximum score of the list.",
            //     pt: "Você deve criar a variável maximum para armazenar o cálculo da pontuação máxima da lista."
            //   }]
            // }
            // else if (!code.replace(/\s+/g, '').trim().includes("maximo=max(puntajes)") && !code.replace(/\s+/g, '').trim().includes("maximum=max(scores)")) {
            //   return [{
            //     es: "Debes calcular el puntaje máximo con el método correcto.",
            //     en: "You must calculate the maximum score with the correct method.",
            //     pt: "Você deve calcular a pontuação máxima com o método correto."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("promedio=sum(puntajes)/len(puntajes)") && !code.replace(/\s+/g, '').trim().includes("average=sum(scores)/len(scores)")) {
            //   return [{
            //     es: "Debes calcular el puntaje promedio ralizando la operacion con los métodos sugeridos en la consigna.",
            //     en: "You must calculate the average score by performing the operation with the methods suggested in the instruction.",
            //     pt: "Você deve calcular a pontuação média realizando a operação com os métodos sugeridos na atividade."
            //   }]
            // } else if (!code.includes("puntajes.reverse()") && !code.includes("scores.reverse()")) {
            //   return [{
            //     es: "Debes invertir el orden de la lista puntajes.",
            //     en: "You must reverse the order of the scores list.",
            //     pt: "Você deve inverter a ordem da lista de pontuações."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("puntajes.reverse()print(puntajes)") && !code.replace(/\s+/g, '').trim().includes("scores.reverse()print(scores)")) {
            //   return [{
            //     es: "Debes mostrar por consola la lista invertida",
            //     en: "You must display the reversed list on the console.",
            //     pt: "Você deve exibir a lista invertida no console."
            //   }]
            // }
            // else if (!code.includes("puntajes.sort()") && !code.includes("scores.sort()")) {
            //   return [{
            //     es: "Debes ordenar los puntajes de menor a mayor.",
            //     en: "You must sort the scores from lowest to highest.",
            //     pt: "Você deve ordenar as pontuações de menor a maior."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes('print("ElTOPSCOREfinales:")') && !code.replace(/\s+/g, '').trim().includes("print('ElTOPSCOREfinales:')") && !code.replace(/\s+/g, '').trim().includes('print("TheTOPSCOREfinalis:")') && !code.replace(/\s+/g, '').trim().includes("print('TheTOPSCOREfinalis:')")) {
            //   return [{
            //     es: "Debe mostrar el texto 'El TOP SCORE final es: ' seguido de los puntajes.",
            //     en: "It must display the text 'The TOP SCORE final is: ' followed by the scores.",
            //     pt: "Deve exibir o texto 'O TOP SCORE final é: ' seguido das pontuações."
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes('print("ElTOPSCOREfinales:")print(puntajes)') && !code.replace(/\s+/g, '').trim().includes("print('ElTOPSCOREfinales:')print(puntajes)") && !code.replace(/\s+/g, '').trim().includes('print("TheTOPSCOREfinalis:")print(scores)') && !code.replace(/\s+/g, '').trim().includes("print('TheTOPSCOREfinalis:')print(scores)")) {
            //   return [{
            //     es: "Luego del mensaje 'El TOP SCORE finales' en otro print() debes mostrar la lista .",
            //     en: "After the message 'The TOP SCORE final is' in another print() you must display the list.",
            //     pt: "Após a mensagem 'O TOP SCORE final é' em outro print() você deve exibir a lista."
            //   }]
            // }

          })
      }
    ]
  },
  {
    "id": "forIn-01",
    "prompt": "",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": ``,
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Solicitar al usuario que ingrese una palabra.",
        "test": (assert) => assert
          .$custom(code => {
            // console.log(code);
            const norm = code.replace(/\r/g, "");
            const compact = norm.replace(/\s+/g, "").trim();
            const errors = [];

            // 1) Variable palabra / word
            const hasPalabra = /\bpalabra\s*=/.test(norm);
            const hasWord = /\bword\s*=/.test(norm);

            if (!hasPalabra && !hasWord) {
              errors.push({
                es: "Debes crear la variable 'palabra' que almacene la palabra ingresada por consola (o 'word' en inglés).",
                en: "You must create the variable 'word' that stores the word entered from the console.",
                pt: "Você deve criar a variável 'palavra' que armazena a palavra inserida pelo console."
              });
            }

            // 2) Input con mensaje correcto
            const usesES = hasPalabra; // si no, asumimos inglés
            const varName = usesES ? "palabra" : "word";

            if (compact.includes(`${varName}=input(`)) {
              const inputs = code.match(/input\(["'].*?["']\)/g);
              if (inputs && inputs.length > 0) {
                const pregunta = inputs[0].match(/["'](.*?)["']/)?.[1] ?? "";

                if (pregunta.length < 1) {
                  errors.push({
                    es: "El mensaje del input no puede estar vacío.",
                    en: "The input message cannot be empty.",
                    pt: "A mensagem do input não pode estar vazia."
                  });
                } else {
                  if (usesES) {
                    const ok = /palabra|ingrese una palabra/i.test(pregunta);
                    if (!ok) {
                      errors.push({
                        es: `La pregunta del input "${pregunta}" no es válida porque no menciona "palabra" o "ingrese una palabra".`,
                        en: `The input question "${pregunta}" is not valid because it does not mention "palabra" or "ingrese una palabra".`,
                        pt: `A pergunta do input "${pregunta}" não é válida porque não menciona "palavra" ou "insira uma palavra".`
                      });
                    }
                  } else {
                    const ok = /word|enter a word/i.test(pregunta);
                    if (!ok) {
                      errors.push({
                        es: `La pregunta del input "${pregunta}" no es válida porque no menciona "word" o "enter a word".`,
                        en: `The input question "${pregunta}" is not valid because it does not mention "word" or "enter a word".`,
                        pt: `A pergunta do input "${pregunta}" não é válida porque não menciona "word" ou "enter a word".`
                      });
                    }
                  }
                }
              }
            } else {
              // No se detectó input ligado a palabra/word
              errors.push({
                es: "Debes solicitar al usuario que ingrese una palabra con input() y guardarla en la variable correspondiente.",
                en: "You must ask the user to enter a word with input() and store it in the corresponding variable.",
                pt: "Você deve pedir ao usuário para inserir uma palavra com input() e armazená-la na variável correspondente."
              });
            }

            // 3) Bucle for letra in palabra / for letter in word
            const iterName = usesES ? "letra" : "letter";
            const forRegex = new RegExp(`for\\s+${iterName}\\s+in\\s+${varName}\\s*:`);
            if (!forRegex.test(norm)) {
              errors.push({
                es: `En tu bucle for debes utilizar la variable "${iterName}" como iterador sobre "${varName}". Revisa la sintaxis: for ${iterName} in ${varName}:`,
                en: `In your for loop you must use "${iterName}" as the iterator over "${varName}". Check the syntax: for ${iterName} in ${varName}:`,
                pt: `No seu loop for você deve usar "${iterName}" como iterador sobre "${varName}". Verifique a sintaxe: for ${iterName} in ${varName}:`
              });
            }

            // 4) print de cada letra
            const printIter = new RegExp(`print\\s*\\(\\s*${iterName}\\s*\\)`);
            if (!printIter.test(norm)) {
              errors.push({
                es: "Debes mostrar cada letra de la palabra por consola usando print(letra).",
                en: "You must display each letter of the word on the console using print(letter).",
                pt: "Você deve exibir cada letra da palavra no console usando print(letra)."
              });
            }

            // 👉 Devolver solo el primer error
            if (errors.length > 0) {
              return [errors[0]];
            }
            return [];




            //VALIDACION VIEJA
            // if (!code.replace(/\s+/g, '').trim().includes("palabra=") && !code.replace(/\s+/g, '').trim().includes("word=")) {
            //   return [{
            //     es: "Debes crear la variable palabra que almacene la palabra ingresada por la consola.",
            //     en: "You must create the variable word that stores the word entered by the console.",
            //     pt: "Você deve criar a variável palavra que armazena a palavra inserida pelo console."
            //   }]
            // } else if (code.replace(/\s+/g, '').trim().includes("palabra=input(")) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   const preguntaPalabra = lineasInput[0].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la
            //   // console.log(preguntaPalabra);
            //   if (preguntaPalabra.length < 1) {
            //     return [{
            //       es: "El mensaje del input no puede estar vacío.",
            //       en: "The input message cannot be empty.",
            //       pt: "A mensagem de entrada não pode estar vazia."
            //     }]
            //   }
            //   if (preguntaPalabra) {
            //     const contienePalabra = /palabra|ingrese una palabra/i.test(preguntaPalabra);
            //     if (!contienePalabra) {
            //       seguirValidando = false
            //       return [{
            //         es: 'La pregunta del input "' + preguntaPalabra + '" no es válida porque no menciona "palabra" o "ingrese una palabra".',
            //         en: 'The input question ' + preguntaPalabra + ' is not valid because it does not mention "palabra" or "enter a word".',
            //         pt: 'A pergunta do input ' + preguntaPalabra + ' não é válida porque não menciona "palavra" ou "insira uma palavra".'
            //       }]
            //     }
            //   }

            // } else if (code.replace(/\s+/g, '').trim().includes("word=input(")) {
            //   const lineasInput = code.match(/input\(["'].*?["']\)/g);
            //   const preguntaPalabra = lineasInput[0].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la
            //   // console.log(preguntaPalabra);
            //   if (preguntaPalabra.length < 1) {
            //     return [{
            //       es: "El mensaje del input no puede estar vacío.",
            //       en: "The input message cannot be empty.",
            //       pt: "A mensagem de entrada não pode estar vazia."
            //     }]
            //   }
            //   if (preguntaPalabra) {
            //     const contienePalabra = /word|enter a word/i.test(preguntaPalabra);
            //     if (!contienePalabra) {
            //       seguirValidando = false
            //       return [{
            //         es: 'La pregunta del input "' + preguntaPalabra + '" no es válida porque no menciona "word" o "enter a word".',
            //         en: 'The input question ' + preguntaPalabra + ' is not valid because it does not mention "word" or "enter a word".',
            //         pt: 'A pergunta do input ' + preguntaPalabra + ' não é válida porque não menciona "word" ou "enter a word".'
            //       }]
            //     }
            //   }
            // }
            // else {
            //   return [{
            //     es: "Debes solicitar al usuario que ingrese una palabra.",
            //     en: "You must ask the user to enter a word.",
            //     pt: "Você deve pedir ao usuário para inserir uma palavra."
            //   }]
            // }
            // if (!code.replace(/\s+/g, '').trim().includes("forletrainpalabra:") && !code.replace(/\s+/g, '').trim().includes("forletterinword:")) {
            //   return [{
            //     es: 'En tu bucle for debes utilizar la variable "letra" como iterador. Revisa haber escrito su sintaxis correctamente.',
            //     en: 'In your for loop you must use the variable "letter" as an iterator. Check that you have written its syntax correctly.',
            //     pt: 'No seu loop for você deve usar a variável "letra" como iterador. Verifique se você escreveu sua sintaxe corretamente.'
            //   }]
            // } else if (!code.replace(/\s+/g, '').trim().includes("forletrainpalabra:print(letra)") && !code.replace(/\s+/g, '').trim().includes("forletterinword:print(letter)")) {
            //   return [{
            //     es: "Debes mostrar cada letra de la palabra por consola.",
            //     en: "You must display each letter of the word on the console.",
            //     pt: "Você deve exibir cada letra da palavra no console."
            //   }]
            // }
          })
      }
    ]
  },
  {
    "id": "forIn-02",
    "prompt": "Realiza las tareas según la actividad 'Traductor'.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": `# Lista de siglas de idiomas y frases en inglés\nsiglas_idiomas = ['es', 'fr', 'de', 'it', 'pt']\ntraducciones = {\n    'es': [\"Hola, ¿cómo estás?\", \"¡Buenos días!\", \"Muchas gracias.\", \"¿Cuál es tu nombre?\", \"Me encanta programar.\"],\n    'fr': [\"Bonjour, comment ça va?\", \"Bon matin!\", \"Merci beaucoup.\", \"Quel est votre nom?\", \"J'adore programmer.\"],\n    'de': [\"Hallo, wie geht es dir?\", \"Guten Morgen!\", \"Vielen Dank.\", \"Wie heißt du?\", \"Ich liebe Programmieren.\"],\n    'it': [\"Ciao, come stai?\", \"Buongiorno!\", \"Grazie mille.\", \"Come ti chiami?\", \"Adoro programmare.\"],\n    'pt': [\"Olá, como você está?\", \"Bom dia!\", \"Muito obrigado.\", \"Qual é o seu nome?\", \"Eu amo programar.\"]\n}`,
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Pedir al usuario la sigla del idioma y validar que sea correcta.",
        "test": (assert) => assert
          .$custom(code => {


            if (!code.replace(/\s+/g, '').trim().includes(`siglas_idiomas=['es','fr','de','it','pt']traducciones={'es':["Hola,¿cómoestás?","¡Buenosdías!","Muchasgracias.","¿Cuálestunombre?","Meencantaprogramar."],'fr':["Bonjour,commentçava?","Bonmatin!","Mercibeaucoup.","Quelestvotrenom?","J'adoreprogrammer."],'de':["Hallo,wiegehtesdir?","GutenMorgen!","VielenDank.","Wieheißtdu?","IchliebeProgrammieren."],'it':["Ciao,comestai?","Buongiorno!","Graziemille.","Cometichiami?","Adoroprogrammare."],'pt':["Olá,comovocêestá?","Bomdia!","Muitoobrigado.","Qualéoseunome?","Euamoprogramar."]}`)) {
              return [{
                es: "No debes modificar las listas de siglas de idiomas, frases en inglés y traducciones.",
                en: "You must not modify the lists of language codes, English phrases and translations.",
                pt: "Você não deve modificar as listas de códigos de idioma, frases em inglês e traduções."
              }]
            }
            else if (!code.replace(/\s+/g, '').trim().includes("idioma=")) {
              return [{
                es: "Debes crear la variable idioma para almacenar las siglas ingresada por el usuario.",
                en: "You must create the idioma variable to store the codes entered by the user.",
                pt: "Você deve criar a variável idioma para armazenar os códigos inseridos pelo usuário."
              }]
            } else if (code.replace(/\s+/g, '').trim().includes("idioma=input(")) {
              const lineasInput = code.match(/input\(["'].*?["']\)/g);
              const preguntaSigla = lineasInput[0].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la preguntaSigla
              // console.log(preguntaSigla);
              if (preguntaSigla.length < 1) {
                return [{
                  es: "El primer input debe contener texto que mencione 'sigla' o 'siglas del idioma' o 'idioma'.",
                  en: "The input must have a text that mentions 'sigla' or 'language codes' or 'idioma'.",
                  pt: "O input deve ter um texto que mencione 'sigla' ou 'códigos de idioma' ou 'idioma'."
                }]
              } else
                if (preguntaSigla) {
                  const contieneSigla = /sigla|siglas del idioma|idioma/i.test(preguntaSigla);
                  if (!contieneSigla) {
                    seguirValidando = false
                    return [{
                      es: 'El texto del primer input "' + preguntaSigla + '" no es válido. Debe mencionar "sigla" o "siglas del idioma" o "idioma".',
                      en: 'The text of the first input ' + preguntaSigla + ' is not valid. It must mention "sigla" or "language codes" or "idioma".',
                      pt: 'O texto do primeiro input ' + preguntaSigla + ' não é válido. Deve mencionar "sigla" ou "códigos de idioma" ou "idioma".'
                    }]
                  }
                }
            } else {
              return [{
                es: "Debes solicitar la sigla del idioma al usuario.",
                en: "You must request the language code from the user.",
                pt: "Você deve solicitar o código do idioma ao usuário."
              }]
            }
            if (!code.replace(/\s+/g, '').trim().includes("whileidiomanotinsiglas_idiomas:")) {
              return [{
                es: "Debes validar que la sigla ingresada por el usuario sea válida.",
                en: "You must validate that the code entered by the user is valid.",
                pt: "Você deve validar que o código inserido pelo usuário é válido."
              }]
            } else if (code.replace(/\s+/g, '').trim().includes("whileidiomanotinsiglas_idiomas:idioma=")) {
              const lineasInput = code.match(/input\(["'].*?["']\)/g);
              const preguntaSiglaWhile = lineasInput[1].match(/["'](.*?)["']/)?.[1]; // Extraer el texto de la preguntaSiglaWhile
              if (preguntaSiglaWhile.length < 1) {
                return [{
                  es: "El input dentro de while debe tener un texto que mencione 'sigla' o 'siglas del idioma' o 'idioma'.",
                  en: "The input inside while must have a text that mentions 'sigla' or 'language codes' or 'idioma'.",
                  pt: "O input dentro do while deve ter um texto que mencione 'sigla' ou 'códigos de idioma' ou 'idioma'."
                }]
              } else
                if (preguntaSiglaWhile) {
                  const contieneSigla = /sigla|siglas del idioma|idioma|Sigla no válida|Intente nuevamente/i.test(preguntaSiglaWhile);
                  if (!contieneSigla) {
                    seguirValidando = false
                    return [{
                      es: 'La pregunta del input "' + preguntaSiglaWhile + '" no es válida porque no menciona "sigla" o "siglas del idioma" o "idioma" o "Sigla no válida" o "Intente nuevamente".',
                      en: 'The input question ' + preguntaSiglaWhile + ' is not valid because it does not mention "sigla" or "language codes" or "idioma" or "Invalid code" or "Try again".',
                      pt: 'A pergunta do input ' + preguntaSiglaWhile + ' não é válida porque não menciona "sigla" ou "códigos de idioma" ou "idioma" ou "Código inválido" ou "Tente novamente".'
                    }]
                  }
                }
            } else {
              return [{
                es: "Debes solicitar nuevamente la sigla del idioma si no es válida.",
                en: "You must request the language code again if it is not valid.",
                pt: "Você deve solicitar o código do idioma novamente se não for válido."
              }]
            }
            if (!code.replace(/\s+/g, '').trim().includes('print("Lasfrasestraducidasson:")') && !code.replace(/\s+/g, '').trim().includes("print('Lasfrasestraducidasson:')")) {
              return [{
                es: "Debes mostrar el texto 'Las frases traducidas son: '.",
                en: "You must display the text 'The translated phrases are:'.",
                pt: "Você deve exibir o texto 'As frases traduzidas são:'."
              }]
            }
            else if (!code.replace(/\s+/g, '').trim().includes('forfraseintraducciones[idioma]:')) {
              return [{
                es: "Debes recorrer las frases en el diccionario de traducciones según la sigla ingresada, utilizando un bucle for usando frase como iterador y traducciones[idioma] para acceder a la frase del idioma elegido.",
                en: "You must iterate over the phrases in the translations dictionary according to the entered code, using a for loop using phrase as an iterator and translations[language] to access the phrase of the chosen language.",
                pt: "Você deve iterar sobre as frases no dicionário de traduções de acordo com o código inserido, usando um loop for usando frase como iterador e traduções[idioma] para acessar a frase do idioma escolhido."
              }]
            } else if (!code.replace(/\s+/g, '').trim().includes('forfraseintraducciones[idioma]:print(frase)')) {
              return [{
                es: "Debes mostrar cada frase traducida por consola.",
                en: "You must display each translated phrase on the console.",
                pt: "Você deve exibir cada frase traduzida no console."
              }]
            }
          })
      }
    ]
  },
  {
    "id": "diccionario-01-01",
    "prompt": "Realiza las tareas según la actividad 'Diccionario'.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": " un diccionario con al menos tres propiedades (color, cantidad de puertas, marca).",
        "test": (assert) => assert
          .$custom(code => {

            const errors = [];

            // ---------- Helpers ----------
            // Buscar el bloque de un diccionario por nombre (auto1, car1, etc.)
            const getDictBlock = (code, names) => {
              for (const name of names) {
                const regex = new RegExp(name + '\\s*=\\s*{([\\s\\S]*?)}');
                const match = code.match(regex);
                if (match) {
                  return { name, content: match[1] };
                }
              }
              return null;
            };

            const hasEmptyValueForKey = (block, key) => {
              const keyRegex = new RegExp(`"${key}"\\s*:\\s*""`);
              return keyRegex.test(block);
            };

            // Valida que un diccionario tenga las claves adecuadas
            const validateDictKeys = (dict, esKeys, enKeys, dictLabel) => {
              const { name, content } = dict;
              // Detectar si está usando versión inglesa
              const usesEnglish =
                content.includes(enKeys[1]) || content.includes(enKeys[2]);

              const keysToUse = usesEnglish ? enKeys : esKeys;

              // Recorremos las tres claves esperadas
              keysToUse.forEach((key) => {
                if (!content.includes(key)) {
                  errors.push({
                    es: `El diccionario '${name}' debe tener la clave "${key}".`,
                    en: `The dictionary '${name}' must have the key "${key}".`,
                    pt: `O dicionário '${name}' deve ter a chave "${key}".`
                  });
                } else if (hasEmptyValueForKey(content, key)) {
                  errors.push({
                    es: `El diccionario '${name}' debe tener la clave "${key}" con un valor asignado.`,
                    en: `The dictionary '${name}' must have the key "${key}" with an assigned value.`,
                    pt: `O dicionário '${name}' deve ter a chave "${key}" com um valor atribuído.`
                  });
                }
              });
            };

            // ---------- 1) auto1 / car1 ----------
            const dict1 = getDictBlock(code, ["auto1", "car1"]);
            if (!dict1) {
              errors.push({
                es: "Debe crear un diccionario llamado 'auto1' (o 'car1').",
                en: "You must create a dictionary named 'auto1' (or 'car1').",
                pt: "Você deve criar um dicionário chamado 'auto1' (ou 'car1')."
              });
            } else {
              // ES: color, cantidad_puertas, marca
              // EN: color, door_quantity, brand
              validateDictKeys(
                dict1,
                ["color", "cantidad_puertas", "marca"],
                ["color", "door_quantity", "brand"],
                "auto1"
              );
            }

            // ---------- 2) auto2 / car2 ----------
            const dict2 = getDictBlock(code, ["auto2", "car2"]);
            if (!dict2) {
              errors.push({
                es: "Debe crear un diccionario llamado 'auto2' (o 'car2').",
                en: "You must create a dictionary named 'auto2' (or 'car2').",
                pt: "Você deve criar um dicionário chamado 'auto2' (ou 'car2')."
              });
            } else {
              validateDictKeys(
                dict2,
                ["color", "cantidad_puertas", "marca"],
                ["color", "door_quantity", "brand"],
                "auto2"
              );
            }

            // ---------- 3) auto3 / car3 ----------
            const dict3 = getDictBlock(code, ["auto3", "car3"]);
            if (!dict3) {
              errors.push({
                es: "Debe crear un diccionario llamado 'auto3' (o 'car3').",
                en: "You must create a dictionary named 'auto3' (or 'car3').",
                pt: "Você deve criar um dicionário chamado 'auto3' (ou 'car3')."
              });
            } else {
              validateDictKeys(
                dict3,
                ["color", "cantidad_puertas", "marca"],
                ["color", "door_quantity", "brand"],
                "auto3"
              );
            }

            // ---------- 4) auto4 / car4 ----------
            const dict4 = getDictBlock(code, ["auto4", "car4"]);
            if (!dict4) {
              errors.push({
                es: "Debe crear un diccionario llamado 'auto4' (o 'car4').",
                en: "You must create a dictionary named 'auto4' (or 'car4').",
                pt: "Você deve criar um dicionário chamado 'auto4' (ou 'car4')."
              });
            } else {
              validateDictKeys(
                dict4,
                ["color", "cantidad_puertas", "marca"],
                ["color", "door_quantity", "brand"],
                "auto4"
              );
            }

            // ---------- 5) Modificar color de auto2 / car2 ----------
            const codeNoSpaces = code.replace(/\s/g, "").trim();

            const changedColor =
              codeNoSpaces.includes('auto2["color"]="') ||
              codeNoSpaces.includes("auto2['color']='") ||
              codeNoSpaces.includes('car2["color"]="') ||
              codeNoSpaces.includes("car2['color']='");

            if (!changedColor) {
              errors.push({
                es: "Debe modificar el color del auto2.",
                en: "You must modify the color of car2.",
                pt: "Você deve modificar a cor do auto2."
              });
            }

            const printsColor =
              code.includes('print(auto2["color"])') ||
              code.includes("print(auto2['color'])") ||
              code.includes('print(car2["color"])') ||
              code.includes("print(car2['color'])");

            if (!printsColor) {
              errors.push({
                es: "Debe mostrar el color del auto2 por consola.",
                en: "You must display the color of car2 on the console.",
                pt: "Você deve exibir a cor do auto2 no console."
              });
            }

            // ---------- Devolvemos SOLO el primer error ----------
            if (errors.length > 0) {
              return [errors[0]];
            }
            return [];





            // VALIDACION VIEJA
            // if (!code.replace(/\s/g, '').trim().includes("auto1={") && !code.replace(/\s/g, '').trim().includes("car1={")) {
            //   seguirValidando = false;
            //   return [{
            //     es: "Debe crear un diccionario llamado 'auto1'.",
            //     en: "It must create a dictionary named 'car1'.",
            //     pt: "Deve criar um dicionário chamado 'car1'."
            //   }];
            // } else
            //   // Verificar para auto1
            //   if (code.replace(/\s/g, '').trim().includes("auto1={")) {
            //     const auto1 = code.replace(/\s/g, '').trim().match(/auto1={(.*?)\}/s); // Obtener el contenido del diccionario auto1

            //     if (!auto1[1].includes("color")) {
            //       seguirValidando = false;
            //       return [{
            //         es: "El diccionario 'auto1' debe tener la clave 'color'.",
            //         en: "The dictionary 'auto1' must have the key 'color'.",
            //         pt: "O dicionário 'auto1' deve ter a chave 'color'."
            //       }];
            //     } else if (auto1[1].includes("color")) {
            //       const keyRegex = new RegExp(`"color"\\s*:\\s*""`);
            //       if (keyRegex.test(auto1[1])) {
            //         seguirValidando = false;
            //         return [{
            //           es: `El diccionario 'auto1' debe tener la clave 'color' con un valor asignado.`,
            //           en: `The dictionary 'auto1' must have the key 'color' with an assigned value.`,
            //           pt: `O dicionário 'auto1' deve ter a chave 'color' com um valor atribuído.`
            //         }];
            //       }
            //     }
            //     else if (!auto1[1].includes("cantidad_puertas")) {
            //       seguirValidando = false;
            //       return [{
            //         es: "El diccionario 'auto1' debe tener la clave 'cantidad_puertas'.",
            //         en: "The dictionary 'auto1' must have the key 'cantidad_puertas'.",
            //         pt: "O dicionário 'auto1' deve ter a chave 'cantidad_puertas'."
            //       }];
            //     } else if (auto1[1].includes("cantidad_puertas")) {
            //       const keyRegex = new RegExp(`"cantidad_puertas"\\s*:\\s*""`);
            //       if (keyRegex.test(auto1[1])) {
            //         seguirValidando = false;
            //         return [{
            //           es: `El diccionario 'auto1' debe tener la clave 'cantidad_puertas' con un valor asignado.`,
            //           en: `The dictionary 'auto1' must have the key 'door_quantity' with an assigned value.`,
            //           pt: `O dicionário 'auto1' deve ter a chave 'cantidad_puertas' com um valor atribuído.`
            //         }];
            //       }
            //     }
            //     else if (!auto1[1].includes("marca")) {
            //       seguirValidando = false;
            //       return [{
            //         es: "El diccionario 'auto1' debe tener la clave 'marca'.",
            //         en: "The dictionary 'auto1' must have the key 'marca'.",
            //         pt: "O dicionário 'auto1' deve ter a chave 'marca'."
            //       }];
            //     } else if (auto1[1].includes("marca")) {
            //       const keyRegex = new RegExp(`"marca"\\s*:\\s*""`);
            //       if (keyRegex.test(auto1[1])) {
            //         seguirValidando = false;
            //         return [{
            //           es: `El diccionario 'auto1' debe tener la clave 'marca' con un valor asignado.`,
            //           en: `The dictionary 'auto1' must have the key 'marca' with an assigned value.`,
            //           pt: `O dicionário 'auto1' deve ter a chave 'marca' com um valor atribuído.`
            //         }];
            //       }
            //     }
            //   }
            // if (code.replace(/\s/g, '').trim().includes("car1={")) {
            //   const auto1 = code.replace(/\s/g, '').trim().match(/car1={(.*?)\}/s); // Obtener el contenido del diccionario auto1
            //   if (!auto1[1].includes("color")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'car1' debe tener la clave 'color'.",
            //       en: "The dictionary 'car1' must have the key 'color'.",
            //       pt: "O dicionário 'car1' deve ter a chave 'color'."
            //     }];
            //   } else if (auto1[1].includes("color")) {
            //     const keyRegex = new RegExp(`"color"\\s*:\\s*""`);
            //     if (keyRegex.test(auto1[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'car1' debe tener la clave 'color' con un valor asignado.`,
            //         en: `The dictionary 'car1' must have the key 'color' with an assigned value.`,
            //         pt: `O dicionário 'car1' deve ter a chave 'color' com um valor atribuído.`
            //       }];
            //     }
            //   }
            //   else if (!auto1[1].includes("door_quantity")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'car1' debe tener la clave 'door_quantity'.",
            //       en: "The dictionary 'car1' must have the key 'door_quantity'.",
            //       pt: "O dicionário 'car1' deve ter a chave 'door_quantity'."
            //     }];
            //   } else if (auto1[1].includes("door_quantity")) {
            //     const keyRegex = new RegExp(`"door_quantity"\\s*:\\s*""`);
            //     if (keyRegex.test(auto1[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'car1' debe tener la clave 'door_quantity' con un valor asignado.`,
            //         en: `The dictionary 'car1' must have the key 'door_quantity' with an assigned value.`,
            //         pt: `O dicionário 'car1' deve ter a chave 'door_quantity' com um valor atribuído.`
            //       }];
            //     }
            //   }
            //   else if (!auto1[1].includes("brand")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'car1' debe tener la clave 'brand'.",
            //       en: "The dictionary 'car1' must have the key 'brand'.",
            //       pt: "O dicionário 'car1' deve ter a chave 'brand'."
            //     }];
            //   } else if (auto1[1].includes("brand")) {
            //     const keyRegex = new RegExp(`"brand"\\s*:\\s*""`);
            //     if (keyRegex.test(auto1[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'car1' debe tener la clave 'brand' con un valor asignado.`,
            //         en: `The dictionary 'car1' must have the key 'brand' with an assigned value.`,
            //         pt: `O dicionário 'car1' deve ter a chave 'brand' com um valor atribuído.`
            //       }];
            //     }
            //   }
            // }
            // if (!code.replace(/\s/g, '').trim().includes("}auto2={") && !code.replace(/\s/g, '').trim().includes("}car2={")) {
            //   seguirValidando = false;
            //   return [{
            //     es: "Debe crear un diccionario llamado 'auto2'.",
            //     en: "It must create a dictionary named 'car2'.",
            //     pt: "Deve criar um dicionário chamado 'auto2'."
            //   }];
            // } else
            //   if (code.replace(/\s/g, '').trim().includes('"}auto2={"')) {
            //     const auto2 = code.replace(/\s/g, '').trim().match(/auto2={(.*?)\}/s); // Obtener el contenido del diccionario auto2


            //     if (!auto2[1].includes("color")) {
            //       seguirValidando = false;
            //       return [{
            //         es: "El diccionario 'auto2' debe tener la clave 'color'.",
            //         en: "The dictionary 'auto2' must have the key 'color'.",
            //         pt: "O dicionário 'auto2' deve ter a chave 'color'."
            //       }];
            //     } else if (auto2[1].includes("color")) {
            //       const keyRegex = new RegExp(`"color"\\s*:\\s*""`);
            //       if (keyRegex.test(auto2[1])) {
            //         seguirValidando = false;
            //         return [{
            //           es: `El diccionario 'auto2' debe tener la clave 'color' con un valor asignado.`,
            //           en: `The dictionary 'auto2' must have the key 'color' with an assigned value.`,
            //           pt: `O dicionário 'auto2' deve ter a chave 'color' com um valor atribuído.`
            //         }];
            //       }
            //       else if (!auto2[1].includes("cantidad_puertas")) {
            //         seguirValidando = false;
            //         return [{
            //           es: "El diccionario 'auto2' debe tener la clave 'cantidad_puertas'.",
            //           en: "The dictionary 'auto2' must have the key 'cantidad_puertas'.",
            //           pt: "O dicionário 'auto2' deve ter a chave 'cantidad_puertas'."
            //         }];
            //       } else if (auto2[1].includes("cantidad_puertas")) {
            //         const keyRegex = new RegExp(`"cantidad_puertas"\\s*:\\s*""`);
            //         if (keyRegex.test(auto2[1])) {
            //           seguirValidando = false;
            //           return [{
            //             es: `El diccionario 'auto2' debe tener la clave 'cantidad_puertas' con un valor asignado.`,
            //             en: `The dictionary 'auto2' must have the key 'cantidad_puertas' with an assigned value.`,
            //             pt: `O dicionário 'auto2' deve ter a chave 'cantidad_puertas' com um valor atribuído.`
            //           }];
            //         }
            //       }
            //       else if (!auto2[1].includes("marca")) {
            //         seguirValidando = false;
            //         return [{
            //           es: "El diccionario 'auto2' debe tener la clave 'marca'.",
            //           en: "The dictionary 'auto2' must have the key 'marca'.",
            //           pt: "O dicionário 'auto2' deve ter a chave 'marca'."
            //         }];
            //       } else if (auto2[1].includes("marca")) {
            //         const keyRegex = new RegExp(`"marca"\\s*:\\s*""`);
            //         if (keyRegex.test(auto2[1])) {
            //           seguirValidando = false;
            //           return [{
            //             es: `El diccionario 'auto2' debe tener la clave 'marca' con un valor asignado.`,
            //             en: `The dictionary 'auto2' must have the key 'marca' with an assigned value.`,
            //             pt: `O dicionário 'auto2' deve ter a chave 'marca' com um valor atribuído.`
            //           }];
            //         }
            //       }
            //     }
            //   }
            // if (code.replace(/\s/g, '').trim().includes("car2={")) {
            //   const auto2 = code.replace(/\s/g, '').trim().match(/car2={(.*?)\}/s); // Obtener el contenido del diccionario auto2
            //   if (!auto2[1].includes("color")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'car2' debe tener la clave 'color'.",
            //       en: "The dictionary 'car2' must have the key 'color'.",
            //       pt: "O dicionário 'car2' deve ter a chave 'color'."
            //     }];
            //   } else if (auto2[1].includes("color")) {
            //     const keyRegex = new RegExp(`"color"\\s*:\\s*""`);
            //     if (keyRegex.test(auto2[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'car2' debe tener la clave 'color' con un valor asignado.`,
            //         en: `The dictionary 'car2' must have the key 'color' with an assigned value.`,
            //         pt: `O dicionário 'car2' deve ter a chave 'color' com um valor atribuído.`
            //       }];
            //     }
            //   }
            //   else if (!auto2[1].includes("door_quantity")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'car2' debe tener la clave 'door_quantity'.",
            //       en: "The dictionary 'car2' must have the key 'door_quantity'.",
            //       pt: "O dicionário 'car2' deve ter a chave 'door_quantity'."
            //     }];
            //   } else if (auto2[1].includes("door_quantity")) {
            //     const keyRegex = new RegExp(`"door_quantity"\\s*:\\s*""`);
            //     if (keyRegex.test(auto2[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'car2' debe tener la clave 'door_quantity' con un valor asignado.`,
            //         en: `The dictionary 'car2' must have the key 'door_quantity' with an assigned value.`,
            //         pt: `O dicionário 'car2' deve ter a chave 'door_quantity' com um valor atribuído.`
            //       }];
            //     }
            //   }
            //   else if (!auto2[1].includes("brand")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'car2' debe tener la clave 'brand'.",
            //       en: "The dictionary 'car2' must have the key 'brand'.",
            //       pt: "O dicionário 'car2' deve ter a chave 'brand'."
            //     }];
            //   } else if (auto2[1].includes("brand")) {
            //     const keyRegex = new RegExp(`"brand"\\s*:\\s*""`);
            //     if (keyRegex.test(auto2[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'car2' debe tener la clave 'brand' con un valor asignado.`,
            //         en: `The dictionary 'car2' must have the key 'brand' with an assigned value.`,
            //         pt: `O dicionário 'car2' deve ter a chave 'brand' com um valor atribuído.`
            //       }];
            //     }
            //   }
            // }

            // if (!code.replace(/\s/g, '').trim().includes("}auto3={") && !code.replace(/\s/g, '').trim().includes("}car3={")) {
            //   seguirValidando = false;
            //   return [{
            //     es: "Debe crear un diccionario llamado 'auto3'.",
            //     en: "It must create a dictionary named 'auto3'.",
            //     pt: "Deve criar um dicionário chamado 'auto3'."
            //   }];
            // }

            // else if (code.replace(/\s/g, '').trim().includes("}auto3={")) {
            //   const auto3 = code.replace(/\s/g, '').trim().match(/auto3={(.*?)\}/s); // Obtener el contenido del diccionario auto3

            //   if (!auto3[1].includes("color")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'auto3' debe tener la clave 'color'.",
            //       en: "The dictionary 'auto3' must have the key 'color'.",
            //       pt: "O dicionário 'auto3' deve ter a chave 'color'."
            //     }];
            //   } else if (auto3[1].includes("color")) {
            //     const keyRegex = new RegExp(`"color"\\s*:\\s*""`);
            //     if (keyRegex.test(auto3[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'auto3' debe tener la clave 'color' con un valor asignado.`,
            //         en: `The dictionary 'auto3' must have the key 'color' with an assigned value.`,
            //         pt: `O dicionário 'auto3' deve ter a chave 'color' com um valor atribuído.`
            //       }];
            //     }
            //   }
            //   else if (!auto3[1].includes("cantidad_puertas")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'auto3' debe tener la clave 'cantidad_puertas'.",
            //       en: "The dictionary 'auto3' must have the key 'cantidad_puertas'.",
            //       pt: "O dicionário 'auto3' deve ter a chave 'cantidad_puertas'."
            //     }];
            //   } else if (auto3[1].includes("cantidad_puertas")) {
            //     const keyRegex = new RegExp(`"cantidad_puertas"\\s*:\\s*""`);
            //     if (keyRegex.test(auto3[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'auto3' debe tener la clave 'cantidad_puertas' con un valor asignado.`,
            //         en: `The dictionary 'auto3' must have the key 'cantidad_puertas' with an assigned value.`,
            //         pt: `O dicionário 'auto3' deve ter a chave 'cantidad_puertas' com um valor atribuído.`
            //       }];
            //     }
            //   }
            //   else if (!auto3[1].includes("marca")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'auto3' debe tener la clave 'marca'.",
            //       en: "The dictionary 'auto3' must have the key 'marca'.",
            //       pt: "O dicionário 'auto3' deve ter a chave 'marca'."
            //     }];
            //   } else if (auto3[1].includes("marca")) {
            //     const keyRegex = new RegExp(`"marca"\\s*:\\s*""`);
            //     if (keyRegex.test(auto3[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'auto3' debe tener la clave 'marca' con un valor asignado.`,
            //         en: `The dictionary 'auto3' must have the key 'marca' with an assigned value.`,
            //         pt: `O dicionário 'auto3' deve ter a chave 'marca' com um valor atribuído.`
            //       }];
            //     }
            //   }
            // }
            // if (code.replace(/\s/g, '').trim().includes("car3={")) {
            //   const auto3 = code.replace(/\s/g, '').trim().match(/car3={(.*?)\}/s); // Obtener el contenido del diccionario auto3
            //   if (!auto3[1].includes("color")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'car3' debe tener la clave 'color'.",
            //       en: "The dictionary 'car3' must have the key 'color'.",
            //       pt: "O dicionário 'car3' deve ter a chave 'color'."
            //     }];
            //   } else if (auto3[1].includes("color")) {
            //     const keyRegex = new RegExp(`"color"\\s*:\\s*""`);
            //     if (keyRegex.test(auto3[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'car3' debe tener la clave 'color' con un valor asignado.`,
            //         en: `The dictionary 'car3' must have the key 'color' with an assigned value.`,
            //         pt: `O dicionário 'car3' deve ter a chave 'color' com um valor atribuído.`
            //       }];
            //     }
            //   }
            //   else if (!auto3[1].includes("door_quantity")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'car3' debe tener la clave 'door_quantity'.",
            //       en: "The dictionary 'car3' must have the key 'door_quantity'.",
            //       pt: "O dicionário 'car3' deve ter a chave 'door_quantity'."
            //     }];
            //   } else if (auto3[1].includes("door_quantity")) {
            //     const keyRegex = new RegExp(`"door_quantity"\\s*:\\s*""`);
            //     if (keyRegex.test(auto3[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'car3' debe tener la clave 'door_quantity' con un valor asignado.`,
            //         en: `The dictionary 'car3' must have the key 'door_quantity' with an assigned value.`,
            //         pt: `O dicionário 'car3' deve ter a chave 'door_quantity' com um valor atribuído.`
            //       }];
            //     }
            //   }
            //   else if (!auto3[1].includes("brand")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'car3' debe tener la clave 'brand'.",
            //       en: "The dictionary 'car3' must have the key 'brand'.",
            //       pt: "O dicionário 'car3' deve ter a chave 'brand'."
            //     }];
            //   } else if (auto3[1].includes("brand")) {
            //     const keyRegex = new RegExp(`"brand"\\s*:\\s*""`);
            //     if (keyRegex.test(auto3[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'car3' debe tener la clave 'brand' con un valor asignado.`,
            //         en: `The dictionary 'car3' must have the key 'brand' with an assigned value.`,
            //         pt: `O dicionário 'car3' deve ter a chave 'brand' com um valor atribuído.`
            //       }];
            //     }
            //   }
            // }

            // if (!code.replace(/\s/g, '').trim().includes("}auto4={") && !code.replace(/\s/g, '').trim().includes("}car4={")) {
            //   seguirValidando = false;
            //   return [{
            //     es: "Debe crear un diccionario llamado 'auto4'.",
            //     en: "It must create a dictionary named 'auto4'.",
            //     pt: "Deve criar um dicionário chamado 'auto4'."
            //   }];
            // } else
            //   if (code.replace(/\s/g, '').trim().includes("}auto4={")) {
            //     const auto4 = code.replace(/\s/g, '').trim().match(/auto4={(.*?)\}/s); // Obtener el contenido del diccionario auto4


            //     if (!auto4[1].includes("color")) {
            //       seguirValidando = false;
            //       return [{
            //         es: "El diccionario 'auto4' debe tener la clave 'color'.",
            //         en: "The dictionary 'auto4' must have the key 'color'.",
            //         pt: "O dicionário 'auto4' deve ter a chave 'color'."
            //       }];
            //     } else if (auto4[1].includes("color")) {
            //       const keyRegex = new RegExp(`"color"\\s*:\\s*""`);
            //       if (keyRegex.test(auto4[1])) {
            //         seguirValidando = false;
            //         return [{
            //           es: `El diccionario 'auto4' debe tener la clave 'color' con un valor asignado.`,
            //           en: `The dictionary 'auto4' must have the key 'color' with an assigned value.`,
            //           pt: `O dicionário 'auto4' deve ter a chave 'color' com um valor atribuído.`
            //         }];
            //       }
            //     }
            //     else if (!auto4[1].includes("cantidad_puertas")) {
            //       seguirValidando = false;
            //       return [{
            //         es: "El diccionario 'auto4' debe tener la clave 'cantidad_puertas'.",
            //         en: "The dictionary 'auto4' must have the key 'cantidad_puertas'.",
            //         pt: "O dicionário 'auto4' deve ter a chave 'cantidad_puertas'."
            //       }];
            //     } else if (auto4[1].includes("cantidad_puertas")) {
            //       const keyRegex = new RegExp(`"cantidad_puertas"\\s*:\\s*""`);
            //       if (keyRegex.test(auto4[1])) {
            //         seguirValidando = false;
            //         return [{
            //           es: `El diccionario 'auto4' debe tener la clave 'cantidad_puertas' con un valor asignado.`,
            //           en: `The dictionary 'auto4' must have the key 'cantidad_puertas' with an assigned value.`,
            //           pt: `O dicionário 'auto4' deve ter a chave 'cantidad_puertas' com um valor atribuído.`
            //         }];
            //       }
            //     }
            //     else if (!auto4[1].includes("marca")) {
            //       seguirValidando = false;
            //       return [{
            //         es: "El diccionario 'auto4' debe tener la clave 'marca'.",
            //         en: "The dictionary 'auto4' must have the key 'marca'.",
            //         pt: "O dicionário 'auto4' deve ter a chave 'marca'."
            //       }];
            //     } else if (auto4[1].includes("marca")) {
            //       const keyRegex = new RegExp(`"marca"\\s*:\\s*""`);
            //       if (keyRegex.test(auto4[1])) {
            //         seguirValidando = false;
            //         return [{
            //           es: `El diccionario 'auto4' debe tener la clave 'marca' con un valor asignado.`,
            //           en: `The dictionary 'auto4' must have the key 'marca' with an assigned value.`,
            //           pt: `O dicionário 'auto4' deve ter a chave 'marca' com um valor atribuído.`
            //         }];
            //       }
            //     }
            //   }
            // if (code.replace(/\s/g, '').trim().includes("car4={")) {
            //   const auto4 = code.replace(/\s/g, '').trim().match(/car4={(.*?)\}/s); // Obtener el contenido del diccionario auto4
            //   if (!auto4[1].includes("color")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'car4' debe tener la clave 'color'.",
            //       en: "The dictionary 'car4' must have the key 'color'.",
            //       pt: "O dicionário 'car4' deve ter a chave 'color'."
            //     }];
            //   } else if (auto4[1].includes("color")) {
            //     const keyRegex = new RegExp(`"color"\\s*:\\s*""`);
            //     if (keyRegex.test(auto4[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'car4' debe tener la clave 'color' con un valor asignado.`,
            //         en: `The dictionary 'car4' must have the key 'color' with an assigned value.`,
            //         pt: `O dicionário 'car4' deve ter a chave 'color' com um valor atribuído.`
            //       }];
            //     }
            //   }
            //   else if (!auto4[1].includes("door_quantity")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'car4' debe tener la clave 'door_quantity'.",
            //       en: "The dictionary 'car4' must have the key 'door_quantity'.",
            //       pt: "O dicionário 'car4' deve ter a chave 'door_quantity'."
            //     }];
            //   } else if (auto4[1].includes("door_quantity")) {
            //     const keyRegex = new RegExp(`"door_quantity"\\s*:\\s*""`);
            //     if (keyRegex.test(auto4[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'car4' debe tener la clave 'door_quantity' con un valor asignado.`,
            //         en: `The dictionary 'car4' must have the key 'door_quantity' with an assigned value.`,
            //         pt: `O dicionário 'car4' deve ter a chave 'door_quantity' com um valor atribuído.`
            //       }];
            //     }
            //   }
            //   else if (!auto4[1].includes("brand")) {
            //     seguirValidando = false;
            //     return [{
            //       es: "El diccionario 'car4' debe tener la clave 'brand'.",
            //       en: "The dictionary 'car4' must have the key 'brand'.",
            //       pt: "O dicionário 'car4' deve ter a chave 'brand'."
            //     }];
            //   } else if (auto4[1].includes("brand")) {
            //     const keyRegex = new RegExp(`"brand"\\s*:\\s*""`);
            //     if (keyRegex.test(auto4[1])) {
            //       seguirValidando = false;
            //       return [{
            //         es: `El diccionario 'car4' debe tener la clave 'brand' con un valor asignado.`,
            //         en: `The dictionary 'car4' must have the key 'brand' with an assigned value.`,
            //         pt: `O dicionário 'car4' deve ter a chave 'brand' com um valor atribuído.`
            //       }];
            //     }
            //   }
            // }

            // if (!code.replace(/\s/g, '').trim().includes('"}auto2["color"]=') && !code.replace(/\s/g, '').trim().includes("}auto2['color']=") && !code.replace(/\s/g, '').trim().includes('"}car2["color"]=') && !code.replace(/\s/g, '').trim().includes("}car2['color]=")) {
            //   seguirValidando = false;
            //   return [{
            //     es: "Debe modificar el color del auto2.",
            //     en: "It must modify the color of car2.",
            //     pt: "Deve modificar a cor do auto2."
            //   }];
            // } else if (!code.includes('print(auto2["color"])') && !code.includes("print(auto2['color'])") && !code.includes('print(car2["color"])') && !code.includes("print(car2['color'])")) {
            //   seguirValidando = false;
            //   return [{
            //     es: "Debe mostrar el color del auto2.",
            //     en: "It must display the color of car2.",
            //     pt: "Deve exibir a cor do auto2."
            //   }];
            // }

          })
      }

    ]
  },
  {
    "id": "diccionario-01-03",
    "prompt": "Realiza las tareas según la actividad 'Diccionario'.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "El código debe crear un diccionario de superheroe.",
        "test": (assert) => assert
          .$custom(code => {

            if (!code.replace(/\s+/g, '').trim().includes("superheroe={}") && !code.replace(/\s+/g, '').trim().includes("superhero={")) {
              return [{
                es: "Debes crear un diccionario llamado 'superheroe' vacío sin propiedades.",
                en: "You must create an empty dictionary called 'superhero' without properties.",
                pt: "Você deve criar um dicionário vazio chamado 'superheroe' sem propriedades."
              }]
            } else if (!code.includes('superheroe["nombre"]') && !code.includes('superhero["name"]')) {
              seguirValidando = false;

              return [{
                es: "Debes agregar la propiedad 'nombre' utilizando la funcionalidad variable[“clave”] = valor.",
                en: "You must add the 'name' property using the variable[“key”] = value functionality.",
                pt: "Você deve adicionar a propriedade 'nome' usando a funcionalidade variável[“chave”] = valor."

              }];
            } else if (!code.includes('superheroe["edad"]') && !code.includes('superhero["age"]')) {
              seguirValidando = false;
              return [{
                es: "Debes agregar la propiedad 'edad' utilizando la funcionalidad variable[“clave”] = valor.",
                en: "You must add the 'age' property using the variable[“key”] = value functionality.",
                pt: "Você deve adicionar a propriedade 'idade' usando a funcionalidade variável[“chave”] = valor."
              }];
            } else if (!code.includes('superheroe["ciudad"]') && !code.includes('superhero["city"]')) {
              seguirValidando = false;
              return [{
                es: "Debes agregar la propiedad 'ciudad' utilizando la funcionalidad variable[“clave”] = valor.",
                en: "You must add the 'city' property using the variable[“key”] = value functionality.",
                pt: "Você deve adicionar a propriedade 'cidade' usando a funcionalidade variável[“chave”] = valor."
              }];
            } else if (!code.includes('superheroe["identidadSecreta"]') && !code.includes('superhero["secretIdentity"]')) {
              seguirValidando = false;
              return [{
                es: "Debes agregar la propiedad 'identidadSecreta' utilizando la funcionalidad variable[“clave”] = valor.",
                en: "You must add the 'secretIdentity' property using the variable[“key”] = value functionality.",
                pt: "Você deve adicionar a propriedade 'identidadeSecreta' usando a funcionalidade variável[“chave”] = valor."
              }];
            } else if (!code.includes('superheroe["enemigos"]') && !code.includes('superhero["enemies"]')) {
              seguirValidando = false;
              return [{
                es: "Debes agregar la propiedad 'enemigos' utilizando la funcionalidad variable[“clave”] = valor.",
                en: "You must add the 'enemies' property using the variable[“key”] = value functionality.",
                pt: "Você deve adicionar a propriedade 'inimigos' usando a funcionalidade variável[“chave”] = valor."
              }];

            } else if (!code.replace(/\s+/g, '').trim().includes('superheroe["poderes"]=') && !code.replace(/\s+/g, '').trim().includes('superhero["powers"]=')) {
              seguirValidando = false;
              return [{
                es: "Debes agregar la propiedad 'poderes' utilizando la funcionalidad variable[“clave”] = valor.",
                en: "You must add the 'powers' property using the variable[“key”] = value functionality.",
                pt: "Você deve adicionar a propriedade 'poderes' usando a funcionalidade variável[“chave”] = valor."
              }];
            } else if (code.replace(/\s+/g, '').trim().includes('superheroe["poderes"]=[') || code.replace(/\s+/g, '').trim().includes('superhero["powers"]=[')) {
              const match = code.match(/superheroe\["poderes"\]\s*=\s*\[(.*?)\]/);
              // console.log(match);

              const match2 = code.match(/superhero\["powers"\]\s*=\s*\[(.*?)\]/);
              if (match || match2) {
                const poderes = match ? match[1] : null;
                const poderes2 = match2 ? match2[1] : null;

                // Preferimos el que exista
                const poderesContent = poderes !== null ? poderes : poderes2;

                // console.log("Contenido dentro de los corchetes:", poderesContent);

                if (poderesContent !== null) {
                  const listaPoderes = poderesContent.split(",").map(poder => poder.trim()).filter(p => p !== "");
                  // console.log("Lista de poderes:", listaPoderes);

                  if (listaPoderes.length > 1) {
                    // Lista válida
                  } else {
                    seguirValidando = false;
                    return [{
                      es: "Debes agregar más de un poder a la lista de 'poderes'.",
                      en: "You must add more than one power to the 'powers' list.",
                      pt: "Você deve adicionar mais de um poder à lista de 'poderes'."
                    }];
                  }
                }
              }
            } else {
              seguirValidando = false;
              return [{
                es: "Debes agregar una lista de poderes como valor en la propiedad 'poderes'.",
                en: "You must add a list of powers as the value in the 'powers' property.",
                pt: "Você deve adicionar uma lista de poderes como valor na propriedade 'poderes'."
              }]
            }
            if (!code.replace(/\s+/g, '').trim().includes('print(superheroe)') && !code.replace(/\s+/g, '').trim().includes('print(superhero)')) {
              seguirValidando = false;
              return [{
                es: "Debe mostrar el diccionario 'superheroe'.",
                en: "It must display the dictionary 'superhero'.",
                pt: "Deve exibir o dicionário 'superheroe'."
              }];
            }

          })
      },
    ]
  },
  {
    "id": "diccionario-01-04",
    "prompt": "Realiza las tareas según la actividad 'Diccionario'.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Crear diccionarios para seis películas.",
        "test": (assert) => assert
          .$custom(code => {
            // console.log(code.replace(/\s/g, '').trim());

            if (code.replace(/\s/g, '').trim().includes("pelicula1={")) {
              const pelicula1 = code.match(/pelicula1 = \{(.*?)\}/s); // Obtener el contenido del diccionario pelicula1

              if (!pelicula1[1].includes("título")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula1' debe tener la clave 'título'.",
                  en: "The dictionary 'pelicula1' must have the key 'título'.",
                  pt: "O dicionário 'pelicula1' deve ter a chave 'título'."
                }];
              } else if (pelicula1[1].includes("título")) {
                const keyRegex = new RegExp(`"título"\\s*:\\s*""`);
                if (keyRegex.test(pelicula1[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula1' debe tener la clave 'título' con un valor asignado.`,
                    en: `The dictionary 'movie1' must have the key 'title' with an assigned value.`,
                    pt: `O dicionário 'pelicula1' deve ter a chave 'título' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula1[1].includes("protagonista")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula1' debe tener la clave 'protagonista'.",
                  en: "The dictionary 'movie1' must have the key 'protagonista'.",
                  pt: "O dicionário 'pelicula1' deve ter a chave 'protagonista'."
                }];
              } else if (pelicula1[1].includes("protagonista")) {
                const keyRegex = new RegExp(`"protagonista"\\s*:\\s*""`);
                if (keyRegex.test(pelicula1[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula1' debe tener la clave 'protagonista' con un valor asignado.`,
                    en: `The dictionary 'movie1' must have the key 'protagonista' with an assigned value.`,
                    pt: `O dicionário 'pelicula1' deve ter a chave 'protagonista' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula1[1].includes("genero")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula1' debe tener la clave 'genero'.",
                  en: "The dictionary 'pelicula1' must have the key 'genre'.",
                  pt: "O dicionário 'pelicula1' deve ter a chave 'genero'."
                }];
              } else if (pelicula1[1].includes("genero")) {
                const keyRegex = new RegExp(`"genero"\\s*:\\s*""`);
                if (keyRegex.test(pelicula1[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula1' debe tener la clave 'genero' con un valor asignado.`,
                    en: `The dictionary 'movie1' must have the key 'genre' with an assigned value.`,
                    pt: `O dicionário 'pelicula1' deve ter a chave 'genero' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula1[1].includes("duracion")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula1' debe tener la clave 'duracion'.",
                  en: "The dictionary 'pelicula1' must have the key 'duration'.",
                  pt: "O dicionário 'pelicula1' deve ter a chave 'duracion'."
                }];
              } else if (pelicula1[1].includes("duracion")) {
                const keyRegex = new RegExp(`"duracion"\\s*:\\s*""`);
                if (keyRegex.test(pelicula1[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula1' debe tener la clave 'duracion' con un valor asignado.`,
                    en: `The dictionary 'movie1' must have the key 'duration' with an assigned value.`,
                    pt: `O dicionário 'pelicula1' deve ter a chave 'duracion' com um valor atribuído.`
                  }];
                }
              }
            }
            if (!code.replace(/\s/g, '').trim().includes('pelicula1={"')) {
              seguirValidando = false;
              return [{
                es: "Debe crear un diccionario llamado 'pelicula1'.",
                en: "It must create a dictionary named 'pelicula1'.",
                pt: "Deve criar um dicionário chamado 'pelicula1'."
              }];
            }
            else if (code.replace(/\s/g, '').trim().includes("movie1={")) {
              const pelicula1 = code.replace(/\s/g, '').trim().match(/movie1={(.*?)\}/s); // Obtener el contenido del diccionario pelicula1
              if (!pelicula1[1].includes("title")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie1' debe tener la clave 'title'.",
                  en: "The dictionary 'movie1' must have the key 'title'.",
                  pt: "O dicionário 'movie1' deve ter a chave 'title'."
                }];
              } else if (pelicula1[1].includes("title")) {
                const keyRegex = new RegExp(`"title"\\s*:\\s*""`);
                if (keyRegex.test(pelicula1[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie1' debe tener la clave 'title' con un valor asignado.`,
                    en: `The dictionary 'movie1' must have the key 'title' with an assigned value.`,
                    pt: `O dicionário 'movie1' deve ter a chave 'title' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula1[1].includes("protagonist")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie1' debe tener la clave 'protagonist'.",
                  en: "The dictionary 'movie1' must have the key 'protagonist'.",
                  pt: "O dicionário 'movie1' deve ter a chave 'protagonist'."
                }];
              } else if (pelicula1[1].includes("protagonist")) {
                const keyRegex = new RegExp(`"protagonist"\\s*:\\s*""`);
                if (keyRegex.test(pelicula1[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie1' debe tener la clave 'protagonist' con un valor asignado.`,
                    en: `The dictionary 'movie1' must have the key 'protagonist' with an assigned value.`,
                    pt: `O dicionário 'movie1' deve ter a chave 'protagonist' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula1[1].includes("genre")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie1' debe tener la clave 'genre'.",
                  en: "The dictionary 'movie1' must have the key 'genre'.",
                  pt: "O dicionário 'movie1' deve ter a chave 'genre'."
                }];
              } else if (pelicula1[1].includes("genre")) {
                const keyRegex = new RegExp(`"genre"\\s*:\\s*""`);
                if (keyRegex.test(pelicula1[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie1' debe tener la clave 'genre' con un valor asignado.`,
                    en: `The dictionary 'movie1' must have the key 'genre' with an assigned value.`,
                    pt: `O dicionário 'movie1' deve ter a chave 'genre' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula1[1].includes("duration")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie1' debe tener la clave 'duration'.",
                  en: "The dictionary 'movie1' must have the key 'duration'.",
                  pt: "O dicionário 'movie1' deve ter a chave 'duration'."
                }];
              } else if (pelicula1[1].includes("duration")) {
                const keyRegex = new RegExp(`"duration"\\s*:\\s*""`);
                if (keyRegex.test(pelicula1[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie1' debe tener la clave 'duration' con un valor asignado.`,
                    en: `The dictionary 'movie1' must have the key 'duration' with an assigned value.`,
                    pt: `O dicionário 'movie1' deve ter a chave 'duration' com um valor atribuído.`
                  }];
                }
              }
            }

            else if (code.replace(/\s/g, '').trim().includes('movie1={"') && !code.replace(/\s/g, '').trim().includes('movie1={"')) {
              seguirValidando = false;
              return [{
                es: "Debe crear un diccionario llamado 'movie1'.",
                en: "It must create a dictionary named 'movie1'.",
                pt: "Deve criar um dicionário chamado 'movie1'."
              }];
            }
            if (code.includes("pelicula2 = {")) {
              const pelicula2 = code.match(/pelicula2 = \{(.*?)\}/s); // Obtener el contenido del diccionario pelicula2

              if (!pelicula2[1].includes("título")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula2' debe tener la clave 'título'.",
                  en: "The dictionary 'pelicula2' must have the key 'título'.",
                  pt: "O dicionário 'pelicula2' deve ter a chave 'título'."
                }];
              } else if (!pelicula2[1].includes("titulo")) {
                const keyRegex = new RegExp(`"titulo"\\s*:\\s*""`);
                if (keyRegex.test(pelicula2[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula2' debe tener la clave 'titulo' con un valor asignado.`,
                    en: `The dictionary 'movie1' must have the key 'title' with an assigned value.`,
                    pt: `O dicionário 'movie1' deve ter a chave 'title' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula2[1].includes("protagonista")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula2' debe tener la clave 'protagonista'.",
                  en: "The dictionary 'movie2' must have the key 'protagonista'.",
                  pt: "O dicionário 'pelicula2' deve ter a chave 'protagonista'."
                }];
              } else if (pelicula2[1].includes("protagonista")) {
                const keyRegex = new RegExp(`"protagonista"\\s*:\\s*""`);
                if (keyRegex.test(pelicula2[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula2' debe tener la clave 'protagonista' con un valor asignado.`,
                    en: `The dictionary 'movie2' must have the key 'protagonista' with an assigned value.`,
                    pt: `O dicionário 'pelicula2' deve ter a chave 'protagonista' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula2[1].includes("genero")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula2' debe tener la clave 'genero'.",
                  en: "The dictionary 'pelicula2' must have the key 'genero'.",
                  pt: "O dicionário 'pelicula2' deve ter a chave 'genero'."
                }];
              } else if (pelicula2[1].includes("genero")) {
                const keyRegex = new RegExp(`"genero"\\s*:\\s*""`);
                if (keyRegex.test(pelicula2[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula2' debe tener la clave 'genero' con un valor asignado.`,
                    en: `The dictionary 'movie2' must have the key 'genero' with an assigned value.`,
                    pt: `O dicionário 'pelicula2' deve ter a chave 'genero' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula2[1].includes("duracion")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula2' debe tener la clave 'duracion'.",
                  en: "The dictionary 'pelicula2' must have the key 'duracion'.",
                  pt: "O dicionário 'pelicula2' deve ter a chave 'duracion'."
                }];
              }
              else if (pelicula2[1].includes("duracion")) {
                const keyRegex = new RegExp(`"duracion"\\s*:\\s*""`);
                if (keyRegex.test(pelicula2[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula2' debe tener la clave 'duracion' con un valor asignado.`,
                    en: `The dictionary 'movie2' must have the key 'duration' with an assigned value.`,
                    pt: `O dicionário 'pelicula2' deve ter a chave 'duracion' com um valor atribuído.`
                  }];
                }
              }
            }
            if (!code.replace(/\s/g, '').trim().includes('pelicula2={"')) {
              seguirValidando = false;
              return [{
                es: "Debe crear un diccionario llamado 'pelicula2'.",
                en: "It must create a dictionary named 'pelicula2'.",
                pt: "Deve criar um dicionário chamado 'pelicula2'."
              }];
            }

            else if (code.replace(/\s/g, '').trim().includes("movie2={")) {
              const pelicula2 = code.replace(/\s/g, '').trim().match(/movie2={(.*?)\}/s); // Obtener el contenido del diccionario pelicula2
              if (!pelicula2[1].includes("title")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie2' debe tener la clave 'title'.",
                  en: "The dictionary 'movie2' must have the key 'title'.",
                  pt: "O dicionário 'movie2' deve ter a chave 'title'."
                }];
              } else if (pelicula2[1].includes("title")) {
                const keyRegex = new RegExp(`"title"\\s*:\\s*""`);
                if (keyRegex.test(pelicula2[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie2' debe tener la clave 'title' con un valor asignado.`,
                    en: `The dictionary 'movie2' must have the key 'title' with an assigned value.`,
                    pt: `O dicionário 'movie2' deve ter a chave 'title' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula2[1].includes("protagonist")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie2' debe tener la clave 'protagonist'.",
                  en: "The dictionary 'movie2' must have the key 'protagonist'.",
                  pt: "O dicionário 'movie2' deve ter a chave 'protagonist'."

                }];
              } else if (pelicula2[1].includes("protagonist")) {
                const keyRegex = new RegExp(`"protagonist"\\s*:\\s*""`);
                if (keyRegex.test(pelicula2[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie2' debe tener la clave 'protagonist' con un valor asignado.`,
                    en: `The dictionary 'movie2' must have the key 'protagonist' with an assigned value.`,
                    pt: `O dicionário 'movie2' deve ter a chave 'protagonist' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula2[1].includes("genre")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie2' debe tener la clave 'genre'.",
                  en: "The dictionary 'movie2' must have the key 'genre'.",
                  pt: "O dicionário 'movie2' deve ter a chave 'genre'."
                }];
              } else if (pelicula2[1].includes("genre")) {
                const keyRegex = new RegExp(`"genre"\\s*:\\s*""`);
                if (keyRegex.test(pelicula2[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie2' debe tener la clave 'genre' con un valor asignado.`,
                    en: `The dictionary 'movie2' must have the key 'genre' with an assigned value.`,
                    pt: `O dicionário 'movie2' deve ter a chave 'genre' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula2[1].includes("duration")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie2' debe tener la clave 'duration'.",
                  en: "The dictionary 'movie2' must have the key 'duration'.",
                  pt: "O dicionário 'movie2' deve ter a chave 'duration'."
                }];
              } else if (pelicula2[1].includes("duration")) {
                const keyRegex = new RegExp(`"duration"\\s*:\\s*""`);
                if (keyRegex.test(pelicula2[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie2' debe tener la clave 'duration' con un valor asignado.`,
                    en: `The dictionary 'movie2' must have the key 'duration' with an assigned value.`,
                    pt: `O dicionário 'movie2' deve ter a chave 'duration' com um valor atribuído.`
                  }];
                }
              }
            }
            else if (code.replace(/\s/g, '').trim().includes('movie2={"') && !code.replace(/\s/g, '').trim().includes('movie2={"')) {
              seguirValidando = false;
              return [{
                es: "Debe crear un diccionario llamado 'movie2'.",
                en: "It must create a dictionary named 'movie2'.",
                pt: "Deve criar um dicionário chamado 'movie2'."
              }];
            }

            if (code.includes("pelicula3 = {")) {
              const pelicula3 = code.match(/pelicula3 = \{(.*?)\}/s); // Obtener el contenido del diccionario pelicula3
              if (!pelicula3[1].includes("título")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula3' debe tener la clave 'título'.",
                  en: "The dictionary 'pelicula3' must have the key 'título'.",
                  pt: "O dicionário 'pelicula3' deve ter a chave 'título'."
                }];
              } else if (pelicula3[1].includes("título")) {
                const keyRegex = new RegExp(`"título"\\s*:\\s*""`);
                if (keyRegex.test(pelicula3[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula3' debe tener la clave 'título' con un valor asignado.`,
                    en: `The dictionary 'movie3' must have the key 'title' with an assigned value.`,
                    pt: `O dicionário 'pelicula3' deve ter a chave 'título' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula3[1].includes("protagonista")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula3' debe tener la clave 'protagonista'.",
                  en: "The dictionary 'pelicula3' must have the key 'protagonista'.",
                  pt: "O dicionário 'pelicula3' deve ter a chave 'protagonista'."
                }];
              } else if (pelicula3[1].includes("protagonista")) {
                const keyRegex = new RegExp(`"protagonista"\\s*:\\s*""`);
                if (keyRegex.test(pelicula3[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula3' debe tener la clave 'protagonista' con un valor asignado.`,
                    en: `The dictionary 'movie3' must have the key 'protagonista' with an assigned value.`,
                    pt: `O dicionário 'pelicula3' deve ter a chave 'protagonista' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula3[1].includes("genero")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula3' debe tener la clave 'genero'.",
                  en: "The dictionary 'pelicula3' must have the key 'genero'.",
                  pt: "O dicionário 'pelicula3' deve ter a chave 'genero'."
                }];
              } else if (pelicula3[1].includes("genero")) {
                const keyRegex = new RegExp(`"genero"\\s*:\\s*""`);
                if (keyRegex.test(pelicula3[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula3' debe tener la clave 'genero' con un valor asignado.`,
                    en: `The dictionary 'movie3' must have the key 'genero' with an assigned value.`,
                    pt: `O dicionário 'pelicula3' deve ter a chave 'genero' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula3[1].includes("duracion")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula3' debe tener la clave 'duracion'.",
                  en: "The dictionary 'pelicula3' must have the key 'duracion'.",
                  pt: "O dicionário 'pelicula3' deve ter a chave 'duracion'."
                }];
              } else if (pelicula3[1].includes("duracion")) {
                const keyRegex = new RegExp(`"duracion"\\s*:\\s*""`);
                if (keyRegex.test(pelicula3[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula3' debe tener la clave 'duracion' con un valor asignado.`,
                    en: `The dictionary 'movie3' must have the key 'duration' with an assigned value.`,
                    pt: `O dicionário 'pelicula3' deve ter a chave 'duracion' com um valor atribuído.`
                  }];
                }
              }
            }
            if (!code.replace(/\s/g, '').trim().includes('pelicula3={"')) {
              seguirValidando = false;
              return [{
                es: "Debe crear un diccionario llamado 'pelicula3'.",
                en: "It must create a dictionary named 'pelicula3'.",
                pt: "Deve criar um dicionário chamado 'pelicula3'."
              }];
            }

            else if (code.replace(/\s/g, '').trim().includes("movie3={")) {
              const pelicula3 = code.replace(/\s/g, '').trim().match(/movie3={(.*?)\}/s); // Obtener el contenido del diccionario pelicula3
              if (!pelicula3[1].includes("title")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie3' debe tener la clave 'title'.",
                  en: "The dictionary 'movie3' must have the key 'title'.",
                  pt: "O dicionário 'movie3' deve ter a chave 'title'."
                }];
              } else if (pelicula3[1].includes("title")) {
                const keyRegex = new RegExp(`"title"\\s*:\\s*""`);
                if (keyRegex.test(pelicula3[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie3' debe tener la clave 'title' con un valor asignado.`,
                    en: `The dictionary 'movie3' must have the key 'title' with an assigned value.`,
                    pt: `O dicionário 'movie3' deve ter a chave 'title' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula3[1].includes("protagonist")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie3' debe tener la clave 'protagonist'.",
                  en: "The dictionary 'movie3' must have the key 'protagonist'.",
                  pt: "O dicionário 'movie3' deve ter a chave 'protagonist'."
                }];
              } else if (pelicula3[1].includes("protagonist")) {
                const keyRegex = new RegExp(`"protagonist"\\s*:\\s*""`);
                if (keyRegex.test(pelicula3[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie3' debe tener la clave 'protagonist' con un valor asignado.`,
                    en: `The dictionary 'movie3' must have the key 'protagonist' with an assigned value.`,
                    pt: `O dicionário 'movie3' deve ter a chave 'protagonist' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula3[1].includes("genre")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie3' debe tener la clave 'genre'.",
                  en: "The dictionary 'movie3' must have the key 'genre'.",
                  pt: "O dicionário 'movie3' deve ter a chave 'genre'."
                }];
              } else if (pelicula3[1].includes("genre")) {
                const keyRegex = new RegExp(`"genre"\\s*:\\s*""`);
                if (keyRegex.test(pelicula3[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie3' debe tener la clave 'genre' con un valor asignado.`,
                    en: `The dictionary 'movie3' must have the key 'genre' with an assigned value.`,
                    pt: `O dicionário 'movie3' deve ter a chave 'genre' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula3[1].includes("duration")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie3' debe tener la clave 'duration'.",
                  en: "The dictionary 'movie3' must have the key 'duration'.",
                  pt: "O dicionário 'movie3' deve ter a chave 'duration'."
                }];
              } else if (pelicula3[1].includes("duration")) {
                const keyRegex = new RegExp(`"duration"\\s*:\\s*""`);
                if (keyRegex.test(pelicula3[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie3' debe tener la clave 'duration' con un valor asignado.`,
                    en: `The dictionary 'movie3' must have the key 'duration' with an assigned value.`,
                    pt: `O dicionário 'movie3' deve ter a chave 'duration' com um valor atribuído.`
                  }];
                }
              }
            }

            else if (code.replace(/\s/g, '').trim().includes('movie3={"') && !code.replace(/\s/g, '').trim().includes('movie3={"')) {
              seguirValidando = false;
              return [{
                es: "Debe crear un diccionario llamado 'movie3'.",
                en: "It must create a dictionary named 'movie3'.",
                pt: "Deve criar um dicionário chamado 'movie3'."
              }];
            }

            if (code.includes("pelicula4 = {")) {
              const pelicula4 = code.match(/pelicula4 = \{(.*?)\}/s); // Obtener el contenido del diccionario pelicula4

              if (!pelicula4[1].includes("título")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula4' debe tener la clave 'título'.",
                  en: "The dictionary 'pelicula4' must have the key 'título'.",
                  pt: "O dicionário 'pelicula4' deve ter a chave 'título'."
                }];
              } else if (!pelicula4[1].includes("titulo")) {
                const keyRegex = new RegExp(`"titulo"\\s*:\\s*""`);
                if (keyRegex.test(pelicula4[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula4' debe tener la clave 'titulo' con un valor asignado.`,
                    en: `The dictionary 'movie4' must have the key 'title' with an assigned value.`,
                    pt: `O dicionário 'movie4' deve ter a chave 'title' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula4[1].includes("protagonista")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula4' debe tener la clave 'protagonista'.",
                  en: "The dictionary 'pelicula4' must have the key 'protagonista'.",
                  pt: "O dicionário 'pelicula4' deve ter a chave 'protagonista'."
                }];
              } else if (!pelicula4[1].includes("protagonista")) {
                const keyRegex = new RegExp(`"protagonista"\\s*:\\s*""`);
                if (keyRegex.test(pelicula4[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula4' debe tener la clave 'protagonista' con un valor asignado.`,
                    en: `The dictionary 'movie4' must have the key 'protagonist' with an assigned value.`,
                    pt: `O dicionário 'movie4' deve ter a chave 'protagonist' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula4[1].includes("genero")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula4' debe tener la clave 'genero'.",
                  en: "The dictionary 'pelicula4' must have the key 'genero'.",
                  pt: "O dicionário 'pelicula4' deve ter a chave 'genero'."
                }];
              } else if (!pelicula4[1].includes("genero")) {
                const keyRegex = new RegExp(`"genero"\\s*:\\s*""`);
                if (keyRegex.test(pelicula4[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula4' debe tener la clave 'genero' con un valor asignado.`,
                    en: `The dictionary 'movie4' must have the key 'genre' with an assigned value.`,
                    pt: `O dicionário 'movie4' deve ter a chave 'genre' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula4[1].includes("duracion")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula4' debe tener la clave 'duracion'.",
                  en: "The dictionary 'pelicula4' must have the key 'duracion'.",
                  pt: "O dicionário 'pelicula4' deve ter a chave 'duracion'."
                }];
              } else if (!pelicula4[1].includes("duracion")) {
                const keyRegex = new RegExp(`"duracion"\\s*:\\s*""`);
                if (keyRegex.test(pelicula4[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula4' debe tener la clave 'duracion' con un valor asignado.`,
                    en: `The dictionary 'movie4' must have the key 'duration' with an assigned value.`,
                    pt: `O dicionário 'movie4' deve ter a chave 'duration' com um valor atribuído.`
                  }];
                }
              }
            }
            if (!code.replace(/\s/g, '').trim().includes('pelicula4={"')) {
              seguirValidando = false;
              return [{
                es: "Debe crear un diccionario llamado 'pelicula4'.",
                en: "It must create a dictionary named 'pelicula4'.",
                pt: "Deve criar um dicionário chamado 'pelicula4'."
              }];
            }

            else if (code.replace(/\s/g, '').trim().includes("movie4={")) {
              const pelicula4 = code.replace(/\s/g, '').trim().match(/movie4={(.*?)\}/s); // Obtener el contenido del diccionario pelicula4
              if (!pelicula4[1].includes("title")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie4' debe tener la clave 'title'.",
                  en: "The dictionary 'movie4' must have the key 'title'.",
                  pt: "O dicionário 'movie4' deve ter a chave 'title'."
                }];
              } else if (pelicula4[1].includes("title")) {
                const keyRegex = new RegExp(`"title"\\s*:\\s*""`);
                if (keyRegex.test(pelicula4[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie4' debe tener la clave 'title' con un valor asignado.`,
                    en: `The dictionary 'movie4' must have the key 'title' with an assigned value.`,
                    pt: `O dicionário 'movie4' deve ter a chave 'title' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula4[1].includes("protagonist")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie4' debe tener la clave 'protagonist'.",
                  en: "The dictionary 'movie4' must have the key 'protagonist'.",
                  pt: "O dicionário 'movie4' deve ter a chave 'protagonist'."
                }];
              } else if (pelicula4[1].includes("protagonist")) {
                const keyRegex = new RegExp(`"protagonist"\\s*:\\s*""`);
                if (keyRegex.test(pelicula4[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie4' debe tener la clave 'protagonist' con un valor asignado.`,
                    en: `The dictionary 'movie4' must have the key 'protagonist' with an assigned value.`,
                    pt: `O dicionário 'movie4' deve ter a chave 'protagonist' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula4[1].includes("genre")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie4' debe tener la clave 'genre'.",
                  en: "The dictionary 'movie4' must have the key 'genre'.",
                  pt: "O dicionário 'movie4' deve ter a chave 'genre'."
                }];
              } else if (pelicula4[1].includes("genre")) {
                const keyRegex = new RegExp(`"genre"\\s*:\\s*""`);
                if (keyRegex.test(pelicula4[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie4' debe tener la clave 'genre' con un valor asignado.`,
                    en: `The dictionary 'movie4' must have the key 'genre' with an assigned value.`,
                    pt: `O dicionário 'movie4' deve ter a chave 'genre' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula4[1].includes("duration")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie4' debe tener la clave 'duration'.",
                  en: "The dictionary 'movie4' must have the key 'duration'.",
                  pt: "O dicionário 'movie4' deve ter a chave 'duration'."
                }];
              } else if (pelicula4[1].includes("duration")) {
                const keyRegex = new RegExp(`"duration"\\s*:\\s*""`);
                if (keyRegex.test(pelicula4[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie4' debe tener la clave 'duration' con un valor asignado.`,
                    en: `The dictionary 'movie4' must have the key 'duration' with an assigned value.`,
                    pt: `O dicionário 'movie4' deve ter a chave 'duration' com um valor atribuído.`
                  }];
                }
              }
            }
            else if (code.replace(/\s/g, '').trim().includes('movie4={"') && !code.replace(/\s/g, '').trim().includes('movie4={"')) {
              seguirValidando = false;
              return [{
                es: "Debe crear un diccionario llamado 'movie4'.",
                en: "It must create a dictionary named 'movie4'.",
                pt: "Deve criar um dicionário chamado 'movie4'."
              }];
            }

            if (code.includes("pelicula5 = {")) {
              const pelicula5 = code.match(/pelicula5 = \{(.*?)\}/s); // Obtener el contenido del diccionario pelicula5

              if (!pelicula5[1].includes("título")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula5' debe tener la clave 'título'.",
                  en: "The dictionary 'pelicula5' must have the key 'título'.",
                  pt: "O dicionário 'pelicula5' deve ter a chave 'título'."
                }];
              } else if (!pelicula5[1].includes("titulo")) {
                const keyRegex = new RegExp(`"titulo"\\s*:\\s*""`);
                if (keyRegex.test(pelicula5[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula5' debe tener la clave 'titulo' con un valor asignado.`,
                    en: `The dictionary 'movie5' must have the key 'title' with an assigned value.`,
                    pt: `O dicionário 'movie5' deve ter a chave 'title' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula5[1].includes("protagonista")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula5' debe tener la clave 'protagonista'.",
                  en: "The dictionary 'pelicula5' must have the key 'protagonista'.",
                  pt: "O dicionário 'pelicula5' deve ter a chave 'protagonista'."
                }];
              } else if (!pelicula5[1].includes("protagonista")) {
                const keyRegex = new RegExp(`"protagonista"\\s*:\\s*""`);
                if (keyRegex.test(pelicula5[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula5' debe tener la clave 'protagonista' con un valor asignado.`,
                    en: `The dictionary 'movie5' must have the key 'protagonist' with an assigned value.`,
                    pt: `O dicionário 'movie5' deve ter a chave 'protagonist' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula5[1].includes("genero")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula5' debe tener la clave 'genero'.",
                  en: "The dictionary 'pelicula5' must have the key 'genero'.",
                  pt: "O dicionário 'pelicula5' deve ter a chave 'genero'."
                }];
              } else if (!pelicula5[1].includes("genero")) {
                const keyRegex = new RegExp(`"genero"\\s*:\\s*""`);
                if (keyRegex.test(pelicula5[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula5' debe tener la clave 'genero' con un valor asignado.`,
                    en: `The dictionary 'movie5' must have the key 'genre' with an assigned value.`,
                    pt: `O dicionário 'movie5' deve ter a chave 'genre' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula5[1].includes("duracion")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula5' debe tener la clave 'duracion'.",
                  en: "The dictionary 'pelicula5' must have the key 'duracion'.",
                  pt: "O dicionário 'pelicula5' deve ter a chave 'duracion'."
                }];
              } else if (!pelicula5[1].includes("duracion")) {
                const keyRegex = new RegExp(`"duracion"\\s*:\\s*""`);
                if (keyRegex.test(pelicula5[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula5' debe tener la clave 'duracion' con un valor asignado.`,
                    en: `The dictionary 'movie5' must have the key 'duration' with an assigned value.`,
                    pt: `O dicionário 'movie5' deve ter a chave 'duration' com um valor atribuído.`
                  }];
                }
              }
            } if (!code.replace(/\s/g, '').trim().includes('pelicula5={"')) {
              seguirValidando = false;
              return [{
                es: "Debe crear un diccionario llamado 'pelicula5'.",
                en: "It must create a dictionary named 'pelicula5'.",
                pt: "Deve criar um dicionário chamado 'pelicula5'."
              }];
            }

            else if (code.replace(/\s/g, '').trim().includes("movie5={")) {
              const pelicula5 = code.replace(/\s/g, '').trim().match(/movie5={(.*?)\}/s); // Obtener el contenido del diccionario pelicula5
              if (!pelicula5[1].includes("title")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie5' debe tener la clave 'title'.",
                  en: "The dictionary 'movie5' must have the key 'title'.",
                  pt: "O dicionário 'movie5' deve ter a chave 'title'."
                }];
              } else if (pelicula5[1].includes("title")) {
                const keyRegex = new RegExp(`"title"\\s*:\\s*""`);
                if (keyRegex.test(pelicula5[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie5' debe tener la clave 'title' con un valor asignado.`,
                    en: `The dictionary 'movie5' must have the key 'title' with an assigned value.`,
                    pt: `O dicionário 'movie5' deve ter a chave 'title' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula5[1].includes("protagonist")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie5' debe tener la clave 'protagonist'.",
                  en: "The dictionary 'movie5' must have the key 'protagonist'.",
                  pt: "O dicionário 'movie5' deve ter a chave 'protagonist'."
                }];
              } else if (pelicula5[1].includes("protagonist")) {
                const keyRegex = new RegExp(`"protagonist"\\s*:\\s*""`);
                if (keyRegex.test(pelicula5[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie5' debe tener la clave 'protagonist' con un valor asignado.`,
                    en: `The dictionary 'movie5' must have the key 'protagonist' with an assigned value.`,
                    pt: `O dicionário 'movie5' deve ter a chave 'protagonist' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula5[1].includes("genre")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie5' debe tener la clave 'genre'.",
                  en: "The dictionary 'movie5' must have the key 'genre'.",
                  pt: "O dicionário 'movie5' deve ter a chave 'genre'."
                }];
              } else if (pelicula5[1].includes("genre")) {
                const keyRegex = new RegExp(`"genre"\\s*:\\s*""`);
                if (keyRegex.test(pelicula5[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie5' debe tener la clave 'genre' con un valor asignado.`,
                    en: `The dictionary 'movie5' must have the key 'genre' with an assigned value.`,
                    pt: `O dicionário 'movie5' deve ter a chave 'genre' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula5[1].includes("duration")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie5' debe tener la clave 'duration'.",
                  en: "The dictionary 'movie5' must have the key 'duration'.",
                  pt: "O dicionário 'movie5' deve ter a chave 'duration'."
                }];
              } else if (pelicula5[1].includes("duration")) {
                const keyRegex = new RegExp(`"duration"\\s*:\\s*""`);
                if (keyRegex.test(pelicula5[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie5' debe tener la clave 'duration' con un valor asignado.`,
                    en: `The dictionary 'movie5' must have the key 'duration' with an assigned value.`,
                    pt: `O dicionário 'movie5' deve ter a chave 'duration' com um valor atribuído.`
                  }];
                }
              }
            }
            else if (code.replace(/\s/g, '').trim().includes('movie5={"') && !code.replace(/\s/g, '').trim().includes('movie5={"')) {
              seguirValidando = false;
              return [{
                es: "Debe crear un diccionario llamado 'movie5'.",
                en: "It must create a dictionary named 'movie5'.",
                pt: "Deve criar um dicionário chamado 'movie5'."
              }];
            }

            if (code.includes("pelicula6 = {")) {
              const pelicula6 = code.match(/pelicula6 = \{(.*?)\}/s); // Obtener el contenido del diccionario pelicula6

              if (!pelicula6[1].includes("título")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula6' debe tener la clave 'título'.",
                  en: "The dictionary 'pelicula6' must have the key 'título'.",
                  pt: "O dicionário 'pelicula6' deve ter a chave 'título'."
                }];
              } else if (!pelicula6[1].includes("titulo")) {
                const keyRegex = new RegExp(`"titulo"\\s*:\\s*""`);
                if (keyRegex.test(pelicula6[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula6' debe tener la clave 'titulo' con un valor asignado.`,
                    en: `The dictionary 'movie6' must have the key 'title' with an assigned value.`,
                    pt: `O dicionário 'movie6' deve ter a chave 'title' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula6[1].includes("protagonista")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula6' debe tener la clave 'protagonista'.",
                  en: "The dictionary 'pelicula6' must have the key 'protagonista'.",
                  pt: "O dicionário 'pelicula6' deve ter a chave 'protagonista'."
                }];
              } else if (!pelicula6[1].includes("protagonista")) {
                const keyRegex = new RegExp(`"protagonista"\\s*:\\s*""`);
                if (keyRegex.test(pelicula6[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula6' debe tener la clave 'protagonista' con un valor asignado.`,
                    en: `The dictionary 'movie6' must have the key 'protagonist' with an assigned value.`,
                    pt: `O dicionário 'movie6' deve ter a chave 'protagonist' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula6[1].includes("genero")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula6' debe tener la clave 'genero'.",
                  en: "The dictionary 'pelicula6' must have the key 'genero'.",
                  pt: "O dicionário 'pelicula6' deve ter a chave 'genero'."
                }];
              } else if (!pelicula6[1].includes("genero")) {
                const keyRegex = new RegExp(`"genero"\\s*:\\s*""`);
                if (keyRegex.test(pelicula6[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula6' debe tener la clave 'genero' con un valor asignado.`,
                    en: `The dictionary 'movie6' must have the key 'genre' with an assigned value.`,
                    pt: `O dicionário 'movie6' deve ter a chave 'genre' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula6[1].includes("duracion")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'pelicula6' debe tener la clave 'duracion'.",
                  en: "The dictionary 'pelicula6' must have the key 'duracion'.",
                  pt: "O dicionário 'pelicula6' deve ter a chave 'duracion'."
                }];
              } else if (!pelicula6[1].includes("duracion")) {
                const keyRegex = new RegExp(`"duracion"\\s*:\\s*""`);
                if (keyRegex.test(pelicula6[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'pelicula6' debe tener la clave 'duracion' con un valor asignado.`,
                    en: `The dictionary 'movie6' must have the key 'duration' with an assigned value.`,
                    pt: `O dicionário 'movie6' deve ter a chave 'duration' com um valor atribuído.`
                  }];
                }
              }
            } if (!code.replace(/\s/g, '').trim().includes('pelicula6={"')) {
              seguirValidando = false;
              return [{
                es: "Debe crear un diccionario llamado 'pelicula6'.",
                en: "It must create a dictionary named 'pelicula6'.",
                pt: "Deve criar um dicionário chamado 'pelicula6'."
              }];
            }

            else if (code.replace(/\s/g, '').trim().includes("movie6={")) {
              const pelicula6 = code.replace(/\s/g, '').trim().match(/movie6={(.*?)\}/s); // Obtener el contenido del diccionario pelicula6
              if (!pelicula6[1].includes("title")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie6' debe tener la clave 'title'.",
                  en: "The dictionary 'movie6' must have the key 'title'.",
                  pt: "O dicionário 'movie6' deve ter a chave 'title'."
                }];
              } else if (pelicula6[1].includes("title")) {
                const keyRegex = new RegExp(`"title"\\s*:\\s*""`);
                if (keyRegex.test(pelicula6[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie6' debe tener la clave 'title' con un valor asignado.`,
                    en: `The dictionary 'movie6' must have the key 'title' with an assigned value.`,
                    pt: `O dicionário 'movie6' deve ter a chave 'title' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula6[1].includes("protagonist")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie6' debe tener la clave 'protagonist'.",
                  en: "The dictionary 'movie6' must have the key 'protagonist'.",
                  pt: "O dicionário 'movie6' deve ter a chave 'protagonist'."
                }];
              } else if (pelicula6[1].includes("protagonist")) {
                const keyRegex = new RegExp(`"protagonist"\\s*:\\s*""`);
                if (keyRegex.test(pelicula6[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie6' debe tener la clave 'protagonist' con un valor asignado.`,
                    en: `The dictionary 'movie6' must have the key 'protagonist' with an assigned value.`,
                    pt: `O dicionário 'movie6' deve ter a chave 'protagonist' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula6[1].includes("genre")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie6' debe tener la clave 'genre'.",
                  en: "The dictionary 'movie6' must have the key 'genre'.",
                  pt: "O dicionário 'movie6' deve ter a chave 'genre'."
                }];
              } else if (pelicula6[1].includes("genre")) {
                const keyRegex = new RegExp(`"genre"\\s*:\\s*""`);
                if (keyRegex.test(pelicula6[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie6' debe tener la clave 'genre' con un valor asignado.`,
                    en: `The dictionary 'movie6' must have the key 'genre' with an assigned value.`,
                    pt: `O dicionário 'movie6' deve ter a chave 'genre' com um valor atribuído.`
                  }];
                }
              }
              else if (!pelicula6[1].includes("duration")) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'movie6' debe tener la clave 'duration'.",
                  en: "The dictionary 'movie6' must have the key 'duration'.",
                  pt: "O dicionário 'movie6' deve ter a chave 'duration'."
                }];
              } else if (pelicula6[1].includes("duration")) {
                const keyRegex = new RegExp(`"duration"\\s*:\\s*""`);
                if (keyRegex.test(pelicula6[1])) {
                  seguirValidando = false;
                  return [{
                    es: `El diccionario 'movie6' debe tener la clave 'duration' con un valor asignado.`,
                    en: `The dictionary 'movie6' must have the key 'duration' with an assigned value.`,
                    pt: `O dicionário 'movie6' deve ter a chave 'duration' com um valor atribuído.`
                  }];
                }
              }
            }
            else if (code.replace(/\s/g, '').trim().includes('movie6={"') && !code.replace(/\s/g, '').trim().includes('movie6={"')) {
              seguirValidando = false;
              return [{
                es: "Debe crear un diccionario llamado 'movie6'.",
                en: "It must create a dictionary named 'movie6'.",
                pt: "Deve criar um dicionário chamado 'movie6'."
              }];
            }

            if (!code.includes('print(pelicula1)') && !code.includes('print(movie1)')) {
              seguirValidando = false;
              return [{
                es: "Debe mostrar el diccionario 'pelicula1'.",
                en: "It must display the dictionary 'movie1'.",
                pt: "Deve exibir o dicionário 'pelicula1'."
              }];
            } else if (!code.includes('print(pelicula2)') && !code.includes('print(movie2)')) {
              seguirValidando = false;
              return [{
                es: "Debe mostrar el diccionario 'pelicula2'.",
                en: "It must display the dictionary 'movie2'.",
                pt: "Deve exibir o dicionário 'pelicula2'."
              }];
            } else if (!code.includes('print(pelicula3)') && !code.includes('print(movie3)')) {
              seguirValidando = false;
              return [{
                es: "Debe mostrar el diccionario 'pelicula3'.",
                en: "It must display the dictionary 'movie3'.",
                pt: "Deve exibir o dicionário 'pelicula3'."
              }];
            } else if (!code.includes('print(pelicula4)') && !code.includes('print(movie4)')) {
              seguirValidando = false;
              return [{
                es: "Debe mostrar el diccionario 'pelicula4'.",
                en: "It must display the dictionary 'movie4'.",
                pt: "Deve exibir o dicionário 'pelicula4'."
              }];
            } else if (!code.includes('print(pelicula5)') && !code.includes('print(movie5)')) {
              seguirValidando = false;
              return [{
                es: "Debe mostrar el diccionario 'pelicula5'.",
                en: "It must display the dictionary 'movie5'.",
                pt: "Deve exibir o dicionário 'pelicula5'."
              }];
            } else if (!code.includes('print(pelicula6)') && !code.includes('print(movie6)')) {
              seguirValidando = false;
              return [{
                es: "Debe mostrar el diccionario 'pelicula6'.",
                en: "It must display the dictionary 'movie6'.",
                pt: "Deve exibir o dicionário 'pelicula6'."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "diccionario-02-01",
    "prompt": "Realiza las tareas según la actividad 'Diccionario'.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": "",
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Crear una lista vacía con el nombre jugadores",
        "test": (assert) => assert
          .$custom(code => {
            console.log(code.replace(/\s/g, '').trim());

            function validarInput(code, nombresVariables, palabraClave, label) {
              const codeClean = code.replace(/\s/g, '').trim();
              let inputEncontrado = null;

              for (let nombre of nombresVariables) {
                if (codeClean.includes(`${nombre}=input(`)) {
                  const match = code.match(new RegExp(`${nombre}\\s*=\\s*input\\((.*?)\\)`, 's'));
                  if (match) {
                    const textoInput = match[1].match(/["'](.*?)["']/)?.[1];
                    if (!textoInput || textoInput.length < 1) {
                      seguirValidando = false;
                      return [{
                        es: `Debe incluir una pregunta en el input para ${label} dentro del while.`,
                        en: `You must include a question in the input for the ${label} inside the while.`,
                        pt: `Você deve incluir uma pergunta no input para o ${label} dentro do while.`
                      }];
                    }
                    if (!new RegExp(palabraClave, 'i').test(textoInput)) {
                      seguirValidando = false;
                      return [{
                        es: `La pregunta del input dentro de while: "${textoInput}" no es válida porque no menciona "${label}".`,
                        en: `The input question inside the while: "${textoInput}" is not valid because it does not mention "${label}".`,
                        pt: `A pergunta de entrada dentro do while: "${textoInput}" não é válida porque não menciona "${label}".`
                      }];
                    }
                    inputEncontrado = true;
                    break;
                  }
                }
              }

              if (!inputEncontrado) {
                const articulo = (label.toLowerCase() === "edad") ? "la" : "el";
                return [{
                  es: `Debe solicitar ${articulo} ${label} de un jugador.`,
                  en: `It must request the ${label} of a player.`,
                  pt: `Deve solicitar o ${label} de um jogador.`
                }];
              }

              return null;
            }



            if (!code.replace(/\s/g, '').trim().includes("jugadores=[]") && !code.replace(/\s/g, '').trim().includes("players=[]")) {
              return [{
                es: "Debe crear una lista vacía llamada 'jugadores'.",
                en: "It must create an empty list named 'players'.",
                pt: "Deve criar uma lista vazia chamada 'players'."
              }]
            } else if (!code.replace(/\s/g, '').trim().includes("contador=1") && !code.replace(/\s/g, '').trim().includes("counter=1")) {
              return [{
                es: "Debes tener la variable contador que inicie con valor 1.",
                en: "You must have the counter variable that starts with value 1.",
                pt: "Você deve ter a variável contador que começa com o valor 1."
              }]
            } else if (!code.replace(/\s/g, '').trim().includes("whilecontador<=3:") && !code.replace(/\s/g, '').trim().includes("whilecounter<=3:")) {
              return [{
                es: "Debe usar un bucle while para agregar 3 jugadores a la lista.",
                en: "You must use a while loop to add 3 players to the list.",
                pt: "Você deve usar um loop while para adicionar 3 jogadores à lista."
              }]
            }
            // if (!code.replace(/\s/g, '').trim().includes("nombre=input(") && !code.replace(/\s/g, '').trim().includes("name=input(")) {
            //   return [{
            //     es: "Debe solicitar el nombre de un jugador.",
            //     en: "It must request the name of a player.",
            //     pt: "Deve solicitar o nome de um jogador."
            //   }]
            // } 

            let error;

            error = validarInput(code, ["nombre", "name"], "nombre|name", "nombre");
            if (error) return error;

            error = validarInput(code, ["apellido", "lastname"], "apellido|lastname", "apellido");
            if (error) return error;

            error = validarInput(code, ["edad", "age"], "edad|age", "edad");
            if (error) return error;

            error = validarInput(code, ["club1", "team1"], "club|team", "club");
            if (error) return error;

            error = validarInput(code, ["club2", "team2"], "club|team", "club");
            if (error) return error;

            console.log(code.replace(/\s/g, '').trim().includes("jugador={"));

            if (code.replace(/\s/g, '').trim().includes("jugador={") || code.replace(/\s/g, '').trim().includes("player={")) {
              const jugadorMatch = code.match(/jugador\s*=\s*\{([\s\S]*?)\}/);
              const playerMatch = code.match(/player\s*=\s*\{([\s\S]*?)\}/);
              // console.log(jugadorMatch[1]);

              const jugador = jugadorMatch[1];

              const player = playerMatch?.[1];

              if (!jugadorMatch && !playerMatch) {
                seguirValidando = false;
                return [{
                  es: "Debe existir un diccionario llamado 'jugador'.",
                  en: "A dictionary named 'jugador' must exist.",
                  pt: "Um dicionário chamado 'jugador' deve existir."
                }];
              }

              // if (!playerMatch) {
              //   seguirValidando = false;
              //   return [{
              //     es: "Debe existir un diccionario llamado 'player'.",
              //     en: "A dictionary named 'player' must exist.",
              //     pt: "Um dicionário chamado 'player' deve existir."
              //   }];
              // }
              // console.log(!code.replace(/\s/g, '').trim().includes("foriinrange(len(jugadores))"));

              if (jugador && !jugador.includes('"nombre": nombre')) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'jugador' debe tener la clave 'nombre' con el valor de la variable nombre.",
                  en: "The dictionary 'jugador' must have the key 'nombre' with the value of the variable nombre.",
                  pt: "O dicionário 'jugador' deve ter a chave 'nombre' com o valor da variável nombre."
                }];
              } else if (player && !player.includes('"name": name')) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'player' debe tener la clave 'name' con el valor de la variable name.",
                  en: "The dictionary 'player' must have the key 'name' with the value of the variable name.",
                  pt: "O dicionário 'player' deve ter a chave 'name' com o valor da variável name."
                }];
              }
              else if (jugador && !jugador.includes('"apellido": apellido')) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'jugador' debe tener la clave 'apellido' con el valor de la variable apellido.",
                  en: "The dictionary 'jugador' must have the key 'apellido' with the value of the variable apellido.",
                  pt: "O dicionário 'jugador' deve ter a chave 'apellido' com o valor da variável apellido."
                }];
              } else if (player && !player.includes('"lastname": lastname')) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'player' debe tener la clave 'lastname' con el valor de la variable lastname.",
                  en: "The dictionary 'player' must have the key 'lastname' with the value of the variable lastname.",
                  pt: "O dicionário 'player' deve ter a chave 'lastname' com o valor da variável lastname."
                }];
              }
              else if (jugador && !jugador.includes('"edad": edad')) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'jugador' debe tener la clave 'edad' con el valor de la variable edad.",
                  en: "The dictionary 'jugador' must have the key 'edad' with the value of the variable edad.",
                  pt: "O dicionário 'jugador' deve ter a chave 'edad' com o valor da variável edad."
                }];
              } else if (player && !player.includes('"age": age')) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'player' debe tener la clave 'age' con el valor de la variable age.",
                  en: "The dictionary 'player' must have the key 'age' with the value of the variable age.",
                  pt: "O dicionário 'player' deve ter a chave 'age' com o valor da variável age."
                }];
              }
              else if (jugador && !jugador.includes('"club1": club1')) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'jugador' debe tener la clave 'club1' con el valor de la variable club1.",
                  en: "The dictionary 'jugador' must have the key 'club1' with the value of the variable club1.",
                  pt: "O dicionário 'jugador' deve ter a chave 'club1' com o valor da variável club1."

                }];
              } else if (player && !player.includes('"team1": team1')) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'player' debe tener la clave 'team1' con el valor de la variable team1.",
                  en: "The dictionary 'player' must have the key 'team1' with the value of the variable team1.",
                  pt: "O dicionário 'player' deve ter a chave 'team1' com o valor da variável team1."
                }];
              }
              else if (jugador && !jugador.includes('"club2": club2')) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'jugador' debe tener la clave 'club2' con el valor de la variable club2.",
                  en: "The dictionary 'jugador' must have the key 'club2' with the value of the variable club2.",
                  pt: "O dicionário 'jugador' deve ter a chave 'club2' com o valor da variável club2."

                }];
              } else if (player && !player.includes('"team2": team2')) {
                seguirValidando = false;
                return [{
                  es: "El diccionario 'player' debe tener la clave 'team2' con el valor de la variable team2.",
                  en: "The dictionary 'player' must have the key 'team2' with the value of the variable team2.",
                  pt: "O dicionário 'player' deve ter a chave 'team2' com o valor da variável team2."
                }];
              }
            } else if (!code.replace(/\s/g, '').trim().includes("jugador={") && !code.replace(/\s/g, '').trim().includes("player={")) {
              seguirValidando = false;
              return [{
                es: "Debe crear un diccionario llamado 'jugador' luego de las preguntas en los inputs.",
                en: "It must create a dictionary named 'player' after the questions in the inputs.",
                pt: "Deve criar um dicionário chamado 'player' após as perguntas nos inputs."
              }];
            }
            if (!code.includes("jugadores.append(jugador)") && !code.includes("players.append(player)")) {
              seguirValidando = false;
              return [{
                es: "Debe agregar el diccionario 'jugador' a la lista 'jugadores'.",
                en: "It must add the dictionary 'player' to the list 'players'.",
                pt: "Deve adicionar o dicionário 'player' à lista 'players'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("contador+=1") && !code.replace(/\s/g, '').trim().includes("counter+=1")) {
              seguirValidando = false;
              return [{
                es: "Debe incrementar el contador.",
                en: "It must increment the counter.",
                pt: "Deve incrementar o contador."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("forjugadorinjugadores:") && !code.replace(/\s/g, '').trim().includes("forplayerinplayers:")) {
              seguirValidando = false;
              return [{
                es: "Debe recorrer la lista 'jugadores'.",
                en: "It must iterate the list 'players'.",
                pt: "Deve iterar a lista 'players'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes('indice=1forjugadorinjugadores:print("Losdatosdeljugador"+str(indice)+"son:"+jugador["nombre"]+""+jugador["apellido"]+",Edad:"+jugador["edad"]+",Clubes:"+jugador["club1"]+"y"+jugador["club2"])indice+=1') && !code.replace(/\s/g, '').trim().includes('index=1forplayerinplayers:print("Thedataofplayer"+str(index)+"are:"+player["name"]+""+player["lastname"]+",Age:"+player["age"]+","+"Teams:"+player["team1"]+"and"+player["team2"])index+=1') && !code.replace(/\s/g, '').trim().includes(`indice=1forjugadorinjugadores:print("Losdatosdeljugador"+str(indice)+"son:"+jugador["nombre"]+""+jugador["apellido"]+",Edad:"+jugador["edad"]+",Clubes:"+jugador["club1"]+"y"+jugador["club2"])indice+=1`) && !code.replace(/\s/g, '').trim().includes(`index=1forplayerinplayers:print("Thedataofplayer"+str(index)+"are:"+player["name"]+""+player["lastname"]+",Age:"+player["age"]+","+"Teams:"+player["team1"]+"and"+player["team2"])index+=1`) && !code.replace(/\s/g, '').trim().includes('forjugadorinjugadores:print("Losdatosdeljugador"+str(indice)+"son:"+jugador["nombre"]+""+jugador["apellido"]+",Edad:"+jugador["edad"]+","+"Clubes:"+jugador["club1"]+"y"+jugador["club2"])indice+=1') && !code.replace(/\s/g, '').trim().includes('forplayerinplayers:print("Thedataofplayer"+str(index)+"are:"+player["name"]+""+player["lastname"]+",Age:"+player["age"]+","+"Teams:"+player["team1"]+"and"+player["team2"])index+=1') && !code.replace(/\s/g, '').trim().includes(`forjugadorinjugadores:print('Los datos del jugador '+str(indice)+' son: '+jugador["nombre"]+' '+jugador["apellido"]+', Edad: '+str(jugador["edad"])+', Clubes: '+jugador["club1"]+' y '+jugador["club2"])indice+=1`) && !code.replace(/\s/g, '').trim().includes(`forplayerinplayers:print('The data of player '+str(index)+' are: '+player["name"]+' '+player["lastname"]+', Age: '+str(player["age"])+', Teams: '+player["team1"]+' and '+player["team2"])index+=1`) && !code.replace(/\s/g, '').trim().includes(`forjugadorinjugadores:print('Los datos del jugador '+str(indice)+' son: '+jugador["nombre"]+' '+jugador["apellido"]+', Edad: '+str(jugador["edad"])+','+' Clubes: '+jugador["club1"]+' y '+jugador["club2"])indice+=1`) && !code.replace(/\s/g, '').trim().includes(`forplayerinplayers:print('The data of player '+str(index)+' are: '+player["name"]+' '+player["lastname"]+', Age: '+str(player["age"])+', Teams: '+player["team1"]+' and '+player["team2"])index+=1`)) {
              seguirValidando = false;
              return [{
                es: "Debes mostrar los datos de cada jugador en la lista.",
                en: "It must display the data of each player in the list.",
                pt: "Deve exibir os dados de cada jogador na lista."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "diccionario-02-02",
    "prompt": "Realiza las tareas según la actividad 'Diccionario'.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": { es: 'artistas = [\n {\n  "nombreArtistico": "Lali",\n  "carrera": ["actriz", "cantante", "compositora"],\n  "nombre": "Mariana Espósito",\n  "edad": 31,\n  "pais": "Argentina",\n  "generoMusical": ["Pop", "Hip hop", "Dance pop"]\n },\n {\n  "nombreArtistico": "Taylor Swift",\n  "carrera": ["cantante", "compositora", "productora"],\n  "nombre": "Taylor Alison Swift",\n  "edad": 33,\n  "pais": "Estados Unidos",\n  "generoMusical": ["Pop", "Country pop", "Folk"]\n },\n {\n    \"nombreArtistico\": \"Karol G\",\n    \"carrera\": [\"cantante\", \"compositora\", \"productora\"],\n    \"nombre\": \"Carolina Giraldo Navarro\",\n    \"edad\": 33,\n    \"pais\": \"Colombia\",\n    \"generoMusical\": [\"Reguetón\", \"Pop urbano\", \"Trap latino\"]\n  }\n]', en: '# Artists list\nartists = [\n  {\n    \"stageName\": \"Lali\",\n    \"career\": [\"actress\", \"singer\", \"composer\"],\n    \"name\": \"Mariana Espósito\",\n    \"age\": 31,\n    \"country\": \"Argentina\",\n    \"musicGenre\": [\"Pop\", \"Hip hop\", \"Dance pop\"]\n  },\n  {\n    \"stageName\": \"Taylor Swift\",\n    \"career\": [\"singer\", \"composer\", \"producer\"],\n    \"name\": \"Taylor Alison Swift\",\n    \"age\": 33,\n    \"country\": \"United States\",\n    \"musicGenre\": [\"Pop\", \"Country pop\", \"Folk\"]\n  },\n  {\n    \"stageName\": \"Karol G\",\n    \"career\": [\"singer\", \"songwriter\", \"producer\"],\n    \"name\": \"Carolina Giraldo Navarro\",\n    \"age\": 33,\n    \"country\": \"Colombia\",\n    \"musicGenre\": [\"Reggaeton\", \"Pop urbano\", \"Trap latino\"]\n  }\n]' },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Bucle for para iterar la lista de diccionarios",
        "test": (assert) => assert
          .$custom(code => {

            if (!code.replace(/\s/g, '').trim().includes("artistas=[") && !code.replace(/\s/g, '').trim().includes("artists=[")) {
              return [{
                es: "Debes tener una lista llamada 'artistas'.",
                en: "You must have a list named 'artists'.",
                pt: "Você deve ter uma lista chamada 'artists'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes('artistas=[{"nombreArtistico":"Lali","carrera":["actriz","cantante","compositora"],"nombre":"MarianaEspósito","edad":31,"pais":"Argentina","generoMusical":["Pop","Hiphop","Dancepop"]},{"nombreArtistico":"TaylorSwift","carrera":["cantante","compositora","productora"],"nombre":"TaylorAlisonSwift","edad":33,"pais":"EstadosUnidos","generoMusical":["Pop","Countrypop","Folk"]},{"nombreArtistico":"KarolG","carrera":["cantante","compositora","productora"],"nombre":"CarolinaGiraldoNavarro","edad":33,"pais":"Colombia","generoMusical":["Reguetón","Popurbano","Traplatino"]}]') && !code.replace(/\s/g, '').trim().includes('artists=[{"stageName":"Lali","career":["actress","singer","composer"],"name":"MarianaEspósito","age":31,"country":"Argentina","musicGenre":["Pop","Hip hop","Dance pop"]},{"stageName":"TaylorSwift","career":["singer","composer","producer"],"name":"TaylorAlisonSwift","age":33,"country":"UnitedStates","musicGenre":["Pop","Country pop","Folk"]},{"stageName":"KarolG","career":["singer","songwriter","producer"],"name":"CarolinaGiraldoNavarro","age":33,"country":"Colombia","musicGenre":["Reggaeton","Pop urbano","Trap latino"]}]')) {
              return [{
                es: "No debes modificar ni eliminar los datos de la lista brindada en el ejercicio.",
                en: "You must not modify or delete the data in the list provided in the exercise.",
                pt: "Não deve modificar ou eliminar os dados da lista fornecida no exercício."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("forartistainartistas:") && !code.replace(/\s/g, '').trim().includes("forartistainartists:")) {
              return [{
                es: "Debes usar un bucle for con la variable iterador 'artista' para recorrer la lista 'artistas'.",
                en: "You must use a for loop with the iterator variable 'artist' to iterate the list 'artists'.",
                pt: "Você deve usar um loop for com a variável iteradora 'artist' para iterar a lista 'artists'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes('print(artista["nombre"]+",(mejorconocidacomo"+artista["nombreArtistico"]+"),esuna"+artista["carrera"][0]+","+artista["carrera"][1]+"y"+artista["carrera"][2]+"de"+str(artista["edad"])+"añosquenacióen"+artista["pais"]+".Susgénerosmusicalessonel"+artista["generoMusical"][0]+",el"+artista["generoMusical"][1]+"yel"+artista["generoMusical"][2]+".")') && !code.replace(/\s/g, '').trim().includes('print(artist["name"]+",(betterknownas"+artist["stageName"]+"),is"+artist["career"][0]+","+artist["career"][1]+"and"+artist["career"][2]+"of"+str(artist["age"])+"yearsoldwhowasbornin"+artist["country"]+".Hismusicgenresare"+artist["musicGenre"][0]+","+artist["musicGenre"][1]+"and"+artist["musicGenre"][2]+".")') && !code.replace(/\s/g, '').trim().includes('print(artista["nombre"]+",(mejorconocidacomo"+artista["nombreArtistico"]+"),esuna"+artista["carrera"][0]+","+artista["carrera"][1]+"y"+artista["carrera"][2]+"de"+str(artista["edad"])+"añosquenacióen"+artista["pais"]+".Susgénerosmusicalessonel"+artista["generoMusical"][0]+",el"+artista["generoMusical"][1]+"yel"+artista["generoMusical"][2]+".")')) {
              return [{
                es: "Debe mostrar los datos de los artistas respetando el formato de texto de la consigna.",
                en: "You must display the data of the artists respecting the text format of the instruction.",
                pt: "Deve exibir os dados dos artistas respeitando o formato de texto da atividade."
              }];
            }

          })
      }
    ]
  },
  {
    "id": "pandas-a-01",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": [],
    "editors": {
      "main.py": {
        "code": { es: 'import math\n\nclass Rectangulo:\n def __init__(self, base, altura): self.base, self.altura = base, altura\n def calcularPerimetro(self): return self.base*2 + self.altura*2\n def calcularArea(self): return self.base*self.altura\n\nclass PoligonoRegular:\n def __init__(self, cantidad_lados, medida_lados): self.cantidad_lados, self.medida_lados = cantidad_lados, medida_lados\n def hallarPerimetro(self): return self.cantidad_lados * self.medida_lados\n def hallarApotema(self): return self.medida_lados / (2 * math.tan(math.radians((360 / self.cantidad_lados) / 2)))\n def hallarArea(self): return 0.5 * self.hallarPerimetro() * self.hallarApotema()\n\nclass Circulo:\n def __init__(self, radio): self.radio = radio\n def calcularArea(self): return math.pi * (self.radio ** 2)\n def calcularPerimetro(self): return 2 * math.pi * self.radio\n\nclass Esfera:\n def __init__(self, radio): self.radio = radio\n def calcularSuperficie(self): return 4 * math.pi * (self.radio ** 2)\n def calcularVolumen(self): return (4/3) * math.pi * (self.radio ** 3)', en: 'import math\n\nclass Rectangle:\n def __init__(self, base, height): self.base, self.height = base, height\n def calculatePerimeter(self): return self.base*2 + self.height*2\n def calculateArea(self): return self.base*self.height\n\nclass RegularPolygon:\n def __init__(self, sides, sides_length): self.sides, self.sides_length = sides, sides_length\n def findPerimeter(self): return self.sides * self.sides_length\n def findApothem(self): return self.sides_length / (2 * math.tan(math.radians((360 / self.sides) / 2)))\n def findArea(self): return 0.5 * self.findPerimeter() * self.findApothem()\n\nclass Circle:\n def __init__(self, radius): self.radius = radius\n def calculateArea(self): return math.pi * (self.radius ** 2)\n def calculatePerimeter(self): return 2 * math.pi * self.radius\n\nclass Sphere:\n def __init__(self, radius): self.radius = radius\n def calculateSurface(self): return 4 * math.pi * (self.radius ** 2)\n def calculateVolume(self): return (4/3) * math.pi * (self.radius ** 3)' },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Clases y métodos",
        "test": (assert) => assert
          .$custom(code => {

            if (!code.replace(/\s/g, '').trim().includes("classRectangulo:") && !code.replace(/\s/g, '').trim().includes("classRectangle:")) {
              return [{
                es: "Debes tener una clase llamada 'Rectangulo'.",
                en: "You must have a class named 'Rectangle'.",
                pt: "Você deve ter uma classe chamada 'Rectangle'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("classPoligonoRegular:") && !code.replace(/\s/g, '').trim().includes("classRegularPolygon:")) {
              return [{
                es: "Debes tener una clase llamada 'PoligonoRegular'.",
                en: "You must have a class named 'RegularPolygon'.",
                pt: "Você deve ter uma classe chamada 'RegularPolygon'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("classCirculo:") && !code.replace(/\s/g, '').trim().includes("classCircle:")) {
              return [{
                es: "Debes tener una clase llamada 'Circulo'.",
                en: "You must have a class named 'Circle'.",
                pt: "Você deve ter uma classe chamada 'Circle'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("classEsfera:") && !code.replace(/\s/g, '').trim().includes("classSphere:")) {
              return [{
                es: "Debes tener una clase llamada 'Esfera'.",
                en: "You must have a class named 'Sphere'.",
                pt: "Você deve ter uma classe chamada 'Sphere'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("def__init__(self,base,altura):self.base,self.altura=base,altura") && !code.replace(/\s/g, '').trim().includes("def__init__(self,base,height):self.base,self.height=base,height")) {
              return [{
                es: "Debes tener un método __init__ que reciba 'base' y 'altura' como parámetros.",
                en: "You must have an __init__ method that receives 'base' and 'height' as parameters.",
                pt: "Você deve ter um método __init__ que receba 'base' e 'altura' como parâmetros."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("defcalcularPerimetro(self):returnself.base*2+self.altura*2") && !code.replace(/\s/g, '').trim().includes("defcalculatePerimeter(self):returnself.base*2+self.height*2")) {
              return [{
                es: "Debes tener un método 'calcularPerimetro' que retorne el perímetro del rectángulo.",
                en: "You must have a 'calculatePerimeter' method that returns the perimeter of the rectangle.",
                pt: "Você deve ter um método 'calculatePerimeter' que retorne o perímetro do retângulo."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("defcalcularArea(self):returnself.base*self.altura") && !code.replace(/\s/g, '').trim().includes("defcalculateArea(self):returnself.base*self.height")) {
              return [{
                es: "Debes tener un método 'calcularArea' que retorne el área del rectángulo.",
                en: "You must have a 'calculateArea' method that returns the area of the rectangle.",
                pt: "Você deve ter um método 'calculateArea' que retorne a área do retângulo."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("def__init__(self,cantidad_lados,medida_lados):self.cantidad_lados,self.medida_lados=cantidad_lados,medida_lados") && !code.replace(/\s/g, '').trim().includes("def__init__(self,sides,sides_length):self.sides,self.sides_length=sides,sides_length")) {
              return [{
                es: "Debes tener un método __init__ que reciba 'cantidad_lados' y 'medida_lados' como parámetros.",
                en: "You must have an __init__ method that receives 'sides' and 'sides_length' as parameters.",
                pt: "Você deve ter um método __init__ que receba 'sides' e 'sides_length' como parâmetros."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("defhallarPerimetro(self):returnself.cantidad_lados*self.medida_lados") && !code.replace(/\s/g, '').trim().includes("deffindPerimeter(self):returnself.sides*self.sides_length")) {
              return [{
                es: "Debes tener un método 'hallarPerimetro' que retorne el perímetro del polígono regular.",
                en: "You must have a 'findPerimeter' method that returns the perimeter of the regular polygon.",
                pt: "Você deve ter um método 'findPerimeter' que retorne o perímetro do polígono regular."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("defhallarApotema(self):returnself.medida_lados/(2*math.tan(math.radians((360/self.cantidad_lados)/2)))") && !code.replace(/\s/g, '').trim().includes("deffindApothem(self):returnself.sides_length/(2*math.tan(math.radians((360/self.sides)/2))")) {
              return [{
                es: "Debes tener un método 'hallarApotema' que retorne la apotema del polígono regular.",
                en: "You must have a 'findApothem' method that returns the apothem of the regular polygon.",
                pt: "Você deve ter um método 'findApothem' que retorne a apótema do polígono regular."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("defhallarArea(self):return0.5*self.hallarPerimetro()*self.hallarApotema()") && !code.replace(/\s/g, '').trim().includes("deffindArea(self):return0.5*self.findPerimeter()*self.findApothem()")) {
              return [{
                es: "Debes tener un método 'hallarArea' que retorne el área del polígono regular.",
                en: "You must have a 'findArea' method that returns the area of the regular polygon.",
                pt: "Você deve ter um método 'findArea' que retorne a área do polígono regular."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("def__init__(self,radio):self.radio=radio") && !code.replace(/\s/g, '').trim().includes("def__init__(self,radius):self.radius=radius")) {
              return [{
                es: "Debes tener un método __init__ que reciba 'radio' como parámetro.",
                en: "You must have an __init__ method that receives 'radius' as a parameter.",
                pt: "Você deve ter um método __init__ que receba 'raio' como parâmetro."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("defcalcularArea(self):returnmath.pi*(self.radio**2)") && !code.replace(/\s/g, '').trim().includes("defcalculateArea(self):returnmath.pi*(self.radius**2)")) {
              return [{
                es: "Debes tener un método 'calcularArea' que retorne el área del círculo.",
                en: "You must have a 'calculateArea' method that returns the area of the circle.",
                pt: "Você deve ter um método 'calculateArea' que retorne a área do círculo."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("defcalcularPerimetro(self):return2*math.pi*self.radio") && !code.replace(/\s/g, '').trim().includes("defcalculatePerimeter(self):return2*math.pi*self.radius")) {
              return [{
                es: "Debes tener un método 'calcularPerimetro' que retorne el perímetro del círculo.",
                en: "You must have a 'calculatePerimeter' method that returns the perimeter of the circle.",
                pt: "Você deve ter um método 'calculatePerimeter' que retorne o perímetro do círculo."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("defcalcularSuperficie(self):return4*math.pi*(self.radio**2)") && !code.replace(/\s/g, '').trim().includes("defcalculateSurface(self):return4*math.pi*(self.radius**2)")) {
              return [{
                es: "Debes tener un método 'calcularSuperficie' que retorne la superficie de la esfera.",
                en: "You must have a 'calculateSurface' method that returns the surface of the sphere.",
                pt: "Você deve ter um método 'calculateSurface' que retorne a superfície da esfera."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("defcalcularVolumen(self):return(4/3)*math.pi*(self.radio**3)") && !code.replace(/\s/g, '').trim().includes("defcalculateVolume(self):return(4/3)*math.pi*(self.radius**3)")) {
              return [{
                es: "Debes tener un método 'calcularVolumen' que retorne el volumen de la esfera.",
                en: "You must have a 'calculateVolume' method that returns the volume of the sphere.",
                pt: "Você deve ter um método 'calculateVolume' que retorne o volume da esfera."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("rectangulo=") && !code.replace(/\s/g, '').trim().includes("rectangle=")) {
              return [{
                es: "Debe crear una variable llamada 'rectangulo' para guardar los resultados del rectángulo.",
                en: "It must create a variable named 'rectangle' to store the results of the rectangle.",
                pt: "Deve criar uma variável chamada 'rectangle' para armazenar os resultados do retângulo."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("rectangulo=Rectangulo(10,20)") && !code.replace(/\s/g, '').trim().includes("rectangle=Rectangle(10,20)")) {
              return [{
                es: "Debes crear una variable llamada 'rectangulo' con un rectángulo de 10 cm de base y 20 cm de altura.",
                en: "It must create a variable named 'rectangle' with a rectangle of 10 cm base and 20 cm height.",
                pt: "Deve criar uma variável chamada 'rectangle' com um retângulo de 10 cm de base e 20 cm de altura."
              }];
            }
            const regexRectanguloArea = /print\s*\(\s*(?:(["'])[^"']*\1\s*\+\s*str\s*\(\s*rectangulo\.calcularArea\s*\(\s*\)\s*\)|["'][^"']*["']\s*,\s*rectangulo\.calcularArea\s*\(\s*\))\s*\)/;
            console.log(code);

            if (!regexRectanguloArea.test(code)) {
              return [{
                es: "Debes mostrar el área del rectángulo.",
                en: "It must display the area of the rectangle.",
                pt: "Deve exibir a área do retângulo."
              }];
            }

            const regexRectanguloPerimetro = /print\s*\(\s*(?:(["'])[^"']*\1\s*\+\s*str\s*\(\s*rectangulo\.calcularPerimetro\s*\(\s*\)\s*\)|["'][^"']*["']\s*,\s*rectangulo\.calcularPerimetro\s*\(\s*\))\s*\)/;

            if (!regexRectanguloPerimetro.test(code)) {
              return [{
                es: "Debes mostrar el perímetro del rectángulo.",
                en: "It must display the perimeter of the rectangle.",
                pt: "Deve exibir o perímetro do retângulo."
              }];
            }

            if (!code.replace(/\s/g, '').trim().includes("poligono=") && !code.replace(/\s/g, '').trim().includes("polygon=")) {
              return [{
                es: "Debes crear una variable llamada 'poligono' para guardar los resultados del polígono regular.",
                en: "It must create a variable named 'polygon' to store the results of the regular polygon.",
                pt: "Deve criar uma variável chamada 'polygon' para armazenar os resultados do polígono regular."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("poligono=PoligonoRegular(6,15)") && !code.replace(/\s/g, '').trim().includes("polygon=RegularPolygon(6,15)")) {
              return [{
                es: "Debes crear una variable llamada 'poligono' con un polígono de 6 lados de 15 cm cada uno.",
                en: "It must create a variable named 'polygon' with a 6-sided polygon of 15 cm each.",
                pt: "Deve criar uma variável chamada 'polygon' com um polígono de 6 lados de 15 cm cada."
              }];
            }

            const regexPoligonoArea = /print\s*\(\s*(?:(["'])[^"']*\1\s*\+\s*str\s*\(\s*poligono\.hallarArea\s*\(\s*\)\s*\)|["'][^"']*["']\s*,\s*poligono\.hallarArea\s*\(\s*\))\s*\)/;

            if (!regexPoligonoArea.test(code)) {
              return [{
                es: "Debes mostrar el área del polígono regular.",
                en: "It must display the area of the regular polygon.",
                pt: "Deve exibir a área do polígono regular."
              }];
            }

            const regexPoligonoApotema = /print\s*\(\s*(?:(["'])[^"']*\1\s*\+\s*str\s*\(\s*poligono\.hallarApotema\s*\(\s*\)\s*\)|["'][^"']*["']\s*,\s*poligono\.hallarApotema\s*\(\s*\))\s*\)/;

            if (!regexPoligonoApotema.test(code)) {
              return [{
                es: "Debes mostrar el apotema del polígono regular.",
                en: "It must display the apothem of the regular polygon.",
                pt: "Deve exibir a apótema do polígono regular."
              }];
            }

            const regexPoligonoPerimetro = /print\s*\(\s*(?:(["'])[^"']*\1\s*\+\s*str\s*\(\s*poligono\.hallarPerimetro\s*\(\s*\)\s*\)|["'][^"']*["']\s*,\s*poligono\.hallarPerimetro\s*\(\s*\))\s*\)/;

            if (!regexPoligonoPerimetro.test(code)) {
              return [{
                es: "Debes mostrar el perímetro del polígono regular.",
                en: "It must display the perimeter of the regular polygon.",
                pt: "Deve exibir o perímetro do polígono regular."
              }];
            }

            if (!code.replace(/\s/g, '').trim().includes("esfera=") && !code.replace(/\s/g, '').trim().includes("sphere=")) {
              return [{
                es: "Debes crear una variable llamada 'esfera' para guardar los resultados de la esfera.",
                en: "It must create a variable named 'sphere' to store the results of the sphere.",
                pt: "Deve criar uma variável chamada 'sphere' para armazenar os resultados da esfera."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("esfera=Esfera(12)") && !code.replace(/\s/g, '').trim().includes("sphere=Sphere(12)")) {
              return [{
                es: "Debes crear una variable llamada 'esfera' con un radio de 12 cm.",
                en: "It must create a variable named 'sphere' with a radius of 12cm.",
                pt: "Deve criar uma variável chamada 'sphere' com um raio de 12cm."
              }];
            }

            const regexEsferaSuperficie = /print\s*\(\s*(?:(["'])[^"']*\1\s*\+\s*str\s*\(\s*esfera\.calcularSuperficie\s*\(\s*\)\s*\)|["'][^"']*["']\s*,\s*esfera\.calcularSuperficie\s*\(\s*\))\s*\)/;

            if (!regexEsferaSuperficie.test(code)) {
              return [{
                es: "Debes mostrar la superficie de la esfera.",
                en: "It must display the surface of the sphere.",
                pt: "Deve exibir a superfície da esfera."
              }];
            }

            const regexEsferaVolumen = /print\s*\(\s*(?:(["'])[^"']*\1\s*\+\s*str\s*\(\s*esfera\.calcularVolumen\s*\(\s*\)\s*\)|["'][^"']*["']\s*,\s*esfera\.calcularVolumen\s*\(\s*\))\s*\)/;

            if (!regexEsferaVolumen.test(code)) {
              return [{
                es: "Debes mostrar el volumen de la esfera.",
                en: "It must display the volume of the sphere.",
                pt: "Deve exibir o volume da esfera."
              }];
            }

            if (!code.replace(/\s/g, '').trim().includes("circulo=") && !code.replace(/\s/g, '').trim().includes("circle=")) {
              return [{
                es: "Debes crear una variable llamada 'circulo' para guardar los resultados del círculo.",
                en: "It must create a variable named 'circle' to store the results of the circle.",
                pt: "Deve criar uma variável chamada 'circle' para armazenar os resultados do círculo."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("circulo=Circulo(22)") && !code.replace(/\s/g, '').trim().includes("circle=Circle(22)")) {
              return [{
                es: "Debes crear una variable llamada 'circulo' con un radio de 22 cm.",
                en: "It must create a variable named 'circle' with a radius of 22cm.",
                pt: "Deve criar uma variável chamada 'circle' com um raio de 22cm."
              }];
            }

            const regexCirculoArea = /print\s*\(\s*(?:(["'])[^"']*\1\s*\+\s*str\s*\(\s*circulo\.calcularArea\s*\(\s*\)\s*\)|["'][^"']*["']\s*,\s*circulo\.calcularArea\s*\(\s*\))\s*\)/;

            if (!regexCirculoArea.test(code)) {
              return [{
                es: "Debes mostrar el área del círculo.",
                en: "It must display the area of the circle.",
                pt: "Deve exibir a área do círculo."
              }];
            }

            const regexCirculoPerimetro = /print\s*\(\s*(?:(["'])[^"']*\1\s*\+\s*str\s*\(\s*circulo\.calcularPerimetro\s*\(\s*\)\s*\)|["'][^"']*["']\s*,\s*circulo\.calcularPerimetro\s*\(\s*\))\s*\)/;

            if (!regexCirculoPerimetro.test(code)) {
              return [{
                es: "Debes mostrar el perímetro del círculo.",
                en: "It must display the perimeter of the circle.",
                pt: "Deve exibir o perímetro do círculo."
              }];
            }




          })
      }
    ]
  },
  {
    "id": "pandas-a-01-desafio",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas"],
    "editors": {
      "main.py": {
        "code": { es: 'import math\n\nclass Rectangulo:\n def __init__(self, base, altura): self.base, self.altura = base, altura\n def calcularPerimetro(self): return self.base*2 + self.altura*2\n def calcularArea(self): return self.base*self.altura\n\nclass PoligonoRegular:\n def __init__(self, cantidad_lados, medida_lados): self.cantidad_lados, self.medida_lados = cantidad_lados, medida_lados\n def hallarPerimetro(self): return self.cantidad_lados * self.medida_lados\n def hallarApotema(self): return self.medida_lados / (2 * math.tan(math.radians((360 / self.cantidad_lados) / 2)))\n def hallarArea(self): return 0.5 * self.hallarPerimetro() * self.hallarApotema()\n\nclass Circulo:\n def __init__(self, radio): self.radio = radio\n def calcularArea(self): return math.pi * (self.radio ** 2)\n def calcularPerimetro(self): return 2 * math.pi * self.radio\n\nclass Esfera:\n def __init__(self, radio): self.radio = radio\n def calcularSuperficie(self): return 4 * math.pi * (self.radio ** 2)\n def calcularVolumen(self): return (4/3) * math.pi * (self.radio ** 3)', en: 'import math\n\nclass Rectangle:\n def __init__(self, base, height): self.base, self.height = base, height\n def calculatePerimeter(self): return self.base*2 + self.height*2\n def calculateArea(self): return self.base*self.height\n\nclass RegularPolygon:\n def __init__(self, sides, sides_length): self.sides, self.sides_length = sides, sides_length\n def findPerimeter(self): return self.sides * self.sides_length\n def findApothem(self): return self.sides_length / (2 * math.tan(math.radians((360 / self.sides) / 2)))\n def findArea(self): return 0.5 * self.findPerimeter() * self.findApothem()\n\nclass Circle:\n def __init__(self, radius): self.radius = radius\n def calculateArea(self): return math.pi * (self.radius ** 2)\n def calculatePerimeter(self): return 2 * math.pi * self.radius\n\nclass Sphere:\n def __init__(self, radius): self.radius = radius\n def calculateSurface(self): return 4 * math.pi * (self.radius ** 2)\n def calculateVolume(self): return (4/3) * math.pi * (self.radius ** 3)' },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Clases y métodos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("cuadrado=") && !code.replace(/\s/g, '').trim().includes("square=")) {
              return [{
                es: "Debes crear una variable llamada 'cuadrado' para guardar los resultados del cuadrado.",
                en: "It must create a variable named 'square' to store the results of the square.",
                pt: "Deve criar uma variável chamada 'square' para armazenar os resultados do quadrado."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("cuadrado=Rectangulo(3,3)") && !code.replace(/\s/g, '').trim().includes("square=Rectangle(3,3)")) {
              return [{
                es: "Debes crear una variable llamada 'cuadrado' con base 3cm y altura 3cm.",
                en: "It must create a variable named 'square' with base 3cm and height 3cm.",
                pt: "Deve criar uma variável chamada 'square' com base 3cm e altura 3cm."
              }];
            }

            const regexCuadradoArea = /print\s*\(\s*(?:(["'])[^"']*\1\s*\+\s*str\s*\(\s*cuadrado\.calcularArea\s*\(\s*\)\s*\)|["'][^"']*["']\s*,\s*cuadrado\.calcularArea\s*\(\s*\))\s*\)/;

            if (!regexCuadradoArea.test(code)) {
              return [{
                es: "Debe mostrar el área del cuadrado.",
                en: "It must display the area of the square.",
                pt: "Deve exibir a área do quadrado."
              }];
            }

            const regexCuadradoPerimetro = /print\s*\(\s*(?:(["'])[^"']*\1\s*\+\s*str\s*\(\s*cuadrado\.calcularPerimetro\s*\(\s*\)\s*\)|["'][^"']*["']\s*,\s*cuadrado\.calcularPerimetro\s*\(\s*\))\s*\)/;

            if (!regexCuadradoPerimetro.test(code)) {
              return [{
                es: "Debe mostrar el perímetro del cuadrado.",
                en: "It must display the perimeter of the square.",
                pt: "Deve exibir o perímetro do quadrado."
              }];
            }
          })
      }
    ]

  },
  {
    "id": "pandas-a-02",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas"],
    "editors": {
      "main.py": {
        "code": { es: `import pandas as pd\nfrom pyodide.http import open_url\n\nurl_google = 'https://docs.google.com/spreadsheets/d/1gjNFhkQiMebKLV53_YLOIiQ9n4V4BS6MXXTHjmpvlJc/export?format=csv&gid=1437453753'\nurl_peliculas = 'https://docs.google.com/spreadsheets/d/1-U_0YUsiZxgg1rV4lTCXoFGhzL_mB6lD93-_vvcjYiA/export?format=csv&gid=1621176789'\n\n# Usar open_url para manejar URL\ngoogle_data = pd.read_csv(open_url(url_google))\npeliculas_data = pd.read_csv(open_url(url_peliculas))\n\npd.set_option('display.max_columns', 10)\n\n# Resolver cada pregunta del cuestionario en Playground utilizando las funciones aprendidas.`, en: `import pandas as pd\nfrom pyodide.http import open_url\n\nurl_google = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT1vAAQJEOdVUShxj-HgapZ21-exNPEE3E7ihLpi52kRJiOC6HGLpj5MXgCoVs2DciozHT2IKoXXFa0/pub?output=csv'\nurl_movies = 'https://docs.google.com/spreadsheets/d/1-U_0YUsiZxgg1rV4lTCXoFGhzL_mB6lD93-_vvcjYiA/export?format=csv&gid=1621176789'\n\n# Use open_url to handle URL\ngoogle_data = pd.read_csv(open_url(url_google))\nmovies_data = pd.read_csv(open_url(url_movies))\n\npd.set_option('display.max_columns', 10)\n\n# Solve each question in the Playground questionnaire using the functions learned.` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Importar librerías y leer datos",
        "test": (assert) => assert
          .$custom(code => {

            if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("url_google='https://docs.google.com/spreadsheets/d/1gjNFhkQiMebKLV53_YLOIiQ9n4V4BS6MXXTHjmpvlJc/export?format=csv&gid=1437453753'") && !code.replace(/\s/g, '').trim().includes("url_movies='https://docs.google.com/spreadsheets/d/e/2PACX-1vT1vAAQJEOdVUShxj-HgapZ21-exNPEE3E7ihLpi52kRJiOC6HGLpj5MXgCoVs2DciozHT2IKoXXFa0/pub?output=csv'")) {
              return [{
                es: "Debes tener una variable 'url_google' con la URL del archivo de Google Sheets.",
                en: "You must have a 'url_google' variable with the URL of the Google Sheets file.",
                pt: "Você deve ter uma variável 'url_google' com a URL do arquivo do Google Sheets."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("url_peliculas='https://docs.google.com/spreadsheets/d/1-U_0YUsiZxgg1rV4lTCXoFGhzL_mB6lD93-_vvcjYiA/export?format=csv&gid=1621176789'") && !code.replace(/\s/g, '').trim().includes("url_movies='https://docs.google.com/spreadsheets/d/e/2PACX-1vRWd7TOeIH_NsFiqTUd0DKmqZoZck6nwrPY80ptXKYbkCjYgr4KYH3-075Wf_AX10joENcv9ElxpQMA/pub?output=csv'")) {
              return [{
                es: "Debes tener una variable 'url_peliculas' con la URL del archivo de Google Sheets.",
                en: "You must have a 'url_movies' variable with the URL of the Google Sheets file.",
                pt: "Você deve ter uma variável 'url_movies' com a URL do arquivo do Google Sheets."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("google_data=pd.read_csv(open_url(url_google))") && !code.replace(/\s/g, '').trim().includes("google_data=pd.read_csv(open_url(url_google))")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'google_data'.",
                en: "You must read the data from the Google Sheets file into the 'google_data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'google_data'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("peliculas_data=pd.read_csv(open_url(url_peliculas))") && !code.replace(/\s/g, '').trim().includes("movies_data=pd.read_csv(open_url(url_movies))")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'peliculas_data'.",
                en: "You must read the data from the Google Sheets file into the 'movies_data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'movies_data'."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-a-03-funAgregacion",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas"],
    "editors": {
      "main.py": {
        "code": { es: `import pandas as pd\nfrom pyodide.http import open_url\n\nurl_google = 'https://docs.google.com/spreadsheets/d/1gjNFhkQiMebKLV53_YLOIiQ9n4V4BS6MXXTHjmpvlJc/export?format=csv&gid=1437453753'\n\ndata=pd.read_csv(open_url(url_google))\n`, en: `import pandas as pd\nfrom pyodide.http import open_url\n\nurl_google = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT1vAAQJEOdVUShxj-HgapZ21-exNPEE3E7ihLpi52kRJiOC6HGLpj5MXgCoVs2DciozHT2IKoXXFa0/pub?output=csv'\ndata=pd.read_csv(open_url(url_google))\n` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "funciones de agregación",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("url_google='https://docs.google.com/spreadsheets/d/1gjNFhkQiMebKLV53_YLOIiQ9n4V4BS6MXXTHjmpvlJc/export?format=csv&gid=1437453753'") && !code.replace(/\s/g, '').trim().includes("url_google='https://docs.google.com/spreadsheets/d/e/2PACX-1vT1vAAQJEOdVUShxj-HgapZ21-exNPEE3E7ihLpi52kRJiOC6HGLpj5MXgCoVs2DciozHT2IKoXXFa0/pub?output=csv")) {
              return [{
                es: "Debes tener una variable 'url_google' con la URL del archivo de Google Sheets.",
                en: "You must have a 'url_google' variable with the URL of the Google Sheets file.",
                pt: "Você deve ter uma variável 'url_google' com a URL do arquivo do Google Sheets."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_google))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_google))")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data['PUNTAJE']") && !code.replace(/\s/g, '').trim().includes('data["PUNTAJE"]') && !code.replace(/\s/g, '').trim().includes("data['SCORE']") && !code.replace(/\s/g, '').trim().includes('data["SCORE"]')) {
              return [{
                es: "Debes seleccionar la columna 'PUNTAJE' utilizando la notación de corchetes.",
                en: "You must select the 'SCORE' column using bracket notation.",
                pt: "Você deve selecionar a coluna 'PUJANJE' usando a notação de colchetes."
              }];
            }
            const funciones = ["min", "max", "mean", "sum", "count", "unique", "nunique", "value_counts"];

            // Extraer funciones usadas en el código
            const usadas = funciones.filter(func => new RegExp(`print\\s*\\(.*?data\\["PUNTAJE"\\]\\.${func}\\(\\)`).test(code) || new RegExp(`print\\s*\\(.*?data\\['PUNTAJE'\\]\\.${func}\\(\\)`).test(code) || new RegExp(`print\\s*\\(.*?data\\["SCORE"\\]\\.${func}\\(\\)`).test(code) || new RegExp(`print\\s*\\(.*?data\\['SCORE'\\]\\.${func}\\(\\)`).test(code));

            if (usadas.length != 4) {
              return [{
                es: "Debes utilizar exactamente 4 de las siguientes funciones de agregación: min, max, mean, sum, count, unique, nunique, value_counts y mostrar los resultados.",
                en: "You must use exactly 4 of the following aggregation functions: min, max, mean, sum, count, unique, nunique, value_counts and display the results.",
                pt: "Você deve usar exatamente 4 das seguintes funções de agregação: min, max, mean, sum, count, unique, nunique, value_counts e exibir os resultados."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data['DESCARGA_TOTAL(mb)']=") && !code.replace(/\s/g, '').trim().includes("data['TOTAL_DOWNLOAD(mb)']=") && !code.replace(/\s/g, '').trim().includes('data["DESCARGA_TOTAL(mb)"]=') && !code.replace(/\s/g, '').trim().includes('data["TOTAL_DOWNLOAD(mb)"]=')) {
              return [{
                es: "Debes crear una nueva columna 'DESCARGA_TOTAL(mb)' ",
                en: "You must create a new column 'TOTAL_DOWNLOAD(mb)' ",
                pt: "Você deve criar uma nova coluna 'TOTAL_DOWNLOAD(mb)' "
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data['DESCARGA_TOTAL(mb)']=data['TAMAÑO(mb)']*data['INSTALACIONES']") && !code.replace(/\s/g, '').trim().includes("data['TOTAL_DOWNLOAD(mb)']=data['SIZE(mb)']*data['INSTALLS']") && !code.replace(/\s/g, '').trim().includes("data['DESCARGA_TOTAL(mb)']=data['TAMAÑO(mb)']*data['INSTALACIONES']") && !code.replace(/\s/g, '').trim().includes("data['TOTAL_DOWNLOAD(mb)']=data['SIZE(mb)']*data['INSTALLS']") && !code.replace(/\s/g, '').trim().includes('data["DESCARGA_TOTAL(mb)"]=data["TAMAÑO(mb)"]*data["INSTALACIONES"]') && !code.replace(/\s/g, '').trim().includes('data["TOTAL_DOWNLOAD(mb)"]=data["SIZE(mb)"]*data["INSTALLS"]')) {
              return [{
                es: "En la nueva columna 'DESCARGA_TOTAL(mb)' debes almacenar el resultado multiplicando 'TAMAÑO(mb)' por 'INSTALACIONES'.",
                en: "In the new column 'TOTAL_DOWNLOAD(mb)' you must store the result by multiplying 'SIZE(mb)' by 'INSTALLS'.",
                pt: "Na nova coluna 'TOTAL_DOWNLOAD(mb)' você deve armazenar o resultado multiplicando 'SIZE(mb)' por 'INSTALLS'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`data['DESCARGA_TOTAL(mb)']=data['TAMAÑO(mb)']*data['INSTALACIONES']data['DESCARGA_TOTAL(mb)']=`) && !code.replace(/\s/g, '').trim().includes(`data['TOTAL_DOWNLOAD(mb)']=data['SIZE(mb)']*data['INSTALLS']data['TOTAL_DOWNLOAD(mb)']=`) && !code.replace(/\s/g, '').trim().includes(`data["DESCARGA_TOTAL(mb)"]=data["TAMAÑO(mb)"]*data["INSTALACIONES"]data["DESCARGA_TOTAL(mb)"]=`) && !code.replace(/\s/g, '').trim().includes(`data["TOTAL_DOWNLOAD(mb)"]=data["SIZE(mb)"]*data["INSTALLS"]data["TOTAL_DOWNLOAD(mb)"]=`)) {
              return [{
                es: "Debes volver a utilizar la nueva columna 'DESCARGA_TOTAL(mb)' para convertirla a tipo entero.",
                en: "You must use the new column 'TOTAL_DOWNLOAD(mb)' again to convert it to integer type.",
                pt: "Você deve usar a nova coluna 'TOTAL_DOWNLOAD(mb)' novamente para convertê-la para o tipo inteiro."
              }];
            }

            if (!code.replace(/\s/g, '').trim().includes("data['DESCARGA_TOTAL(mb)']=data['DESCARGA_TOTAL(mb)'].astype(int)") && !code.replace(/\s/g, '').trim().includes("data['TOTAL_DOWNLOAD(mb)']=data['TOTAL_DOWNLOAD(mb)'].astype(int)") && !code.replace(/\s/g, '').trim().includes('data["DESCARGA_TOTAL(mb)"]=data["DESCARGA_TOTAL(mb)"].astype(int)') && !code.replace(/\s/g, '').trim().includes('data["TOTAL_DOWNLOAD(mb)"]=data["TOTAL_DOWNLOAD(mb)"].astype(int)')) {
              return [{
                es: "Debes convertir la columna 'DESCARGA_TOTAL(mb)' a tipo entero.",
                en: "You must convert the 'DESCARGA_TOTAL(mb)' column to integer type.",
                pt: "Você deve converter a coluna 'DESCARGA_TOTAL(mb)' para o tipo inteiro."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes('print(data.sort_values("DESCARGA_TOTAL(mb)",ascending=False).head(5))') && !code.replace(/\s/g, '').trim().includes('print(data.sort_values("TOTAL_DOWNLOAD(mb)",ascending=False).head(5))') && !code.replace(/\s/g, '').trim().includes("print(data.sort_values('DESCARGA_TOTAL(mb)',ascending=False).head(5))") && !code.replace(/\s/g, '').trim().includes("print(data.sort_values('TOTAL_DOWNLOAD(mb)',ascending=False).head(5))")) {
              return [{
                es: "Debes imprimir las 5 aplicaciones con mayor 'DESCARGA_TOTAL(mb)' en orden descendente. Recuerda utilizar 'head()' para limitar el resultado.",
                en: "You must print the 5 applications with the highest 'TOTAL_DOWNLOAD(mb)' in descending order. Remember to use 'head()' to limit the result.",
                pt: "Você deve imprimir os 5 aplicativos com o maior 'TOTAL_DOWNLOAD(mb)' em ordem decrescente. Lembre-se de usar 'head()' para limitar o resultado."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes('data["VERSIÓN_ANDROID_NOMBRE_APP"]=data["VERSIÓN_ANDROID"]+"-"+data["NOMBRE_APP"]') && !code.replace(/\s/g, '').trim().includes('data["ANDROID_VERSION_APP_NAME"]=data["ANDROID_VERSION"]+"-"+data["APP_NAME"]') && !code.replace(/\s/g, '').trim().includes("data['VERSIÓN_ANDROID_NOMBRE_APP']=data['VERSIÓN_ANDROID']+'-'+data['NOMBRE_APP']") && !code.replace(/\s/g, '').trim().includes("data['ANDROID_VERSION_APP_NAME']=data['ANDROID_VERSION']+'-'+data['APP_NAME']")) {
              return [{
                es: "Debes crear una nueva columna 'VERSIÓN_ANDROID_NOMBRE_APP' concatenando 'VERSIÓN_ANDROID' y 'NOMBRE_APP'.",
                en: "You must create a new column 'ANDROID_VERSION_APP_NAME' by concatenating 'ANDROID_VERSION' and 'APP_NAME'.",
                pt: "Você deve criar uma nova coluna 'ANDROID_VERSION_APP_NAME' concatenando 'ANDROID_VERSION' e 'APP_NAME'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes('print(data["VERSIÓN_ANDROID_NOMBRE_APP"])') && !code.replace(/\s/g, '').trim().includes('print(data["ANDROID_VERSION_APP_NAME"])') && !code.replace(/\s/g, '').trim().includes("print(data['VERSIÓN_ANDROID_NOMBRE_APP'])") && !code.replace(/\s/g, '').trim().includes("print(data['ANDROID_VERSION_APP_NAME'])")) {
              return [{
                es: "Debes imprimir la columna 'VERSIÓN_ANDROID_NOMBRE_APP'.",
                en: "You must print the 'ANDROID_VERSION_APP_NAME' column.",
                pt: "Você deve imprimir a coluna 'ANDROID_VERSION_APP_NAME'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes('print(data.value_counts("CATEGORÍA"))') && !code.replace(/\s/g, '').trim().includes('print(data.value_counts("CATEGORY"))') && !code.replace(/\s/g, '').trim().includes("print(data.value_counts('CATEGORÍA'))") && !code.replace(/\s/g, '').trim().includes("print(data.value_counts('CATEGORY'))")) {
              return [{
                es: "Debes imprimir la cantidad de aplicaciones por categoría.",
                en: "You must print the number of applications by category.",
                pt: "Você deve imprimir a quantidade de aplicativos por categoria."
              }];
            }
          })

      }
    ]
  },
  {
    "id": "pandas-a-04-funSimples",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas"],
    "editors": {
      "main.py": {
        "code": { es: `import pandas as pd\nfrom pyodide.http import open_url\n\nurl_futbol = 'https://docs.google.com/spreadsheets/d/1Rz5pTSdmz9xkx-EQFdmGKdlXk7lv_vXte8E8mlx-lps/export?format=csv&gid=1523357960'\n\ndata=pd.read_csv(open_url(url_futbol))\n`, en: `import pandas as pd\nfrom pyodide.http import open_url\n\nurl_soccer = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQoJdzUN4ADIDXD1DlElp75YZWHYuAQcrYWBq8KL2y8QEPngyLk9C0dIoMArxetkgXZpJMch9GLGRAw/pub?output=csv'\n\ndata=pd.read_csv(open_url(url_soccer))\n` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "funciones simples",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("url_futbol='https://docs.google.com/spreadsheets/d/1Rz5pTSdmz9xkx-EQFdmGKdlXk7lv_vXte8E8mlx-lps/export?format=csv&gid=1523357960'") && !code.replace(/\s/g, '').trim().includes("url_soccer='https://docs.google.com/spreadsheets/d/e/2PACX-1vQoJdzUN4ADIDXD1DlElp75YZWHYuAQcrYWBq8KL2y8QEPngyLk9C0dIoMArxetkgXZpJMch9GLGRAw/pub?output=csv'")) {
              return [{
                es: "Debes tener una variable 'url_futbol' con la URL del archivo de Google Sheets.",
                en: "You must have a 'url_soccer' variable with the URL of the Google Sheets file.",
                pt: "Você deve ter uma variável 'url_soccer' com a URL do arquivo do Google Sheets."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_futbol))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_soccer))")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("print(data.head(5))")) {
              return [{
                es: "Debes imprimir los primeros 5 registros de la tabla.",
                en: "You must print the first 5 records of the table.",
                pt: "Você deve imprimir os primeiros 5 registros da tabela."
              }];
            }
            const regex = /print\s*\(.*?data\[(["'])POSICIÓN\1\]\.value_counts\(\).*?\)/;
            const regexEn = /print\s*\(.*?data\[(["'])POSITION\1\]\.value_counts\(\).*?\)/;

            if (!regex.test(code) && !regexEn.test(code)) {
              return [{
                es: "Debes imprimir la cantidad de jugadores por posición.",
                en: "You must print the number of players by position.",
                pt: "Você deve imprimir a quantidade de jogadores por posição."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("print(data.shape)")) {
              return [{
                es: "Debes indicar la cantidad de filas y columnas que tiene el df.",
                en: "You must indicate the number of rows and columns in the df.",
                pt: "Você deve indicar a quantidade de linhas e colunas que tem o df."
              }];
            }
            // if (!code.replace(/\s/g, '').trim().includes("filtro_rating=") && !code.replace(/\s/g, '').trim().includes("rating_filter=")) {
            //   return [{
            //     es: "Debes crear una máscara con el nombre filtro_rating para los jugadores con rating mayor a 86.",
            //     en: "You must create a mask named rating_filter for players with a rating greater than 86.",
            //     pt: "Você deve criar uma máscara chamada rating_filter para jogadores com rating maior que 86."
            //   }];
            // }
            if (!code.replace(/\s/g, '').trim().includes("=data['RATING']>86") && !code.replace(/\s/g, '').trim().includes("=data['RATING']>86") && !code.replace(/\s/g, '').trim().includes('=data["RATING"]>86') && !code.replace(/\s/g, '').trim().includes('=data["RATING"]>86')) {
              return [{
                es: "Debes crear un filtro para los jugadores con rating mayor a 86.",
                en: "You must create a filter for players with a rating greater than 86.",
                pt: "Você deve criar um filtro para jogadores com rating maior que 86."
              }];
            }
            // if (!code.replace(/\s/g, '').trim().includes("filtro_portero=") && !code.replace(/\s/g, '').trim().includes("goalkeeper_filter=")) {
            //   return [{
            //     es: "Debes crear una máscara con el nombre filtro_portero para los jugadores que sean porteros.",
            //     en: "You must create a mask named goalkeeper_filter for players who are goalkeepers.",
            //     pt: "Você deve criar uma máscara chamada goalkeeper_filter para jogadores que sejam goleiros."
            //   }];
            // }
            if (!code.replace(/\s/g, '').trim().includes("=data['POSICIÓN']=='Portero'") && !code.replace(/\s/g, '').trim().includes("=data['POSITION']=='Goalkeeper'") && !code.replace(/\s/g, '').trim().includes('=data["POSICIÓN"]=="Portero"') && !code.replace(/\s/g, '').trim().includes('=data["POSITION"]=="Goalkeeper"')) {
              return [{
                es: "Debes crear un filtro para los jugadores que sean porteros.",
                en: "You must create a filter for players who are goalkeepers.",
                pt: "Você deve criar um filtro para jogadores que sejam goleiros."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("porteros_86=") && !code.replace(/\s/g, '').trim().includes("goalkeepers_86=")) {
              return [{
                es: "Debes crear un nuevo DataFrame llamado porteros_86 con los jugadores que cumplan con el filtro de rating y portero.",
                en: "You must create a new DataFrame called goalkeepers_86 with players who meet the rating and goalkeeper filter.",
                pt: "Você deve criar um novo DataFrame chamado goalkeepers_86 com jogadores que atendam ao filtro de rating e goleiro."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("porteros_86=data[") && !code.replace(/\s/g, '').trim().includes("goalkeepers_86=data[") && !code.replace(/\s/g, '').trim().includes('porteros_86=data[') && !code.replace(/\s/g, '').trim().includes('goalkeepers_86=data[')) {
              return [{
                es: "Debes filtrar los jugadores que cumplan con el filtro de rating y portero, y almacenarlos en el DataFrame porteros_86.",
                en: "You must filter the players who meet the rating and goalkeeper filter, and store them in the goalkeepers_86 DataFrame.",
                pt: "Você deve filtrar os jogadores que atendam ao filtro de rating e goleiro, e armazená-los no DataFrame goalkeepers_86."
              }];
            }
            // const regex2 = /print\s*\(.*?porteros_86\)/;
            // const regexEn2 = /print\s*\(.*?goalkeepers_86\)/;
            // if (!regex2.test(code) && !regexEn2.test(code)) {
            //   return [{
            //     es: "Debes imprimir los porteros con rating mayor a 86.",
            //     en: "You must print goalkeepers with a rating greater than 86.",
            //     pt: "Você deve imprimir os goleiros com rating maior que 86."
            //   }];
            // }
            if (!code.replace(/\s/g, '').trim().includes("valor_50m=") && !code.replace(/\s/g, '').trim().includes("value_50m=")) {
              return [{
                es: "Debes crear una máscara con el nombre valor_50m para los jugadores con valor mayor a 50 MEUR.",
                en: "You must create a mask named value_50m for players with a value greater than 50 MEUR.",
                pt: "Você deve criar uma máscara chamada value_50m para jogadores com valor maior que 50 MEUR."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("valor_50m=data['VALOR_EUR']>50000000") && !code.replace(/\s/g, '').trim().includes('value_50m=data["VALUE_EUR"]>50000000') && !code.replace(/\s/g, '').trim().includes(`valor_50m=data["VALOR_EUR"]>50000000`) && !code.replace(/\s/g, '').trim().includes("value_50m=data['VALUE_EUR']>50000000")) {
              return [{
                es: "Debes crear un filtro para los jugadores con valor mayor a 50 MEUR.",
                en: "You must create a filter for players with a value greater than 50 MEUR.",
                pt: "Você deve criar um filtro para jogadores com valor maior que 50 MEUR."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("salario_100k=") && !code.replace(/\s/g, '').trim().includes("salary_100k=")) {
              return [{
                es: "Debes crear una máscara con el nombre salario_100k para los jugadores con salario semanal mayor a 100 kEUR.",
                en: "You must create a mask named salary_100k for players with a weekly salary greater than 100 kEUR.",
                pt: "Você deve criar uma máscara chamada salary_100k para jogadores com salário semanal maior que 100 kEUR."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("salario_100k=data['SALARIO_SEMANAL_EUR']>100000") && !code.replace(/\s/g, '').trim().includes("salary_100k=data['WEEKLY_SALARY_EUR']>100000") && !code.replace(/\s/g, '').trim().includes('salario_100k=data["SALARIO_SEMANAL_EUR"]>100000') && !code.replace(/\s/g, '').trim().includes('salary_100k=data["WEEKLY_SALARY_EUR"]>100000')) {
              return [{
                es: "Debes crear un filtro para los jugadores con salario semanal mayor a 100 kEUR.",
                en: "You must create a filter for players with a weekly salary greater than 100 kEUR.",
                pt: "Você deve criar um filtro para jogadores com salário semanal maior que 100 kEUR."

              }];
            }
            // if (!code.replace(/\s/g, '').trim().includes("lateral_der=") && !code.replace(/\s/g, '').trim().includes("right_back=")) {
            //   return [{
            //     es: "Debes crear una máscara con el nombre lateral_der para los jugadores que sean laterales derechos.",
            //     en: "You must create a mask named right_back for players who are right backs.",
            //     pt: "Você deve criar uma máscara chamada right_back para jogadores que sejam laterais direitos."
            //   }];
            // }
            if (!code.replace(/\s/g, '').trim().includes("=data['POSICIÓN']=='Lateralderecho'") && !code.replace(/\s/g, '').trim().includes("=data['POSITION']=='Rightback'") && !code.replace(/\s/g, '').trim().includes('=data["POSICIÓN"]=="Lateralderecho"') && !code.replace(/\s/g, '').trim().includes('=data["POSITION"]=="Rightback"')) {
              return [{
                es: "Debes crear un filtro para los jugadores que sean laterales derechos.",
                en: "You must create a filter for players who are right backs.",
                pt: "Você deve criar um filtro para jogadores que sejam laterais direitos."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("lat_der_50m_100k=") && !code.replace(/\s/g, '').trim().includes("right_back_50m_100k=")) {
              return [{
                es: "Debes crear un nuevo DataFrame llamado lat_der_50m_100k con los jugadores que cumplan con el filtro de valor y salario semanal.",
                en: "You must create a new DataFrame called right_back_50m_100k with players who meet the value and weekly salary filter.",
                pt: "Você deve criar um novo DataFrame chamado right_back_50m_100k com jogadores que atendam ao filtro de valor e salário semanal."
              }];
            }

            if (!code.replace(/\s/g, '').trim().includes("lat_der_50m_100k=data[") && !code.replace(/\s/g, '').trim().includes("right_back_50m_100k=data[") && !code.replace(/\s/g, '').trim().includes('lat_der_50m_100k=data[') && !code.replace(/\s/g, '').trim().includes('right_back_50m_100k=data[')) {
              return [{
                es: "Debes filtrar los laterales derechos con valor mayor a 50 MEUR y salario semanal mayor a 100 kEUR.",
                en: "You must filter right backs with a value greater than 50 MEUR and a weekly salary greater than 100 kEUR.",
                pt: "Você deve filtrar laterais direitos com valor maior que 50 MEUR e salário semanal maior que 100 kEUR."
              }];
            }
            // if (!code.replace(/\s/g, '').trim().includes("print(lat_der_50m_100k)") && !code.replace(/\s/g, '').trim().includes("print(right_back_50m_100k)")) {
            //   return [{
            //     es: "Debes imprimir los laterales derechos con valor mayor a 50 MEUR y salario semanal mayor a 100 kEUR.",
            //     en: "You must print right backs with a value greater than 50 MEUR and a weekly salary greater than 100 kEUR.",
            //     pt: "Você deve imprimir laterais direitos com valor maior que 50 MEUR e salário semanal maior que 100 kEUR."
            //   }];
            // }
            if (!code.replace(/\s/g, '').trim().includes("data['SALARIO_ANUAL_EUR']=") && !code.replace(/\s/g, '').trim().includes("data['ANNUAL_SALARY_EUR']=") && !code.replace(/\s/g, '').trim().includes('data["SALARIO_ANUAL_EUR"]=') && !code.replace(/\s/g, '').trim().includes('data["ANNUAL_SALARY_EUR"]=')) {
              return [{
                es: "Debes crear una nueva columna 'SALARIO_ANUAL_EUR' ",
                en: "You must create a new column 'ANNUAL_SALARY_EUR' ",
                pt: "Você deve criar uma nova coluna 'ANNUAL_SALARY_EUR' "
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data['SALARIO_ANUAL_EUR']=data['SALARIO_SEMANAL_EUR']*52") && !code.replace(/\s/g, '').trim().includes("data['ANNUAL_SALARY_EUR']=data['WEEKLY_SALARY_EUR']*52") && !code.replace(/\s/g, '').trim().includes('data["SALARIO_ANUAL_EUR"]=data["SALARIO_SEMANAL_EUR"]*52') && !code.replace(/\s/g, '').trim().includes('data["ANNUAL_SALARY_EUR"]=data["WEEKLY_SALARY_EUR"]*52')) {
              return [{
                es: "Debes crear una nueva columna 'SALARIO_ANUAL_EUR' multiplicando 'SALARIO_SEMANAL_EUR' por 52.",
                en: "You must create a new column 'ANNUAL_SALARY_EUR' by multiplying 'WEEKLY_SALARY_EUR' by 52.",
                pt: "Você deve criar uma nova coluna 'ANNUAL_SALARY_EUR' multiplicando 'WEEKLY_SALARY_EUR' por 52."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("centrocampista=") && !code.replace(/\s/g, '').trim().includes("midfielder=")) {
              return [{
                es: "Debes crear una máscara con el nombre centrocampista para los jugadores que sean centrocampistas.",
                en: "You must create a mask named midfielder for players who are midfielders.",
                pt: "Você deve criar uma máscara chamada meio-campista para jogadores que sejam meio-campistas."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("centrocampista=data['POSICIÓN']=='Centrocampista'") && !code.replace(/\s/g, '').trim().includes("midfielder=data['POSITION']=='Midfielder'") && !code.replace(/\s/g, '').trim().includes('centrocampista=data["POSICIÓN"]=="Centrocampista"') && !code.replace(/\s/g, '').trim().includes('midfielder=data["POSITION"]=="Midfielder"')) {
              return [{
                es: "Debes crear un filtro para los jugadores que sean centrocampistas.",
                en: "You must create a filter for players who are midfielders.",
                pt: "Você deve criar um filtro para jogadores que sejam meio-campistas."
              }];
            }
            // if (!code.replace(/\s/g, '').trim().includes("argentina=") && !code.replace(/\s/g, '').trim().includes("argentina=")) {
            //   return [{
            //     es: "Debes crear una máscara con el nombre argentina para los jugadores de nacionalidad argentina.",
            //     en: "You must create a mask named argentina for players of Argentine",
            //     pt: "Você deve criar uma máscara chamada argentina para jogadores de nacionalidade argentina."
            //   }];
            // }
            if (!code.replace(/\s/g, '').trim().includes("=data['NACIONALIDAD']=='Argentina'") && !code.replace(/\s/g, '').trim().includes("=data['NATIONALITY']=='Argentina'") && !code.replace(/\s/g, '').trim().includes('=data["NACIONALIDAD"]=="Argentina"') && !code.replace(/\s/g, '').trim().includes('=data["NATIONALITY"]=="Argentina"')) {
              return [{
                es: "Debes crear un filtro para los jugadores que sean de nacionalidad argentina.",
                en: "You must create a filter for players who are of Argentine nationality.",
                pt: "Você deve criar um filtro para jogadores que sejam de nacionalidade argentina."
              }];
            }
            // if (!code.replace(/\s/g, '').trim().includes("salarioanual_900k=") && !code.replace(/\s/g, '').trim().includes("annual_salary_900k=")) {
            //   return [{
            //     es: "Debes crear una máscara con el nombre salarioanual_900k para los jugadores con salario anual mayor a 900k EUR.",
            //     en: "You must create a mask named annual_salary_900k for players with an annual salary greater than 900k EUR.",
            //     pt: "Você deve criar uma máscara chamada annual_salary_900k para jogadores com salário anual maior que 900k EUR."
            //   }];
            // }
            if (!code.replace(/\s/g, '').trim().includes("=data['SALARIO_ANUAL_EUR']>900000") && !code.replace(/\s/g, '').trim().includes("=data['ANNUAL_SALARY_EUR']>900000") && !code.replace(/\s/g, '').trim().includes('=data["SALARIO_ANUAL_EUR"]>900000') && !code.replace(/\s/g, '').trim().includes('=data["ANNUAL_SALARY_EUR"]>900000')) {
              return [{
                es: "Debes crear un filtro para los jugadores con salario anual mayor a 900 kEUR.",
                en: "You must create a filter for players with an annual salary greater than 900 kEUR.",
                pt: "Você deve criar um filtro para jogadores com salário anual maior que 900 kEUR."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("centro_arg_900k=") && !code.replace(/\s/g, '').trim().includes("mid_arg_900k=")) {
              return [{
                es: "Debes crear un nuevo DataFrame llamado centro_arg_900k con los centrocampistas argentinos que cumplan con el filtro de salario anual.",
                en: "You must create a new DataFrame called mid_arg_900k with Argentine midfielders who meet the annual salary filter.",
                pt: "Você deve criar um novo DataFrame chamado mid_arg_900k com meio-campistas argentinos que atendam ao filtro de salário anual."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("centro_arg_900k=data[") && !code.replace(/\s/g, '').trim().includes("mid_arg_900k=data[") && !code.replace(/\s/g, '').trim().includes('centro_arg_900k=data[') && !code.replace(/\s/g, '').trim().includes('mid_arg_900k=data[')) {
              return [{
                es: "Debes filtrar a los centrocampistas argentinos con salario anual mayor a 900 kEUR.",
                en: "You must filter Argentine midfielders with an annual salary greater than 900 kEUR.",
                pt: "Você deve filtrar meio-campistas argentinos com salário anual maior que 900 kEUR."
              }];
            }
            // if (!code.replace(/\s/g, '').trim().includes("print(centro_arg_900k)") && !code.replace(/\s/g, '').trim().includes("print(mid_arg_900k)")) {
            //   return [{
            //     es: "Debes imprimir los centrocampistas argentinos con salario anual mayor a 900 kEUR.",
            //     en: "You must print Argentine midfielders with an annual salary greater than 900 kEUR.",
            //     pt: "Você deve imprimir meio-campistas argentinos com salário anual maior que 900 kEUR."
            //   }];
            // }
            if (!code.replace(/\s/g, '').trim().includes("delantero=") && !code.replace(/\s/g, '').trim().includes("forward=")) {
              return [{
                es: "Debes crear una máscara con el nombre delantero para los jugadores que sean delanteros.",
                en: "You must create a mask named forward for players who are forwards.",
                pt: "Você deve criar uma máscara chamada forward para jogadores que sejam atacantes."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("delantero=data['POSICIÓN']=='Delantero'") && !code.replace(/\s/g, '').trim().includes("forward=data['POSITION']=='Forward'") && !code.replace(/\s/g, '').trim().includes('delantero=data["POSICIÓN"]=="Delantero"') && !code.replace(/\s/g, '').trim().includes('forward=data["POSITION"]=="Forward"')) {
              return [{
                es: "Debes crear un filtro para los jugadores que sean delanteros.",
                en: "You must create a filter for players who are forwards.",
                pt: "Você deve criar um filtro para jogadores que sejam atacantes."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("liverpool=")) {
              return [{
                es: "Debes crear una máscara con el nombre liverpool para los jugadores que pertenezcan al club Liverpool.",
                en: "You must create a mask named liverpool for players who belong to the Liverpool club.",
                pt: "Você deve criar uma máscara chamada liverpool para jogadores que pertençam ao clube Liverpool."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("liverpool=data['CLUB']=='Liverpool'") && !code.replace(/\s/g, '').trim().includes("liverpool=data['CLUB']=='Liverpool'") && !code.replace(/\s/g, '').trim().includes('liverpool=data["CLUB"]=="Liverpool"') && !code.replace(/\s/g, '').trim().includes('liverpool=data["CLUB"]=="Liverpool"')) {
              return [{
                es: "Debes crear un filtro para los jugadores que pertenezcan al club Liverpool.",
                en: "You must create a filter for players who belong to the Liverpool club.",
                pt: "Você deve criar um filtro para jogadores que pertençam ao clube Liverpool."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("everton=")) {
              return [{
                es: "Debes crear una máscara con el nombre 'everton' para los jugadores que pertenezcan al club Everton.",
                en: "You must create a mask named everton for players who belong to the Everton club.",
                pt: "Você deve criar uma máscara chamada everton para jogadores que pertençam ao clube Everton."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("everton=data['CLUB']=='Everton'") && !code.replace(/\s/g, '').trim().includes("everton=data['CLUB']=='Everton'") && !code.replace(/\s/g, '').trim().includes('everton=data["CLUB"]=="Everton"') && !code.replace(/\s/g, '').trim().includes('everton=data["CLUB"]=="Everton"')) {
              return [{
                es: "Debes crear un filtro para los jugadores que pertenezcan al club Everton.",
                en: "You must create a filter for players who belong to the Everton club.",
                pt: "Você deve criar um filtro para jogadores que pertençam ao clube Everton."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("del_liv_eve=") && !code.replace(/\s/g, '').trim().includes("for_liv_eve=")) {
              return [{
                es: "Debes crear un nuevo DataFrame llamado del_liv_eve con los delanteros que pertenezcan al club Liverpool o Everton.",
                en: "You must create a new DataFrame called del_liv_eve with forwards who belong to the Liverpool or Everton club.",
                pt: "Você deve criar um novo DataFrame chamado del_liv_eve com atacantes que pertençam ao clube Liverpool ou Everton."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("del_liv_eve=data[delantero&(liverpool|everton)]") && !code.replace(/\s/g, '').trim().includes("for_liv_eve=data[forward&(liverpool|everton)]") && !code.replace(/\s/g, '').trim().includes('del_liv_eve=data[delantero&(liverpool|everton)]') && !code.replace(/\s/g, '').trim().includes('for_liv_eve=data[forward&(liverpool|everton)]')) {
              return [{
                es: "Debes filtrar a los delanteros que pertenezcan al club Liverpool o Everton. ",
                en: "You must filter forwards who belong to the Liverpool or Everton club. ",
                pt: "Você deve filtrar atacantes que pertençam ao clube Liverpool ou Everton. "
              }];
            }
            // if (!code.replace(/\s/g, '').trim().includes("print(del_liv_eve)") && !code.replace(/\s/g, '').trim().includes("print(for_liv_eve)")) {
            //   return [{
            //     es: "Debes imprimir los delanteros que pertenezcan al club Liverpool o Everton.",
            //     en: "You must print forwards who belong to the Liverpool or Everton club.",
            //     pt: "Você deve imprimir atacantes que pertençam ao clube Liverpool ou Everton."
            //   }];
            // }
            if (!code.replace(/\s/g, '').trim().includes("print(porteros_86.shape)") && !code.replace(/\s/g, '').trim().includes("print(goalkeepers_86.shape)")) {
              return [{
                es: "Debes imprimir la forma del DataFrame 'porteros_86'.",
                en: "You must print the shape of the 'porteros_86' DataFrame.",
                pt: "Você deve imprimir a forma do DataFrame 'porteros_86'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("print(lat_der_50m_100k.shape)") && !code.replace(/\s/g, '').trim().includes("print(right_back_50m_100k.shape)")) {
              return [{
                es: "Debes imprimir la forma del DataFrame 'lat_der_50m_100k'.",
                en: "You must print the shape of the 'lat_der_50m_100k' DataFrame.",
                pt: "Você deve imprimir a forma do DataFrame 'lat_der_50m_100k'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("print(centro_arg_900k.shape)") && !code.replace(/\s/g, '').trim().includes("print(mid_arg_900k.shape)")) {
              return [{
                es: "Debes imprimir la forma del DataFrame 'centro_arg_900k'.",
                en: "You must print the shape of the 'centro_arg_900k' DataFrame.",
                pt: "Você deve imprimir a forma do DataFrame 'centro_arg_900k'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("print(del_liv_eve.shape)") && !code.replace(/\s/g, '').trim().includes("print(for_liv_eve.shape)")) {
              return [{
                es: "Debes imprimir la forma del DataFrame 'del_liv_eve'.",
                en: "You must print the shape of the 'for_liv_eve' DataFrame.",
                pt: "Você deve imprimir a forma do DataFrame 'del_liv_eve'."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-a-quizz-funSimples",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "numpy"],
    "editors": {
      "main.py": {
        "code": { es: `import pandas as pd\nimport numpy as np\nfrom pyodide.http import open_url\n\nurl="https://docs.google.com/spreadsheets/d/1y0fyMXYcpTm2ZIk6oDvxL92EKFj-beuOpobnCu50qHc/export?format=csv&gid=1277800574"\n\df=pd.read_csv(open_url(url))\n`, en: `import pandas as pd\nimport numpy as np\nfrom pyodide.http import open_url\n\nurl="https://docs.google.com/spreadsheets/d/e/2PACX-1vQeY7Y0EOa790KsmnZHLErpr_rqOU6doH0x33q2mP1Gek-KKcmKmjVNetDlU9hdPHLg4ZhAT_ELGfl8/pub?output=csv"\n\df=pd.read_csv(open_url(url))\n` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Pandas",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importnumpyasnp") && !code.replace(/\s/g, '').trim().includes("importnumpyasnp")) {
              return [{
                es: "Debes importar la librería 'numpy' como 'np'.",
                en: "You must import the 'numpy' library as 'np'.",
                pt: "Você deve importar a biblioteca 'numpy' como 'np'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("url='https://docs.google.com/spreadsheets/d/1y0fyMXYcpTm2ZIk6oDvxL92EKFj-beuOpobnCu50qHc/export?format=csv&gid=1277800574'") && !code.replace(/\s/g, '').trim().includes
              ("url='https://docs.google.com/spreadsheets/d/e/2PACX-1vQeY7Y0EOa790KsmnZHLErpr_rqOU6doH0x33q2mP1Gek-KKcmKmjVNetDlU9hdPHLg4ZhAT_ELGfl8/pub?output=csv'") && !code.replace(/\s/g, '').trim().includes('url="https://docs.google.com/spreadsheets/d/1y0fyMXYcpTm2ZIk6oDvxL92EKFj-beuOpobnCu50qHc/export?format=csv&gid=1277800574"')) {
              return [{
                es: "Debes tener una variable 'url' con la URL del archivo de Google Sheets.",
                en: "You must have a 'url' variable with the URL of the Google Sheets file.",
                pt: "Você deve ter uma variável 'url' com a URL do arquivo do Google Sheets."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("df=pd.read_csv(open_url(url))") && !code.replace(/\s/g, '').trim().includes("df=pd.read_csv(open_url(url))")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'df'.",
                en: "You must read the df from the Google Sheets file into the 'df' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'df'."
              }];
            }
          })
      }
    ]

  },
  {
    "id": "pandas-b-graficos-01",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_streamers = 'https://docs.google.com/spreadsheets/d/1uZnlHQR6Sv23gEH00w98fLQqC46uMjoCYgXJAO-dmyw/export?format=csv&gid=1269394442'\n\ndata=pd.read_csv(open_url(url_streamers))\n`, en: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_streamers = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeY7Y0EOa790KsmnZHLErpr_rqOU6doH0x33q2mP1Gek-KKcmKmjVNetDlU9hdPHLg4ZhAT_ELGfl8/pub?output=csv'\n\ndata=pd.read_csv(open_url(url_streamers))\n` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("url_streamers='https://docs.google.com/spreadsheets/d/1uZnlHQR6Sv23gEH00w98fLQqC46uMjoCYgXJAO-dmyw/export?format=csv&gid=1269394442'") && !code.replace(/\s/g, '').trim().includes("url_streamers='https://docs.google.com/spreadsheets/d/e/2PACX-1vQeY7Y0EOa790KsmnZHLErpr_rqOU6doH0x33q2mP1Gek-KKcmKmjVNetDlU9hdPHLg4ZhAT_ELGfl8/pub?output=csv'")) {
              return [{
                es: "Debes tener una variable 'url_streamers' con la URL del archivo de Google Sheets.",
                en: "You must have a 'url_streamers' variable with the URL of the Google Sheets file.",
                pt: "Você deve ter uma variável 'url_streamers' com a URL do arquivo do Google Sheets."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_streamers))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_streamers))")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("serie_patrocinado=") && !code.replace(/\s/g, '').trim().includes("serie_sponsored=")) {
              return [{
                es: "Debes crear una variable 'serie_patrocinado' con la cantidad de streamers patrocinados.",
                en: "You must create a 'serie_sponsored' variable with the number of sponsored streamers.",
                pt: "Você deve criar uma variável 'serie_sponsored' com a quantidade de streamers patrocinados."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("serie_patrocinado=data['PATROCINADO'].value_counts()") && !code.replace(/\s/g, '').trim().includes("serie_sponsored=data['SPONSORED'].value_counts()") && !code.replace(/\s/g, '').trim().includes('serie_patrocinado=data["PATROCINADO"].value_counts()') && !code.replace(/\s/g, '').trim().includes('serie_sponsored=data["SPONSORED"].value_counts()')) {
              return [{
                es: "Debes contar la cantidad de streamers patrocinados utilizando 'value_counts()' en la columna 'PATROCINADO'.",
                en: "You must count the number of sponsored streamers using 'value_counts()' on the 'SPONSORED' column.",
                pt: "Você deve contar a quantidade de streamers patrocinados usando 'value_counts()' na coluna 'SPONSORED'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("print(serie_patrocinado)") && !code.replace(/\s/g, '').trim().includes("print(serie_sponsored)")) {
              return [{
                es: "Debes imprimir la cantidad de streamers patrocinados.",
                en: "You must print the number of sponsored streamers.",
                pt: "Você deve imprimir a quantidade de streamers patrocinados."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("serie_patrocinado.plot.pie()") && !code.replace(/\s/g, '').trim().includes("serie_sponsored.plot.pie()")) {
              return [{
                es: "Debes armar un gráfico de pastel con la cantidad de streamers patrocinados.",
                en: "You must create a pie chart with the number of sponsored streamers.",
                pt: "Você deve criar um gráfico de pizza com a quantidade de streamers patrocinados."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.title('Patrocinados')") && !code.replace(/\s/g, '').trim().includes("plt.title('Sponsored')") && !code.replace(/\s/g, '').trim().includes('plt.title("Patrocinados")') && !code.replace(/\s/g, '').trim().includes('plt.title("Sponsored")')) {
              return [{
                es: "Debes agregarle un título al gráfico de torta con el texto 'Patrocinados'.",
                en: "You must add a title to the pie chart with the text 'Sponsored'.",
                pt: "Você deve adicionar um título ao gráfico de pizza com o texto 'Patrocinados'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("")')) {
              return [{
                es: "Debes quitar los nombres de los ejes X",
                en: "You must remove the names of the X axes",
                pt: "Você deve remover os nomes dos eixos X"
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ylabel('')") && !code.replace(/\s/g, '').trim().includes('plt.ylabel("")')) {
              return [{
                es: "Debes quitar los nombres de los ejes Y",
                en: "You must remove the names of the Y axes",
                pt: "Você deve remover os nomes dos eixos Y"
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }

          })
      }
    ]
  },
  {
    "id": "pandas-b-graficos-02",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_streamers = 'https://docs.google.com/spreadsheets/d/1uZnlHQR6Sv23gEH00w98fLQqC46uMjoCYgXJAO-dmyw/export?format=csv&gid=1269394442'\n\ndata=pd.read_csv(open_url(url_streamers))\n`, en: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_streamers = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeY7Y0EOa790KsmnZHLErpr_rqOU6doH0x33q2mP1Gek-KKcmKmjVNetDlU9hdPHLg4ZhAT_ELGfl8/pub?output=csv'\n\ndata=pd.read_csv(open_url(url_streamers))\n` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("url_streamers='https://docs.google.com/spreadsheets/d/1uZnlHQR6Sv23gEH00w98fLQqC46uMjoCYgXJAO-dmyw/export?format=csv&gid=1269394442'") && !code.replace(/\s/g, '').trim().includes("url_streamers='https://docs.google.com/spreadsheets/d/e/2PACX-1vQeY7Y0EOa790KsmnZHLErpr_rqOU6doH0x33q2mP1Gek-KKcmKmjVNetDlU9hdPHLg4ZhAT_ELGfl8/pub?output=csv'")) {
              return [{
                es: "Debes tener una variable 'url_streamers' con la URL del archivo de Google Sheets.",
                en: "You must have a 'url_streamers' variable with the URL of the Google Sheets file.",
                pt: "Você deve ter uma variável 'url_streamers' com a URL do arquivo do Google Sheets."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_streamers))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_streamers))")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("serie_idioma=") && !code.replace(/\s/g, '').trim().includes("language_series=")) {
              return [{
                es: "Debes crear una variable 'serie_idioma' con la cantidad de streamers por idioma.",
                en: "You must create a 'language_series' variable with the number of streamers by language.",
                pt: "Você deve criar uma variável 'language_series' com a quantidade de streamers por idioma."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("serie_idioma=data['IDIOMA'].value_counts()") && !code.replace(/\s/g, '').trim().includes("language_series=data['LANGUAGE'].value_counts()") && !code.replace(/\s/g, '').trim().includes('serie_idioma=data["IDIOMA"].value_counts()') && !code.replace(/\s/g, '').trim().includes('language_series=data["LANGUAGE"].value_counts()')) {
              return [{
                es: "Debes contar la cantidad de streamers por idioma utilizando 'value_counts()' en la columna 'IDIOMA'.",
                en: "You must count the number of streamers by language using 'value_counts()' on the 'LANGUAGE' column.",
                pt: "Você deve contar a quantidade de streamers por idioma usando 'value_counts()' na coluna 'LANGUAGE'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("print(serie_idioma)") && !code.replace(/\s/g, '').trim().includes("print(language_series)")) {
              return [{
                es: "Debes imprimir la cantidad de streamers por idioma.",
                en: "You must print the number of streamers by language.",
                pt: "Você deve imprimir a quantidade de streamers por idioma."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("serie_idioma.plot.bar()") && !code.replace(/\s/g, '').trim().includes("language_series.plot.bar()")) {
              return [{
                es: "Debes armar un gráfico de barras con la cantidad de streamers por idioma.",
                en: "You must create a bar chart with the number of streamers by language.",
                pt: "Você deve criar um gráfico de barras com a quantidade de streamers por idioma."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.title('Idioma')") && !code.replace(/\s/g, '').trim().includes("plt.title('Language')") && !code.replace(/\s/g, '').trim().includes('plt.title("Idioma")') && !code.replace(/\s/g, '').trim().includes('plt.title("Language")')) {
              return [{
                es: "Debes agregar un título al gráfico de barras con el texto 'Idioma'.",
                en: "You must add a title to the bar chart with the text 'Language'.",
                pt: "Você deve adicionar um título ao gráfico de barras com o texto 'Idioma'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('Idiomas')") && !code.replace(/\s/g, '').trim().includes("plt.xlabel('Languages')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Idiomas")') && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Languages")')) {
              return [{
                es: "Debes agregarle un título al eje X con el texto 'Idiomas'",
                en: "You must add a title to the X axis with the text 'Languages'",
                pt: "Você deve adicionar um título ao eixo X com o texto 'Idiomas'"
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ylabel('Cantidad')") && !code.replace(/\s/g, '').trim().includes("plt.ylabel('Count')") && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Cantidad")') && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Count")')) {
              return [{
                es: "Debes agregarle un título al eje Y con el texto 'Cantidad'",
                en: "You must add a title to the Y axis with the text 'Count'",
                pt: "Você deve adicionar um título ao eixo Y com o texto 'Quantidade'"
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=0)") && !code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=0)")) {
              return [{
                es: "Debes rotar las etiquetas del eje X a 0 grados.",
                en: "You must rotate the labels of the X axis to 0 degrees.",
                pt: "Você deve rotacionar os rótulos do eixo X para 0 graus."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-b-graficos-03",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_streamers = 'https://docs.google.com/spreadsheets/d/1uZnlHQR6Sv23gEH00w98fLQqC46uMjoCYgXJAO-dmyw/export?format=csv&gid=1269394442'\n\ndata=pd.read_csv(open_url(url_streamers))\n`, en: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_streamers = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeY7Y0EOa790KsmnZHLErpr_rqOU6doH0x33q2mP1Gek-KKcmKmjVNetDlU9hdPHLg4ZhAT_ELGfl8/pub?output=csv'\n\ndata=pd.read_csv(open_url(url_streamers))\n` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("url_streamers='https://docs.google.com/spreadsheets/d/1uZnlHQR6Sv23gEH00w98fLQqC46uMjoCYgXJAO-dmyw/export?format=csv&gid=1269394442'") && !code.replace(/\s/g, '').trim().includes("url_streamers='https://docs.google.com/spreadsheets/d/e/2PACX-1vQeY7Y0EOa790KsmnZHLErpr_rqOU6doH0x33q2mP1Gek-KKcmKmjVNetDlU9hdPHLg4ZhAT_ELGfl8/pub?output=csv'")) {
              return [{
                es: "Debes tener una variable 'url_streamers' con la URL del archivo de Google Sheets.",
                en: "You must have a 'url_streamers' variable with the URL of the Google Sheets file.",
                pt: "Você deve ter uma variável 'url_streamers' com a URL do arquivo do Google Sheets."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_streamers))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_streamers))")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("filtro1=") && !code.replace(/\s/g, '').trim().includes("filter1=")) {
              return [{
                es: "Debes crear un filtro (filtro1) para los streamers que juegan League of Legends.",
                en: "You must create a filter (filter1) for streamers who play League of Legends.",
                pt: "Você deve criar um filtro (filter1) para streamers que jogam League of Legends."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("filtro1=data['CATEGORIA_1']=='LeagueofLegends'") && !code.replace(/\s/g, '').trim().includes("filter1=data['CATEGORY_1']=='LeagueofLegends'") && !code.replace(/\s/g, '').trim().includes('filtro1=data["CATEGORIA_1"]=="LeagueofLegends"') && !code.replace(/\s/g, '').trim().includes('filter1=data["CATEGORY_1"]=="LeagueofLegends"') && !code.replace(/\s/g, '').trim().includes(`filtro1=data['CATEGORIA_1']=="LeagueofLegends"`) && !code.replace(/\s/g, '').trim().includes(`filter1=data['CATEGORY_1']=="LeagueofLegends"`) && !code.replace(/\s/g, '').trim().includes(`filtro1=data["CATEGORIA_1"]=='LeagueofLegends'`) && !code.replace(/\s/g, '').trim().includes(`filter1=data["CATEGORY_1"]=='LeagueofLegends'`)) {
              return [{
                es: "Debes crear un filtro para los streamers que juegan League of Legends.",
                en: "You must create a filter for streamers who play League of Legends.",
                pt: "Você deve criar um filtro para streamers que jogam League of Legends."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("filtro2=") && !code.replace(/\s/g, '').trim().includes("filter2=")) {
              return [{
                es: "Debes crear un filtro (filtro2) para los streamers que juegan Call of Duty: Modern Warfare.",
                en: "You must create a filter (filter2) for streamers who play Call of Duty: Modern Warfare.",
                pt: "Você deve criar um filtro (filter2) para streamers que jogam Call of Duty: Modern Warfare."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("filtro2=data['CATEGORIA_1']=='CallOfDuty:ModernWarfare'") && !code.replace(/\s/g, '').trim().includes("filter2=data['CATEGORY_1']=='CallOfDuty:ModernWarfare'") && !code.replace(/\s/g, '').trim().includes('filtro2=data["CATEGORIA_1"]=="CallOfDuty:ModernWarfare"') && !code.replace(/\s/g, '').trim().includes('filter2=data["CATEGORY_1"]=="CallOfDuty:ModernWarfare"') && !code.replace(/\s/g, '').trim().includes(`filtro2=data['CATEGORIA_1']=="CallOfDuty:ModernWarfare"`) && !code.replace(/\s/g, '').trim().includes(`filter2=data['CATEGORY_1']=="CallOfDuty:ModernWarfare"`) && !code.replace(/\s/g, '').trim().includes(`filtro2=data["CATEGORIA_1"]=='CallOfDuty:ModernWarfare'`) && !code.replace(/\s/g, '').trim().includes(`filter2=data["CATEGORY_1"]=='CallOfDuty:ModernWarfare'`)) {
              return [{
                es: "Debes crear un filtro para los streamers que juegan Call of Duty: Modern Warfare.",
                en: "You must create a filter for streamers who play Call of Duty: Modern Warfare.",
                pt: "Você deve criar um filtro para streamers que jogam Call of Duty: Modern Warfare."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("filtro3=") && !code.replace(/\s/g, '').trim().includes("filter3=")) {
              return [{
                es: "Debes crear un filtro (filtro3) para los streamers que juegan Fortnite.",
                en: "You must create a filter (filter3) for streamers who play Fortnite.",
                pt: "Você deve criar um filtro (filter3) para streamers que jogam Fortnite."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("filtro3=data['CATEGORIA_1']=='Fortnite'") && !code.replace(/\s/g, '').trim().includes("filter3=data['CATEGORY_1']=='Fortnite'") && !code.replace(/\s/g, '').trim().includes('filtro3=data["CATEGORIA_1"]=="Fortnite"') && !code.replace(/\s/g, '').trim().includes('filter3=data["CATEGORY_1"]=="Fortnite"') && !code.replace(/\s/g, '').trim().includes(`filtro3=data['CATEGORIA_1']=="Fortnite"`) && !code.replace(/\s/g, '').trim().includes(`filter3=data['CATEGORY_1']=="Fortnite"`) && !code.replace(/\s/g, '').trim().includes(`filtro3=data["CATEGORIA_1"]=='Fortnite'`) && !code.replace(/\s/g, '').trim().includes(`filter3=data["CATEGORY_1"]=='Fortnite'`)) {
              return [{
                es: "Debes crear un filtro para los streamers que juegan Fortnite.",
                en: "You must create a filter for streamers who play Fortnite.",
                pt: "Você deve criar um filtro para streamers que jogam Fortnite."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("filtro4=") && !code.replace(/\s/g, '').trim().includes("filter4=")) {
              return [{
                es: "Debes crear un filtro (filtro4) para los streamers que juegan Minecraft.",
                en: "You must create a filter (filter4) for streamers who play Minecraft.",
                pt: "Você deve criar um filtro (filter4) para streamers que jogam Minecraft."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("filtro4=data['CATEGORIA_1']=='Minecraft'") && !code.replace(/\s/g, '').trim().includes("filter4=data['CATEGORY_1']=='Minecraft'") && !code.replace(/\s/g, '').trim().includes('filtro4=data["CATEGORIA_1"]=="Minecraft"') && !code.replace(/\s/g, '').trim().includes('filter4=data["CATEGORY_1"]=="Minecraft"') && !code.replace(/\s/g, '').trim().includes(`filtro4=data['CATEGORIA_1']=="Minecraft"`) && !code.replace(/\s/g, '').trim().includes(`filter4=data['CATEGORY_1']=="Minecraft"`) && !code.replace(/\s/g, '').trim().includes(`filtro4=data["CATEGORIA_1"]=='Minecraft'`) && !code.replace(/\s/g, '').trim().includes(`filter4=data["CATEGORY_1"]=='Minecraft'`)) {
              return [{
                es: "Debes crear un filtro para los streamers que juegan Minecraft.",
                en: "You must create a filter for streamers who play Minecraft.",
                pt: "Você deve criar um filtro para streamers que jogam Minecraft."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("mascara=") && !code.replace(/\s/g, '').trim().includes("mask=")) {
              return [{
                es: "Debes crear la variable 'mascara' para combinar los cuatro filtros.",
                en: "You must create the 'mask' variable to combine the four filters.",
                pt: "Você deve criar a variável 'mask' para combinar os quatro filtros."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("mascara=filtro1|filtro2|filtro3|filtro4") && !code.replace(/\s/g, '').trim().includes("mask=filter1|filter2|filter3|filter4")) {
              return [{
                es: "Debes crear una máscara que combine los cuatro filtros.",
                en: "You must create a 'mask' that combines the four filters.",
                pt: "Você deve criar uma máscara que combine os quatro filtros."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data2=") && !code.replace(/\s/g, '').trim().includes("data2=")) {
              return [{
                es: "Debes crear un nuevo DataFrame 'data2' para filtrar 'data' con la máscara creada.",
                en: "You must create a new DataFrame 'data2' to filter 'data' with the created mask.",
                pt: "Você deve criar um novo DataFrame 'data2' para filtrar 'data' com a máscara criada."
              }];
            }

            if (!code.replace(/\s/g, '').trim().includes("data2=data[mascara]") && !code.replace(/\s/g, '').trim().includes("data2=data[mask]")) {
              return [{
                es: "Debes filtrar el DataFrame utilizando la máscara creada.",
                en: "You must filter the DataFrame using the created mask.",
                pt: "Você deve filtrar o DataFrame usando a máscara criada."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("categoria_1=") && !code.replace(/\s/g, '').trim().includes("category_1=")) {
              return [{
                es: "Debes crear una variable 'categoria_1' con la cantidad de streamers por categoría.",
                en: "You must create a 'category_1' variable with the number of streamers by category.",
                pt: "Você deve criar uma variável 'category_1' com a quantidade de streamers por categoria."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("categoria_1=data2['CATEGORIA_1'].value_counts()") && !code.replace(/\s/g, '').trim().includes("category_1=data2['CATEGORY_1'].value_counts()") && !code.replace(/\s/g, '').trim().includes('categoria_1=data2["CATEGORIA_1"].value_counts()') && !code.replace(/\s/g, '').trim().includes('category_1=data2["CATEGORY_1"].value_counts()')) {
              return [{
                es: "Debes contar la cantidad de streamers por categoría utilizando 'value_counts()' en la columna 'CATEGORIA_1'.",
                en: "You must count the number of streamers by category using 'value_counts()' on the 'CATEGORY_1' column.",
                pt: "Você deve contar a quantidade de streamers por categoria usando 'value_counts()' na coluna 'CATEGORY_1'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("print(categoria_1)") && !code.replace(/\s/g, '').trim().includes("print(category_1)")) {
              return [{
                es: "Debes imprimir la cantidad de streamers por categoría.",
                en: "You must print the number of streamers by category.",
                pt: "Você deve imprimir a quantidade de streamers por categoria."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("categoria_1.plot.pie()") && !code.replace(/\s/g, '').trim().includes("category_1.plot.pie()")) {
              return [{
                es: "Debes armar un gráfico de torta con la cantidad de streamers por categoría.",
                en: "You must create a pie chart with the number of streamers by category.",
                pt: "Você deve criar um gráfico de pizza com a quantidade de streamers por categoria."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.title('Juegos')") && !code.replace(/\s/g, '').trim().includes("plt.title('Games')") && !code.replace(/\s/g, '').trim().includes('plt.title("Juegos")') && !code.replace(/\s/g, '').trim().includes('plt.title("Games")')) {
              return [{
                es: "Debes agregar un título al gráfico de torta con el texto 'Juegos'.",
                en: "You must add a title to the pie chart with the text 'Games'.",
                pt: "Você deve adicionar um título ao gráfico de pizza com o texto 'Jogos'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("")')) {
              return [{
                es: "Debes quitar los nombres del eje X",
                en: "You must remove the names of the X axis",
                pt: "Você deve remover os nomes do eixo X"
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ylabel('')") && !code.replace(/\s/g, '').trim().includes('plt.ylabel("")')) {
              return [{
                es: "Debes quitar los nombres del eje Y",
                en: "You must remove the names of the Y axis",
                pt: "Você deve remover os nomes do eixo Y"
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-b-graficos-04",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_streamers = 'https://docs.google.com/spreadsheets/d/1uZnlHQR6Sv23gEH00w98fLQqC46uMjoCYgXJAO-dmyw/export?format=csv&gid=1269394442'\n\ndata=pd.read_csv(open_url(url_streamers))\n`, en: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_streamers = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeY7Y0EOa790KsmnZHLErpr_rqOU6doH0x33q2mP1Gek-KKcmKmjVNetDlU9hdPHLg4ZhAT_ELGfl8/pub?output=csv'\n\ndata=pd.read_csv(open_url(url_streamers))\n` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("url_streamers='https://docs.google.com/spreadsheets/d/1uZnlHQR6Sv23gEH00w98fLQqC46uMjoCYgXJAO-dmyw/export?format=csv&gid=1269394442'") && !code.replace(/\s/g, '').trim().includes("url_streamers='https://docs.google.com/spreadsheets/d/e/2PACX-1vQeY7Y0EOa790KsmnZHLErpr_rqOU6doH0x33q2mP1Gek-KKcmKmjVNetDlU9hdPHLg4ZhAT_ELGfl8/pub?output=csv'")) {
              return [{
                es: "Debes tener una variable 'url_streamers' con la URL del archivo de Google Sheets.",
                en: "You must have a 'url_streamers' variable with the URL of the Google Sheets file.",
                pt: "Você deve ter uma variável 'url_streamers' com a URL do arquivo do Google Sheets."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_streamers))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_streamers))")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'url'.",
                en: "You must read the data from the Google Sheets file into the 'url' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'url'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("filtro5=") && !code.replace(/\s/g, '').trim().includes("filter5=")) {
              return [{
                es: "Debes crear un filtro (filtro5) para los streamers que hablan español.",
                en: "You must create a filter (filter5) for streamers who speak Spanish.",
                pt: "Você deve criar um filtro (filter5) para streamers que falam espanhol."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("filtro5=data['IDIOMA']=='Spanish'") && !code.replace(/\s/g, '').trim().includes("filter5=data['LANGUAGE']=='Spanish'") && !code.replace(/\s/g, '').trim().includes('filtro5=data["IDIOMA"]=="Spanish"') && !code.replace(/\s/g, '').trim().includes('filter5=data["LANGUAGE"]=="Spanish"') && !code.replace(/\s/g, '').trim().includes(`filtro5=data["IDIOMA"]=='Spanish'`) && !code.replace(/\s/g, '').trim().includes(`filtro5=data["LENGUAGE"]=='Spanish'`) && !code.replace(/\s/g, '').trim().includes(`filtro5=data['IDIOMA']=="Spanish"`) && !code.replace(/\s/g, '').trim().includes(`filtro5=data['LENGUAGE']=="Spanish"`)) {
              return [{
                es: "Debes crear un filtro para los streamers que hablan español.",
                en: "You must create a filter for streamers who speak Spanish.",
                pt: "Você deve criar um filtro para streamers que falam espanhol."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data3=") && !code.replace(/\s/g, '').trim().includes("data3=")) {
              return [{
                es: "Debes crear un nuevo DataFrame llamado 'data3' que filtre 'data' con el filtro creado.",
                en: "You must create a new DataFrame called 'data3' that filters 'data' with the created filter.",
                pt: "Você deve criar um novo DataFrame chamado 'data3' que filtra 'data' com o filtro criado."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data3=data[filtro5]") && !code.replace(/\s/g, '').trim().includes("data3=data[filter5]")) {
              return [{
                es: "Debes filtrar el DataFrame utilizando el filtro creado.",
                en: "You must filter the DataFrame using the created filter.",
                pt: "Você deve filtrar o DataFrame usando o filtro criado."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("rangos=") && !code.replace(/\s/g, '').trim().includes("ranges=")) {
              return [{
                es: "Debes crear una variable 'rangos' con la cantidad de streamers por rango.",
                en: "You must create a 'ranges' variable with the number of streamers by rank.",
                pt: "Você deve criar uma variável 'ranges' com a quantidade de streamers por classificação."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("rangos=data3['RANGO'].value_counts()") && !code.replace(/\s/g, '').trim().includes("ranges=data3['RANGE'].value_counts()") && !code.replace(/\s/g, '').trim().includes('rangos=data3["RANGO"].value_counts()') && !code.replace(/\s/g, '').trim().includes('ranges=data3["RANGE"].value_counts()')) {
              return [{
                es: "Debes contar la cantidad de streamers por rango utilizando 'value_counts()' en la columna 'RANGO'.",
                en: "You must count the number of streamers by range using 'value_counts()' on the 'RANGE' column.",
                pt: "Você deve contar a quantidade de streamers por classificação usando 'value_counts()' na coluna 'RANGE'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("rangos.plot.bar()") && !code.replace(/\s/g, '').trim().includes("ranges.plot.bar()")) {
              return [{
                es: "Debes crear un gráfico de barras con la cantidad de streamers por rango.",
                en: "You must create a bar chart with the number of streamers by rank.",
                pt: "Você deve criar um gráfico de barras com a quantidade de streamers por classificação."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.title('Idiomaespañol')") && !code.replace(/\s/g, '').trim().includes("plt.title('Spanishlanguage')") && !code.replace(/\s/g, '').trim().includes('plt.title("Idiomaespañol")') && !code.replace(/\s/g, '').trim().includes('plt.title("Spanishlanguage")')) {
              return [{
                es: "Debes agregar un título al gráfico de barras con el texto 'Idioma español'.",
                en: "You must add a title to the bar chart with the text 'Spanish language'.",
                pt: "Você deve adicionar um título ao gráfico de barras com o texto 'Idioma rspanhol'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('Rango')") && !code.replace(/\s/g, '').trim().includes("plt.xlabel('Range')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Rango")') && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Range")')) {
              return [{
                es: "Debes agregar un título al eje X con el texto 'Rango'",
                en: "You must add a title to the X axis with the text 'Range'",
                pt: "Você deve adicionar um título ao eixo X com o texto 'Classificação'"
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ylabel('Cantidad')") && !code.replace(/\s/g, '').trim().includes("plt.ylabel('Quantity')") && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Cantidad")') && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Quantity")')) {
              return [{
                es: "Debes agregar un título al eje Y con el texto 'Cantidad'",
                en: "You must add a title to the Y axis with the text 'Quantity'",
                pt: "Você deve adicionar um título ao eixo Y com o texto 'Quantidade'"
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=0)") && !code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=0)")) {
              return [{
                es: "Debes rotar las etiquetas del eje X a 0 grados.",
                en: "You must rotate the labels of the X axis to 0 degrees.",
                pt: "Você deve rotacionar os rótulos do eixo X para 0 graus."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-b-graficos-histograma-01",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib", "scipy"],
    "editors": {
      "main.py": {
        "code": { es: `import pandas as pd\nfrom scipy import stats\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_futbol = 'https://docs.google.com/spreadsheets/d/1lnKm8KGVs7LLASDjb6fp7OtOR-OW0WokSQQ7DeGO0XY/export?format=csv&gid=752967883'\n\ndata=pd.read_csv(open_url(url_futbol))\n`, en: `import pandas as pd\nfrom scipy import stats\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_soccer = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS86RsQepS2hRJW8C3sKkB2xV-Zx1RyPZBXTFgbnqDGQW1CrhbEMiJOX-LhZbm5vy3Ua1pWoDxFYwEP/pub?output=csv'\n\ndata=pd.read_csv(open_url(url_soccer))\n` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("fromscipyimportstats") && !code.replace(/\s/g, '').trim().includes("fromscipyimportstats")) {
              return [{
                es: "Debes importar la función 'stats' del módulo 'scipy'.",
                en: "You must import the 'stats' function from the 'scipy' module.",
                pt: "Você deve importar a função 'stats' do módulo 'scipy'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("url_futbol='https://docs.google.com/spreadsheets/d/1lnKm8KGVs7LLASDjb6fp7OtOR-OW0WokSQQ7DeGO0XY/export?format=csv&gid=752967883'") && !code.replace(/\s/g, '').trim().includes("url_soccer='https://docs.google.com/spreadsheets/d/e/2PACX-1vS86RsQepS2hRJW8C3sKkB2xV-Zx1RyPZBXTFgbnqDGQW1CrhbEMiJOX-LhZbm5vy3Ua1pWoDxFYwEP/pub?output=csv'")) {
              return [{
                es: "Debes tener una variable 'url_futbol' con la URL del archivo de Google Sheets.",
                en: "You must have a 'url_soccer' variable with the URL of the Google Sheets file.",
                pt: "Você deve ter uma variável 'url_soccer' com a URL do arquivo do Google Sheets."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_futbol))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_soccer))")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("partidos_jugados=") && !code.replace(/\s/g, '').trim().includes("games_played=")) {
              return [{
                es: "Debes seleccionar la columna 'PARTIDOS_JUGADOS' en la variable 'partidos_jugados'.",
                en: "You must select the 'GAMES_PLAYED' column into the 'games_played' variable.",
                pt: "Você deve selecionar a coluna 'GAMES_PLAYED' na variável 'games_played'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("partidos_jugados=data['PARTIDOS_JUGADOS']") && !code.replace(/\s/g, '').trim().includes("games_played=data['MATCHES_PLAYED']") && !code.replace(/\s/g, '').trim().includes('partidos_jugados=data["PARTIDOS_JUGADOS"]') && !code.replace(/\s/g, '').trim().includes('partidos_jugados=data["MATCHES_PLAYED"]')) {
              return [{
                es: "Debes seleccionar la columna 'PARTIDOS_JUGADOS' en la variable 'partidos_jugados'.",
                en: "You must select the 'GAMES_PLAYED' column into the 'games_played' variable.",
                pt: "Você deve selecionar a coluna 'GAMES_PLAYED' na variável 'games_played'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("partidos_jugados.plot.hist(bins=10,edgecolor='black')") && !code.replace(/\s/g, '').trim().includes("games_played.plot.hist(bins=10,edgecolor='black')") && !code.replace(/\s/g, '').trim().includes('partidos_jugados.plot.hist(bins=10,edgecolor="black")') && !code.replace(/\s/g, '').trim().includes('games_played.plot.hist(bins=10,edgecolor="black")')) {
              return [{
                es: "Debes crear un histograma. Recuerda usar la función .plot.hist (número de intervalos, color del borde de las barras del histograma)",
                en: "You must create a histogram. Remember to use the .plot.hist function (number of intervals, color of the border of the histogram bars)",
                pt: "Você deve criar um histograma. Lembre-se de usar a função .plot.hist (número de intervalos, cor da borda das barras do histograma)"
              }];
            }

            if (!code.replace(/\s/g, '').trim().includes("plt.title('Partidosjugados')") && !code.replace(/\s/g, '').trim().includes("plt.title('GamesPlayed')") && !code.replace(/\s/g, '').trim().includes('plt.title("Partidosjugados")') && !code.replace(/\s/g, '').trim().includes('plt.title("GamesPlayed")')) {
              return [{
                es: "Debes agregarle un título al histograma con el texto 'Partidos jugados'.",
                en: "You must add a title to the histogram with the text 'Games Played'.",
                pt: "Você deve adicionar um título ao histograma com o texto 'Partidas Jogadas'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('Partidosjugados')") && !code.replace(/\s/g, '').trim().includes("plt.xlabel('GamesPlayed')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Partidosjugados")') && !code.replace(/\s/g, '').trim().includes('plt.xlabel("GamesPlayed")')) {
              return [{
                es: "Debes agregarle un título al eje X con el texto 'Partidos jugados'.",
                en: "You must add a title to the X axis with the text 'Games Played'.",
                pt: "Você deve adicionar um título ao eixo X com o texto 'Partidas Jogadas'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ylabel('Cantidaddejugadores')") && !code.replace(/\s/g, '').trim().includes("plt.ylabel('NumberofPlayers')") && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Cantidaddejugadores")') && !code.replace(/\s/g, '').trim().includes('plt.ylabel("NumberofPlayers")')) {
              return [{
                es: "Debes agregarle un título al eje Y con el texto 'Cantidad de jugadores'.",
                en: "You must add a title to the Y axis with the text 'Number of players'.",
                pt: "Você deve adicionar um título ao eixo Y com o texto 'Número de jogadores'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }

          })
      }
    ]
  },
  {
    "id": "pandas-b-graficos-histograma-02",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_futbol = 'https://docs.google.com/spreadsheets/d/1lnKm8KGVs7LLASDjb6fp7OtOR-OW0WokSQQ7DeGO0XY/export?format=csv&gid=752967883'\n\ndata=pd.read_csv(open_url(url_futbol))\n`, en: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_soccer = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS86RsQepS2hRJW8C3sKkB2xV-Zx1RyPZBXTFgbnqDGQW1CrhbEMiJOX-LhZbm5vy3Ua1pWoDxFYwEP/pub?output=csv'\n\ndata=pd.read_csv(open_url(url_soccer))\n` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("url_futbol='https://docs.google.com/spreadsheets/d/1lnKm8KGVs7LLASDjb6fp7OtOR-OW0WokSQQ7DeGO0XY/export?format=csv&gid=752967883'") && !code.replace(/\s/g, '').trim().includes("url_soccer='https://docs.google.com/spreadsheets/d/e/2PACX-1vS86RsQepS2hRJW8C3sKkB2xV-Zx1RyPZBXTFgbnqDGQW1CrhbEMiJOX-LhZbm5vy3Ua1pWoDxFYwEP/pub?output=csv'")) {
              return [{
                es: "Debes tener una variable 'url_futbol' con la URL del archivo de Google Sheets.",
                en: "You must have a 'url_soccer' variable with the URL of the Google Sheets file.",
                pt: "Você deve ter uma variável 'url_soccer' com a URL do arquivo do Google Sheets."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_futbol))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_soccer))")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("min_jugador_avg=") && !code.replace(/\s/g, '').trim().includes("avg_minutes_played=")) {
              return [{
                es: "Debes seleccionar la columna 'MINUTOS_JUGADOS_PROMEDIO' en la variable 'min_jugador_avg'.",
                en: "You must select the 'MINUTES_PLAYED_AVERAGE' column into the 'avg_minutes_played' variable.",
                pt: "Você deve selecionar a coluna 'MINUTES_PLAYED_AVERAGE' na variável 'avg_minutes_played'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("min_jugador_avg=data['MINUTOS_JUGADOS_PROMEDIO']") && !code.replace(/\s/g, '').trim().includes("avg_minutes_played=data['MINUTES_PLAYED_AVERAGE']") && !code.replace(/\s/g, '').trim().includes('min_jugador_avg=data["MINUTOS_JUGADOS_PROMEDIO"]') && !code.replace(/\s/g, '').trim().includes('avg_minutes_played=data["MINUTES_PLAYED_AVERAGE"]')) {
              return [{
                es: "Debes seleccionar la columna 'MINUTOS_JUGADOS_PROMEDIO' en la variable 'min_jugador_avg'.",
                en: "You must select the 'MINUTES_PLAYED_AVERAGE' column into the 'avg_minutes_played' variable.",
                pt: "Você deve selecionar a coluna 'MINUTES_PLAYED_AVERAGE' na variável 'avg_minutes_played'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("min_jugador_avg.plot.hist(bins=20,edgecolor='black')") && !code.replace(/\s/g, '').trim().includes("avg_minutes_played.plot.hist(bins=20,edgecolor='black')") && !code.replace(/\s/g, '').trim().includes('min_jugador_avg.plot.hist(bins=20,edgecolor="black")') && !code.replace(/\s/g, '').trim().includes('avg_minutes_played.plot.hist(bins=20,edgecolor="black")')) {
              return [{
                es: "Debes crear un histograma. Recuerda usar la función .plot.hist (número de intervalos, color del borde de las barras del histograma)",
                en: "You must create a histogram. Remember to use the .plot.hist function (number of intervals, color of the border of the histogram bars)",
                pt: "Você deve criar um histograma. Lembre-se de usar a função .plot.hist (número de intervalos, cor da borda das barras do histograma)"
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.title('Minutosjugados')") && !code.replace(/\s/g, '').trim().includes("plt.title('MinutesPlayed')") && !code.replace(/\s/g, '').trim().includes('plt.title("Minutosjugados")') && !code.replace(/\s/g, '').trim().includes('plt.title("MinutesPlayed")')) {
              return [{
                es: "Debes agregarle un título al histograma con el texto 'Minutos jugados'.",
                en: "You must add a title to the histogram with the text 'Minutes Played'.",
                pt: "Você deve adicionar um título ao histograma com o texto 'Minutos Jogados'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('Minutosjugados')") && !code.replace(/\s/g, '').trim().includes("plt.xlabel('MinutesPlayed')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Minutosjugados")') && !code.replace(/\s/g, '').trim().includes('plt.xlabel("MinutesPlayed")')) {
              return [{
                es: "Debes agregarle un título al eje X con el texto 'Minutos jmougados'.",
                en: "You must add a title to the X axis with the text 'Minutes Played'.",
                pt: "Você deve adicionar um título ao eixo X com o texto 'Minutos Jogados'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ylabel('Cantidaddejugadores')") && !code.replace(/\s/g, '').trim().includes("plt.ylabel('NumberofPlayers')") && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Cantidaddejugadores")') && !code.replace(/\s/g, '').trim().includes('plt.ylabel("NumberofPlayers")')) {
              return [{
                es: "Debes agregarle un título al eje Y con el texto 'Cantidad de jugadores'.",
                en: "You must add a title to the Y axis with the text 'Number of players'.",
                pt: "Você deve adicionar um título ao eixo Y com o texto 'Número de jogadores'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-b-graficos-histograma-03",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_futbol = 'https://docs.google.com/spreadsheets/d/1lnKm8KGVs7LLASDjb6fp7OtOR-OW0WokSQQ7DeGO0XY/export?format=csv&gid=752967883'\n\ndata=pd.read_csv(open_url(url_futbol))\n`, en: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_soccer = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS86RsQepS2hRJW8C3sKkB2xV-Zx1RyPZBXTFgbnqDGQW1CrhbEMiJOX-LhZbm5vy3Ua1pWoDxFYwEP/pub?output=csv'\n\ndata=pd.read_csv(open_url(url_soccer))\n` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("url_futbol='https://docs.google.com/spreadsheets/d/1lnKm8KGVs7LLASDjb6fp7OtOR-OW0WokSQQ7DeGO0XY/export?format=csv&gid=752967883'") && !code.replace(/\s/g, '').trim().includes("url_soccer='https://docs.google.com/spreadsheets/d/e/2PACX-1vS86RsQepS2hRJW8C3sKkB2xV-Zx1RyPZBXTFgbnqDGQW1CrhbEMiJOX-LhZbm5vy3Ua1pWoDxFYwEP/pub?output=csv'")) {
              return [{
                es: "Debes tener una variable 'url_futbol' con la URL del archivo de Google Sheets.",
                en: "You must have a 'url_soccer' variable with the URL of the Google Sheets file.",
                pt: "Você deve ter uma variável 'url_soccer' com a URL do arquivo do Google Sheets."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_futbol))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_soccer))")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("puntos_anotados_avg=") && !code.replace(/\s/g, '').trim().includes("average_scores=")) {
              return [{
                es: "Debes seleccionar la columna 'PUNTOS_ANOTADOS_PROMEDIO' en la variable 'puntos_anotados_avg'.",
                en: "You must select the 'AVERAGE_POINTS_SCORED' column into the 'average_scores' variable.",
                pt: "Você deve selecionar a coluna 'AVERAGE_POINTS_SCORED' na variável 'average_scores'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("puntos_anotados_avg=data['PUNTOS_ANOTADOS_PROMEDIO']") && !code.replace(/\s/g, '').trim().includes("average_scores=data['AVERAGE_POINTS_SCORED']") && !code.replace(/\s/g, '').trim().includes('puntos_anotados_avg=data["PUNTOS_ANOTADOS_PROMEDIO"]') && !code.replace(/\s/g, '').trim().includes('average_score=sdata["AVERAGE_POINTS_SCORED"]')) {
              return [{
                es: "Debes seleccionar la columna 'PUNTOS_ANOTADOS_PROMEDIO' en la variable 'puntos_anotados_avg'.",
                en: "You must select the 'AVERAGE_POINTS_SCORED' column into the 'average_scores' variable.",
                pt: "Você deve selecionar a coluna 'AVERAGE_POINTS_SCORED' na variável 'average_scores'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("puntos_anotados_avg.plot.box()") && !code.replace(/\s/g, '').trim().includes("average_scores.plot.box()")) {
              return [{
                es: "Debes graficar un diagrama con los puntos anotados promedio.",
                en: "You must plot a box diagram with the average points scored.",
                pt: "Você deve plotar um diagrama de caixa com os pontos médios marcados."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.title('Puntajesanotados')") && !code.replace(/\s/g, '').trim().includes("plt.title('RecordedScores')") && !code.replace(/\s/g, '').trim().includes('plt.title("Puntajesanotados")') && !code.replace(/\s/g, '').trim().includes('plt.title("RecordedScores")')) {
              return [{
                es: "Debes agregar un título al diagrama con el texto 'Puntajes anotados'.",
                en: "You must add a title to the box diagram with the text 'Scores Scored'.",
                pt: "Você deve adicionar um título ao diagrama de caixa com o texto 'Pontuações Marcadas'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('Puntajesanotados')") && !code.replace(/\s/g, '').trim().includes("plt.xlabel('RecordedScores')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Puntajesanotados")') && !code.replace(/\s/g, '').trim().includes('plt.xlabel("RecordedScores")')) {
              return [{
                es: "Debes agregar un título al eje X con el texto 'Puntajes anotados'.",
                en: "You must add a title to the X axis with the text 'Recorded Scores'.",
                pt: "Você deve adicionar um título ao eixo X com o texto 'Pontuações Registradas'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ylabel('Cantidaddejugadores')") && !code.replace(/\s/g, '').trim().includes("plt.ylabel('NumberofPlayers')") && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Cantidaddejugadores")') && !code.replace(/\s/g, '').trim().includes('plt.ylabel("NumberofPlayers")')) {
              return [{
                es: "Debes agregar un título al eje Y con el texto 'Cantidad de jugadores'.",
                en: "You must add a title to the Y axis with the text 'Number of players'.",
                pt: "Você deve adicionar um título ao eixo Y com o texto 'Número de jogadores'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }

            if (!code.replace(/\s/g, '').trim().includes('plt.show()print("Lamedianaes:"+str(puntos_anotados_avg.median()))') && !code.replace(/\s/g, '').trim().includes('plt.show()print("Themedianis:"+str(average_scores.median()))') && !code.replace(/\s/g, '').trim().includes("plt.show()print('Lamedianaes:'+str(puntos_anotados_avg.median()))") && !code.replace(/\s/g, '').trim().includes("plt.show()print('Themedianis:'+str(average_scores.median())')")) {
              return [{
                es: "Debes imprimir la mediana de los puntos anotados promedio.",
                en: "You must print the median of the average points scored.",
                pt: "Você deve imprimir a mediana dos pontos médios marcados."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-b-graficos-histograma-04",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_futbol = 'https://docs.google.com/spreadsheets/d/1lnKm8KGVs7LLASDjb6fp7OtOR-OW0WokSQQ7DeGO0XY/export?format=csv&gid=752967883'\n\ndata=pd.read_csv(open_url(url_futbol))\n`, en: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\n\nurl_soccer = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS86RsQepS2hRJW8C3sKkB2xV-Zx1RyPZBXTFgbnqDGQW1CrhbEMiJOX-LhZbm5vy3Ua1pWoDxFYwEP/pub?output=csv'\n\ndata=pd.read_csv(open_url(url_soccer))\n` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("url_futbol='https://docs.google.com/spreadsheets/d/1lnKm8KGVs7LLASDjb6fp7OtOR-OW0WokSQQ7DeGO0XY/export?format=csv&gid=752967883'") && !code.replace(/\s/g, '').trim().includes("url_soccer='https://docs.google.com/spreadsheets/d/e/2PACX-1vS86RsQepS2hRJW8C3sKkB2xV-Zx1RyPZBXTFgbnqDGQW1CrhbEMiJOX-LhZbm5vy3Ua1pWoDxFYwEP/pub?output=csv'")) {
              return [{
                es: "Debes tener una variable 'url_futbol' con la URL del archivo de Google Sheets.",
                en: "You must have a 'url_soccer' variable with the URL of the Google Sheets file.",
                pt: "Você deve ter uma variável 'url_soccer' com a URL do arquivo do Google Sheets."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_futbol))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url(url_soccer))")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'url'.",
                en: "You must read the data from the Google Sheets file into the 'url' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'url'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("pelotas_recuperadas_avg=") && !code.replace(/\s/g, '').trim().includes("average_recovered_balls=")) {
              return [{
                es: "Debes seleccionar la columna 'PELOTAS_RECUPERADAS_PROMEDIO' en la variable 'pelotas_recuperadas_avg'.",
                en: "You must select the 'BALLS_RECOVERED_AVERAGE' column into the 'average_recovered_balls' variable.",
                pt: "Você deve selecionar a coluna 'BALLS_RECOVERED_AVERAGE' na variável 'average_recovered_balls'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("pelotas_recuperadas_avg=data['PELOTAS_RECUPERADAS_PROMEDIO']") && !code.replace(/\s/g, '').trim().includes("average_recovered_balls=data['BALLS_RECOVERED_AVERAGE']") && !code.replace(/\s/g, '').trim().includes('pelotas_recuperadas_avg=data["PELOTAS_RECUPERADAS_PROMEDIO"]') && !code.replace(/\s/g, '').trim().includes('average_recovered_balls=data["BALLS_RECOVERED_AVERAGE"]')) {
              return [{
                es: "Debes seleccionar la columna 'PELOTAS_RECUPERADAS_PROMEDIO' en la variable 'pelotas_recuperadas_avg'.",
                en: "You must select the 'BALLS_RECOVERED_AVERAGE' column into the 'average_recovered_balls' variable.",
                pt: "Você deve selecionar a coluna 'BALLS_RECOVERED_AVERAGE' na variável 'average_recovered_balls'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("pelotas_recuperadas_avg.plot.box()") && !code.replace(/\s/g, '').trim().includes("average_recovered_balls.plot.box()")) {
              return [{
                es: "Debes crear un gráfico boxplot que muestre las pelotas recuperadas promedio.",
                en: "You must create a boxplot chart that shows the average recovered balls.",
                pt: "Você deve criar um gráfico de caixa que mostre as bolas recuperadas em média."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.title('Pelotasrecuperadas')") && !code.replace(/\s/g, '').trim().includes("plt.title('RecoveredBalls')") && !code.replace(/\s/g, '').trim().includes('plt.title("Pelotasrecuperadas")') && !code.replace(/\s/g, '').trim().includes('plt.title("RecoveredBalls")')) {
              return [{
                es: "Debes agregar un título al diagrama con el texto 'Pelotas recuperadas'.",
                en: "You must add a title to the box diagram with the text 'Recovered Balls'.",
                pt: "Você deve adicionar um título ao diagrama de caixa com o texto 'Bolas Recuperadas'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('Pelotasrecuperadas')") && !code.replace(/\s/g, '').trim().includes("plt.xlabel('RecoveredBalls')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Pelotasrecuperadas")') && !code.replace(/\s/g, '').trim().includes('plt.xlabel("RecoveredBalls")')) {
              return [{
                es: "Debes agregar un título al eje X con el texto 'Pelotas recuperadas'.",
                en: "You must add a title to the X axis with the text 'Recovered Balls'.",
                pt: "Você deve adicionar um título ao eixo X com o texto 'Bolas Recuperadas'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ylabel('Cantidaddejugadores')") && !code.replace(/\s/g, '').trim().includes("plt.ylabel('NumberofPlayers')") && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Cantidaddejugadores")') && !code.replace(/\s/g, '').trim().includes('plt.ylabel("NumberofPlayers")')) {
              return [{
                es: "Debes agregar un título al eje Y con el texto 'Cantidad de jugadores'.",
                en: "You must add a title to the Y axis with the text 'Number of Players'.",
                pt: "Você deve adicionar um título ao eixo Y com o texto 'Quantidade de Jogadores'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("pelotas_recuperadas_avg.describe()") && !code.replace(/\s/g, '').trim().includes("average_recovered_balls.describe()")) {
              return [{
                es: "Utiliza un método estadístico para ver un resumen de los datos y los valores exactos de los cuartiles.",
                en: "Use a statistical method to see a summary of the data and the exact values of the quartiles.",
                pt: "Use um método estatístico para ver um resumo dos dados e os valores exatos dos quartis."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-b-graficos-correlacion-01",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib", "scipy"],
    "editors": {
      "main.py": {
        "code": { es: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\nfrom scipy import stats\n\nurl_Experimento_climatico = 'https://docs.google.com/spreadsheets/d/1Sz9zLm07Ymm9AA2B5OmaC56blK_yK1W2EQMLp_BMkQs/export?format=csv&gid=1146403837'\ndata = pd.read_csv(open_url(url_Experimento_climatico))\n`, en: `import pandas as pd\nfrom pyodide.http import open_url\nimport matplotlib.pyplot as plt\nfrom scipy import stats\n\nurl_climate_experiment = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqnURl8fnOX7Daj-zbFhMKg9Z5KN4PKurONkPPcIj4lcm-xgbqAOAdzFPZmAvio70Q5JrvofP7T3yO/pub?output=csv'\ndata = pd.read_csv(open_url(url_climate_experiment))\n` },
        "isReadOnly": false
      }
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert.$custom(code => {
          code = code.replace(/\s/g, '').trim();

          if (!code.includes("frompyodide.httpimportopen_url")) {
            return [{ es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.", en: "You must import the 'open_url' function from the 'pyodide.http' module.", pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'." }];
          }

          if (!code.includes("importpandasaspd")) {
            return [{ es: "Debes importar la librería 'pandas' como 'pd'.", en: "You must import the 'pandas' library as 'pd'.", pt: "Você deve importar a biblioteca 'pandas' como 'pd'." }];
          }

          if (!code.includes("importmatplotlib.pyplotasplt")) {
            return [{ es: "Debes importar la librería 'matplotlib.pyplot' como 'plt'.", en: "You must import the 'matplotlib.pyplot' library as 'plt'.", pt: "Você deve importar a biblioteca 'matplotlib.pyplot' como 'plt'." }];
          }

          if (!code.includes("fromscipyimportstats")) {
            return [{ es: "Debes importar 'stats' desde 'scipy'.", en: "You must import 'stats' from 'scipy'.", pt: "Você deve importar 'stats' de 'scipy'." }];
          }
          if (!code.includes("url_Experimento_climatico='https://docs.google.com/spreadsheets/d/1Sz9zLm07Ymm9AA2B5OmaC56blK_yK1W2EQMLp_BMkQs/export?format=csv&gid=1146403837'") && !code.includes("url_climate_experiment='https://docs.google.com/spreadsheets/d/e/2PACX-1vTqnURl8fnOX7Daj-zbFhMKg9Z5KN4PKurONkPPcIj4lcm-xgbqAOAdzFPZmAvio70Q5JrvofP7T3yO/pub?output=csv'")) {
            return [{ es: "Debes tener una variable 'url_Experimento_climatico' con la URL del archivo de Google Sheets.", en: "You must have a 'url_climate_experiment' variable with the URL of the Google Sheets file.", pt: "Você deve ter uma variável 'url_climate_experiment' com a URL do arquivo do Google Sheets." }];
          }

          if (!code.includes("pd.read_csv(open_url(url_Experimento_climatico))") && !code.includes("pd.read_csv(open_url(url_climate_experiment))")) {
            return [{ es: "Debes leer los datos del archivo CSV correctamente desde la URL dada.", en: "You must correctly read the CSV data from the given URL.", pt: "Você deve ler corretamente os dados CSV da URL fornecida." }];
          }

          if (!code.includes(`x=data["CantidadÁrboles"]`) && !code.includes(`x=data['CantidadÁrboles']`)) {
            return [{ es: "Debes crear la variable 'x' a partir de la columna 'Cantidad Árboles'.", en: "You must assign the variable 'x' from the 'Cantidad Árboles' column.", pt: "Você deve criar a variável 'x' a partir da coluna 'Quantidade de Árvores'." }];
          }

          if (!code.includes(`y=data["Temperatura"]`) && !code.includes(`y=data['Temperatura']`)) {
            return [{ es: "Debes crear la variable 'y' a partir de la columna 'Temperatura'.", en: "You must assign the variable 'y' from the 'Temperatura' column.", pt: "Você deve criar a variável 'y' a partir da coluna 'Temperatura'." }];
          }

          if (!code.includes("slope,intercept,r_value,p_value,std_err=stats.linregress(x,y)")) {
            return [{ es: "Debes calcular la pendiente, el intercepto, el valor de correlación, el valor p y el error estándar usando 'stats.linregress(x, y)'.", en: "You must calculate the slope, intercept, correlation value, p-value, and standard error using 'stats.linregress(x, y)'.", pt: "Você deve calcular a inclinação, o intercepto, o valor de correlação, o valor p e o erro padrão usando 'stats.linregress(x, y)'." }];
          }

          if (!code.includes("plt.figure(figsize=(5,5))")) {
            return [{ es: "Debes establecer el tamaño de la figura con 'plt.figure(figsize=(5,5))'.", en: "You must set the figure size using 'plt.figure(figsize=(5,5))'.", pt: "Você deve definir o tamanho da figura com 'plt.figure(figsize=(5,5))'." }];
          }

          if (!code.includes("plt.grid(True)")) {
            return [{ es: "Debes mostrar una cuadrícula en el gráfico con 'plt.grid(True)'.", en: "You must show a grid on the chart using 'plt.grid(True)'.", pt: "Você deve mostrar uma grade no gráfico com 'plt.grid(True)'." }];
          }

          if (!code.includes("plt.scatter(x,y")) {
            return [{ es: "Debes crear un gráfico de dispersión con 'plt.scatter(x, y)'.", en: "You must create a scatter plot using 'plt.scatter(x, y)'.", pt: "Você deve criar um gráfico de dispersão com 'plt.scatter(x, y)'." }];
          }

          if (!code.includes("plt.plot(x,intercept+slope*x") && !code.includes("plt.plot(x,slope*x+intercept")) {
            return [{ es: "Debes graficar la línea de tendencia correctamente.", en: "You must correctly plot the trend line.", pt: "Você deve traçar corretamente a linha de tendência." }];
          }

          if (!code.includes("plt.title('CantidaddeÁrbolesvs.Temperatura')") && !code.includes('plt.title("CantidaddeÁrbolesvs.Temperatura")')) {
            return [{ es: "Debes establecer un título con el texto 'Cantidad de Árboles vs. Temperatura'.", en: "You must set a title with the text 'Cantidad de Árboles vs. Temperatura'.", pt: "Você deve definir um título com o texto 'Quantidade de Árvores vs Temperatura'." }];
          }

          if (!code.includes("plt.xlabel('Temperatura')") && !code.includes('plt.xlabel("Temperatura")')) {
            return [{ es: "Debes etiquetar el eje X con 'Temperatura'.", en: "You must label the X axis with 'Temperatura'.", pt: "Você deve rotular o eixo X com 'Temperatura'." }];
          }

          if (!code.includes("plt.ylabel('CantidaddeÁrboles')") && !code.includes('plt.ylabel("CantidaddeÁrboles")')) {
            return [{ es: "Debes etiquetar el eje Y con 'Cantidad de Árboles'.", en: "You must label the Y axis with 'Cantidad de Árboles'.", pt: "Você deve rotular o eixo Y com 'Quantidade de Árvores'." }];
          }

          if (!code.includes("plt.show()")) {
            return [{ es: "Debes mostrar el gráfico con 'plt.show()'.", en: "You must display the plot using 'plt.show()'.", pt: "Você deve exibir o gráfico com 'plt.show()'." }];
          }

          if (!code.includes("x.corr(y)")) {
            return [{ es: "Debes calcular el coeficiente de correlación y guardarlo en la variable 'correlacion'.", en: "You must calculate the correlation coefficient and store it in the 'correlacion' variable.", pt: "Você deve calcular o coeficiente de correlação e armazená-lo na variável 'correlacion'." }];
          }

          if (!code.includes('print("ElcoeficientedecorrelacióndePearsones:"+str(') && !code.includes('print("ThePearsoncorrelationcoefficientis:"+str(') && !code.includes("print('ElcoeficientedecorrelacióndePearsones:'+str(") && !code.includes("print('ThePearsoncorrelationcoefficientis:'+str(")) {
            return [{ es: "Debes imprimir el coeficiente de correlación con 'print(...)'.", en: "You must print the correlation coefficient using 'print(...)'.", pt: "Você deve imprimir o coeficiente de correlação usando 'print(...)'." }];
          }
        })
      }
    ]

  },
  {
    "id": "pandas-b-graficos-dispersion-02",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib", "scipy"],
    "editors": {
      "main.py": {
        "code": { es: `from pyodide.http import open_url\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport numpy as np\nfrom scipy import stats\n\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/1Sz9zLm07Ymm9AA2B5OmaC56blK_yK1W2EQMLp_BMkQs/export?format=csv&gid=2011473450'))\n`, en: `from pyodide.http import open_url\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport numpy as np\nfrom scipy import stats\n\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vTqnURl8fnOX7Daj-zbFhMKg9Z5KN4PKurONkPPcIj4lcm-xgbqAOAdzFPZmAvio70Q5JrvofP7T3yO/pub?gid=2011473450&single=true&output=csv'))\n` },
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt") && !code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt")) {
              return [{
                es: "Debes importar la librería 'matplotlib.pyplot' como 'plt'.",
                en: "You must import the 'matplotlib.pyplot' library as 'plt'.",
                pt: "Você deve importar a biblioteca 'matplotlib.pyplot' como 'plt'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importnumpyasnp") && !code.replace(/\s/g, '').trim().includes("importnumpyasnp")) {
              return [{
                es: "Debes importar la librería 'numpy' como 'np'.",
                en: "You must import the 'numpy' library as 'np'.",
                pt: "Você deve importar a biblioteca 'numpy' como 'np'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("fromscipyimportstats") && !code.replace(/\s/g, '').trim().includes("fromscipyimportstats")) {
              return [{
                es: "Debes importar la función 'stats' del módulo 'scipy'.",
                en: "You must import the 'stats' function from the 'scipy' module.",
                pt: "Você deve importar a função 'stats' do módulo 'scipy'."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/1Sz9zLm07Ymm9AA2B5OmaC56blK_yK1W2EQMLp_BMkQs/export?format=csv&gid=2011473450'))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vTqnURl8fnOX7Daj-zbFhMKg9Z5KN4PKurONkPPcIj4lcm-xgbqAOAdzFPZmAvio70Q5JrvofP7T3yO/pub?gid=2011473450&single=true&output=csv')")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("x=")) {
              return [{
                es: "Debes seleccionar la columna 'Cantidad Árboles' en la variable 'x'.",
                en: "You must select the 'Tree Quantity' column into the 'x' variable.",
                pt: "Você deve selecionar a coluna 'Quantidade de Árvores' na variável 'x'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("x=data['CantidadÁrboles']") && !code.replace(/\s/g, '').trim().includes("x=data['TreeQuantity']") && !code.replace(/\s/g, '').trim().includes('x=data["CantidadÁrboles"]') && !code.replace(/\s/g, '').trim().includes('x=data["TreeQuantity"]')) {
              return [{
                es: "Debes crear una variable 'x' con los datos del eje X.",
                en: "You must create an 'x' variable with the X-axis data.",
                pt: "Você deve criar uma variável 'x' com os dados do eixo X."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("y=")) {
              return [{
                es: "Debes seleccionar la columna 'Temperatura' en la variable 'y'.",
                en: "You must select the 'Temperature' column into the 'y' variable.",
                pt: "Você deve selecionar a coluna 'Temperatura' na variável 'y'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("y=data['Temperatura']") && !code.replace(/\s/g, '').trim().includes("y=data['Temperature']") && !code.replace(/\s/g, '').trim().includes('y=data["Temperatura"]') && !code.replace(/\s/g, '').trim().includes('y=data["Temperature"]')) {
              return [{
                es: "Debes crear una variable 'y' con los datos del eje Y.",
                en: "You must create a 'y' variable with the Y-axis data.",
                pt: "Você deve criar uma variável 'y' com os dados do eixo Y."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.grid(True)") && !code.replace(/\s/g, '').trim().includes("plt.grid(True)")) {
              return [{
                es: "Debes agregar una cuadrícula al gráfico.",
                en: "You must add a grid to the chart.",
                pt: "Você deve adicionar uma grade ao gráfico."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.scatter(x,y)") && !code.replace(/\s/g, '').trim().includes("plt.scatter(x,y)")) {
              return [{
                es: "Debes crear un gráfico de dispersión con los datos de 'x' e 'y'.",
                en: "You must create a scatter plot with the data from 'x' and 'y'.",
                pt: "Você deve criar um gráfico de dispersão com os dados de 'x' e 'y'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("slope,intercept,r,p,std_err=stats.linregress(x,y)") && !code.replace(/\s/g, '').trim().includes("slope,intercept,r,p,std_err=stats.linregress(x,y)") && !code.replace(/\s/g, '').trim().includes("slope,intercept,r_value,p_value,std_err=stats.linregress(x,y)")) {
              return [{
                es: "Debes calcular la regresión lineal entre 'x' e y'.",
                en: "You must calculate the linear regression between 'x' and 'y'.",
                pt: "Você deve calcular a regressão linear entre 'x' e 'y'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.plot(x,slope*x+intercept,'red',label='Líneadetendencia')") && !code.replace(/\s/g, '').trim().includes("plt.plot(x,slope*x+intercept,'red',label='Trendline')") && !code.replace(/\s/g, '').trim().includes(`plt.plot(x,slope*x+intercept,"red",label="Líneadetendencia")`) && !code.replace(/\s/g, '').trim().includes(`plt.plot(x,slope*x+intercept,'red',label="Trendline")`) && !code.replace(/\s/g, '').trim().includes("plt.plot(x,intercept+slope*x,'red',label='Líneadetendencia')") && !code.replace(/\s/g, '').trim().includes("plt.plot(x,intercept+slope*x,'red',label='Trendline')") && !code.replace(/\s/g, '').trim().includes(`plt.plot(x,intercept+slope*x,"red",label="Líneadetendencia")`) && !code.replace(/\s/g, '').trim().includes(`plt.plot(x,intercept+slope*x,'red',label="Trendline")`)) {
              return [{
                es: "Debes graficar la línea de tendencia en color rojo.",
                en: "You must plot the trend line in red.",
                pt: "Você deve plotar a linha de tendência em vermelho."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.title('CantidaddeÁrbolesvs.Temperatura')") && !code.replace(/\s/g, '').trim().includes("plt.title('NumberofTreesvs.Temperature')") && !code.replace(/\s/g, '').trim().includes('plt.title("CantidaddeÁrbolesvs.Temperatura")') && !code.replace(/\s/g, '').trim().includes('plt.title("NumberofTreesvs.Temperature")')) {
              return [{
                es: "Debes agregar un título al gráfico con el texto 'Cantidad de Árboles vs Temperatura'.",
                en: "You must add a title to the chart with the text 'Number of Trees vs Temperature'.",
                pt: "Você deve adicionar um título ao gráfico com o texto 'Quantidade de Árvores vs Temperatura'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('CantidaddeÁrboles')") && !code.replace(/\s/g, '').trim().includes("plt.xlabel('TreeQuantity')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("CantidaddeÁrboles")') && !code.replace(/\s/g, '').trim().includes('plt.xlabel("TreeQuantity")')) {
              return [{
                es: "Debes agregar un título al eje X con el texto 'Cantidad de Árboles'.",
                en: "You must add a title to the X axis with the text 'Tree Quantity'.",
                pt: "Você deve adicionar um título ao eixo X com o texto 'Quantidade de Árvores'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ylabel('Temperatura')") && !code.replace(/\s/g, '').trim().includes("plt.ylabel('Temperature')") && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Temperatura")') && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Temperature")')) {
              return [{
                es: "Debes agregar un título al eje Y con el texto 'Temperatura'.",
                en: "You must add a title to the Y axis with the text 'Temperature'.",
                pt: "Você deve adicionar um título ao eixo Y com o texto 'Temperatura'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }
            if (!code.includes("x.corr(y)")) {
              return [{ es: "Debes calcular el coeficiente de correlación y guardarlo en la variable 'correlacion'.", en: "You must calculate the correlation coefficient and store it in the 'correlacion' variable.", pt: "Você deve calcular o coeficiente de correlação e armazená-lo na variável 'correlacion'." }];
            }
            if (!code.replace(/\s/g, '').trim().includes('print("ElcoeficientedecorrelacióndePearsones:"+str(') && !code.replace(/\s/g, '').trim().includes('print("ThePearsoncorrelationcoefficientis:"+str(') && !code.replace(/\s/g, '').trim().includes('print("ElcoeficientedecorrelacióndePearsones:"+str(') && !code.replace(/\s/g, '').trim().includes('print("ThePearsoncorrelationcoefficientis:"+str(')) {
              return [{
                es: "Debes imprimir el coeficiente de correlación de Pearson entre 'x' e 'y'.",
                en: "You must print the Pearson correlation coefficient between 'x' and 'y'.",
                pt: "Você deve imprimir o coeficiente de correlação de Pearson entre 'x' e 'y'."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-c-metodo-groupby-01",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas"],
    "editors": {
      "main.py": {
        "code": { es: `from pyodide.http import open_url;\nimport pandas as pd;\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/14q2bVTTE5lLM8hJalgyb9wE9ZBBTAWlFKjZhk0Lrac4/export?format=csv&gid=1459326506'))\n`, en: `from pyodide.http import open_url;\nimport pandas as pd;\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYPIQOQEp6ysrdW_Jfu178ULq0WHbu5BYDkSuNQo25VnxHQAzM96YfK--NQXT7CODiLfWnWcVKDnZ/pub?output=csv'))\n` },
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/14q2bVTTE5lLM8hJalgyb9wE9ZBBTAWlFKjZhk0Lrac4/export?format=csv&gid=1459326506'))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYPIQOQEp6ysrdW_Jfu178ULq0WHbu5BYDkSuNQo25VnxHQAzM96YfK--NQXT7CODiLfWnWcVKDnZ/pub?output=csv')")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("mascara=") && !code.replace(/\s/g, '').trim().includes("mask=")) {
              return [{
                es: "Debes crear una variable llamada 'mascara' para almacenar la informacion de las categorias 'FIFA 20', 'VALORANT', 'Apex Legends' y 'Grand Theft Auto V'.",
                en: "You must create a variable called 'mask' to store the information of the categories 'FIFA 20', 'VALORANT', 'Apex Legends' and 'Grand Theft Auto V'.",
                pt: "Você deve criar uma variável chamada 'mask' para armazenar as informações das categorias 'FIFA 20', 'VALORANT', 'Apex Legends' e 'Grand Theft Auto V'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("mascara=(data['CATEGORIA_1']=='FIFA20')|(data['CATEGORIA_1']=='VALORANT')|(data['CATEGORIA_1']=='ApexLegends')|(data['CATEGORIA_1']=='GrandTheftAutoV'") && !code.replace(/\s/g, '').trim().includes("mask=(data['CATEGORY_1']=='FIFA20')|(data['CATEGORY_1']=='VALORANT')|(data['CATEGORY_1']=='ApexLegends')|(data['CATEGORY_1']=='GrandTheftAutoV'") && !code.replace(/\s/g, '').trim().includes('mask=(data["CATEGORY_1"]=="FIFA20")|(data["CATEGORY_1"]=="VALORANT")|(data["CATEGORY_1"]=="ApexLegends")|(data["CATEGORY_1"]=="GrandTheftAutoV"') && !code.replace(/\s/g, '').trim().includes('mask=(data["CATEGORY_1"]=="FIFA20")|(data["CATEGORY_1"]=="VALORANT")|(data["CATEGORY_1"]=="ApexLegends")|(data["CATEGORY_1"]=="GrandTheftAutoV"')) {
              return [{
                es: "Debes crear una máscara con las categorías 'FIFA 20', 'VALORANT', 'Apex Legends' y 'Grand Theft Auto V'.",
                en: "You must create a mask with the 'FIFA 20', 'VALORANT', 'Apex Legends' and 'Grand Theft Auto V' categories.",
                pt: "Você deve criar uma máscara com as categorias 'FIFA 20', 'VALORANT', 'Apex Legends' e 'Grand Theft Auto V'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_filtrada=") && !code.replace(/\s/g, '').trim().includes("filtered_data=")) {
              return [{
                es: "Debes crear una variable llamada 'data_filtrada' para almacenar los datos filtrados.",
                en: "You must create a variable called 'filtered_data' to store the filtered data.",
                pt: "Você deve criar uma variável chamada 'filtered_data' para armazenar os dados filtrados."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_filtrada=data[mascara]") && !code.replace(/\s/g, '').trim().includes("filtered_data=data[mask]") && !code.replace(/\s/g, '').trim().includes('filtered_data=data[mask]') && !code.replace(/\s/g, '').trim().includes('filtered_data=data[mask]')) {
              return [{
                es: "Debes filtrar los datos con la máscara creada.",
                en: "You must filter the data with the created mask.",
                pt: "Você deve filtrar os dados com a máscara criada."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_promedio_tiempo=") && !code.replace(/\s/g, '').trim().includes("average_view_time_data=")) {
              return [{
                es: "Debes crear una variable llamada 'data_promedio_tiempo' para almacenar el promedio de 'TIEMPO_VISTA'.",
                en: "You must create a variable called 'average_view_time_data' to store the average 'VIEW_TIME'.",
                pt: "Você deve criar uma variável chamada 'average_view_time_data' para armazenar a média de 'VIEW_TIME'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_promedio_tiempo=data_filtrada.groupby('CATEGORIA_1')['TIEMPO_VISTA'].mean()") && !code.replace(/\s/g, '').trim().includes("average_view_time_data=filtered_data.groupby('CATEGORY_1')['VIEW_TIME'].mean()") && !code.replace(/\s/g, '').trim().includes('average_view_time_data=filtered_data.groupby("CATEGORY_1")["VIEW_TIME"].mean()') && !code.replace(/\s/g, '').trim().includes('average_view_time_data=filtered_data.groupby("CATEGORY_1")["VIEW_TIME"].mean()')) {
              return [{
                es: "Debes agrupar los datos filtrados por categoría y calcular el promedio de 'TIEMPO_VISTA'.",
                en: "You must group the filtered data by category and calculate the average 'VIEW_TIME'.",
                pt: "Você deve agrupar os dados filtrados por categoria e calcular a média de 'VIEW_TIME'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`print("Tiempodevisitapromedioporcadajuego:"+str(data_promedio_tiempo))`) && !code.replace(/\s/g, '').trim().includes(`print("Averageviewtimepergame:"+str(average_view_time_data))`) && !code.replace(/\s/g, '').trim().includes(`print('Tiempodevisitapromedioporcadajuego:'+str(data_promedio_tiempo))`) && !code.replace(/\s/g, '').trim().includes(`print('Averageviewtimepergame:'+str(average_view_time_data))`)) {
              return [{
                es: "Debes imprimir el promedio de 'TIEMPO_VISTA' por categoría.",
                en: "You must print the average 'VIEW_TIME' by category.",
                pt: "Você deve imprimir a média de 'VIEW_TIME' por categoria."
              }];
            }
          })
      }
    ]

  },
  {
    "id": "pandas-c-metodo-groupby-02",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `from pyodide.http import open_url;\nimport matplotlib.pyplot as plt\nimport pandas as pd;\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/14q2bVTTE5lLM8hJalgyb9wE9ZBBTAWlFKjZhk0Lrac4/export?format=csv&gid=1459326506'))\n`, en: `from pyodide.http import open_url;\nimport pandas as pd;\nimport matplotlib.pyplot as plt\n\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYPIQOQEp6ysrdW_Jfu178ULq0WHbu5BYDkSuNQo25VnxHQAzM96YfK--NQXT7CODiLfWnWcVKDnZ/pub?output=csv'))\n` },
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt") && !code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt")) {
              return [{
                es: "Debes importar la librería 'matplotlib.pyplot' como 'plt'.",
                en: "You must import the 'matplotlib.pyplot' library as 'plt'.",
                pt: "Você deve importar a biblioteca 'matplotlib.pyplot' como 'plt'."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/14q2bVTTE5lLM8hJalgyb9wE9ZBBTAWlFKjZhk0Lrac4/export?format=csv&gid=1459326506'))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYPIQOQEp6ysrdW_Jfu178ULq0WHbu5BYDkSuNQo25VnxHQAzM96YfK--NQXT7CODiLfWnWcVKDnZ/pub?output=csv')")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_idioma=") && !code.replace(/\s/g, '').trim().includes("data_language=")) {
              return [{
                es: "Debes crear una variable llamada 'data_idioma' para almacenar la suma de 'SEGUIDORES' por 'IDIOMA'.",
                en: "You must create a variable called 'data_language' to store the sum of 'FOLLOWERS' by 'LANGUAGE'.",
                pt: "Você deve criar uma variável chamada 'data_language' para armazenar a soma de 'FOLLOWERS' por 'LANGUAGE'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_idioma=data.groupby('IDIOMA')['SEGUIDORES'].sum()") && !code.replace(/\s/g, '').trim().includes("data_language=data.groupby('LANGUAGE')['FOLLOWERS'].sum()") && !code.replace(/\s/g, '').trim().includes('data_language=data.groupby("LANGUAGE")["FOLLOWERS"].sum()') && !code.replace(/\s/g, '').trim().includes('data_idioma=data.groupby("IDIOMA")["SEGUIDORES"].sum()')) {
              return [{
                es: "Debes agrupar los datos por idioma y sumar los seguidores.",
                en: "You must group the data by language and sum the followers.",
                pt: "Você deve agrupar os dados por idioma e somar os seguidores."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`print("Sumadeseguidoresporidioma:"+str(data_idioma))`) && !code.replace(/\s/g, '').trim().includes(`print("Sumoffollowersbylanguage:"+str(data_language))`) && !code.replace(/\s/g, '').trim().includes(`print('Sumadeseguidoresporidioma:'+str(data_idioma))`) && !code.replace(/\s/g, '').trim().includes(`print('Sumoffollowersbylanguage:'+str(data_language))`)) {
              return [{
                es: "Debes imprimir la suma de seguidores por idioma.",
                en: "You must print the sum of followers by language.",
                pt: "Você deve imprimir a soma de seguidores por idioma."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_idioma.plot.bar()") && !code.replace(/\s/g, '').trim().includes("data_language.plot.bar()")) {
              return [{
                es: "Debes mostrar los datos en un gráfico de barras.",
                en: "You must display the data in a bar chart.",
                pt: "Você deve exibir os dados em um gráfico de barras."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.title('Seguidoresporidioma')") && !code.replace(/\s/g, '').trim().includes("plt.title('Followersbylanguage')") && !code.replace(/\s/g, '').trim().includes('plt.title("Seguidoresporidioma")') && !code.replace(/\s/g, '').trim().includes('plt.title("Followersbylanguage")')) {
              return [{
                es: "Debes agregar un título al gráfico con el texto 'Seguidores por idioma'.",
                en: "You must add a title to the chart with the text 'Followers by Language'.",
                pt: "Você deve adicionar um título ao gráfico com o texto 'Seguidores por idioma'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('Idioma')") && !code.replace(/\s/g, '').trim().includes("plt.xlabel('Language')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Idioma")') && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Language")')) {
              return [{
                es: "Debes agregar un título al eje X con el texto 'Idioma'.",
                en: "You must add a title to the X axis with the text 'Language'.",
                pt: "Você deve adicionar um título ao eixo X com o texto 'Idioma'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ylabel('Seguidores')") && !code.replace(/\s/g, '').trim().includes("plt.ylabel('Followers')") && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Seguidores")') && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Followers")')) {
              return [{
                es: "Debes agregar un título al eje Y con el texto 'Seguidores'.",
                en: "You must add a title to the Y axis with the text 'Followers'.",
                pt: "Você deve adicionar um título ao eixo Y com o texto 'Seguidores'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=45)") && !code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=45)")) {
              return [{
                es: "Debes rotar 45 grados las etiquetas del eje X.",
                en: "You must rotate the X-axis labels by 45 degrees.",
                pt: "Você deve rotacionar as etiquetas do eixo X em 45 graus."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis='y',style='plain')`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis='y',style='plain')`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis="y",style="plain")`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis="y",style="plain")`)) {
              return [{
                es: "Debes mostrar los números en el eje Y en formato decimal.",
                en: "You must display the numbers on the Y axis in decimal format.",
                pt: "Você deve exibir os números no eixo Y em formato decimal."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-c-metodo-groupby-03",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `from pyodide.http import open_url;\nimport matplotlib.pyplot as plt\nimport pandas as pd;\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/14q2bVTTE5lLM8hJalgyb9wE9ZBBTAWlFKjZhk0Lrac4/export?format=csv&gid=1459326506'))\n`, en: `from pyodide.http import open_url;\nimport pandas as pd;\nimport matplotlib.pyplot as plt\n\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYPIQOQEp6ysrdW_Jfu178ULq0WHbu5BYDkSuNQo25VnxHQAzM96YfK--NQXT7CODiLfWnWcVKDnZ/pub?output=csv'))\n` },
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt") && !code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt")) {
              return [{
                es: "Debes importar la librería 'matplotlib.pyplot' como 'plt'.",
                en: "You must import the 'matplotlib.pyplot' library as 'plt'.",
                pt: "Você deve importar a biblioteca 'matplotlib.pyplot' como 'plt'."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/14q2bVTTE5lLM8hJalgyb9wE9ZBBTAWlFKjZhk0Lrac4/export?format=csv&gid=1459326506'))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYPIQOQEp6ysrdW_Jfu178ULq0WHbu5BYDkSuNQo25VnxHQAzM96YfK--NQXT7CODiLfWnWcVKDnZ/pub?output=csv')")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("ifdata['FECHA'].dtype!='datetime64[ns]':") && !code.replace(/\s/g, '').trim().includes("ifdata['DATE'].dtype!='datetime64[ns]':") && !code.replace(/\s/g, '').trim().includes('ifdata["FECHA"].dtype!="datetime64[ns]":') && !code.replace(/\s/g, '').trim().includes('ifdata["DATE"].dtype!="datetime64[ns]":')) {
              return [{
                es: "Debes verificar si la columna 'FECHA' es de tipo 'datetime64[ns]'.",
                en: "You must check if the 'DATE' column is of type 'datetime64[ns]'.",
                pt: "Você deve verificar se a coluna 'DATE' é do tipo 'datetime64[ns]'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data['FECHA']=pd.to_datetime(data['FECHA'])") && !code.replace(/\s/g, '').trim().includes("data['DATE']=pd.to_datetime(data['DATE'])") && !code.replace(/\s/g, '').trim().includes('data["FECHA"]=pd.to_datetime(data["FECHA"])') && !code.replace(/\s/g, '').trim().includes('data["DATE"]=pd.to_datetime(data["DATE"])')) {
              return [{
                es: "Debes convertir los datos de la columna 'FECHA' a tipo 'datetime'.",
                en: "You must convert the data in the 'DATE' column to 'datetime' type.",
                pt: "Você deve converter os dados na coluna 'DATE' para o tipo 'datetime'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("mascara_fechas=") && !code.replace(/\s/g, '').trim().includes("date_mask=")) {
              return [{
                es: "Debes crear una variable llamada 'mascara_fechas' para almacenar las fechas del mes de septiembre de 2022.",
                en: "You must create a variable called 'date_mask' to store the dates of September 2022.",
                pt: "Você deve criar uma variável chamada 'date_mask' para armazenar as datas de setembro de 2022."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("mascara_fechas=(data['FECHA']>='2022-09-01')&(data['FECHA']<='2022-09-30')") && !code.replace(/\s/g, '').trim().includes("date_mask=(data['DATE']>='2022-09-01')&(data['DATE']<='2022-09-30')") && !code.replace(/\s/g, '').trim().includes('date_mask=(data["DATE"]>="2022-09-01")&(data["DATE"]<="2022-09-30")') && !code.replace(/\s/g, '').trim().includes('date_mask=(data["DATE"]>="2022-09-01")&(data["DATE"]<="2022-09-30")') && !code.replace(/\s/g, '').trim().includes(`mascara_fechas=(data['FECHA']>="2022-09-01")&(data['FECHA']<="2022-09-30")`) && !code.replace(/\s/g, '').trim().includes(`date_mask=(data['DATE']>="2022-09-01")&(data['DATE']<="2022-09-30")`) && !code.replace(/\s/g, '').trim().includes(`mascara_fechas=(data["FECHA"]>='2022-09-01')&(data["FECHA"]<='2022-09-30')`) && !code.replace(/\s/g, '').trim().includes(`date_mask=(data["DATE"]>='2022-09-01')&(data["DATE"]<='2022-09-30')`)) {
              return [{
                es: "Debes crear una máscara con las fechas del mes de septiembre de 2022.",
                en: "You must create a mask with the dates of September 2022.",
                pt: "Você deve criar uma máscara com as datas de setembro de 2022."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_fechas=") && !code.replace(/\s/g, '').trim().includes("date_data=")) {
              return [{
                es: "Debes crear una variable llamada 'data_fechas' para almacenar los datos filtrados por fechas.",
                en: "You must create a variable called 'date_data' to store the data filtered by dates.",
                pt: "Você deve criar uma variável chamada 'date_data' para armazenar os dados filtrados por datas."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_fechas=data[mascara_fechas]") && !code.replace(/\s/g, '').trim().includes("date_data=data[date_mask]") && !code.replace(/\s/g, '').trim().includes('date_data=data[date_mask]') && !code.replace(/\s/g, '').trim().includes('date_data=data[mask_dates]')) {
              return [{
                es: "Debes filtrar los datos con la máscara de fechas.",
                en: "You must filter the data with the dates mask.",
                pt: "Você deve filtrar os dados com a máscara de datas."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_max_espectadores=") && !code.replace(/\s/g, '').trim().includes("max_viewers_data=")) {
              return [{
                es: "Debes crear una variable llamada 'data_max_espectadores' para almacenar el máximo de 'ESPECTADORES_PROMEDIO'.",
                en: "You must create a variable called 'max_viewers_data' to store the maximum 'AVERAGE_VIEWERS'.",
                pt: "Você deve criar uma variável chamada 'max_viewers_data' para armazenar o máximo de 'AVERAGE_VIEWERS'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_max_espectadores=data_fechas.groupby('FECHA')['ESPECTADORES_PROMEDIO'].max()") && !code.replace(/\s/g, '').trim().includes("max_viewers_data=date_data.groupby('DATE')['AVERAGE_VIEWERS'].max()") && !code.replace(/\s/g, '').trim().includes('max_viewers_data=date_data.groupby("DATE")["AVERAGE_VIEWERS"].max()') && !code.replace(/\s/g, '').trim().includes('max_viewers_data=date_data.groupby("DATE")["AVERAGE_VIEWERS"].max()') && !code.replace(/\s/g, '').trim().includes(`data_max_espectadores=data_fechas.groupby('FECHA')["ESPECTADORES_PROMEDIO"].max()`) && !code.replace(/\s/g, '').trim().includes(`max_viewers_data=date_data.groupby('DATE')["AVERAGE_VIEWERS"].max()`) && !code.replace(/\s/g, '').trim().includes(`data_max_espectadores=data_fechas.groupby("FECHA")['ESPECTADORES_PROMEDIO'].max()`) && !code.replace(/\s/g, '').trim().includes(`max_viewers_data=date_data.groupby("DATE")['AVERAGE_VIEWERS'].max()`)) {
              return [{
                es: "Debes agrupar los datos filtrados por fecha y calcular el máximo de 'ESPECTADORES_PROMEDIO'.",
                en: "You must group the filtered data by date and calculate the maximum 'AVERAGE_VIEWERS'.",
                pt: "Você deve agrupar os dados filtrados por data e calcular o máximo de 'AVERAGE_VIEWERS'."
              }];
            }

            if (!code.replace(/\s/g, '').trim().includes(`print("Máximodeespectadorespromediopordía:"+str(data_max_espectadores))`) && !code.replace(/\s/g, '').trim().includes(`print("Maximumaverageviewersperday:"+str(max_viewers_data))`) && !code.replace(/\s/g, '').trim().includes(`print('Máximodeespectadorespromediopordía:'+str(data_max_espectadores))`) && !code.replace(/\s/g, '').trim().includes(`print('Maximumaverageviewersperday:'+str(max_viewers_data))`)) {
              return [{
                es: "Debes imprimir el máximo de 'ESPECTADORES_PROMEDIO' por día.",
                en: "You must print the maximum 'AVERAGE_VIEWERS' per day.",
                pt: "Você deve imprimir o máximo de 'AVERAGE_VIEWERS' por dia."
              }];
            }

            if (!code.replace(/\s/g, '').trim().includes(`plt.figure(figsize=(10,6))`) && !code.replace(/\s/g, '').trim().includes(`plt.figure(figsize=(10,6))`)) {
              return [{
                es: "Debes crear una figura con un tamaño de 10x6.",
                en: "You must create a figure with a size of 10x6.",
                pt: "Você deve criar uma figura com um tamanho de 10x6."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`data.groupby('FECHA')["ESPECTADORES_PROMEDIO"].plot.line(marker='o',color='blue')`) && !code.replace(/\s/g, '').trim().includes(`max_viewers_data.plot.line(marker='o',color='blue')`) && !code.replace(/\s/g, '').trim().includes(`data.groupby("FECHA")["ESPECTADORES_PROMEDIO"].plot.line(marker="o",color="blue")`) && !code.replace(/\s/g, '').trim().includes(`max_viewers_data.plot.line(marker="o",color="blue")`) && !code.replace(/\s/g, '').trim().includes(`data.groupby('FECHA')["ESPECTADORES_PROMEDIO"].plot.line(color='blue',marker='o')`) && !code.replace(/\s/g, '').trim().includes(`max_viewers_data.plot.line(color='blue',marker='o')`) && !code.replace(/\s/g, '').trim().includes(`data.groupby("FECHA")["ESPECTADORES_PROMEDIO"].plot.line(color="blue",marker="o")`) && !code.replace(/\s/g, '').trim().includes(`max_viewers_data.plot.line(color="blue",marker="o")`)) {
              return [{
                es: "Debes mostrar los datos en un gráfico de líneas con marcadores de color azul.",
                en: "You must display the data in a line chart with blue markers.",
                pt: "Você deve exibir os dados em um gráfico de linhas com marcadores azuis."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.title('Máximosespectadorespordía')") && !code.replace(/\s/g, '').trim().includes("plt.title('MaximumViewersperDay')") && !code.replace(/\s/g, '').trim().includes('plt.title("Máximosespectadorespordía")') && !code.replace(/\s/g, '').trim().includes('plt.title("MaximumViewersperDay")')) {
              return [{
                es: "Debes agregar un título al gráfico con el texto 'Máximos espectadores por día'.",
                en: "You must add a title to the chart with the text 'Maximum viewers per day'.",
                pt: "Você deve adicionar um título ao gráfico com o texto 'Máximos espectadores por dia'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('Día')") && !code.replace(/\s/g, '').trim().includes("plt.xlabel('Day')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Día")') && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Day")')) {
              return [{
                es: "Debes agregar un título al eje X con el texto 'Día'.",
                en: "You must add a title to the X axis with the text 'Day'.",
                pt: "Você deve adicionar um título ao eixo X com o texto 'Dia'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ylabel('Máximodeespectadores')") && !code.replace(/\s/g, '').trim().includes("plt.ylabel('MaximumViewers')") && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Máximodeespectadores")') && !code.replace(/\s/g, '').trim().includes('plt.ylabel("MaximumViewers")')) {
              return [{
                es: "Debes agregar un título al eje Y con el texto 'Máximo de espectadores'.",
                en: "You must add a title to the Y axis with the text 'Maximum viewers'.",
                pt: "Você deve adicionar um título ao eixo Y com o texto 'Máximo de espectadores'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=45)") && !code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=45)")) {
              return [{
                es: "Debes rotar 45 grados las etiquetas del eje X.",
                en: "You must rotate the X-axis labels by 45 degrees.",
                pt: "Você deve rotacionar as etiquetas do eixo X em 45 graus."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`plt.gca().xaxis.set_major_locator(plt.matplotlib.dates.DayLocator(interval=1))`) && !code.replace(/\s/g, '').trim().includes(`plt.gca().xaxis.set_major_locator(plt.matplotlib.dates.DayLocator(interval=1))`)) {
              return [{
                es: "Debes mostrar las etiquetas de los días en el eje X.",
                en: "You must display the day labels on the X axis.",
                pt: "Você deve exibir as etiquetas dos dias no eixo X."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`plt.gca().xaxis.set_major_formatter(plt.matplotlib.dates.DateFormatter('%Y-%m-%d'))`) && !code.replace(/\s/g, '').trim().includes(`plt.gca().xaxis.set_major_formatter(plt.matplotlib.dates.DateFormatter('%Y-%m-%d'))`)) {
              return [{
                es: "Debes mostrar las fechas en formato 'Año-Mes-Día' en el eje X.",
                en: "You must display the dates in 'Year-Month-Day' format on the X axis.",
                pt: "Você deve exibir as datas no formato 'Ano-Mês-Dia' no eixo X."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }
          })
      }
    ]

  },
  {
    "id": "pandas-c-metodo-groupby-multiIndices-01",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `from pyodide.http import open_url;\nimport matplotlib.pyplot as plt\nimport pandas as pd;\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/14q2bVTTE5lLM8hJalgyb9wE9ZBBTAWlFKjZhk0Lrac4/export?format=csv&gid=1459326506'))\n`, en: `from pyodide.http import open_url;\nimport pandas as pd;\nimport matplotlib.pyplot as plt\n\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYPIQOQEp6ysrdW_Jfu178ULq0WHbu5BYDkSuNQo25VnxHQAzM96YfK--NQXT7CODiLfWnWcVKDnZ/pub?output=csv'))\n` },
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt") && !code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt")) {
              return [{
                es: "Debes importar la librería 'matplotlib.pyplot' como 'plt'.",
                en: "You must import the 'matplotlib.pyplot' library as 'plt'.",
                pt: "Você deve importar a biblioteca 'matplotlib.pyplot' como 'plt'."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/14q2bVTTE5lLM8hJalgyb9wE9ZBBTAWlFKjZhk0Lrac4/export?format=csv&gid=1459326506'))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYPIQOQEp6ysrdW_Jfu178ULq0WHbu5BYDkSuNQo25VnxHQAzM96YfK--NQXT7CODiLfWnWcVKDnZ/pub?output=csv')")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_grouped=") && !code.replace(/\s/g, '').trim().includes("data_grouped=")) {
              return [{
                es: "Debes crear una variable llamada 'data_grouped' para almacenar los datos agrupados.",
                en: "You must create a variable called 'data_grouped' to store the grouped data.",
                pt: "Você deve criar uma variável chamada 'data_grouped' para armazenar os dados agrupados."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("data_grouped=data.groupby(['RANGO','IDIOMA'])['VISTAS_GANADAS'].sum()") && !code.replace(/\s/g, '').trim().includes("data_grouped=data.groupby(['RANGE','LANGUAGE'])['VISITS_GAINED'].sum()") && !code.replace(/\s/g, '').trim().includes(`data_grouped=data.groupby(["RANGO",'IDIOMA'])['VISTAS_GANADAS'].sum()`) && !code.replace(/\s/g, '').trim().includes(`data_grouped=data.groupby(["RANGE",'LANGUAGE'])['VISITS_GAINED'].sum()`) && !code.replace(/\s/g, '').trim().includes(`data_grouped=data.groupby(['RANGO',"IDIOMA"])['VISTAS_GANADAS'].sum()`) && !code.replace(/\s/g, '').trim().includes(`data_grouped=data.groupby(['RANGE',"LANGUAGE"])['VISITS_GAINED'].sum()`) && !code.replace(/\s/g, '').trim().includes(`data_grouped=data.groupby(["RANGO","IDIOMA"])['VISTAS_GANADAS'].sum()`) && !code.replace(/\s/g, '').trim().includes(`data_grouped=data.groupby(["RANGE","LANGUAGE"])['VISITS_GAINED'].sum()`) && !code.replace(/\s/g, '').trim().includes(`data_grouped=data.groupby(['RANGO','IDIOMA'])["VISTAS_GANADAS"].sum()`) && !code.replace(/\s/g, '').trim().includes(`data_grouped=data.groupby(['RANGE','LANGUAGE'])["VISITS_GAINED"].sum()`) && !code.replace(/\s/g, '').trim().includes(`data_grouped=data.groupby(["RANGO","IDIOMA"])["VISTAS_GANADAS"].sum()`) && !code.replace(/\s/g, '').trim().includes(`data_grouped=data.groupby(["RANGE","LANGUAGE"])["VISITS_GAINED"].sum()`)) {
              return [{
                es: "Debes agrupar los datos por 'RANGO' e 'IDIOMA' y calcular la suma de 'VISTAS_GANADAS'.",
                en: "You must group the data by 'RANGE' and 'LANGUAGE' and calculate the sum of 'VISITS_GAINED'.",
                pt: "Você deve agrupar os dados por 'RANGE' e 'LANGUAGE' e calcular a soma de 'VISITS_GAINED'."
              }]
            }
            if (!code.replace(/\s/g, '').trim().includes("data_grouped_organizada=") && !code.replace(/\s/g, '').trim().includes("data_grouped_sorted=")) {
              return [{
                es: "Debes crear una variable llamada 'data_grouped_organizada' para almacenar los datos agrupados.",
                en: "You must create a variable called 'data_grouped_sorted' to store the grouped data.",
                pt: "Você deve criar uma variável chamada 'data_grouped_sorted' para armazenar os dados agrupados."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("data_grouped_organizada=data_grouped.unstack()") && !code.replace(/\s/g, '').trim().includes("data_grouped_sorted=data_grouped.unstack()") && !code.replace(/\s/g, '').trim().includes('data_grouped_sorted=data_grouped.unstack()') && !code.replace(/\s/g, '').trim().includes('data_grouped_sorted=data_grouped.unstack()')) {
              return [{
                es: "Debes organizar los datos agrupados con el método unstack.",
                en: "You must organize the grouped data with the unstack method.",
                pt: "Você deve organizar os dados agrupados com o método unstack."
              }]
            }
            if (!code.replace(/\s/g, '').trim().includes("data_grouped_organizada.plot.bar(stacked=True)") && !code.replace(/\s/g, '').trim().includes("data_grouped_sorted.plot.bar(stacked=True)")) {
              return [{
                es: "Debes mostrar los datos organizados en un gráfico de barras apiladas.",
                en: "You must display the organized data in a stacked bar chart.",
                pt: "Você deve exibir os dados organizados em um gráfico de barras empilhadas."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('Rango')") && !code.replace(/\s/g, '').trim().includes("plt.xlabel('Range')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Rango")') && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Range")')) {
              return [{
                es: "Debes agregar un título al eje X con el texto 'Rango'.",
                en: "You must add a title to the X axis with the text 'Range'.",
                pt: "Você deve adicionar um título ao eixo X com o texto 'Rango'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ylabel('Cantidaddevistasganadas')") && !code.replace(/\s/g, '').trim().includes("plt.ylabel('Numberofvisitsgained')") && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Cantidaddevistasganadas")') && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Numberofvisitsgained")')) {
              return [{
                es: "Debes agregar un título al eje Y con el texto 'Cantidad de vistas ganadas'.",
                en: "You must add a title to the Y axis with the text 'Number of visits gained'.",
                pt: "Você deve adicionar um título ao eixo Y com o texto 'Quantidade de visualizações ganhas'."
              }];
            }

            if (!code.replace(/\s/g, '').trim().includes("plt.title('Vistasganadasporrangoeidioma')") && !code.replace(/\s/g, '').trim().includes("plt.title('Visitsgainedbyrankandlanguage')") && !code.replace(/\s/g, '').trim().includes('plt.title("Vistasganadasporrangoeidioma")') && !code.replace(/\s/g, '').trim().includes('plt.title("Visitsgainedbyrankandlanguage")') && !code.replace(/\s/g, '').trim().includes(`plt.title("Vistasganadasporrangoeidioma")`) && !code.replace(/\s/g, '').trim().includes(`plt.title("Visitsgainedbyrankandlanguage")`) && !code.replace(/\s/g, '').trim().includes(`plt.title('Vistasganadasporrangoeidioma')`) && !code.replace(/\s/g, '').trim().includes(`plt.title('Visitsgainedbyrankandlanguage')`) && !code.replace(/\s/g, '').trim().includes(`plt.title("Vistasganadasporrangoeidioma")`) && !code.replace(/\s/g, '').trim().includes(`plt.title("Visitsgainedbyrankandlanguage")`)) {

              return [{
                es: "Debes agregar un título al gráfico con el texto 'Vistas ganadas por rango e idioma'.",
                en: "You must add a title to the chart with the text 'Visits gained by rank and language'.",
                pt: "Você deve adicionar um título ao gráfico com o texto 'Vistas ganadas por rango e idioma'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=45)") && !code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=45)")) {
              return [{
                es: "Debes rotar 45 grados las etiquetas del eje X.",
                en: "You must rotate the X-axis labels by 45 degrees.",
                pt: "Você deve rotacionar as etiquetas do eixo X em 45 graus."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis='y',style='plain')`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis='y',style='plain')`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis="y",style="plain")`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis="y",style="plain")`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis='y',style="plain")`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis='y',style="plain")`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis="y",style='plain')`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis="y",style='plain')`)) {
              return [{
                es: "Debes mostrar los números del eje Y en formato decimal.",
                en: "You must display the numbers on the Y axis in decimal format.",
                pt: "Você deve exibir os números no eixo Y no formato decimal."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-c-metodo-groupby-multiIndices-02",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib", "scipy"],
    "editors": {
      "main.py": {
        "code": { es: `from pyodide.http import open_url;\nimport matplotlib.pyplot as plt\nimport pandas as pd;\nfrom scipy import stats\n\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/14q2bVTTE5lLM8hJalgyb9wE9ZBBTAWlFKjZhk0Lrac4/export?format=csv&gid=1459326506'))\ndata_grouped = data.groupby(['RANGO', 'IDIOMA'])['VISTAS_GANADAS'].sum()\n`, en: `from pyodide.http import open_url;\nimport pandas as pd;\nimport matplotlib.pyplot as plt\nfrom scipy import stats\n\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYPIQOQEp6ysrdW_Jfu178ULq0WHbu5BYDkSuNQo25VnxHQAzM96YfK--NQXT7CODiLfWnWcVKDnZ/pub?output=csv'))\ndata_grouped = data.groupby(['RANGE', 'LANGUAGE'])['VISITS_GAINED'].sum()\n` },
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt") && !code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt")) {
              return [{
                es: "Debes importar la librería 'matplotlib.pyplot' como 'plt'.",
                en: "You must import the 'matplotlib.pyplot' library as 'plt'.",
                pt: "Você deve importar a biblioteca 'matplotlib.pyplot' como 'plt'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/14q2bVTTE5lLM8hJalgyb9wE9ZBBTAWlFKjZhk0Lrac4/export?format=csv&gid=1459326506'))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYPIQOQEp6ysrdW_Jfu178ULq0WHbu5BYDkSuNQo25VnxHQAzM96YfK--NQXT7CODiLfWnWcVKDnZ/pub?output=csv')")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_grouped=data.groupby(['RANGO','IDIOMA'])['VISTAS_GANADAS'].sum()") && !code.replace(/\s/g, '').trim().includes("data_grouped=data.groupby(['RANGE','LANGUAGE'])['VISITS_GAINED'].sum()") && !code.replace(/\s/g, '').trim().includes('data_grouped=data.groupby(["RANGE","LANGUAGE"])["VISITS_GAINED"].sum()') && !code.replace(/\s/g, '').trim().includes('data_grouped=data.groupby(["RANGE","LANGUAGE"])["VISITS_GAINED"].sum()')) {
              return [{
                es: "Debes agrupar los datos por 'RANGO' e 'IDIOMA' y calcular la suma de 'VISTAS_GANADAS'.",
                en: "You must group the data by 'RANGE' and 'LANGUAGE' and calculate the sum of 'VISITS_GAINED'.",
                pt: "Você deve agrupar os dados por 'RANGE' e 'LANGUAGE' e calcular a soma de 'VISITS_GAINED'."
              }]
            }
            if (!code.replace(/\s/g, '').trim().includes("data_grouped2=") && !code.replace(/\s/g, '').trim().includes("data_grouped2=")) {
              return [{
                es: "Debes crear una variable llamada 'data_grouped2' para almacenar los datos agrupados con los índices intercambiados.",
                en: "You must create a variable called 'data_grouped2' to store the grouped data with the indices swapped.",
                pt: "Você deve criar uma variável chamada 'data_grouped2' para armazenar os dados agrupados com os índices trocados."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_grouped2=data_grouped.swaplevel()") && !code.replace(/\s/g, '').trim().includes("data_grouped2=data_grouped.swaplevel()")) {
              return [{
                es: "Debes intercambiar los niveles de los índices del DataFrame agrupado.",
                en: "You must swap the levels of the indices of the grouped DataFrame.",
                pt: "Você deve trocar os níveis dos índices do DataFrame agrupado."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_grouped_organizada2=") && !code.replace(/\s/g, '').trim().includes("data_grouped_sorted2=")) {
              return [{
                es: "Debes crear una variable llamada 'data_grouped_organizada2' para almacenar los datos agrupados y organizados.",
                en: "You must create a variable called 'data_grouped_sorted2' to store the grouped and organized data.",
                pt: "Você deve criar uma variável chamada 'data_grouped_sorted2' para armazenar os dados agrupados e organizados."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data_grouped_organizada2=data_grouped2.unstack()") && !code.replace(/\s/g, '').trim().includes("data_grouped_sorted2=data_grouped2.unstack()") && !code.replace(/\s/g, '').trim().includes('data_grouped_sorted2=data_grouped2.unstack()') && !code.replace(/\s/g, '').trim().includes('data_grouped_sorted2=data_grouped2.unstack()')) {
              return [{
                es: "Debes organizar los datos agrupados con 'unstack'.",
                en: "You must organize the grouped data with 'unstack'.",
                pt: "Você deve organizar os dados agrupados com 'unstack'."
              }]
            }
            if (!code.replace(/\s/g, '').trim().includes("data_grouped_organizada2.plot.bar(stacked=True)") && !code.replace(/\s/g, '').trim().includes("data_grouped_sorted2.plot.bar(stacked=True)")) {
              return [{
                es: "Debes mostrar los datos organizados en un gráfico de barras apiladas.",
                en: "You must display the organized data in a stacked bar chart.",
                pt: "Você deve exibir os dados organizados em um gráfico de barras empilhadas."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('Idioma')") && !code.replace(/\s/g, '').trim().includes("plt.xlabel('Language')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Idioma")') && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Language")')) {
              return [{
                es: "Debes agregarle el título 'Idioma' al eje X.",
                en: "You must add the title 'Language' to the X axis.",
                pt: "Você deve adicionar o título 'Idioma' ao eixo X."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ylabel('Cantidaddevistasganadas')") && !code.replace(/\s/g, '').trim().includes("plt.ylabel('NumberofviewsGained')") && !code.replace(/\s/g, '').trim().includes('plt.ylabel("Cantidaddevistasganadas")') && !code.replace(/\s/g, '').trim().includes('plt.ylabel("NumberofviewsGained")')) {
              return [{
                es: "Debes agregarle el título 'Cantidad de Vistas ganadas' al eje Y.",
                en: "You must add the title 'Number of Views Gained' to the Y axis.",
                pt: "Você deve adicionar o título 'Quantidade de Visualizações Ganhas' ao eixo Y."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.title('Vistasganadasporrangoeidioma')") && !code.replace(/\s/g, '').trim().includes("plt.title('Viewsgainedbyrangeandlanguage')") && !code.replace(/\s/g, '').trim().includes('plt.title("Vistasganadasporrangoeidioma")') && !code.replace(/\s/g, '').trim().includes('plt.title("Viewsgainedbyrangeandlanguage")') && !code.replace(/\s/g, '').trim().includes(`plt.title("Vistasganadasporrangoeidioma")`) && !code.replace(/\s/g, '').trim().includes(`plt.title("Viewsgainedbyrangeandlanguage")`) && !code.replace(/\s/g, '').trim().includes(`plt.title('Vistasganadasporrangoeidioma')`) && !code.replace(/\s/g, '').trim().includes(`plt.title('Viewsgainedbyrangeandlanguage')`) && !code.replace(/\s/g, '').trim().includes(`plt.title("Vistasganadasporrangoeidioma")`) && !code.replace(/\s/g, '').trim().includes(`plt.title("Viewsgainedbyrangeandlanguage")`)) {
              console.log(code.replace(/\s/g, '').trim());
              return [{
                es: "Debes agregar un título al gráfico con el texto 'Vistas ganadas por rango e idioma'.",
                en: "You must add a title to the chart with the text 'Views gained by range and language'.",
                pt: "Você deve adicionar um título ao gráfico com o texto 'Vistas ganadas por rango e idioma'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.ticklabel_format(axis='y',style='plain')") && !code.replace(/\s/g, '').trim().includes("plt.ticklabel_format(axis='y',style='plain')") && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis="y",style="plain")`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis="y",style="plain")`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis='y',style="plain")`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis='y',style="plain")`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis="y",style='plain')`) && !code.replace(/\s/g, '').trim().includes(`plt.ticklabel_format(axis="y",style='plain')`)) {
              return [{
                es: "Debes mostrar los números del eje Y en formato decimal.",
                en: "You must display the numbers on the Y axis in decimal format.",
                pt: "Você deve exibir os números no eixo Y no formato decimal."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=45)") && !code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=45)")) {
              return [{
                es: "Debes rotar 45 grados las etiquetas del eje X.",
                en: "You must rotate the X-axis labels by 45 degrees.",
                pt: "Você deve rotacionar as etiquetas do eixo X em 45 graus."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }

          })
      }
    ]

  },
  {
    "id": "pandas-c-metodo-groupby-multiIndices-03",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `from pyodide.http import open_url;\nimport matplotlib.pyplot as plt\nimport pandas as pd;\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/14q2bVTTE5lLM8hJalgyb9wE9ZBBTAWlFKjZhk0Lrac4/export?format=csv&gid=1459326506'))\n`, en: `from pyodide.http import open_url;\nimport pandas as pd;\nimport matplotlib.pyplot as plt\n\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYPIQOQEp6ysrdW_Jfu178ULq0WHbu5BYDkSuNQo25VnxHQAzM96YfK--NQXT7CODiLfWnWcVKDnZ/pub?output=csv'))\n` },
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt") && !code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt")) {
              return [{
                es: "Debes importar la librería 'matplotlib.pyplot' como 'plt'.",
                en: "You must import the 'matplotlib.pyplot' library as 'plt'.",
                pt: "Você deve importar a biblioteca 'matplotlib.pyplot' como 'plt'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/14q2bVTTE5lLM8hJalgyb9wE9ZBBTAWlFKjZhk0Lrac4/export?format=csv&gid=1459326506'))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vQDYPIQOQEp6ysrdW_Jfu178ULq0WHbu5BYDkSuNQo25VnxHQAzM96YfK--NQXT7CODiLfWnWcVKDnZ/pub?output=csv')")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("data['FECHA']=pd.to_datetime(data['FECHA'])") && !code.replace(/\s/g, '').trim().includes("data['DATE']=pd.to_datetime(data['DATE'])") && !code.replace(/\s/g, '').trim().includes('data["FECHA"]=pd.to_datetime(data["FECHA"])') && !code.replace(/\s/g, '').trim().includes('data["DATE"]=pd.to_datetime(data["DATE"])')) {
              return [{
                es: "Debes convertir la columna 'FECHA' a formato de fecha.",
                en: "You must convert the 'DATE' column to date format.",
                pt: "Você deve converter a coluna 'DATE' para o formato de data."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("mask_fecha=") && !code.replace(/\s/g, '').trim().includes("mask_date=") && !code.replace(/\s/g, '').trim().includes('mask_date=') && !code.replace(/\s/g, '').trim().includes('mask_date=')) {
              return [{
                es: "Debes crear una máscara 'mask_fecha' para filtrar las fechas del 1 al 30 de octubre de 2022.",
                en: "You must create a 'mask_date' mask to filter dates from October 1 to 30, 2022.",
                pt: "Você deve criar uma máscara 'mask_date' para filtrar as datas de 1 a 30 de outubro de 2022."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("mask_fecha=(data['FECHA']>='2022-10-01')&(data['FECHA']<='2022-10-30')") && !code.replace(/\s/g, '').trim().includes("mask_date=(data['DATE']>='2022-10-01')&(data['DATE']<='2022-10-30')") && !code.replace(/\s/g, '').trim().includes('mask_date=(data["DATE"]>="2022-10-01")&(data["DATE"]<="2022-10-30")') && !code.replace(/\s/g, '').trim().includes('mask_date=(data["DATE"]>="2022-10-01")&(data["DATE"]<="2022-10-30")') && !code.replace(/\s/g, '').trim().includes(`mask_fecha=(data['FECHA']>="2022-10-01")&(data['FECHA']<="2022-10-30")`) && !code.replace(/\s/g, '').trim().includes(`mask_date=(data["FECHA"]>='2022-10-01')&(data["FECHA"]<='2022-10-30')`) && !code.replace(/\s/g, '').trim().includes(`mask_date=(data["DATE"]>="2022-10-01")&(data["DATE"]<="2022-10-30")`) && !code.replace(/\s/g, '').trim().includes(`mask_date=(data["DATE"]>="2022-10-01")&(data["DATE"]<="2022-10-30")`)) {
              return [{
                es: "Debes filtrar las fechas del 1 al 30 de octubre de 2022 con la máscara 'mask_fecha'.",
                en: "You must filter the dates from October 1 to 30, 2022 with the 'mask_date' mask.",
                pt: "Você deve filtrar as datas de 1 a 30 de outubro de 2022 com a máscara 'mask_date'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("mask_rango=") && !code.replace(/\s/g, '').trim().includes("mask_rank=") && !code.replace(/\s/g, '').trim().includes('mask_rank=') && !code.replace(/\s/g, '').trim().includes('mask_rank=')) {
              return [{
                es: "Debes crear una máscara 'mask_rango' para filtrar los rangos 'Experto' y 'Avanzado'.",
                en: "You must create a 'mask_rank' mask to filter the 'Expert' and 'Advanced' ranges.",
                pt: "Você deve criar uma máscara 'mask_rank' para filtrar os níveis 'Expert' e 'Advanced'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("mask_rango=(data['RANGO']=='Experto')|(data['RANGO']=='Avanzado')") && !code.replace(/\s/g, '').trim().includes("mask_rank=(data['RANGE']=='Expert')|(data['RANGE']=='Advanced')") && !code.replace(/\s/g, '').trim().includes('mask_rank=(data["RANGE"]=="Expert")|(data["RANGE"]=="Advanced")') && !code.replace(/\s/g, '').trim().includes('mask_rank=(data["RANGE"]=="Expert")|(data["RANGE"]=="Advanced")')) {
              return [{
                es: "Debes filtrar los rangos 'Experto' y 'Avanzado' con la máscara 'mask_rango'.",
                en: "You must filter the 'Expert' and 'Advanced' ranges with the 'mask_rank' mask.",
                pt: "Você deve filtrar os níveis 'Expert' e 'Advanced' com a máscara 'mask_rank'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("filtered_data=") && !code.replace(/\s/g, '').trim().includes("filtered_data=")) {
              return [{
                es: "Debes crear una variable llamada 'filtered_data' para almacenar los datos filtrados.",
                en: "You must create a variable called 'filtered_data' to store the filtered data.",
                pt: "Você deve criar uma variável chamada 'filtered_data' para armazenar os dados filtrados."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("filtered_data=data[mask_fecha&mask_rango]") && !code.replace(/\s/g, '').trim().includes("filtered_data=data[mask_date&mask_rank]") && !code.replace(/\s/g, '').trim().includes('filtered_data=data[mask_date&mask_rank]') && !code.replace(/\s/g, '').trim().includes('filtered_data=data[mask_date&mask_rank]')) {
              return [{
                es: "Debes filtrar los datos con las máscaras 'mask_fecha' y 'mask_rango' y almacenarlos en 'filtered_data'.",
                en: "You must filter the data with the 'mask_date' and 'mask_rank' masks and store them in 'filtered_data'.",
                pt: "Você deve filtrar os dados com as máscaras 'mask_date' e 'mask_rank' e armazená-los em 'filtered_data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("grouped_data=") && !code.replace(/\s/g, '').trim().includes("grouped_data=")) {
              return [{
                es: "Debes crear una variable llamada 'grouped_data' para almacenar los datos agrupados.",
                en: "You must create a variable called 'grouped_data' to store the grouped data.",
                pt: "Você deve criar uma variável chamada 'grouped_data' para armazenar os dados agrupados."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("grouped_data=filtered_data.groupby(['FECHA','RANGO'])['TIEMPO_TRANSMISION'].mean()") && !code.replace(/\s/g, '').trim().includes("grouped_data=filtered_data.groupby(['DATE','RANGE'])['TRANSMISSION_TIME'].mean()") && !code.replace(/\s/g, '').trim().includes('grouped_data=filtered_data.groupby(["DATE","RANGE"])["TRANSMISSION_TIME"].mean()') && !code.replace(/\s/g, '').trim().includes('grouped_data=filtered_data.groupby(["DATE","RANGE"])["TRANSMISSION_TIME"].mean()')) {
              return [{
                es: "Debes agrupar los datos filtrados por 'FECHA' y 'RANGO' y calcular el promedio de 'TIEMPO_TRANSMISION'.",
                en: "You must group the filtered data by 'DATE' and 'RANGE' and calculate the average of 'TRANSMISSION_TIME'.",
                pt: "Você deve agrupar os dados filtrados por 'DATE' e 'RANGE' e calcular a média de 'TRANSMISSION_TIME'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("grouped_data=grouped_data.unstack()") && !code.replace(/\s/g, '').trim().includes("grouped_data=grouped_data.unstack()")) {
              return [{
                es: "Debes organizar los datos agrupados con 'unstack'.",
                en: "You must organize the grouped data with 'unstack'.",
                pt: "Você deve organizar os dados agrupados com 'unstack'."
              }]
            }
            if (!code.replace(/\s/g, '').trim().includes(`grouped_data.plot.line(marker='o',figsize=(10,7),grid=True)`) && !code.replace(/\s/g, '').trim().includes(`grouped_data.plot.line(marker='o',figsize=(10,7),grid=True)`) && !code.replace(/\s/g, '').trim().includes(`grouped_data.plot.line(marker="o",figsize=(10,7),grid=True)`) && !code.replace(/\s/g, '').trim().includes(`grouped_data.plot.line(marker="o",figsize=(10,7),grid=True)`)) {
              return [{
                es: "Debes mostrar los datos organizados en un gráfico de líneas con marcadores 'o', tamaño de figura 10x7 y cuadrícula.",
                en: "You must display the organized data in a line chart with 'o' markers, figure size 10x7, and grid.",
                pt: "Você deve exibir os dados organizados em um gráfico de linhas com marcadores 'o', tamanho da figura 10x7 e grade."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`plt.gca().xaxis.set_major_locator(plt.matplotlib.dates.DayLocator(interval=1))`) && !code.replace(/\s/g, '').trim().includes(`plt.gca().xaxis.set_major_locator(plt.matplotlib.dates.DayLocator(interval=1))`)) {
              return [{
                es: "Debes mostrar las fechas en el eje X con un intervalo de 1 día.",
                en: "You must display the dates on the X axis with a 1-day interval.",
                pt: "Você deve exibir as datas no eixo X com um intervalo de 1 dia."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`plt.gca().xaxis.set_major_formatter(plt.matplotlib.dates.DateFormatter('%Y-%m-%d'))`) && !code.replace(/\s/g, '').trim().includes(`plt.gca().xaxis.set_major_formatter(plt.matplotlib.dates.DateFormatter('%Y-%m-%d'))`)) {
              return [{
                es: "Debes mostrar las fechas en el eje X con el formato 'Año-Mes-Día'.",
                en: "You must display the dates on the X axis with the 'Year-Month-Day' format.",
                pt: "Você deve exibir as datas no eixo X com o formato 'Ano-Mês-Dia'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`plt.title('Promediodetiempodetransmisiónporrango(octubre2022)')`) && !code.replace(/\s/g, '').trim().includes(`plt.title('Averagetransmissiontimebyrank(october2022)')`) && !code.replace(/\s/g, '').trim().includes(`plt.title("Promediodetiempodetransmisiónporrango(octubre2022)")`) && !code.replace(/\s/g, '').trim().includes(`plt.title("Averagetransmissiontimebyrank(october2022)")`)) {
              return [{
                es: "Debes agregar un título al gráfico con el texto 'Promedio de tiempo de transmisión por rango (octubre 2022)'.",
                en: "You must add a title to the chart with the text 'Average transmission time by range (october 2022)'.",
                pt: "Você deve adicionar um título ao gráfico com o texto 'Média de tempo de transmissão por faixa (outubro de 2022)'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xlabel('Fecha')") && !code.replace(/\s/g, '').trim().includes("plt.xlabel('Date')") && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Fecha")') && !code.replace(/\s/g, '').trim().includes('plt.xlabel("Date")')) {
              return [{
                es: "Debes agregarle el título 'Fecha' al eje X. ",
                en: "You must add the title 'Date' to the X axis.",
                pt: "Você deve adicionar o título 'Data' ao eixo X."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`plt.ylabel('Promediotiempodetransmisión(minutos)')`) && !code.replace(/\s/g, '').trim().includes(`plt.ylabel('Averagetransmissiontime(minutes)')`) && !code.replace(/\s/g, '').trim().includes(`plt.ylabel("Promediotiempodetransmisión(minutos)")`) && !code.replace(/\s/g, '').trim().includes(`plt.ylabel("Averagetransmissiontime(minutes)")`)) {
              return [{
                es: "Debes agregarle el título 'Promedio tiempo de transmisión (minutos)' al eje Y.",
                en: "You must add the title 'Average transmission time (minutes)' to the Y axis.",
                pt: "Você deve adicionar o título 'Tempo médio de transmissão (minutos)' ao eixo Y."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=90)") && !code.replace(/\s/g, '').trim().includes("plt.xticks(rotation=90)")) {
              return [{
                es: "Debes rotar 90 grados las etiquetas del eje X.",
                en: "You must rotate the X-axis labels by 90 degrees.",
                pt: "Você deve rotacionar as etiquetas do eixo X em 90 graus."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("plt.show()")) {
              return [{
                es: "Debes mostrar el gráfico.",
                en: "You must display the chart.",
                pt: "Você deve exibir o gráfico."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-c-metodos-PivotTableYaggfunc-01",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `from pyodide.http import open_url;\nimport matplotlib.pyplot as plt\nimport pandas as pd;\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/1xIY8Shny69rKgt8h7qaDnYQI5AMMvUtkhnj8H94pmOk/export?format=csv&gid=453789794'))\nprint(data.columns)\n`, en: `from pyodide.http import open_url;\nimport pandas as pd;\nimport matplotlib.pyplot as plt\n\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vRtf6RoEe5_kLn_guEpfy37_VeyXGuPqC-ykpWFQdVuwDRtOv5ax6IznTIM6du3cHJRHzKt_Pt45L0f/pub?output=csv'))\nprint(data.columns)\n` },
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt") && !code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt")) {
              return [{
                es: "Debes importar la librería 'matplotlib.pyplot' como 'plt'.",
                en: "You must import the 'matplotlib.pyplot' library as 'plt'.",
                pt: "Você deve importar a biblioteca 'matplotlib.pyplot' como 'plt'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/1xIY8Shny69rKgt8h7qaDnYQI5AMMvUtkhnj8H94pmOk/export?format=csv&gid=453789794'))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vRtf6RoEe5_kLn_guEpfy37_VeyXGuPqC-ykpWFQdVuwDRtOv5ax6IznTIM6du3cHJRHzKt_Pt45L0f/pub?output=csv')")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`mascara1=`) && !code.replace(/\s/g, '').trim().includes(`mask1=`) && !code.replace(/\s/g, '').trim().includes(`mask1=`) && !code.replace(/\s/g, '').trim().includes(`mask1=`)) {
              return [{
                es: "Debes crear una máscara 'mascara1' para filtrar la actividad física marcada como 'No'.",
                en: "You must create a 'mask1' mask to filter the physical activity marked as 'No'.",
                pt: "Você deve criar uma máscara 'mask1' para filtrar a atividade física marcada como 'No'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`mascara1=data["ACTIVIDADES_FÍSICAS"]=='No'`) && !code.replace(/\s/g, '').trim().includes(`mask1=data["PHYSICAL_ACTIVITIES"]=='No'`) && !code.replace(/\s/g, '').trim().includes(`mask1=data["ACTIVIDADES_FÍSICAS"]=="No"`) && !code.replace(/\s/g, '').trim().includes(`mask1=data["PHYSICAL_ACTIVITIES"]=="No"`)) {
              return [{
                es: "Debes filtrar la actividad física 'No' con la máscara 'mascara1'.",
                en: "You must filter the physical activity 'No' with the 'mask1' mask.",
                pt: "Você deve filtrar a atividade física 'No' com a máscara 'mask1'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`data_sinActFisica=`) && !code.replace(/\s/g, '').trim().includes(`data_noPhysicalActivity=`) && !code.replace(/\s/g, '').trim().includes(`data_noPhysicalActivity=`) && !code.replace(/\s/g, '').trim().includes(`data_noPhysicalActivity=`)) {
              return [{
                es: "Debes crear una variable llamada 'data_sinActFisica' para almacenar los datos de personas que no realizan actividad física.",
                en: "You must create a variable called 'data_noPhysicalActivity' to store the data of people who do not perform physical activity.",
                pt: "Você deve criar uma variável chamada 'data_noPhysicalActivity' para armazenar os dados de pessoas que não realizam atividade física."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`data_sinActFisica=data[mascara1]`) && !code.replace(/\s/g, '').trim().includes(`data_noPhysicalActivity=data[mask1]`) && !code.replace(/\s/g, '').trim().includes(`data_noPhysicalActivity=data[mask1]`) && !code.replace(/\s/g, '').trim().includes(`data_noPhysicalActivity=data[mask1]`)) {
              return [{
                es: "Debes filtrar los datos con la máscara 'mascara1' y almacenarlos en 'data_sinActFisica'.",
                en: "You must filter the data with the 'mask1' mask and store it in 'data_noPhysicalActivity'.",
                pt: "Você deve filtrar os dados com a máscara 'mask1' e armazená-los em 'data_noPhysicalActivity'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`tabla_sinActFisica=`) && !code.replace(/\s/g, '').trim().includes(`table_noPhysicalActivity=`) && !code.replace(/\s/g, '').trim().includes(`table_noPhysicalActivity=`) && !code.replace(/\s/g, '').trim().includes(`table_noPhysicalActivity=`)) {
              return [{
                es: "Debes crear una variable llamada 'tabla_sinActFisica' para almacenar la tabla pivote de personas que no realizan actividad física.",
                en: "You must create a variable called 'table_noPhysicalActivity' to store the pivot table of people who do not perform physical activity.",
                pt: "Você deve criar uma variável chamada 'table_noPhysicalActivity' para armazenar a tabela dinâmica de pessoas que não realizam atividade física."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`tabla_sinActFisica=pd.pivot_table(data_sinActFisica,index="CATEGORÍA_EDAD",columns='ESTADO_FUMADOR',aggfunc='count')`) && !code.replace(/\s/g, '').trim().includes(`table_noPhysicalActivity=pd.pivot_table(data_noPhysicalActivity,index="AGE_CATEGORY",columns='SMOKER_STATUS',aggfunc='count')`) && !code.replace(/\s/g, '').trim().includes(`table_noPhysicalActivity=pd.pivot_table(data_noPhysicalActivity,index="AGE_CATEGORY",columns='SMOKER_STATUS',aggfunc='count')`) && !code.replace(/\s/g, '').trim().includes(`table_noPhysicalActivity=pd.pivot_table(data_noPhysicalActivity,index="AGE_CATEGORY",columns='SMOKER_STATUS',aggfunc='count')`)) {
              return [{
                es: "Debes crear una tabla pivote 'tabla_sinActFisica' con los índices 'CATEGORÍA_EDAD', columnas 'ESTADO_FUMADOR' y función de agregación 'count'.",
                en: "You must create a pivot table 'table_noPhysicalActivity' with the 'AGE_CATEGORY' indexes, 'SMOKER_STATUS' columns, and 'count' aggregation function.",
                pt: "Você deve criar uma tabela pivô 'table_noPhysicalActivity' com os índices 'AGE_CATEGORY', colunas 'SMOKER_STATUS' e função de agregação 'count'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("print(tabla_sinActFisica)") && !code.replace(/\s/g, '').trim().includes("print(table_noPhysicalActivity)") && !code.replace(/\s/g, '').trim().includes('print(table_noPhysicalActivity)') && !code.replace(/\s/g, '').trim().includes('print(table_noPhysicalActivity)')) {
              return [{
                es: "Debes imprimir la tabla pivote 'tabla_sinActFisica'.",
                en: "You must print the pivot table 'table_noPhysicalActivity'.",
                pt: "Você deve imprimir a tabela pivô 'table_noPhysicalActivity'."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-c-metodos-PivotTableYaggfunc-02",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `from pyodide.http import open_url;\nimport matplotlib.pyplot as plt\nimport pandas as pd;\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/1xIY8Shny69rKgt8h7qaDnYQI5AMMvUtkhnj8H94pmOk/export?format=csv&gid=453789794'))\nprint(data.columns)\n`, en: `from pyodide.http import open_url;\nimport pandas as pd;\nimport matplotlib.pyplot as plt\n\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vRtf6RoEe5_kLn_guEpfy37_VeyXGuPqC-ykpWFQdVuwDRtOv5ax6IznTIM6du3cHJRHzKt_Pt45L0f/pub?output=csv'))\nprint(data.columns)\n` },
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt") && !code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt")) {
              return [{
                es: "Debes importar la librería 'matplotlib.pyplot' como 'plt'.",
                en: "You must import the 'matplotlib.pyplot' library as 'plt'.",
                pt: "Você deve importar a biblioteca 'matplotlib.pyplot' como 'plt'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/1xIY8Shny69rKgt8h7qaDnYQI5AMMvUtkhnj8H94pmOk/export?format=csv&gid=453789794'))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vRtf6RoEe5_kLn_guEpfy37_VeyXGuPqC-ykpWFQdVuwDRtOv5ax6IznTIM6du3cHJRHzKt_Pt45L0f/pub?output=csv')")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("tabla_horasSueño=") && !code.replace(/\s/g, '').trim().includes("sleep_hours_table=") && !code.replace(/\s/g, '').trim().includes("sleep_hours_table=") && !code.replace(/\s/g, '').trim().includes("sleep_hours_table=")) {
              return [{
                es: "Debes crear una variable llamada 'tabla_horasSueño' para almacenar la tabla pivote.",
                en: "You must create a variable called 'sleep_hours_table' to store the pivot table.",
                pt: "Você deve criar uma variável chamada 'sleep_hours_table' para armazenar a tabela pivô."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`tabla_horasSueño=pd.pivot_table(data,index="SALUD_GENERAL",columns="ÚLTIMO_EXAMEN_MÉDICO",aggfunc={"HORAS_DE_SUEÑO":["max","min"]})`) && !code.replace(/\s/g, '').trim().includes(`sleep_hours_table=pd.pivot_table(data,index="GENERAL_HEALTH",columns="LAST_MEDICAL_EXAM",aggfunc={"HOURSOFSLEEP":["max","min"]})`) && !code.replace(/\s/g, '').trim().includes(`sleep_hours_table=pd.pivot_table(data,index="GENERAL_HEALTH",columns="LAST_MEDICAL_EXAM",aggfunc={"HOURSOFSLEEP":["max","min"]})`) && !code.replace(/\s/g, '').trim().includes(`sleep_hours_table=pd.pivot_table(data,index="GENERAL_HEALTH",columns="LAST_MEDICAL_EXAM",aggfunc={"HOURSOFSLEEP":["max","min"]})`)) {
              return [{
                es: "Debes crear una tabla pivote llamada 'tabla_horasSueño' con los índices 'SALUD_GENERAL', columnas 'ÚLTIMO_EXAMEN_MÉDICO' y funciones de agregación 'max' y 'min' para 'HORAS_DE_SUEÑO'.",
                en: "You must create a pivot table called 'sleep_hours_table' with the indexes 'GENERAL_HEALTH', columns 'LAST_MEDICAL_EXAM', and aggregation functions 'max' and 'min' for 'HOURSOFSLEEP'.",
                pt: "Você deve criar uma tabela pivô chamada 'sleep_hours_table' com os índices 'GENERAL_HEALTH', colunas 'LAST_MEDICAL_EXAM' e funções de agregação 'max' e 'min' para 'HOURSOFSLEEP'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("print(tabla_horasSueño)") && !code.replace(/\s/g, '').trim().includes("print(sleep_hours_table)") && !code.replace(/\s/g, '').trim().includes('print(sleep_hours_table)') && !code.replace(/\s/g, '').trim().includes('print(sleep_hours_table)')) {
              return [{
                es: "Debes imprimir la tabla pivote 'tabla_horasSueño'.",
                en: "You must print the pivot table 'table_sleepHours'.",
                pt: "Você deve imprimir a tabela pivô 'table_sleepHours'."
              }];
            }

          })
      }
    ]

  },
  {
    "id": "pandas-c-metodos-PivotTableYaggfunc-03",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas", "matplotlib"],
    "editors": {
      "main.py": {
        "code": { es: `from pyodide.http import open_url;\nimport matplotlib.pyplot as plt\nimport pandas as pd;\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/1xIY8Shny69rKgt8h7qaDnYQI5AMMvUtkhnj8H94pmOk/export?format=csv&gid=453789794'))\nprint(data.columns)\n`, en: `from pyodide.http import open_url;\nimport pandas as pd;\nimport matplotlib.pyplot as plt\n\ndata = pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vRtf6RoEe5_kLn_guEpfy37_VeyXGuPqC-ykpWFQdVuwDRtOv5ax6IznTIM6du3cHJRHzKt_Pt45L0f/pub?output=csv'))\nprint(data.columns)\n` },
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt") && !code.replace(/\s/g, '').trim().includes("importmatplotlib.pyplotasplt")) {
              return [{
                es: "Debes importar la librería 'matplotlib.pyplot' como 'plt'.",
                en: "You must import the 'matplotlib.pyplot' library as 'plt'.",
                pt: "Você deve importar a biblioteca 'matplotlib.pyplot' como 'plt'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/1xIY8Shny69rKgt8h7qaDnYQI5AMMvUtkhnj8H94pmOk/export?format=csv&gid=453789794'))") && !code.replace(/\s/g, '').trim().includes("data=pd.read_csv(open_url('https://docs.google.com/spreadsheets/d/e/2PACX-1vRtf6RoEe5_kLn_guEpfy37_VeyXGuPqC-ykpWFQdVuwDRtOv5ax6IznTIM6du3cHJRHzKt_Pt45L0f/pub?output=csv')")) {
              return [{
                es: "Debes leer los datos del archivo de Google Sheets en la variable 'data'.",
                en: "You must read the data from the Google Sheets file into the 'data' variable.",
                pt: "Você deve ler os dados do arquivo do Google Sheets na variável 'data'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("tabla_colesterol=") && !code.replace(/\s/g, '').trim().includes("cholesterol_table=") && !code.replace(/\s/g, '').trim().includes("cholesterol_table=") && !code.replace(/\s/g, '').trim().includes("cholesterol_table=")) {
              return [{
                es: "Debes crear una variable llamada 'tabla_colesterol' para almacenar la tabla pivote.",
                en: "You must create a variable called 'cholesterol_table' to store the pivot table.",
                pt: "Você deve criar uma variável chamada 'cholesterol_table' para armazenar a tabela pivô."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`tabla_colesterol=pd.pivot_table(data,index="SALUD_GENERAL",columns="HA_TENIDO_INFARTO",aggfunc={"PESO_EN_KILOGRAMOS":["mean"],"ALTURA_EN_METROS":["mean"]})`) && !code.replace(/\s/g, '').trim().includes(`cholesterol_table=pd.pivot_table(data,index="GENERAL_HEALTH",columns="HAS_HAD_HEART_ATTACK",aggfunc={"WEIGHT_IN_KILOGRAMS":["mean"],"HEIGHT_IN_METERS":["mean"]})`) && !code.replace(/\s/g, '').trim().includes(`cholesterol_table=pd.pivot_table(data,index="GENERAL_HEALTH",columns="HAS_HAD_HEART_ATTACK",aggfunc={"WEIGHT_IN_KILOGRAMS":["mean"],"HEIGHT_IN_METERS":["mean"]})`) && !code.replace(/\s/g, '').trim().includes(`cholesterol_table=pd.pivot_table(data,index="GENERAL_HEALTH",columns="HAS_HAD_HEART_ATTACK",aggfunc={"WEIGHT_IN_KILOGRAMS":["mean"],"HEIGHT_IN_METERS":["mean"]})`)) {
              return [{
                es: "Debes crear una tabla pivote llamada 'tabla_colesterol' con los índices 'SALUD_GENERAL', columnas 'HA_TENIDO_INFARTO' y funciones de agregación 'mean' para 'PESO_EN_KILOGRAMOS' y 'ALTURA_EN_METROS'.",
                en: "You must create a pivot table called 'cholesterol_table' with the indexes 'GENERAL_HEALTH', columns 'HAS_HAD_HEART_ATTACK', and aggregation functions 'mean' for 'WEIGHT_IN_KILOGRAMS' and 'HEIGHT_IN_METERS'.",
                pt: "Você deve criar uma tabela pivô chamada 'cholesterol_table' com os índices 'GENERAL_HEALTH', colunas 'HAS_HAD_HEART_ATTACK' e funções de agregação 'mean' para 'WEIGHT_IN_KILOGRAMS' e 'HEIGHT_IN_METERS'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes("print(tabla_colesterol)") && !code.replace(/\s/g, '').trim().includes("print(cholesterol_table)") && !code.replace(/\s/g, '').trim().includes('print(cholesterol_table)') && !code.replace(/\s/g, '').trim().includes('print(cholesterol_table)')) {
              return [{
                es: "Debes imprimir la tabla pivote 'tabla_colesterol'.",
                en: "You must print the pivot table 'cholesterol_table'.",
                pt: "Você deve imprimir a tabela pivô 'cholesterol_table'."
              }];
            }
          })
      }
    ]
  },
  {
    "id": "pandas-c-modelo-datos-merge-01",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas"],
    "editors": {
      "main.py": {
        "code": { es: `from pyodide.http import open_url\nimport pandas as pd\n# Cargar los datos desde las URLs\nurl_alojamientos = 'https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1991958902'\nurl_clientes = 'https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1247297003'\nurl_alquileres = 'https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1117973797'\n\ntabla_alojamientos = pd.read_csv(open_url(url_alojamientos))\ntabla_clientes = pd.read_csv(open_url(url_clientes))\ntabla_alquileres = pd.read_csv(open_url(url_alquileres))`, en: `from pyodide.http import open_url\nimport pandas as pd\n# Load data from URLs\nurl_accommodations = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1991958902&single=true&output=csv'\nurl_customers = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1247297003&single=true&output=csv'\nurl_rentals = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1117973797&single=true&output=csv'\n\naccommodations_df = pd.read_csv(open_url(url_accommodations))\ncustomers_df = pd.read_csv(open_url(url_customers))\nrentals_df = pd.read_csv(open_url(url_rentals))`, pt: `from pyodide.http import open_url\nimport pandas as pd\n# Carregar os dados das URLs\nurl_acomodações = 'https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1991958902'\nurl_clientes = 'https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1247297003'\nurl_aluguéis = 'https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1117973797'\n\nacomodações_df = pd.read_csv(open_url(url_acomodações))\nclientes_df = pd.read_csv(open_url(url_clientes))\naluguéis_df = pd.read_csv(open_url(url_aluguéis))` },
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes(`url_alojamientos=`) && !code.replace(/\s/g, '').trim().includes(`url_accommodations=`) && !code.replace(/\s/g, '').trim().includes(`url_accommodations=`) && !code.replace(/\s/g, '').trim().includes(`url_accommodations=`)) {
              return [{
                es: "Debes almacenar la URL de los alojamientos en la variable 'url_alojamientos'.",
                en: "You must store the URL of the accommodations in the 'url_accommodations' variable.",
                pt: "Você deve armazenar a URL dos alojamentos na variável 'url_accommodations'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`url_alojamientos='https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1991958902'`) && !code.replace(/\s/g, '').trim().includes(`url_accommodations='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1991958902&single=true&output=csv'`) && !code.replace(/\s/g, '').trim().includes(`url_accommodations='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1991958902&single=true&output=csv'`) && !code.replace(/\s/g, '').trim().includes(`url_accommodations='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1991958902&single=true&output=csv'`)) {
              return [{
                es: "Debes almacenar la URL de los alojamientos en la variable 'url_alojamientos'.",
                en: "You must store the URL of the accommodations in the 'url_accommodations' variable.",
                pt: "Você deve armazenar a URL dos alojamentos na variável 'url_accommodations'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`url_clientes=`) && !code.replace(/\s/g, '').trim().includes(`url_customers=`) && !code.replace(/\s/g, '').trim().includes(`url_customers=`) && !code.replace(/\s/g, '').trim().includes(`url_customers=`)) {
              return [{
                es: "Debes almacenar la URL de los clientes en la variable 'url_clientes'.",
                en: "You must store the URL of the customers in the 'url_customers' variable.",
                pt: "Você deve armazenar a URL dos clientes na variável 'url_customers'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`url_clientes='https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1247297003'`) && !code.replace(/\s/g, '').trim().includes(`url_customers='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1247297003&single=true&output=csv'`) && !code.replace(/\s/g, '').trim().includes(`url_customers='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1247297003&single=true&output=csv'`) && !code.replace(/\s/g, '').trim().includes(`url_customers='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1247297003&single=true&output=csv'`)) {
              return [{
                es: "Debes almacenar la URL de los clientes en la variable 'url_clientes'.",
                en: "You must store the URL of the customers in the 'url_customers' variable.",
                pt: "Você deve armazenar a URL dos clientes na variável 'url_customers'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`url_alquileres=`) && !code.replace(/\s/g, '').trim().includes(`url_rentals=`) && !code.replace(/\s/g, '').trim().includes(`url_rentals=`) && !code.replace(/\s/g, '').trim().includes(`url_rentals=`)) {
              return [{
                es: "Debes almacenar la URL de los alquileres en la variable 'url_alquileres'.",
                en: "You must store the URL of the rentals in the 'url_rentals' variable.",
                pt: "Você deve armazenar a URL dos aluguéis na variável 'url_rentals'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`url_alquileres='https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1117973797'`) && !code.replace(/\s/g, '').trim().includes(`url_rentals='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1117973797&single=true&output=csv'`) && !code.replace(/\s/g, '').trim().includes(`url_rentals='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1117973797&single=true&output=csv'`) && !code.replace(/\s/g, '').trim().includes(`url_rentals='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1117973797&single=true&output=csv'`)) {
              return [{
                es: "Debes almacenar la URL de los alquileres en la variable 'url_alquileres'.",
                en: "You must store the URL of the rentals in the 'url_rentals' variable.",
                pt: "Você deve armazenar a URL dos aluguéis na variável 'url_rentals'."
              }];
            }

            else if (!code.replace(/\s/g, '').trim().includes("tabla_alojamientos=pd.read_csv(open_url(url_alojamientos))") && !code.replace(/\s/g, '').trim().includes("accommodations_df=pd.read_csv(open_url(url_accommodations))")) {
              return [{
                es: "Debes leer los datos de los alojamientos desde la URL en la variable 'tabla_alojamientos'.",
                en: "You must read the accommodation data from the URL into the 'accommodations_df' variable.",
                pt: "Você deve ler os dados de acomodações da URL na variável 'accommodations_df'."
              }]
            }
            if (!code.replace(/\s/g, '').trim().includes("tabla_clientes=pd.read_csv(open_url(url_clientes))") && !code.replace(/\s/g, '').trim().includes("customers_df=pd.read_csv(open_url(url_customers))")) {
              return [{
                es: "Debes leer los datos de los clientes desde la URL en la variable 'tabla_clientes'.",
                en: "You must read the customer data from the URL into the 'customers_df' variable.",
                pt: "Você deve ler os dados do cliente da URL na variável 'customers_df'."
              }]
            }
            if (!code.replace(/\s/g, '').trim().includes("tabla_alquileres=pd.read_csv(open_url(url_alquileres))") && !code.replace(/\s/g, '').trim().includes("rentals_df=pd.read_csv(open_url(url_rentals))")) {
              return [{
                es: "Debes leer los datos de los alquileres desde la URL en la variable 'tabla_alquileres'.",
                en: "You must read the rental data from the URL into the 'rentals_df' variable.",
                pt: "Você deve ler os dados de aluguéis da URL na variável 'rentals_df'."
              }]
            }
            if (!code.replace(/\s/g, '').trim().includes("mascaraTipo=") && !code.replace(/\s/g, '').trim().includes("maskType=") && !code.replace(/\s/g, '').trim().includes("maskType=") && !code.replace(/\s/g, '').trim().includes("maskType=")) {
              return [{
                es: "Debes crear una máscara llamada 'mascaraTipo' para filtrar los alojamientos de tipo 'Casa o Departamento'.",
                en: "You must create a mask called 'maskType' to filter 'House or Apartment' accommodations.",
                pt: "Você deve criar uma máscara chamada 'maskType' para filtrar acomodações do tipo 'Casa ou Apartamento'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`mascaraTipo=tabla_alojamientos['TIPO']=='CasaoDepartamento'`) && !code.replace(/\s/g, '').trim().includes(`maskType=accommodations_df['TYPE']=='HouseorApartment'`) && !code.replace(/\s/g, '').trim().includes(`mascaraTipo=tabla_alojamientos["TIPO"]=="CasaoDepartamento"`) && !code.replace(/\s/g, '').trim().includes(`maskType=accommodations_df["TYPE"]=="HouseorApartment"`) && !code.replace(/\s/g, '').trim().includes(`mascaraTipo=tabla_alojamientos['TIPO']=="CasaoDepartamento"`) && !code.replace(/\s/g, '').trim().includes(`maskType=accommodations_df['TYPE']=="HouseorApartment"`) && !code.replace(/\s/g, '').trim().includes(`mascaraTipo=tabla_alojamientos["TIPO"]=='CasaoDepartamento'`) && !code.replace(/\s/g, '').trim().includes(`maskType=accommodations_df["TYPE"]=='HouseorApartment'`)) {
              return [{
                es: "Debes filtrar los alojamientos de tipo 'Casa o Departamento' con la máscara 'mascaraTipo'.",
                en: "You must filter 'House or Apartment' accommodations with the 'maskType' mask.",
                pt: "Você deve filtrar acomodações do tipo 'Casa ou Apartamento' com a máscara 'maskType'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`mascaraEdad=`) && !code.replace(/\s/g, '').trim().includes(`maskAge=`) && !code.replace(/\s/g, '').trim().includes(`maskAge=`) && !code.replace(/\s/g, '').trim().includes(`maskAge=`)) {
              return [{
                es: "Debes crear una máscara llamada 'mascaraEdad' para filtrar los clientes que sean mayores de 40 años.",
                en: "You must create a mask called 'maskAge' to filter customers over 40 years old.",
                pt: "Você deve criar uma máscara chamada 'maskAge' para filtrar clientes com mais de 40 anos."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`mascaraEdad=tabla_clientes['EDAD']>40`) && !code.replace(/\s/g, '').trim().includes(`maskAge=customers_df['AGE']>40`) && !code.replace(/\s/g, '').trim().includes(`maskAge=customers_df["AGE"]>40`) && !code.replace(/\s/g, '').trim().includes(`maskAge=customers_df["AGE"]>40`) && !code.replace(/\s/g, '').trim().includes(`mascaraEdad=tabla_clientes["EDAD"]>40`)) {
              return [{
                es: "Debes filtrar los clientes mayores de 40 años con la máscara 'mascaraEdad'.",
                en: "You must filter customers over 40 years old with the 'maskAge' mask.",
                pt: "Você deve filtrar clientes com mais de 40 anos com a máscara 'maskAge'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`tabla_alojamientosTipo=`) && !code.replace(/\s/g, '').trim().includes(`accommodationsType=`) && !code.replace(/\s/g, '').trim().includes(`accommodationsType=`) && !code.replace(/\s/g, '').trim().includes(`accommodationsType=`)) {
              return [{
                es: "Debes crear la variable 'tabla_alojamientosTipo' para almacenar los alojamientos filtrados.",
                en: "You must create the 'accommodationsType' variable to store the filtered accommodations.",
                pt: "Você deve criar a variável 'accommodationsType' para armazenar as acomodações filtradas."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`tabla_alojamientosTipo=tabla_alojamientos[mascaraTipo]`) && !code.replace(/\s/g, '').trim().includes(`accommodationsType=accommodations_df[maskType]`) && !code.replace(/\s/g, '').trim().includes(`accommodationsType=accommodations_df[maskType]`) && !code.replace(/\s/g, '').trim().includes(`accommodationsType=accommodations_df[maskType]`)) {
              return [{
                es: "Debes filtrar los alojamientos con la máscara 'mascaraTipo' y almacenarlos en 'tabla_alojamientosTipo'.",
                en: "You must filter the accommodations with the 'maskType' mask and store them in 'accommodationsType'.",
                pt: "Você deve filtrar as acomodações com a máscara 'maskType' e armazená-las em 'accommodationsType'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`tabla_clientesEdad=`) && !code.replace(/\s/g, '').trim().includes(`customersAge=`) && !code.replace(/\s/g, '').trim().includes(`customersAge=`) && !code.replace(/\s/g, '').trim().includes(`customersAge=`)) {
              return [{
                es: "Debes crear una variable 'tabla_clientesEdad' para almacenar los clientes filtrados.",
                en: "You must create a 'customersAge' variable to store the filtered customers.",
                pt: "Você deve criar uma variável 'customersAge' para armazenar os clientes filtrados."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`tabla_clientesEdad=tabla_clientes[mascaraEdad]`) && !code.replace(/\s/g, '').trim().includes(`customersAge=customers_df[maskAge]`) && !code.replace(/\s/g, '').trim().includes(`customersAge=customers_df[maskAge]`) && !code.replace(/\s/g, '').trim().includes(`customersAge=customers_df[maskAge]`)) {
              return [{
                es: "Debes filtrar los clientes con la máscara 'mascaraEdad' y almacenarlos en 'tabla_clientesEdad'.",
                en: "You must filter the customers with the 'maskAge' mask and store them in 'customersAge'.",
                pt: "Você deve filtrar os clientes com a máscara 'maskAge' e armazená-los em 'customersAge'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`dataMerge1=`) && !code.replace(/\s/g, '').trim().includes(`dataMerge1=`) && !code.replace(/\s/g, '').trim().includes(`dataMerge1=`) && !code.replace(/\s/g, '').trim().includes(`dataMerge1=`)) {
              return [{
                es: "Debes crear una variable 'dataMerge1' para almacenar la fusión de 'tabla_alojamientosTipo' y 'tabla_alquileres'.",
                en: "You must create a 'dataMerge1' variable to store the merge of 'accommodationsType' and 'rentals_df'.",
                pt: "Você deve criar uma variável 'dataMerge1' para armazenar a fusão de 'accommodationsType' e 'rentals_df'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`dataMerge1=pd.merge(tabla_alojamientosTipo,tabla_alquileres,how='inner')`) && !code.replace(/\s/g, '').trim().includes(`dataMerge1=pd.merge(accommodationsType,rentals_df,how='inner')`) && !code.replace(/\s/g, '').trim().includes(`dataMerge1=pd.merge(tabla_alojamientosTipo,tabla_alquileres,how="inner")`) && !code.replace(/\s/g, '').trim().includes(`dataMerge1=pd.merge(accommodationsType,rentals_df,how="inner")`)) {
              return [{
                es: "Debes fusionar los datos de 'tabla_alojamientosTipo' y 'tabla_alquileres' con un 'inner join' y almacenarlos en 'dataMerge1'.",
                en: "You must merge the data from 'accommodationsType' and 'rentals_df' with an 'inner join' and store it in 'dataMerge1'.",
                pt: "Você deve mesclar os dados de 'accommodationsType' e 'rentals_df' com um 'inner join' e armazená-los em 'dataMerge1'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`dataMerge2=`) && !code.replace(/\s/g, '').trim().includes(`dataMerge2=`) && !code.replace(/\s/g, '').trim().includes(`dataMerge2=`) && !code.replace(/\s/g, '').trim().includes(`dataMerge2=`)) {
              return [{
                es: "Debes crear una variable 'dataMerge2' para almacenar la fusión de 'dataMerge1' y 'tabla_clientesEdad'.",
                en: "You must create a 'dataMerge2' variable to store the merge of 'dataMerge1' and 'customersAge'.",
                pt: "Você deve criar uma variável 'dataMerge2' para armazenar a fusão de 'dataMerge1' e 'customersAge'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`dataMerge2=pd.merge(dataMerge1,tabla_clientesEdad,how='inner')`) && !code.replace(/\s/g, '').trim().includes(`dataMerge2=pd.merge(dataMerge1,customersAge,how='inner')`) && !code.replace(/\s/g, '').trim().includes(`dataMerge2=pd.merge(dataMerge1,tabla_clientesEdad,how="inner")`) && !code.replace(/\s/g, '').trim().includes(`dataMerge2=pd.merge(dataMerge1,customersAge,how="inner")`)) {
              return [{
                es: "Debes fusionar los datos de 'dataMerge1' y 'tabla_clientesEdad' con un 'inner join' y almacenarlos en 'dataMerge2'.",
                en: "You must merge the data from 'dataMerge1' and 'customersAge' with an 'inner join' and store it in 'dataMerge2'.",
                pt: "Você deve mesclar os dados de 'dataMerge1' e 'customersAge' com um 'inner join' e armazená-los em 'dataMerge2'."
              }];
            }


          })
      }
    ]
  },
  {
    "id": "pandas-c-modelo-datos-merge-02",
    "prompt": "Realiza las tareas según la actividad 'Pandas'.",
    "mainEditor": "main.py",
    "packages": ["pandas"],
    "editors": {
      "main.py": {
        "code": { es: `from pyodide.http import open_url\nimport pandas as pd\n# Cargar los datos desde las URLs\nurl_alojamientos = 'https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1991958902'\nurl_clientes = 'https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1247297003'\nurl_alquileres = 'https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1117973797'\n\ntabla_alojamientos = pd.read_csv(open_url(url_alojamientos))\ntabla_clientes = pd.read_csv(open_url(url_clientes))\ntabla_alquileres = pd.read_csv(open_url(url_alquileres))\n\nmascaraTipo = tabla_alojamientos['TIPO'] == 'Casa o Departamento'\nmascaraEdad = tabla_clientes['EDAD'] > 40\ntabla_alojamientosTipo = tabla_alojamientos[mascaraTipo]\ntabla_clientesEdad = tabla_clientes[mascaraEdad]\n\ndataMerge1 = pd.merge(tabla_alojamientosTipo, tabla_alquileres, how='inner')\ndataMerge2 = pd.merge(dataMerge1, tabla_clientesEdad, how='inner')\n`, en: `from pyodide.http import open_url\nimport pandas as pd\n# Load data from URLs\nurl_accommodations = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1991958902&single=true&output=csv'\nurl_customers = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1247297003&single=true&output=csv'\nurl_rentals = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1117973797&single=true&output=csv'\n\naccommodations_df = pd.read_csv(open_url(url_accommodations))\ncustomers_df = pd.read_csv(open_url(url_customers))\nrentals_df = pd.read_csv(open_url(url_rentals))\n\nmaskType = accommodations_df['TYPE'] == 'House or Apartment'\nmaskAge = customers_df['AGE'] > 40\naccommodationsType = accommodations_df[maskType]\ncustomersAge = customers_df[maskAge]\n\ndataMerge1 = pd.merge(accommodationsType, rentals_df, how='inner')\ndataMerge2 = pd.merge(dataMerge1, customersAge, how='inner')\n` },
        "isReadOnly": false
      },
    },
    "validationAST": [
      {
        "description": "Gráficos",
        "test": (assert) => assert
          .$custom(code => {
            if (!code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url") && !code.replace(/\s/g, '').trim().includes("frompyodide.httpimportopen_url")) {
              return [{
                es: "Debes importar la función 'open_url' del módulo 'pyodide.http'.",
                en: "You must import the 'open_url' function from the 'pyodide.http' module.",
                pt: "Você deve importar a função 'open_url' do módulo 'pyodide.http'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes("importpandasaspd") && !code.replace(/\s/g, '').trim().includes("importpandasaspd")) {
              return [{
                es: "Debes importar la librería 'pandas' como 'pd'.",
                en: "You must import the 'pandas' library as 'pd'.",
                pt: "Você deve importar a biblioteca 'pandas' como 'pd'."
              }];
            } else if (!code.replace(/\s/g, '').trim().includes(`url_alojamientos=`) && !code.replace(/\s/g, '').trim().includes(`url_accommodations=`) && !code.replace(/\s/g, '').trim().includes(`url_accommodations=`) && !code.replace(/\s/g, '').trim().includes(`url_accommodations=`)) {
              return [{
                es: "Debes almacenar la URL de los alojamientos en la variable 'url_alojamientos'.",
                en: "You must store the URL of the accommodations in the 'url_accommodations' variable.",
                pt: "Você deve armazenar a URL dos alojamentos na variável 'url_accommodations'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`url_alojamientos='https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1991958902'`) && !code.replace(/\s/g, '').trim().includes(`url_accommodations='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1991958902&single=true&output=csv'`) && !code.replace(/\s/g, '').trim().includes(`url_accommodations='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1991958902&single=true&output=csv'`) && !code.replace(/\s/g, '').trim().includes(`url_accommodations='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1991958902&single=true&output=csv'`)) {
              return [{
                es: "Debes almacenar la URL de los alojamientos en la variable 'url_alojamientos'.",
                en: "You must store the URL of the accommodations in the 'url_accommodations' variable.",
                pt: "Você deve armazenar a URL dos alojamentos na variável 'url_accommodations'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`url_clientes=`) && !code.replace(/\s/g, '').trim().includes(`url_customers=`) && !code.replace(/\s/g, '').trim().includes(`url_customers=`) && !code.replace(/\s/g, '').trim().includes(`url_customers=`)) {
              return [{
                es: "Debes almacenar la URL de los clientes en la variable 'url_clientes'.",
                en: "You must store the URL of the customers in the 'url_customers' variable.",
                pt: "Você deve armazenar a URL dos clientes na variável 'url_customers'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`url_clientes='https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1247297003'`) && !code.replace(/\s/g, '').trim().includes(`url_customers='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1247297003&single=true&output=csv'`) && !code.replace(/\s/g, '').trim().includes(`url_customers='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1247297003&single=true&output=csv'`) && !code.replace(/\s/g, '').trim().includes(`url_customers='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1247297003&single=true&output=csv'`)) {
              return [{
                es: "Debes almacenar la URL de los clientes en la variable 'url_clientes'.",
                en: "You must store the URL of the customers in the 'url_customers' variable.",
                pt: "Você deve armazenar a URL dos clientes na variável 'url_customers'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`url_alquileres=`) && !code.replace(/\s/g, '').trim().includes(`url_rentals=`) && !code.replace(/\s/g, '').trim().includes(`url_rentals=`) && !code.replace(/\s/g, '').trim().includes(`url_rentals=`)) {
              return [{
                es: "Debes almacenar la URL de los alquileres en la variable 'url_alquileres'.",
                en: "You must store the URL of the rentals in the 'url_rentals' variable.",
                pt: "Você deve armazenar a URL dos aluguéis na variável 'url_rentals'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`url_alquileres='https://docs.google.com/spreadsheets/d/1U4gbY92VbqQcOaTmWMrEC_vzKtC_gKFT_7Wx723FI3w/export?format=csv&gid=1117973797'`) && !code.replace(/\s/g, '').trim().includes(`url_rentals='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1117973797&single=true&output=csv'`) && !code.replace(/\s/g, '').trim().includes(`url_rentals='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1117973797&single=true&output=csv'`) && !code.replace(/\s/g, '').trim().includes(`url_rentals='https://docs.google.com/spreadsheets/d/e/2PACX-1vQpKwYAsee0v2ob9-kCPqtoJwMgZ17e4PZV7wJkdT9b_vhXGrLm8w85-EQwgggj0nWtDMdeq7dMmb26/pub?gid=1117973797&single=true&output=csv'`)) {
              return [{
                es: "Debes almacenar la URL de los alquileres en la variable 'url_alquileres'.",
                en: "You must store the URL of the rentals in the 'url_rentals' variable.",
                pt: "Você deve armazenar a URL dos aluguéis na variável 'url_rentals'."
              }];
            }
            else if (!code.replace(/\s/g, '').trim().includes("tabla_alojamientos=pd.read_csv(open_url(url_alojamientos))") && !code.replace(/\s/g, '').trim().includes("accommodations_df=pd.read_csv(open_url(url_accommodations))")) {
              return [{
                es: "Debes leer los datos de los alojamientos desde la URL en la variable 'tabla_alojamientos'.",
                en: "You must read the accommodation data from the URL into the 'accommodations_df' variable.",
                pt: "Você deve ler os dados de acomodações da URL na variável 'accommodations_df'."
              }]
            }
            if (!code.replace(/\s/g, '').trim().includes("tabla_clientes=pd.read_csv(open_url(url_clientes))") && !code.replace(/\s/g, '').trim().includes("customers_df=pd.read_csv(open_url(url_customers))")) {
              return [{
                es: "Debes leer los datos de los clientes desde la URL en la variable 'tabla_clientes'.",
                en: "You must read the customer data from the URL into the 'customers_df' variable.",
                pt: "Você deve ler os dados do cliente da URL na variável 'customers_df'."
              }]
            }
            if (!code.replace(/\s/g, '').trim().includes("tabla_alquileres=pd.read_csv(open_url(url_alquileres))") && !code.replace(/\s/g, '').trim().includes("rentals_df=pd.read_csv(open_url(url_rentals))")) {
              return [{
                es: "Debes leer los datos de los alquileres desde la URL en la variable 'tabla_alquileres'.",
                en: "You must read the rental data from the URL into the 'rentals_df' variable.",
                pt: "Você deve ler os dados de aluguéis da URL na variável 'rentals_df'."
              }]
            }
            if (!code.replace(/\s/g, '').trim().includes(`mascaraTipo=tabla_alojamientos['TIPO']=='CasaoDepartamento'`) && !code.replace(/\s/g, '').trim().includes(`maskType=accommodations_df['TYPE']=='HouseorApartment'`) && !code.replace(/\s/g, '').trim().includes(`maskType=accommodations_df['TYPE']=="HouseorApartment"`) && !code.replace(/\s/g, '').trim().includes(`maskType=accommodations_df['TYPE']=="HouseorApartment"`)) {
              return [{
                es: "ebes crear una máscara llamada 'mascaraTipo' para filtrar los alojamientos de tipo 'Casa o Departamento'.",
                en: "You must create a mask called 'maskType' to filter 'House or Apartment' accommodations.",
                pt: "Você deve criar uma máscara chamada 'maskType' para filtrar acomodações do tipo 'Casa ou Apartamento'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`mascaraEdad=tabla_clientes['EDAD']>40`) && !code.replace(/\s/g, '').trim().includes(`maskAge=customers_df['AGE']>40`) && !code.replace(/\s/g, '').trim().includes(`maskAge=customers_df["AGE"]>40`) && !code.replace(/\s/g, '').trim().includes(`maskAge=customers_df["AGE"]>40`) && !code.replace(/\s/g, '').trim().includes(`mascaraEdad=tabla_clientes["EDAD"]>40`)) {
              return [{
                es: "Debes crear una máscara llamda 'mascaraEdad' para filtrar los clientes mayores de 40 años.",
                en: "You must create a mask called 'maskAge' to filter customers over 40 years old.",
                pt: "Você deve criar uma máscara chamada 'maskAge' para filtrar clientes com mais de 40 anos."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`tabla_alojamientosTipo=tabla_alojamientos[mascaraTipo]`) && !code.replace(/\s/g, '').trim().includes(`accommodationsType=accommodations_df[maskType]`) && !code.replace(/\s/g, '').trim().includes(`accommodationsType=accommodations_df[maskType]`) && !code.replace(/\s/g, '').trim().includes(`accommodationsType=accommodations_df[maskType]`)) {
              return [{
                es: "Debes filtrar los alojamientos con la máscara 'mascaraTipo' y almacenarlos en 'tabla_alojamientosTipo'.",
                en: "You must filter the accommodations with the 'maskType' mask and store them in 'accommodationsType'.",
                pt: "Você deve filtrar as acomodações com a máscara 'maskType' e armazená-las em 'accommodationsType'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`tabla_clientesEdad=tabla_clientes[mascaraEdad]`) && !code.replace(/\s/g, '').trim().includes(`customersAge=customers_df[maskAge]`) && !code.replace(/\s/g, '').trim().includes(`customersAge=customers_df[maskAge]`) && !code.replace(/\s/g, '').trim().includes(`customersAge=customers_df[maskAge]`)) {
              return [{
                es: "Debes filtrar los clientes con 'mascaraEdad' y almacenarlos en 'tabla_clientesEdad'.",
                en: "You must filter the customers with 'maskAge' and store them in 'customersAge'.",
                pt: "Você deve filtrar os clientes com 'maskAge' e armazená-los em 'customersAge'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`dataMerge1=pd.merge(tabla_alojamientosTipo,tabla_alquileres,how='inner')`) && !code.replace(/\s/g, '').trim().includes(`dataMerge1=pd.merge(accommodationsType,rentals_df,how='inner')`) && !code.replace(/\s/g, '').trim().includes(`dataMerge1=pd.merge(tabla_alojamientosTipo,tabla_alquileres,how="inner")`) && !code.replace(/\s/g, '').trim().includes(`dataMerge1=pd.merge(accommodationsType,rentals_df,how="inner")`)) {
              return [{
                es: "Debes fusionar los datos de 'tabla_alojamientosTipo' y 'tabla_alquileres' con un 'inner join' y almacenarlos en 'dataMerge1'.",
                en: "You must merge the data from 'accommodationsType' and 'rentals_df' with an 'inner join' and store it in 'dataMerge1'.",
                pt: "Você deve mesclar os dados de 'accommodationsType' e 'rentals_df' com um 'inner join' e armazená-los em 'dataMerge1'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`dataMerge2=pd.merge(dataMerge1,tabla_clientesEdad,how='inner')`) && !code.replace(/\s/g, '').trim().includes(`dataMerge2=pd.merge(dataMerge1,customersAge,how='inner')`) && !code.replace(/\s/g, '').trim().includes(`dataMerge2=pd.merge(dataMerge1,tabla_clientesEdad,how="inner")`) && !code.replace(/\s/g, '').trim().includes(`dataMerge2=pd.merge(dataMerge1,customersAge,how="inner")`)) {
              return [{
                es: "Debes fusionar los datos de 'dataMerge1' y 'tabla_clientesEdad' con un 'inner join' y almacenarlos en 'dataMerge2'.",
                en: "You must merge the data from 'dataMerge1' and 'customersAge' with an 'inner join' and store it in 'dataMerge2'.",
                pt: "Você deve mesclar os dados de 'dataMerge1' e 'customersAge' com um 'inner join' e armazená-los em 'dataMerge2'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`alquileres_avg_ciudad=`) && !code.replace(/\s/g, '').trim().includes(`rented_avg_city=`) && !code.replace(/\s/g, '').trim().includes(`rented_avg_city=`) && !code.replace(/\s/g, '').trim().includes(`rented_avg_city=`)) {
              return [{
                es: "Debes crear una variable 'alquileres_avg_ciudad' para almacenar la tabla pivote de 'dataMerge2' con el índice 'CIUDAD', la columna 'PUBLICADO_POR' y función de agregación 'mean' para 'PRECIO_EURO'.",
                en: "You must create a 'rented_avg_city' variable to store the pivot table of 'dataMerge2' with the 'CITY' index, 'PUBLISHED_BY' column, and 'mean' aggregation function for 'EURO_PRICE'.",
                pt: "Você deve criar uma variável 'rented_avg_city' para armazenar a tabela pivô de 'dataMerge2' com o índice 'CITY', coluna 'PUBLISHED_BY' e função de agregação 'mean' para 'EURO_PRICE'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`alquileres_avg_ciudad=dataMerge2.pivot_table(index=['CIUDAD'],columns=['PUBLICADO_POR'],aggfunc={'PRECIO_EURO':['mean']})`) && !code.replace(/\s/g, '').trim().includes(`rented_avg_city=dataMerge2.pivot_table(index=['CITY'],columns=['PUBLISHED_BY'],aggfunc={'EURO_PRICE':['mean']})`) && !code.replace(/\s/g, '').trim().includes(`alquileres_avg_ciudad=dataMerge2.pivot_table(index=["CIUDAD"],columns=["PUBLICADO_POR"],aggfunc={'PRECIO_EURO':["mean"]})`) && !code.replace(/\s/g, '').trim().includes(`rented_avg_city=dataMerge2.pivot_table(index=["CITY"],columns=["PUBLISHED_BY"],aggfunc={"EURO_PRICE":["mean"]})`) && !code.replace(/\s/g, '').trim().includes(`alquileres_avg_ciudad=dataMerge2.pivot_table(index=['CIUDAD'],columns=['PUBLICADO_POR'],aggfunc={'PRECIO_EURO':["mean"]})`) && !code.replace(/\s/g, '').trim().includes(`rented_avg_city=dataMerge2.pivot_table(index=['CITY'],columns=['PUBLISHED_BY'],aggfunc={'EURO_PRICE':["mean"]})`) && !code.replace(/\s/g, '').trim().includes(`alquileres_avg_ciudad=dataMerge2.pivot_table(index=["CIUDAD"],columns=["PUBLICADO_POR"],aggfunc={'PRECIO_EURO':['mean']})`) && !code.replace(/\s/g, '').trim().includes(`rented_avg_city=dataMerge2.pivot_table(index=["CITY"],columns=["PUBLISHED_BY"],aggfunc={'EURO_PRICE':['mean']})`) && !code.replace(/\s/g, '').trim().includes(`alquileres_avg_ciudad=dataMerge2.pivot_table(index=['CIUDAD'],columns=["PUBLICADO_POR"],aggfunc={'PRECIO_EURO':['mean']})`) && !code.replace(/\s/g, '').trim().includes(`rented_avg_city=dataMerge2.pivot_table(index=['CITY'],columns=["PUBLISHED_BY"],aggfunc={'EURO_PRICE':['mean']})`) && !code.replace(/\s/g, '').trim().includes(`alquileres_avg_ciudad=dataMerge2.pivot_table(index=["CIUDAD"],columns=['PUBLICADO_POR'],aggfunc={'PRECIO_EURO':["mean"]})`) && !code.replace(/\s/g, '').trim().includes(`rented_avg_city=dataMerge2.pivot_table(index=["CITY"],columns=['PUBLISHED_BY'],aggfunc={'EURO_PRICE':["mean"]})`)) {
              return [{
                es: "Debes crear una tabla pivote 'alquileres_avg_ciudad' con el índice 'CIUDAD', la columna 'PUBLICADO_POR' y función de agregación 'mean' para 'PRECIO_EURO'.",
                en: "You must create a pivot table 'rented_avg_city' with the 'CITY' index, 'PUBLISHED_BY' column, and 'mean' aggregation function for 'EURO_PRICE'.",
                pt: "Você deve criar uma tabela pivô 'rented_avg_city' com o índice 'CITY', coluna 'PUBLISHED_BY' e função de agregação 'mean' para 'EURO_PRICE'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`alquileres_plat=`) && !code.replace(/\s/g, '').trim().includes(`rentals_plat=`) && !code.replace(/\s/g, '').trim().includes(`rentals_plat=`) && !code.replace(/\s/g, '').trim().includes(`rentals_plat=`)) {
              return [{
                es: "Debes crear una variable 'alquileres_plat' para almacenar la tabla pivote de 'dataMerge2' con el índice 'PUBLICADO_POR', columna 'CIUDAD' y función de agregación 'count' para 'PUBLICADO_POR'.",
                en: "You must create a 'rentals_plat' variable to store the pivot table of 'dataMerge2' with the 'PUBLISHED_BY' index, 'CITY' column, and 'count' aggregation function for 'PUBLISHED_BY'.",
                pt: "Você deve criar uma variável 'rentals_plat' para armazenar a tabela pivô de 'dataMerge2' com o índice 'PUBLISHED_BY', coluna 'CITY' e função de agregação 'count' para 'PUBLISHED_BY'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`alquileres_plat=dataMerge2.pivot_table(index=['PUBLICADO_POR'],columns=['CIUDAD'],aggfunc={'PUBLICADO_POR':['count']})`) && !code.replace(/\s/g, '').trim().includes(`rentals_plat=dataMerge2.pivot_table(index=['PUBLISHED_BY'],columns=['CITY'],aggfunc={'PUBLISHED_BY':['count']})`) && !code.replace(/\s/g, '').trim().includes(`rentals_plat=dataMerge2.pivot_table(index=['PUBLISHED_BY'],columns=['CITY'],aggfunc={'PUBLISHED_BY':['count']})`) && !code.replace(/\s/g, '').trim().includes(`rentals_plat=dataMerge2.pivot_table(index=['PUBLISHED_BY'],columns=['CITY'],aggfunc={'PUBLISHED_BY':['count']})`)) {
              return [{
                es: "Debes crear una tabla pivote 'alquileres_plat' con el índice 'PUBLICADO_POR', la columna 'CIUDAD' y función de agregación 'count' para 'PUBLICADO_POR'.",
                en: "You must create a pivot table 'rentals_plat' with the 'PUBLISHED_BY' index, 'CITY' column, and 'count' aggregation function for 'PUBLISHED_BY'.",
                pt: "Você deve criar uma tabela pivô 'rentals_plat' com o índice 'PUBLISHED_BY', coluna 'CITY' e função de agregação 'count' para 'PUBLISHED_BY'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`print(alquileres_avg_ciudad)`) && !code.replace(/\s/g, '').trim().includes(`print(rented_avg_city)`) && !code.replace(/\s/g, '').trim().includes(`print(rented_avg_city)`) && !code.replace(/\s/g, '').trim().includes(`print(rented_avg_city)`)) {
              return [{
                es: "Debes imprimir la tabla pivote 'alquileres_avg_ciudad'.",
                en: "You must print the pivot table 'rented_avg_city'.",
                pt: "Você deve imprimir a tabela pivô 'rented_avg_city'."
              }];
            }
            if (!code.replace(/\s/g, '').trim().includes(`print(alquileres_plat)`) && !code.replace(/\s/g, '').trim().includes(`print(rentals_plat)`) && !code.replace(/\s/g, '').trim().includes(`print(rentals_plat)`) && !code.replace(/\s/g, '').trim().includes(`print(rentals_plat)`)) {
              return [{
                es: "Debes imprimir la tabla pivote 'alquileres_plat'.",
                en: "You must print the pivot table 'rentals_plat'.",
                pt: "Você deve imprimir a tabela pivô 'rentals_plat'."
              }];
            }
          })
      }
    ]
  }
];

// BorderRight.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BorderRight.css';

const STRINGS = {
  es: {
    title: "💡 Feedback generado por la IA",
    empty: "No hay feedback generado aún.",
  },
  en: {
    title: "💡 AI-generated Feedback",
    empty: "No feedback generated yet.",
  },
  pt: {
    title: "💡 Feedback gerado pela IA",
    empty: "Nenhum feedback gerado ainda.",
  },
};

const BorderRight = ({ mode, lang}) => {
  const themeClass = mode === 'dark' ? 'dark-mode' : 'light-mode';
  // console.log(`BorderRight render - mode: ${mode}, lang: ${lang}`);
  
  const L = STRINGS[lang] || STRINGS.es;

  const [iaMessages, setIaMessages] = useState("");

  useEffect(() => {
    // Reemplaza la función global con versión que actualiza el estado
    window.mostrarResultadoHTML = (html) => {
      setIaMessages(html);
    };
  }, []);

  return (
    <div className={`border-right-container ${themeClass}`} lang={lang}>
      <div className="ia-panel">
        <h2 className="ia-title">{L.title}</h2>
        <div
          id="iaResult"
          className="ia-result"
          dangerouslySetInnerHTML={{ __html: iaMessages || L.empty }}
        />
      </div>
    </div>
  );
};

BorderRight.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']).isRequired,
  lang: PropTypes.oneOf(['es', 'en', 'pt']),
};

export default BorderRight;

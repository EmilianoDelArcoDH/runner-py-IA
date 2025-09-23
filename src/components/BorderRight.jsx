// BorderRight.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BorderRight.css';

const STRINGS = {
  es: {
    title: "💡 Feedback de la IA",
    empty: "<p class='placeholder'>Todavía no hay feedback...</p>",
  },
  en: {
    title: "💡 AI Feedback",
    empty: "<p class='placeholder'>No feedback yet...</p>",
  },
  pt: {
    title: "💡 Feedback da IA",
    empty: "<p class='placeholder'>Ainda não há feedback...</p>",
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

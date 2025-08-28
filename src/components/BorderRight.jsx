import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BorderRight.css';

const BorderRight = ({ mode }) => {
  const themeClass = mode === 'dark' ? 'dark-mode' : 'light-mode';

  const [iaMessages, setIaMessages] = useState("");

  useEffect(() => {
    // Reemplaza la función global con versión que actualiza el estado
    window.mostrarResultadoHTML = (html) => {
      setIaMessages(html);
    };
  }, []);

  return (
    <div className={`border-right-container ${themeClass}`}> 
      <div className="ia-panel">
        <h2 className="ia-title">💡 Feedback de la IA</h2>
        <div 
          id="iaResult" 
          className="ia-result" 
          dangerouslySetInnerHTML={{ __html: iaMessages || "<p class='placeholder'>Todavía no hay feedback...</p>" }} 
        />
      </div>
    </div>
  );
};

BorderRight.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']).isRequired,
};

export default BorderRight;

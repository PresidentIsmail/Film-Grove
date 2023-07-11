import React from 'react';
import './ErrorComponent.css';

const ErrorComponent = ({ errorMessage }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h2> ⛔ An error occurred.</h2>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;

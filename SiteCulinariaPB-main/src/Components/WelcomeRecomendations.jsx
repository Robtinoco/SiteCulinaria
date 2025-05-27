import React from 'react';
import "./ComponentsCss/WelcomeRecomendations.css";


const WelcomeRecommendations = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-hero-section">
        <div className="welcome-content-overlay">
          <h1>Encontre receitas deliciosas!</h1>
          <p className="welcome-chef-suggestions">Sugestões do Chef</p>
          
          <div className="welcome-recipe-tags">
            <button>Crepioca</button>
            <button>Waffle</button>
            <button>Bolo de Cenoura</button>
            <button>Pão de Queijo</button>
          </div>

          <div className="welcome-recipe-of-day">
            <p><span>Receita do dia:</span> Torta de Liquidificador</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeRecommendations;
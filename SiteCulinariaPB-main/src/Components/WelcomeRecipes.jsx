import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'; 
import "./ComponentsCss/WelcomeRecipes.css";

const RecipeSuggestions = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/receitas');
      const firstThreeRecipes = response.data.slice(0, 3); 
      setRecipes(firstThreeRecipes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Carregando sugestões de receitas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Erro ao carregar as sugestões: {error}</p>
        <button onClick={fetchRecipes}>Tentar Novamente</button>
      </div>
    );
  }

  return (
    <section className="recipe-suggestions">
      <div className="recipe-list" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {recipes.map((recipe) => (
          <Card 
          key={recipe.id} 
          title={recipe.receita} 
          url={recipe.link_imagem} 
          receita={recipe}
        />
        ))}
      </div>
    </section>
  );
};

export default RecipeSuggestions;

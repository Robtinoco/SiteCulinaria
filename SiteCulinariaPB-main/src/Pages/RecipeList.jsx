import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import "./PagesCss/RecipeList.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const API_URL = 'http://localhost:3001/receitas';

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(API_URL);
      setRecipes(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">
      <div className="loading-spinner"></div>
      <p>Carregando receitas...</p>
    </div>;
  }

  if (error) {
    return <div className="error">
      <p>Erro ao carregar as receitas: {error}</p>
      <button onClick={fetchRecipes}>Tentar Novamente</button>
    </div>;
  }

  return (
    <div className="recipes-container">
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <Card 
            key={recipe.id} 
            title={recipe.receita} 
            url={recipe.link_imagem} 
            receita={recipe}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;

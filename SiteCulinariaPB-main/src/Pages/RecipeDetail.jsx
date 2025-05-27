import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, Users, ChefHat, ArrowLeft } from 'lucide-react';
import './PagesCss/RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/receitas/${id}`);
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipe details:', err);
        setError('Não foi possível carregar os detalhes da receita');
        setLoading(false);
        
        setTimeout(() => {
          navigate('/receitas');
        }, 2000);
      }
    };

    fetchRecipeDetails();
  }, [id, navigate]);

  const handleGoBack = () => {
    navigate('/receitas');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        {error}
        <p>Redirecionando para página de receitas...</p>
      </div>
    );
  }

  if (!recipe) {
    return <div className="not-found">Receita não encontrada</div>;
  }

  return (
    <div className="recipe-detail-wrapper">
      <button 
        onClick={handleGoBack} 
        className="back-button"
      >
        <ArrowLeft className="back-icon" />
        Voltar
      </button>

      <div className="recipe-detail-container">
        <h1 className="recipe-title">{recipe.receita}</h1>

        <div className="recipe-content">
          <div className="recipe-image-section">
            <img
              src={recipe.link_imagem}
              alt={recipe.receita}
              className="recipe-image"
            />
          </div>

          <div className="recipe-info-section">
            <div className="recipe-metadata">
              <div className="metadata-item">
                <Clock className="metadata-icon" />
                <div>
                  <p className="metadata-label">Tempo</p>
                  <p>{recipe.tempo_preparo}</p>
                </div>
              </div>
              <div className="metadata-item">
                <Users className="metadata-icon" />
                <div>
                  <p className="metadata-label">Porções</p>
                  <p>Não informado</p>
                </div>
              </div>
              <div className="metadata-item">
                <ChefHat className="metadata-icon" />
                <div>
                  <p className="metadata-label">Dificuldade</p>
                  <p>Não informado</p>
                </div>
              </div>
            </div>

            <div className="ingredients-section">
              <h3 className="ingredients-title">Ingredientes</h3>
              <ul className="ingredients-list">
                {recipe.ingredientes.map((ingredient, index) => (
                  <li key={index} className="ingredient-item">{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="preparation-section">
          <h2 className="preparation-title">Modo de Preparo</h2>
          <p className="preparation-text">{recipe.modo_preparo}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
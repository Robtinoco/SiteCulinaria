import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PagesCss/Suggestions.css';

const Suggestions = ({ Logged }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    suggestionType: 'recipe',
    suggestion: ''
  });
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: '',
    loading: false
  });
  const [suggestions, setSuggestions] = useState([]);

  const suggestionTypes = [
    { value: 'recipe', label: 'Sugestão de Receita' },
    { value: 'improvement', label: 'Melhoria para o Site' },
    { value: 'feedback', label: 'Feedback Geral' },
    { value: 'other', label: 'Outro' }
  ];

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/suggestions');
        setSuggestions(response.data);
      } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
      }
    };

    fetchSuggestions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setSubmitStatus({
        success: false,
        message: 'Por favor, insira seu nome',
        loading: false
      });
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setSubmitStatus({
        success: false,
        message: 'Por favor, insira um email válido',
        loading: false
      });
      return;
    }

    if (!formData.suggestion.trim()) {
      setSubmitStatus({
        success: false,
        message: 'Por favor, descreva sua sugestão',
        loading: false
      });
      return;
    }

    setSubmitStatus({
      success: false,
      message: '',
      loading: true
    });

    try {
      const response = await axios.post('http://localhost:3001/suggestions', {
        ...formData,
        date: new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      });

      setSuggestions(prev => [response.data, ...prev]);

      setFormData({
        name: '',
        email: '',
        suggestionType: 'recipe',
        suggestion: ''
      });

      setSubmitStatus({
        success: true,
        message: 'Sua sugestão foi enviada com sucesso! Obrigado pelo feedback.',
        loading: false
      });
    } catch (error) {
      console.error('Erro ao enviar sugestão:', error);
      setSubmitStatus({
        success: false,
        message: 'Erro ao enviar sugestão. Por favor, tente novamente.',
        loading: false
      });
    }
  };

  return (
    <div className="suggestions-container">
      {Logged ? (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Envie Suas Sugestões e Feedback</h2>
          </div>
          <div className="card-content">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="name">Nome Completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seuemail@exemplo.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="suggestionType">Tipo de Sugestão</label>
                <select
                  id="suggestionType"
                  name="suggestionType"
                  value={formData.suggestionType}
                  onChange={handleInputChange}
                >
                  {suggestionTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="suggestion">Sua Sugestão</label>
                <textarea
                  id="suggestion"
                  name="suggestion"
                  value={formData.suggestion}
                  onChange={handleInputChange}
                  placeholder="Conte-nos sua ideia ou feedback..."
                  rows="5"
                  required
                ></textarea>
              </div>

              {submitStatus.message && (
                <div className={`submit-message ${submitStatus.success ? 'success' : 'error'}`}>
                  {submitStatus.message}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitStatus.loading}
                  className="btn-submit"
                >
                  {submitStatus.loading ? 'Enviando...' : 'Enviar Sugestão'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="no-access-message">
          <p>Você precisa estar logado para enviar sugestões.</p>
        </div>
      )}

      <div className="suggestions-list">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Sugestões Recentes</h2>
          </div>
          <div className="card-content">
            {suggestions.length > 0 ? (
              <ul>
                {suggestions.map(suggestion => (
                  <li key={suggestion.id} className="suggestion-item">
                    <div className="flex justify-between">
                      <div>
                        <strong>{suggestion.name}</strong>
                        <span className="text-gray-500 ml-2">{suggestion.date}</span>
                      </div>
                      <div>
                        {suggestionTypes.find(type => type.value === suggestion.suggestionType)?.label || suggestion.suggestionType}
                      </div>
                    </div>
                    <p>{suggestion.suggestion}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Não há sugestões disponíveis no momento.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;

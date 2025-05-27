import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Camera } from 'lucide-react';
import "./PagesCss/AddRecipe.css";

const AddRecipe = ({ onRecipeAdded }) => {
  const [formData, setFormData] = useState({
    receita: '',
    link_imagem: '',
    ingredientes: [''],
    modo_preparo: '',
    tempo_preparo: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const API_URL = 'http://localhost:3001/receitas';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredientes = [...formData.ingredientes];
    newIngredientes[index] = value;
    setFormData(prevState => ({
      ...prevState,
      ingredientes: newIngredientes
    }));
  };

  const addIngredient = () => {
    setFormData(prevState => ({
      ...prevState,
      ingredientes: [...prevState.ingredientes, '']
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredientes.length > 1) {
      setFormData(prevState => ({
        ...prevState,
        ingredientes: prevState.ingredientes.filter((_, i) => i !== index)
      }));
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (err) {
      setError('Erro ao acessar a câmera');
      console.error('Erro da câmera:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const filteredIngredientes = formData.ingredientes.filter(ing => ing.trim() !== '');

    const submitData = {
      ...formData,
      ingredientes: filteredIngredientes,
      link_imagem: capturedImage || formData.link_imagem,
      id: `${Date.now()}`
    };

    try {
      const response = await axios.post(API_URL, submitData);
      
      setFormData({
        receita: '',
        link_imagem: '',
        ingredientes: [''],
        modo_preparo: '',
        tempo_preparo: ''
      });
      setCapturedImage(null);
      
      console.log("Nova receita adicionada:", response.data);
      onRecipeAdded(response.data);
      alert('Receita adicionada com sucesso!');
      
    } catch (err) {
      alert('Receita adicionada com sucesso!');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-recipe-form">
      <h2>Adicionar Nova Receita</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="receita">Nome da Receita:</label>
          <input
            type="text"
            id="receita"
            name="receita"
            value={formData.receita}
            onChange={handleChange}
            placeholder="Ex: Bolo de Chocolate"
            required
          />
        </div>

        {!showCamera && !capturedImage && (
          <div className="input-group">
            <label htmlFor="link_imagem">Link da Imagem:</label>
            <input
              type="url"
              id="link_imagem"
              name="link_imagem"
              value={formData.link_imagem}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={startCamera}
              className="camera-button"
            >
              <Camera size={20} />
              Usar Câmera
            </button>
          </div>
        )}

        {showCamera && (
          <div className="camera-container">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="camera-preview"
            />
            <div className="camera-controls">
              <button
                type="button"
                onClick={capturePhoto}
                className="capture-button"
              >
                Tirar Foto
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="cancel-button"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="captured-image-container">
            <img
              src={capturedImage}
              alt="Foto capturada"
              className="captured-image"
            />
            <button
              type="button"
              onClick={() => {
                setCapturedImage(null);
                setFormData(prev => ({ ...prev, link_imagem: '' }));
              }}
              className="remove-photo-button"
            >
              Remover Foto
            </button>
          </div>
        )}

        <div className="input-group">
          <label>Ingredientes:</label>
          {formData.ingredientes.map((ingrediente, index) => (
            <div key={index} className="ingrediente-input">
              <input
                type="text"
                value={ingrediente}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingrediente ${index + 1}`}
                required
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="remove-button"
                disabled={formData.ingredientes.length === 1}
              >
                Remover
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="add-button"
          >
            Adicionar Ingrediente
          </button>
        </div>

        <div className="input-group">
          <label htmlFor="modo_preparo">Modo de Preparo:</label>
          <textarea
            id="modo_preparo"
            name="modo_preparo"
            value={formData.modo_preparo}
            onChange={handleChange}
            placeholder="Descreva o passo a passo do preparo..."
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="tempo_preparo">Tempo de Preparo:</label>
          <input
            type="text"
            id="tempo_preparo"
            name="tempo_preparo"
            value={formData.tempo_preparo}
            onChange={handleChange}
            placeholder="Ex: 30 minutos"
            required
          />
        </div>

        <div className="button-group">
          <button
            type="submit"
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Adicionando...' : 'Adicionar Receita'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
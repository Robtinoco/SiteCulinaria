import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PagesCss/Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [videoSelecionado, setVideoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarVideos = async () => {
    try {
      const resposta = await axios.get('http://localhost:3001/videos');
      setVideos(resposta.data);
      setCarregando(false);
    } catch (error) {
      setErro('Não foi possível carregar os vídeos');
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarVideos();
  }, []);

  const handleVideoClick = (video) => {
    setVideoSelecionado(video);
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const handleRetry = () => {
    setErro(null);
    setCarregando(true);
    buscarVideos();
  };

  if (carregando) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Carregando vídeos...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="error">
        <p>{erro}</p>
        <button onClick={handleRetry}>Tentar Novamente</button>
      </div>
    );
  }

  return (
    <div className="videos-container">
      {videoSelecionado ? (
        <div className="video-player">
          <h2 className="video-player-titulo">{videoSelecionado.titulo}</h2>
          <iframe 
            src={getYouTubeEmbedUrl(videoSelecionado.url)} 
            title={videoSelecionado.titulo}
            className="video-iframe"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <p className="video-descricao-full">{videoSelecionado.descricao}</p>
          <button 
            onClick={() => setVideoSelecionado(null)}
            className="btn-voltar"
          >
            Voltar para lista
          </button>
        </div>
      ) : (
        <div className="videos-grid">
          {videos.map(video => (
            <div 
              key={video.id} 
              onClick={() => handleVideoClick(video)}
              className="video-card"
            >
              <img 
                src={video.thumbnail} 
                alt={video.titulo} 
                className="video-thumbnail"
              />
              <div className="video-info">
                <h3 className="video-titulo">{video.titulo}</h3>
                <p className="video-descricao">{video.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Videos;  
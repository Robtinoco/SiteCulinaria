import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PagesCss/Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts');
        setPosts(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Erro ao carregar posts do blog');
        setIsLoading(false);
        console.error('Erro:', err);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="blog-loading-container">
        <div className="blog-loading-spinner"></div>
        <p className="blog-loading-text">Carregando receitas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="blog-container">
      {posts.length === 0 ? (
        <p>Não há posts disponíveis no momento.</p>
      ) : (
        <div className="blog-posts">
          {posts.map((post) => (
            <article key={post.id} className="blog-post">
              <h2>{post.title}</h2>
              {post.image && (
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="blog-post-image" 
                />
              )}
              <div className="blog-post-meta">
                <span className="blog-post-author">Por: {post.author}</span>
                <span className="blog-post-date">
                {post.date}
                </span>
              </div>
              <p className="blog-post-excerpt">{post.excerpt}</p>
              <button 
                className="read-more-button"
              >
                Leia Mais
              </button>
            </article>
          ))}
        </div>
      )}

      <div className="blog-pagination">
      </div>
    </div>
  );
};

export default Blog;

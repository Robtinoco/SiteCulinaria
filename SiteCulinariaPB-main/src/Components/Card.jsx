import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card(props) {
  const navigate = useNavigate();

  const cardStyle = {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    margin: '20px',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
  };

  const cardImageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const cardBodyStyle = {
    padding: '16px',
    textAlign: 'center',
  };

  const cardTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
    color: '#333',
  };

  const handleClick = () => {
    navigate(`/receita/${props.receita.id}`);
  };

  return (
    <div
      className="card"
      style={cardStyle}
      onMouseEnter={(e) => e.currentTarget.style.transform = cardHoverStyle.transform}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
      onClick={handleClick}
    >
      <img 
        className="card-image" 
        src={props.url} 
        alt={props.title} 
        style={cardImageStyle} 
      />
      <div className="card-body" style={cardBodyStyle}>
        <span className="card-title" style={cardTitleStyle}>
          {props.title}
        </span>
      </div>
    </div>
  );
}

export default Card;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PagesCss/Header.css";

const Header = ({ Logged, setLogged, setLoggedUser, LoggedUser }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    const loggedState = localStorage.getItem('isLogged') === 'true';

    if (loggedState && loggedUser) {
      setLogged(true);
      setLoggedUser(loggedUser);
    } else {
      setLogged(false);
      setLoggedUser('');
    }
  }, [setLogged, setLoggedUser]);

  const handleMenuClick = (route) => {
    navigate(route);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setLogged(false);
    setLoggedUser('');
    localStorage.removeItem('user');
    localStorage.setItem('isLogged', 'false');
    navigate('/login');
  };

  const menuItems = [
    { label: 'Inicio', route: '/' },
    { label: 'Receitas', route: '/receitas' },
    { label: 'Blog FoodBytes', route: '/blog' },
    { label: 'Vídeos', route: '/videos' },
    { label: '+Sugestões', route: '/sugestoes' },
    ...(Logged ? [{ label: 'Envie sua receita', route: '/enviar' }] : []),
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <div className="logo">
            <Link to="/">
              <img
                src="/src/Components/img/LOGO_FoodBytes.png"
                alt="FoodBytes"
                className="h-12"
              />
            </Link>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Experimente a busca"
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>

          <div className="header-actions">
            {Logged ? (
              <>
                <div className="profile">
                  <i className="fas fa-user"></i>
                </div>
                <div className="login">
                  <span>{LoggedUser}</span>
                  <button onClick={handleLogout} className="logout-button">
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="profile">
                  <i className="fas fa-user"></i>
                </div>
                <div className="login">
                  <Link to="/login">
                    Olá! Entre ou cadastre-se
                  </Link>
                </div>
              </>
            )}
          </div>

          {isMobile && (
            <button
              className="hamburger-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className={`hamburger-icon ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          )}
        </div>

        <nav className={`nav ${isMobile ? 'mobile' : ''} ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.route}
                  onClick={() => handleMenuClick(item.route)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
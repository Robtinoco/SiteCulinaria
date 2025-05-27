import React from "react";
import "./ComponentsCss/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <img
            src="src\Components\img\LOGO_FoodBytes.png"
            alt="Logo FoodBytes"
            className="footer-logo"
          />
          <h4>Siga o FoodBytes</h4>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Sobre nós</h4>
            <ul>
              <li>
                <a href="#">Fale com a gente</a>
              </li>
              <li>
                <a href="#">Trabalhe conosco</a>
              </li>
              <li>
                <a href="#">Política de privacidade</a>
              </li>
              <li>
                <a href="#">Termos de uso</a>
              </li>
              <li>
                <a href="#">Solicitação de dados pessoais</a>
              </li>
              <li>
                <a href="#">Novo Blog</a>
              </li>
              <li>
                <a href="#">Web Stories</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Nossa seleção</h4>
            <ul>
              <li>
                <a href="#">Panqueca</a>
              </li>
              <li>
                <a href="#">Bolo de Mandioca Diet</a>
              </li>
              <li>
                <a href="#">Frango à Passarinho na Air Fryer</a>
              </li>
              <li>
                <a href="#">Farofa de Banana</a>
              </li>
              <li>
                <a href="#">Pizza Low-Carb de Frigideira</a>
              </li>
              <li>
                <a href="#">Carne de Jaca Vegana</a>
              </li>
              <li>
                <a href="#">Receitas de Saladas e Bowls</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Categorias</h4>
            <ul>
              <li>
                <a href="#">Saladas</a>
              </li>
              <li>
                <a href="#">Legumes</a>
              </li>
              <li>
                <a href="#">Carnes</a>
              </li>
              <li>
                <a href="#">Aves</a>
              </li>
              <li>
                <a href="#">Massas</a>
              </li>
              <li>
                <a href="#">Peixes e Frutos do Mar</a>
              </li>
              <li>
                <a href="#">Doces</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

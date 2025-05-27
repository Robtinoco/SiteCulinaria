import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PagesCss/Login.css';

const Login = ({ setLogged, setLoggedUser }) => {
  const [loginUsuario, setLoginUsuario] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [loginError, setLoginError] = useState('');

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState('');

  const navigate = useNavigate();
  const getUsersFromStorage = () => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };

  const saveUsersToStorage = (users) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setLoginError('');

    const registeredUsers = getUsersFromStorage();
    const validUsers = [
      { username: "admin", password: "admin" },
      { username: "Joao", password: "admin" },
      { username: "Thiago", password: "admin" },
      { username: "Roberto", password: "admin" },
      { username: "Dagoberto", password: "admin" },
      ...registeredUsers
    ];

    const user = validUsers.find(
      (user) => user.username === loginUsuario && user.password === loginSenha
    );

    if (user) {
      setLogged(true);
      setLoggedUser(loginUsuario);
      localStorage.setItem('user', loginUsuario);
      localStorage.setItem('isLogged', 'true');
      navigate('/');
    } else {
      setLoginError("Usuário ou senha incorretos.");
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setRegisterError('');
    setRegistrationSuccess('');

    if (!registerUsername || !registerPassword || !confirmPassword) {
      setRegisterError('Todos os campos são obrigatórios.');
      return;
    }

    if (registerPassword !== confirmPassword) {
      setRegisterError('As senhas não coincidem.');
      return;
    }

    const registeredUsers = getUsersFromStorage();
    const userExists = registeredUsers.some(
      (user) => user.username === registerUsername
    );

    if (userExists) {
      setRegisterError('O nome de usuário já existe.');
      return;
    }

    const newUsers = [
      ...registeredUsers, 
      { username: registerUsername, password: registerPassword }
    ];
    
    saveUsersToStorage(newUsers);
    
    setRegisterUsername('');
    setRegisterPassword('');
    setConfirmPassword('');
    setRegistrationSuccess('Registro bem-sucedido! Agora você pode fazer login.');
  };

  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button 
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Entrar
          </button>
          <button 
            className={`tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Registrar
          </button>
        </div>

        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="loginUsername">Nome de usuário</label>
              <input 
                id="loginUsername"
                type="text" 
                value={loginUsuario}
                onChange={(e) => setLoginUsuario(e.target.value)}
                placeholder="Digite seu nome de usuário"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Senha</label>
              <input 
                id="loginPassword"
                type="password" 
                value={loginSenha}
                onChange={(e) => setLoginSenha(e.target.value)}
                placeholder="Digite sua senha"
                className="form-input"
              />
            </div>
            {loginError && (
              <div className="error-message">{loginError}</div>
            )}
            <button type="submit" className="auth-button">Entrar</button>
          </form>
        )}

        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label htmlFor="registerUsername">Nome de usuário</label>
              <input 
                id="registerUsername"
                type="text" 
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                placeholder="Escolha um nome de usuário"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="registerPassword">Senha</label>
              <input 
                id="registerPassword"
                type="password" 
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Escolha uma senha"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirme a senha</label>
              <input 
                id="confirmPassword"
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua senha"
                className="form-input"
              />
            </div>
            {registerError && (
              <div className="error-message">{registerError}</div>
            )}
            {registrationSuccess && (
              <div className="success-message">{registrationSuccess}</div>
            )}
            <button type="submit" className="auth-button">Registrar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;

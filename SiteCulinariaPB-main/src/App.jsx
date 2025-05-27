import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Pages/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Login from './Pages/Login';
import RecipeList from './Pages/RecipeList';
import RecipeDetail from './Pages/RecipeDetail';
import AddRecipe from './Pages/AddRecipe';
import Blog from './Pages/Blog';
import Videos from './Pages/Videos';
import Suggestions from './Pages/Suggestions';
import './App.css';

function App() {
  const [Logged, setLogged] = useState(false);
  const [LoggedUser, setLoggedUser] = useState('');

  const checkLoginStatus = () => {
    const user = localStorage.getItem('user');
    const isLogged = localStorage.getItem('isLogged') === 'true';
    
    if (isLogged && user) {
      setLogged(true);
      setLoggedUser(user);
    } else {
      setLogged(false);
      setLoggedUser('');
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const ProtectedRoute = ({ children }) => {
    return Logged ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className='container'>
      <Header 
        Logged={Logged} 
        setLogged={setLogged} 
        setLoggedUser={setLoggedUser} 
        LoggedUser={LoggedUser} 
      />
        
        <main className='main'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={
                <Login 
                  setLogged={setLogged} 
                  setLoggedUser={setLoggedUser} 
                />
              } 
            />
            
            <Route 
              path="/enviar" 
              element={
                <ProtectedRoute>
                  <AddRecipe />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/sugestoes" 
              element={
                <ProtectedRoute>
                  <Suggestions Logged={Logged} />
                </ProtectedRoute>
              } 
            />
            <Route path="/receitas" element={<RecipeList />} />
            <Route path="/receita/:id" element={<RecipeDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/videos" element={<Videos />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;

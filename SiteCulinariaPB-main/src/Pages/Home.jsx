import React from 'react';
import WelcomeRecomendations from '../Components/WelcomeRecomendations';
import WelcomeRecipes from '../Components/WelcomeRecipes';

const Home = () => {
  const loggedUser = localStorage.getItem('user');
  const isLogged = !!loggedUser;

  return (
    <>
      <div className='text-content'>
        {isLogged ? (
          <h2>Olá, seja bem-vindo! {loggedUser}!</h2>
        ) : (
          <h2>Olá, seja bem-vindo!</h2>
        )}
      </div>
      <WelcomeRecomendations />
      <WelcomeRecipes />
    </>
  );
};

export default Home;
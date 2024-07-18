// 404.tsx

import React from 'react';
import './Error.scss';
import LogoFace from '../../assets/logos/amidon_faceicon_transparent.png';

const Error404: React.FC = () => {
  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Erreur 404</h1>
        <p className="subtitle">
          La page que vous recherchez est introuvable ou vous ne pouvez pas la
          voir car vous n'êtes pas connecté.
        </p>
        <img className="logoface" src={LogoFace} alt="logo-amidon" />
        <a href="/" className="link">
          Retour à la page d'accueil
        </a>
      </div>
    </div>
  );
};

export default Error404;

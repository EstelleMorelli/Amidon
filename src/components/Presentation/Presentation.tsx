import { Link } from 'react-router-dom';
import './Presentation.scss';
import LogoFace from '../../assets/logos/amidon_faceicon_transparent.png';
import LogoText from '../../assets/logos/amidon_logo_text.png';

function Presentation() {
  return (
    <div className="presentation">
      <div className="presentation__intro">
        <img
          className="presentation__intro--logoface"
          src={LogoFace}
          alt="logo-amidon"
        ></img>
        <div className="presentation__intro--bloc">
          <img
            className="presentation__intro--logotext"
            src={LogoText}
            alt="logo-amidon"
          ></img>
          <div className="presentation__intro--text">
            <h4>
              La nouvelle plateforme de dons d'objets <br />
              <strong> entre amis</strong>,<strong> simple</strong> et
              <strong> pratique</strong> !
            </h4>
            <p>
              <span>Vous déménagez ou changez de déco ?</span> <br />
              Pas besoin d'envoyer des photos de vos objets à tous vos groupes.
              Créez un compte, ajoutez vos objets et partagez votre code donneur
              avec vos amis. Ils pourront facilement voir vos dons et faire des
              réservations.
            </p>
            <p>
              <span>On vous a partagé un code donneur ?</span> <br /> Vous allez
              pouvoir récupérer les trésors de vos amis ! Créer un compte,
              ajouter vos amis grâce à leurs codes donneur et réserver
              facilement les objets dont ils se séparent.
            </p>
            <div className="presentation__links">
              <Link
                to="/connexion"
                className="button-orange-simple presentation__links--button"
              >
                Se connecter
              </Link>
              <Link
                to="/inscription"
                className="button-orange-simple presentation__links--button"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presentation;

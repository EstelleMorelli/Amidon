import './Footer.scss';

// Import des éléments de nos dépendances installées :
import { Link } from 'react-router-dom';

// Import des éléments de notre store, fichier réglade d'axios et du localStorage:
import { useAppSelector } from '../../store/hooks-redux';

function Footer() {
  // On récupère l'élément booléen "logged" du state qui nous permet de savoir si on est connecté ou pas
  const logged = useAppSelector((state) => state.userReducer.logged);
  return (
    <footer className={logged ? 'footer' : 'footer footer__unlogged'}>
      <div className="footer__links">
        <Link to="/faq" style={{ color: '#000000' }}>
          <h2 className="footer__faq link">F.A.Q.</h2>
        </Link>
        <Link to="/mentions-legales" style={{ color: '#000000' }}>
          <h2 className="footer__legalmentions link">Mentions légales</h2>
        </Link>
        <Link to="/politique-confidentialite" style={{ color: '#000000' }}>
          <h2 className="footer__rgpd link">Politique de confidentialité</h2>
        </Link>
      </div>
      <p className="footer__credit">
        <span className="footer__credit__intro"> Site réalisé par :</span>
        <span> Marion Leblanc </span>
        <span> Romain Deschaseaux </span>
        <span> Yoan Salangros </span>
        <span> Estelle Morelli </span>
      </p>
    </footer>
  );
}

export default Footer;

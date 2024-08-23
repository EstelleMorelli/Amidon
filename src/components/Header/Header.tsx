import './Header.scss';
import LogoFullText from '../../assets/logos/amidon_logo_full_text.png';
// import SearchBar from './SearchBar/SearchBar';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Power } from 'react-feather';
import logout from '../../store/middlewares/logout';

function Header() {
  // On récupère l'élément booléen "logged" du state qui nous permet de savoir si on est connecté ou pas
  // Masquage de la fonctionnalité "recherche"
  // const logged = useAppSelector((state) => state.userReducer.logged);

  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  // On utilise le hook useNavigate de react-router-dom qui permet de naviguer sans recharger la page
  const navigate = useNavigate();

  // On récupère l'élément booléen "logged" du state qui nous permet de savoir si on est connecté ou pas
  const logged = useAppSelector((state) => state.userReducer.logged);

  return (
    <div className="header">
      <Link className="header__logo" to="/">
        <img
          className="header__logo--img"
          src={LogoFullText}
          alt="logo-amidon"
        ></img>
      </Link>
      <div className="header__disconnect">
        {/* On affiche le bouton de déconnexion si "logged" est vrai (=si on est connecté.e) */}
        {logged && (
          <button
            type="button"
            className="header__disconnect--button"
            onClick={() => {
              dispatch(logout());
              navigate('/');
            }}
          >
            <Power className="header__disconnect--icon" />
            <p className="header__disconnect--text">Se déconnecter</p>
          </button>
        )}
      </div>
      {/* Masquage de la fonctionnalité "recherche" // {logged && <SearchBar />} */}
    </div>
  );
}

export default Header;

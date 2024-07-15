import './Footer.scss'; //Import du scss de la page
// Import des éléments de nos dépendances installées :
import { Link, useNavigate } from 'react-router-dom';
import { Power } from 'react-feather';

// Import des éléments de notre store, fichier réglade d'axios et du localStorage:
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import { actionLogout } from '../../store/reducers/userReducer';
import { removeInfosFromStorage } from '../../utils/localStorage';
import {
  actionResetAppReducer,
  actionToggleIsAddFriendModalOpen,
} from '../../store/reducers/appReducer';

function Footer() {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  // On utilise le hook useNavigate de react-router-dom qui permet de naviguer sans recharger la page
  const navigate = useNavigate();

  // On récupère l'élément booléen "logged" du state qui nous permet de savoir si on est connecté ou pas
  const logged = useAppSelector((state) => state.userReducer.logged);

  let isAddFriendModalOpen = useAppSelector(
    (state) => state.appReducer.isAddFriendModalOpen
  );

  return (
    <footer className={logged ? 'footer' : 'footer footer__unlogged'}>
      {/* On affiche le bouton de déconnexion si "logged" est vrai (=si on est connecté.e) */}
      {logged && (
        <button
          className="footer__disconnect "
          onClick={() => {
            dispatch(actionLogout());
            dispatch(actionResetAppReducer());
            removeInfosFromStorage();
            if (isAddFriendModalOpen) {
              dispatch(actionToggleIsAddFriendModalOpen());
            }
            navigate('/');
          }}
        >
          {' '}
          <Power className="footer__disconnect--icon" />
          <p className="footer__disconnect--text">Se déconnecter</p>
        </button>
      )}
      <Link to="/faq" style={{ color: '#000000' }}>
        <h2 className="footer__faq">F.A.Q.</h2>
      </Link>
      <p className="footer__credit">
        <span> Marion Leblanc </span>
        <span> Romain Deschaseaux </span>
        <span> Yoan Salangros </span>
        <span> Estelle Morelli </span>
      </p>
    </footer>
  );
}

export default Footer;

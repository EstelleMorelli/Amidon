import AddFriendButton from '../AddFriendButton/AddFriendButton';
import './Nav.scss';
import { NavLink } from 'react-router-dom';
import { Home, User, Plus } from 'react-feather';
import { useAppDispatch } from '../../store/hooks-redux';
import { actionToggleIsAddFriendModalOpen } from '../../store/reducers/appReducer';

function Nav() {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  // Au click, on toggle le booléan isAddFriendModalOpen
  const handleAddFriendBtnClick = () => {
    dispatch(actionToggleIsAddFriendModalOpen());
  };
  return (
    <nav className="nav">
      <NavLink
        className="nav__item volumebutton"
        to="/"
        style={{ textDecoration: 'none' }}
      >
        <div className="mobile-only">
          <Home color="black" />
        </div>
        <span className="desktop-only">Accueil</span>
      </NavLink>
      <NavLink
        className="nav__item volumebutton"
        to="/mon_profil"
        style={{ textDecoration: 'none' }}
      >
        <div className="mobile-only">
          <User color="black" />
        </div>
        <span className="desktop-only">Mon Profil</span>
      </NavLink>
      <div className="nav__item volumebutton">
        <div className="mobile-only">
          <AddFriendButton />
        </div>
        <button
          type="button"
          onClick={handleAddFriendBtnClick}
          className="nav__item--button desktop-only"
        >
          Ajouter un ami
        </button>
      </div>
      <NavLink
        className="nav__item volumebutton"
        to="/produit/ajouter"
        style={{ textDecoration: 'none' }}
      >
        <div className="mobile-only">
          <Plus color="black" />
        </div>
        <span className="desktop-only">Ajouter un produit</span>
      </NavLink>
    </nav>
  );
}

export default Nav;

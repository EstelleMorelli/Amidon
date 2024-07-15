import './Header.scss';
import LogoFullText from '../../assets/logos/amidon_logo_full_text.png';
import SearchBar from './SearchBar/SearchBar';
import { useAppSelector } from '../../store/hooks-redux';
import { Link } from 'react-router-dom';

function Header() {
  // On récupère l'élément booléen "logged" du state qui nous permet de savoir si on est connecté ou pas
  // Masquage de la fonctionnalité "recherche"
  // const logged = useAppSelector((state) => state.userReducer.logged);

  return (
    <Link className="header" to="/">
      <img className="header__logo" src={LogoFullText} alt="logo-amidon"></img>
    </Link>
    // Masquage de la fonctionnalité "recherche"
    // {logged && <SearchBar />}
  );
}

export default Header;

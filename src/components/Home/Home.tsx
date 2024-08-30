import { useAppSelector } from '../../store/hooks-redux';
import Presentation from '../Presentation/Presentation';
import ProductCatalog from '../ProductCatalog/ProductCatalog';
import './Home.scss';

function Home() {
  // On récupère l'élément booléen "logged" du state qui nous permet de savoir si on est connecté ou pas
  const logged = useAppSelector((state) => state.userReducer.logged);

  return (
    <div className="home">
      {logged ? <ProductCatalog /> : <Presentation />}
      {/* Si l'utilisateur n'est pas connecté, c'est le composant Presentation qui s'affiche
      Si l'utilisateur est connecté, c'est le composant ProductCatalog qui s'affiche */}
    </div>
  );
}

export default Home;

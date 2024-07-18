// On importe le fichier .scss correspondant pour le style
import './App.scss';

// On importe un dépendance qui nous pertmet de nettoyer les entrée HTML pour éviter l'injection
import DOMPurify from 'dompurify';

// On importe les composants Routes et Route de react-router-dom qui vont automatiquement faire le routing en liant les composants qu'on mettra dedans aux url indiqués
import { Route, Routes } from 'react-router-dom';

// On importe tous les composants qui vont être appelés à partir de App
import Nav from '../Nav/Nav';
import Home from '../Home/Home';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import SelfProfil from '../SelfProfil/SelfProfil';
import ProfilSettings from '../ProfilSettings/ProfilSettings';
import Product from '../Product/Product';
import AddProductForm from '../AddProductForm/AddProductForm';
import FAQ from '../FAQ/FAQ';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Error from '../Error/Error';

// On importe le hook useDispatch() de redux -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';

// On importe notre action de changement contrôlé de champs de formulaire venant de notre userReducer
import {
  actionChangeGiverStateInfo,
  actionChangeUserStateInfo,
} from '../../store/reducers/userReducer';

import AddFriendModal from '../AddFriendModal/AddFriendModal';
import { actionChangeProductStateInfo } from '../../store/reducers/catalogReducer';

function App() {
  // On récupère l'élément booléen "logged" du state qui nous permet de savoir si on est connecté ou pas
  const logged = useAppSelector((state) => state.userReducer.logged);

  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  // Fonction qui dispatch une action au userReducer pour changer une donnée de userConnected dans le state en fonction du name (=le nom de la donnée) tout en nettoyant la valeur passée des caractères html pour éviter une injection
  const changeUserField = (
    value: string,
    name:
      | 'lastname'
      | 'firstname'
      | 'email'
      | 'password'
      | 'picture'
      | 'color'
      | 'description'
  ) => {
    dispatch(
      actionChangeUserStateInfo({
        fieldName: name,
        newValue: DOMPurify.sanitize(value),
      })
    );
  };

  const changeGiverField = (
    value: string,
    name: 'lastname' | 'firstname' | 'share_code'
  ) => {
    dispatch(
      actionChangeGiverStateInfo({
        fieldName: name,
        newValue: DOMPurify.sanitize(value),
      })
    );
  };

  const changeProductField = (
    value: string,
    name: 'title' | 'price' | 'description'
  ) => {
    dispatch(
      actionChangeProductStateInfo({
        fieldName: name,
        newValue: DOMPurify.sanitize(value),
      })
    );
  };

  // On récupère les booléans isAddFriendModalOpen et isWarningMessage du state pour afficher ou pas la div de blur
  const isAddFriendModalOpen = useAppSelector(
    (state) => state.appReducer.isAddFriendModalOpen
  );
  const isWarningMessage = useAppSelector(
    (state) => state.appReducer.isWarningMessage
  );

  return (
    <div className="App">
      {(isAddFriendModalOpen || isWarningMessage) && (
        <div className="backgroundblur" />
      )}
      <Header />
      {logged && <Nav />}
      <Routes>
        <Route
          path="/connexion"
          element={<LoginForm changeField={changeUserField} />}
        />
        <Route
          path="/inscription"
          element={<RegisterForm changeField={changeUserField} />}
        />
        <Route path="/" element={<Home />} />
        {logged && (
          <>
            <Route
              path="/produit/:id"
              element={<Product changeField={changeProductField} />}
            />
            <Route
              path="/produit/ajouter"
              element={<AddProductForm changeField={changeProductField} />}
            />
            <Route path="/mon_profil" element={<SelfProfil />} />
            <Route
              path="/mon_profil/parametre"
              element={<ProfilSettings changeField={changeUserField} />}
            />
          </>
        )}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      {isAddFriendModalOpen && (
        <AddFriendModal changeField={changeGiverField} />
      )}
      <Footer />
    </div>
  );
}

export default App;

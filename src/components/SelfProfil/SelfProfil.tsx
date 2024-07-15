import './SelfProfil.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Plus, Trash2, X } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import DeleteWarningMessage from '../DeleteWarningModal/DeleteWarningModal';
import ProfilCard from '../ProfilCard/ProfilCard';
import ProductCard from '../ProductCard/ProductCard';
import getSelfProducts from '../../store/middlewares/getSelfProducts';
import getFollowers from '../../store/middlewares/getFollowers';
import { IFriendProduct } from '../../@types/product';
import deleteFollower from '../../store/middlewares/deleteFollower';
import { baseUserPictureURL } from '../../utils/data';
import ScrollUpButton from '../ProductCatalog/ScrollUpButton/ScrollUpButton';
import deleteUser from '../../store/middlewares/deleteUser';

function SelfProfil() {
  const [followerToDelete, setFollowerToDelete] = useState(0);
  const [isWarningMessage, setIsWarningMessage] = useState(false);
  const [modalName, setModalName] = useState('');
  const [selectedFollower, setSelectedFollower] = useState<null | number>(null);
  const connectedUser = useAppSelector(
    (state) => state.userReducer.connectedUser
  );
  const dispatch = useAppDispatch();

  const handleFollowerFilter = (follower: IFriendProduct) => {
    if (selectedFollower === follower.id) {
      setSelectedFollower(null);
    } else {
      setSelectedFollower(follower.id);
    }
  };
  // Récupération de ses propres produits depuis le state pour affichage des ProductsCards
  const selfProducts = useAppSelector(
    (state) => state.catalogReducer.selfProducts
  );
  // Récupération des followers depuis le state pour l'affichage des ProfilCard
  const followers = useAppSelector((state) => state.catalogReducer.followers);
  useEffect(() => {
    dispatch(getFollowers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // On relance le rendu quand la liste de follower a changé (suite à une suppression)
  useEffect(() => {
    dispatch(getSelfProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On parcours les produit pour placer en premier ceux qui sont bookés dans le tableau productsBookedSort et ensuite ceux qui ne le sont pas. On applatit le résultat avec la fonction flat() pour n'obtenir qu'un seul tableau.
  const productsBookedSort = [
    selfProducts.filter((product) => product.booker != null),
    selfProducts.filter((product) => product.booker === null),
  ].flat();

  let productsToDisplay = [];

  // si on a un filtre actif sur un ami booker, on ne veut afficher que les produits qu'il nous a réservé
  if (selectedFollower) {
    productsToDisplay = selfProducts.filter(
      (product) => product.booker?.id === selectedFollower
    );
    // Sinon, on affiche nos propres produits avec le tri des bookés en premier.
  } else {
    productsToDisplay = [...productsBookedSort];
  }

  return (
    <div className="selfprofil">
      <div className="selftprofil--selfinfos">
        <img
          className="selfprofil--selfinfos__picture"
          src={`${baseUserPictureURL}/${connectedUser.picture}`}
          alt="votre profil"
        />
        <div className="selfprofil--selfinfos__sharecode">
          <h3>Mon code de partage :</h3>
          <div>{connectedUser.share_code}</div>
          <Link to="/mon_profil/parametre">Modifier mon profil</Link>
        </div>
      </div>
      <h1>Mes produits</h1>
      <div className="addproduct">
        <Link
          className="addproduct__button"
          to="/produit/ajouter"
          style={{ textDecoration: 'none' }}
        >
          <div>
            <Plus color="black" />
          </div>
          <span className="addproduct__button--text">Ajouter un produit</span>
        </Link>
      </div>
      {followers.length > 0 && (
        <h4>
          Filtrer mes produits réservés, <br /> par ami suivant mon profil :
        </h4>
      )}
      <div className="followerscards-wrapper">
        {followers &&
          followers.map((follower) => (
            <div
              key={follower.id}
              className="followerscards-wrapper__profilcard"
            >
              <button
                type="button"
                className="followerscards-wrapper__profilcard--delete"
                onClick={() => {
                  setFollowerToDelete(follower.id);
                  setModalName('follower');
                  setIsWarningMessage(true);
                }}
              >
                <X />
              </button>
              {modalName === 'follower' && isWarningMessage && (
                <DeleteWarningMessage
                  setIsWarningMessage={setIsWarningMessage}
                  description="supprimer ce follower"
                  deleteAction={deleteFollower}
                  actionParam={followerToDelete}
                  navigateLocation="/mon_profil"
                />
              )}
              <div
                className={`friendfilterbutton ${
                  selectedFollower === follower.id
                    ? 'friendfilterbutton--active'
                    : ''
                }`}
                onClick={() => handleFollowerFilter(follower)}
                // Cela informe les technologies d'assistance que cela divse comporte comme un bouton
                role="button"
                // Cela rend le divfocusable à l'aide du clavier.
                tabIndex={0}
                // OnKeyDown permet aux lecteurs d'écran de faire l'action de cliquer car une div n'est normalement pas clicable avec ces appareils
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    handleFollowerFilter(follower);
                  }
                }}
              >
                <ProfilCard key={follower.id} friend={follower} />
              </div>
            </div>
          ))}
      </div>
      <div className="productcards-wrapper">
        {productsToDisplay &&
          productsToDisplay.map((product) => (
            <div key={product.id}>
              {product.booker && (
                <img
                  className="booker-picture"
                  style={{ borderColor: `${product.booker.color}` }}
                  src={`${baseUserPictureURL}/${product.booker.picture}`}
                  alt=""
                />
              )}
              <Link
                key={product.id}
                to={`/produit/${product.id}`}
                style={{ textDecoration: 'none' }}
              >
                <ProductCard key={product.id} product={product} />
              </Link>
            </div>
          ))}
      </div>
      <ScrollUpButton />
      <button
        type="button"
        className="selfprofil__deleteAccount button-orange-simple"
        onClick={() => {
          setModalName('account');
          setIsWarningMessage(true);
        }}
      >
        <Trash2 className="selfprofil__deleteAccount--icon" />
        <p className="selfprofil__deleteAccount--text">Supprimer mon compte</p>
      </button>
      {isWarningMessage && modalName === 'account' && (
        <DeleteWarningMessage
          setIsWarningMessage={setIsWarningMessage}
          description="supprimer votre compte"
          deleteAction={deleteUser}
          navigateLocation="/"
        />
      )}
    </div>
  );
}

export default SelfProfil;

import './SelfProfil.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Check, Plus, Trash2, X } from 'react-feather';
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
import { actionToggleIsWarningMessage } from '../../store/reducers/appReducer';
import { actionEmptyCatalogMsg } from '../../store/reducers/catalogReducer';

function SelfProfil() {
  const [followerToDelete, setFollowerToDelete] = useState(0);
  const [modalName, setModalName] = useState('');
  const [selectedFollower, setSelectedFollower] = useState<null | number>(null);
  const connectedUser = useAppSelector(
    (state) => state.userReducer.connectedUser
  );
  const isWarningMessage = useAppSelector(
    (state) => state.appReducer.isWarningMessage
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

  // On relance le rendu quand la liste de follower a changé (suite à une suppression)
  useEffect(() => {
    dispatch(getFollowers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(actionEmptyCatalogMsg());
    dispatch(getSelfProducts());
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

  const errorMsg = useAppSelector((state) => state.catalogReducer.errorMsg);
  const okMsg = useAppSelector((state) => state.catalogReducer.okMsg);

  return (
    <div className="selfprofil">
      {errorMsg && (
        <div className="msgBox">
          {errorMsg.map((errorMsg) => (
            <p key={errorMsg} className="errorMsg">
              <X size={15} className="errorMsg--icon" />
              <span className="errorMsg--text">{errorMsg}</span>
            </p>
          ))}
        </div>
      )}
      {okMsg && (
        <div className="msgBox">
          {okMsg.map((okMsg) => (
            <p key={okMsg} className="okMsg">
              <Check size={15} className="okMsg--icon" />
              <span className="okMsg--text">{okMsg}</span>
            </p>
          ))}
        </div>
      )}
      <div className="selfprofil--desktop">
        <div className="selfprofil--selfinfos">
          <img
            className="selfprofil--selfinfos__picture"
            src={`${baseUserPictureURL}/${connectedUser.picture}`}
            alt="votre profil"
          />
          <div className="selfprofil--selfinfos__sharecode">
            <h3>Mon code de partage :</h3>
            <div>{connectedUser.share_code}</div>
            <Link className="link" to="/mon_profil/parametre">
              Modifier mon profil
            </Link>
          </div>
        </div>
        <div className="selfprofil--myproducts">
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
              <span className="addproduct__button--text">
                Ajouter un produit
              </span>
            </Link>
          </div>
        </div>
        <div className="selfprofil--followers">
          {followers.length > 0 && (
            <h4>
              Filtrer mes produits réservés, <br className="desktop-only-br" />
              par ami suivant mon profil :
            </h4>
          )}
          <div className="followerscards-wrapper">
            <div className="followerscards-wrapper-flexbox">
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
                        dispatch(actionToggleIsWarningMessage());
                      }}
                    >
                      <X />
                    </button>
                    {modalName === 'follower' && isWarningMessage && (
                      <DeleteWarningMessage
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
          </div>
        </div>
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
          dispatch(actionToggleIsWarningMessage());
        }}
      >
        <Trash2 className="selfprofil__deleteAccount--icon" />
        <p className="selfprofil__deleteAccount--text">Supprimer mon compte</p>
      </button>
      {isWarningMessage && modalName === 'account' && (
        <DeleteWarningMessage
          description="supprimer votre compte"
          deleteAction={deleteUser}
          navigateLocation="/"
        />
      )}
    </div>
  );
}

export default SelfProfil;

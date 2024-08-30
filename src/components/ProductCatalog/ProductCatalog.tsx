// import { Children } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, X } from 'react-feather';
import unfollow from '../../store/middlewares/unfollow';
import AddFriendButton from '../AddFriendButton/AddFriendButton';
import ProfilCard from '../ProfilCard/ProfilCard';
import DateFilterButton from './DateFilterButton/DateFilterButton';
import './ProductCatalog.scss';
import ScrollUpButton from './ScrollUpButton/ScrollUpButton';
import PricelessFilterButton from './PricelessFilterButton/PricelessFilterButton';
import ProductCard from '../ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import getProductsCatalog from '../../store/middlewares/getProductsCatalog';
import { IFriendProduct, IProduct } from '../../@types/product';
import DeleteWarningMessage from '../DeleteWarningModal/DeleteWarningModal';
import { actionToggleIsWarningMessage } from '../../store/reducers/appReducer';
import { actionEmptyCatalogMsg } from '../../store/reducers/catalogReducer';
import { actionEmptyUserMsg } from '../../store/reducers/userReducer';

function ProductCatalog() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsCatalog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(actionEmptyCatalogMsg());
    dispatch(actionEmptyUserMsg());
  }, []);

  const errorMsg = useAppSelector((state) => state.catalogReducer.errorMsg);
  const okMsg = useAppSelector((state) => state.catalogReducer.okMsg);

  const [friendToDelete, setFriendToDelete] = useState(0);
  // On récupère la liste de nos givers stockés dans le state redux dans une constante qu'on appelle friends.
  const friends = useAppSelector(
    (state) => state.catalogReducer.friendProducts
  );
  // On créé un state local qui garde en mémoire si le filtre de selection sur un giver est activé en stockant son id.  Par défaut il est null.
  const [selectedFriend, setSelectedFriend] = useState<null | number>(null);
  // state local qui garde en mémoire si le filtre des produits 100% gratuits est activé. Par défaut, il est faux.
  const [pricelessFilter, setPricelessFilter] = useState(false);
  // state local qui garde en mémoire si le tri des produits par date d'ajout est activé. Par défaut il est vrai.
  const [createdAtSort, setCreatedAtSort] = useState(true);
  // Fonction de gestion du filtre sur un giver. Elle reçoit en paramètre le giver sur lequel on a cliqué.
  const handleFriendFilter = (friend: IFriendProduct) => {
    // Si le giver sur lequel on a cliqué est le même qui était déjà stocké dans le state local selectedFriend alors on fait l'action de retirer le filtre.
    if (selectedFriend === friend.id) {
      setSelectedFriend(null);
    } else {
      // Sinon on remplace le state local par l'id du giver sur lequel on a cliqué
      setSelectedFriend(friend.id);
    }
  };
  // On déclare un tableau de produit à afficher vide, et on va le remplir en fonction des différents tri ou filtres actifs.
  let productsToDisplay = [];
  // Si on a précedemment cliqué sur une icone d'un giver, cela passe l'id de ce giver en tant que valeur de selectedFriend.
  // Donc si SelectedFriend n'est pas null,
  if (selectedFriend) {
    // on remplit le tableau productsToDisplay en recherchant dans le tableau friends extrait du state celui qui possède l'id,
    // et on retourne ses produits possedés
    productsToDisplay =
      friends.find((friend) => friend.id === selectedFriend)?.own_products ||
      [];
  } else {
    // la fonction flatMap permet de combiner la fonction map pour parcourir un tableau, et flat pour un aplanir le résultat
    // (avoir un tableau de données plutôt qu'un tableau de tableaux de données)
    productsToDisplay = friends.flatMap((friend) => friend.own_products || []);
  }
  // Si le filtre des produits gratuits est actif : on remplit le tableau productsToDisplay avec un filtre des produits ayant un prix a 0.
  if (pricelessFilter) {
    productsToDisplay = productsToDisplay.filter(
      (product) => product.price === 0
    );
  }

  // Si le tri par date est actif (et par défaut il l'est), on exécute la fonction de tri des produits par created_at
  if (createdAtSort && productsToDisplay) {
    const sortProductsByCreatedAt = (products: IProduct[]): IProduct[] => {
      // Créer une copie du tableau avant de le trier car le tableau productsToDisplay passé en paramètre (products) est immuable
      const productsCopy = [...products];
      return productsCopy.sort((a, b) => {
        const dateA = a.created_at ? a.created_at.toString() : '';
        const dateB = b.created_at ? b.created_at.toString() : '';
        return Date.parse(dateB) - Date.parse(dateA); // Trier en ordre décroissant pour avoir les derniers ajouts en premier
      });
    };
    productsToDisplay = sortProductsByCreatedAt(productsToDisplay);
  }

  const isWarningMessage = useAppSelector(
    (state) => state.appReducer.isWarningMessage
  );
  return (
    <div className="productcatalog">
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
      <div className="friendscards-wrapper">
        <div className="friendscards-wrapper__add">
          <AddFriendButton /> {/* Bouton pour ajouter un ami */}
          {friends.length === 0 && (
            <>
              <ArrowLeft />
              <p>Ajouter votre 1er ami !</p>
            </>
          )}
        </div>
        {friends.map((friend) => (
          <div key={friend.id} className="friendscards-wrapper__profilcard">
            <button
              type="button"
              className="friendscards-wrapper__profilcard--delete"
              onClick={() => {
                setFriendToDelete(friend.id);
                dispatch(actionToggleIsWarningMessage());
              }}
            >
              <X />
            </button>
            {isWarningMessage && (
              <DeleteWarningMessage
                description="supprimer cet ami donneur"
                deleteAction={unfollow}
                actionParam={friendToDelete}
                navigateLocation="/"
              />
            )}
            <div
              className={`friendfilterbutton ${
                selectedFriend === friend.id ? 'friendfilterbutton--active' : ''
              }`}
              onClick={() => handleFriendFilter(friend)}
              // Cela informe les technologies d'assistance que cela divse comporte comme un bouton
              role="button"
              // Cela rend le divfocusable à l'aide du clavier.
              tabIndex={0}
              // OnKeyDown permet aux lecteurs d'écran de faire l'action de cliquer car une div n'est normalement pas clicable avec ces appareils
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handleFriendFilter(friend);
                }
              }}
            >
              <ProfilCard key={friend.id} friend={friend} />
            </div>{' '}
          </div>
        ))}
      </div>
      <div className="filters">
        <DateFilterButton
          setCreatedAtSort={setCreatedAtSort}
          createdAtSort={createdAtSort}
        />
        {/* Bouton pour trier par date */}
        <PricelessFilterButton
          setPricelessFilter={setPricelessFilter}
          pricelessFilter={pricelessFilter}
        />
        {/* Bouton pour filtrer les produits gratuits */}
      </div>
      <div className="productcards-wrapper">
        {productsToDisplay.map((product) => (
          <Link
            key={product.id}
            to={`/produit/${product.id}`}
            style={{ textDecoration: 'none' }}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
      <ScrollUpButton />
    </div>
  );
}

export default ProductCatalog;

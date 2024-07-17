// import { Children } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'react-feather';
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
import { actionToggleIsCatalogUpdateNeeded } from '../../store/reducers/userReducer';
import getFollowers from '../../store/middlewares/getFollowers';
import DeleteWarningMessage from '../DeleteWarningModal/DeleteWarningModal';
import {
  actionEmptyImage64,
  actionToggleIsWarningMessage,
} from '../../store/reducers/appReducer';

function ProductCatalog() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsCatalog());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [friendToDelete, setFriendToDelete] = useState(0);

  const friends = useAppSelector(
    (state) => state.catalogReducer.friendProducts
  );

  const [selectedFriend, setSelectedFriend] = useState<null | number>(null);
  const [pricelessFilter, setPricelessFilter] = useState(false);
  const [createdAtSort, setCreatedAtSort] = useState(true);
  const handleFriendFilter = (friend: IFriendProduct) => {
    if (selectedFriend === friend.id) {
      setSelectedFriend(null);
    } else {
      setSelectedFriend(friend.id);
    }
  };
  // On déclare un tableau de produit à afficher vide, et on va le remplir en fonction des différents tri ou filtres actifs.
  let productsToDisplay = [];
  // Si le on clic sur une icone d'un ami, cela passe l'id de cet ami en tant que valeur de selectedFriend.
  if (selectedFriend) {
    productsToDisplay =
      friends.find((friend) => friend.id === selectedFriend)?.own_products ||
      [];
  } else {
    // la fonction flatMap permet de combiner la fonction map pour parcourir un tableau, et flat pour un aplanir le résultat (avoir un tableau de données plutôt qu'un tableau de tableaux de données)
    productsToDisplay = friends.flatMap((friend) => friend.own_products || []);
  }
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
    (state) => state.appReducer.isWarninMessage
  );

  return (
    <div className="productcatalog">
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

import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Trash2 } from 'react-feather';
import BookButton from './BookButton/BookButton';
import FixedProductInfos from './FixedProductInfos/FixedProductInfos';
import './Product.scss';
import ProductUpdateForm from './ProductUpdateForm/ProductUpdateForm';
import { useAppSelector, useAppDispatch } from '../../store/hooks-redux';
import getProductDetail from '../../store/middlewares/getProductDetail';
import bookAProduct from '../../store/middlewares/bookAProduct';
import deleteProduct from '../../store/middlewares/deleteProduct';

import { baseProductPictureURL, baseUserPictureURL } from '../../utils/data';
import { actionOpenPictureZoom } from '../../store/reducers/appReducer';
import PictureZoom from '../PictureZoomModal/PictureZoomModal';
import DeleteWarningMessage from '../DeleteWarningModal/DeleteWarningModal';

interface Props {
  changeField: (value: string, name: 'title' | 'price' | 'description') => void;
}

function Product({ changeField }: Props) {
  const dispatch = useAppDispatch();
  const [isWarningMessage, setIsWarningMessage] = useState(false);
  const isPictureZoomOpen = useAppSelector(
    (state) => state.appReducer.pictureZoom.isPictureZoomOpen
  );
  const currentPictureForZoom = useAppSelector(
    (state) => state.appReducer.pictureZoom.currentPicture
  );
  const handlePictureZoom = (currentPicture: string) => {
    dispatch(actionOpenPictureZoom({ currentPicture }));
  };
  const actionMessage = useAppSelector(
    (state) => state.catalogReducer.actionMessage
  );
  const connectedUserId = useAppSelector(
    (state) => state.userReducer.connectedUser.id
  );
  // Récupération de l'id de l'objet grace au paramètre id de l'URL
  const { id } = useParams();
  const idNumber = Number(id);
  // Au premier rendu, on veut dispatch l'action de récupération du détail du produit
  useEffect(() => {
    dispatch(getProductDetail(idNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, idNumber]);
  const product = useAppSelector(
    (state) => state.catalogReducer.currentProduct
  );
  const handleBookingClick = () => {
    dispatch(
      bookAProduct({
        id: idNumber,
        bookerId: connectedUserId,
      })
    );
  };
  const handleBookCancel = () => {
    dispatch(bookAProduct({ id: idNumber, bookerId: null }));
  };

  return (
    <div className="product">
      <h4> Produit proposé par : </h4>
      <div className="product--owner">
        <p className="product--owner__name">
          {product.owner.firstname} {product.owner.lastname}
        </p>
        {product.owner.picture && (
          <img
            className="product--owner__picture"
            src={`${baseUserPictureURL}/${product.owner.picture}`}
            alt="ami"
          />
        )}
      </div>
      <div className="product--product-infos">
        {connectedUserId === product.owner.id ? (
          <div>
            <ProductUpdateForm
              changeField={changeField}
              productId={idNumber}
              medias={product.media}
            />
          </div>
        ) : (
          <FixedProductInfos product={product} medias={product.media} />
        )}
      </div>
      {actionMessage && <p style={{ color: 'green' }}> {actionMessage} </p>}
      {product.booker ? (
        <>
          <p> Ce produit est déjà réservé </p>
          {(product.booker.id === connectedUserId ||
            product.owner.id === connectedUserId) && (
            <button
              type="button"
              className="button-orange-simple"
              onClick={handleBookCancel}
            >
              Annuler la réservation
            </button>
          )}
        </>
      ) : (
        <BookButton handleBookingClick={handleBookingClick} />
      )}
      {product.owner.id === connectedUserId && (
        <button
          type="button"
          className="product__deleteButton button-orange-simple"
          onClick={() => {
            setIsWarningMessage(true);
          }}
        >
          {' '}
          <Trash2 className="product__deleteButton--icon" />
          <p className="product__deleteButton--text">Supprimer ce produit</p>
        </button>
      )}
      {isWarningMessage && (
        <DeleteWarningMessage
          setIsWarningMessage={setIsWarningMessage}
          description="supprimer ce produit"
          deleteAction={deleteProduct}
          actionParam={idNumber}
          navigateLocation="/mon_profil"
        />
      )}
    </div>
  );
}

export default Product;

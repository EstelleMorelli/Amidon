import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { X } from 'react-feather';
import Field from '../../Field/Field';
import './ProductUpdateForm.scss';
import { useAppSelector, useAppDispatch } from '../../../store/hooks-redux';
import updateProduct from '../../../store/middlewares/updateProduct';
import { baseProductPictureURL } from '../../../utils/data';
import {
  actionOpenPictureZoom,
  actionResetAppReducer,
} from '../../../store/reducers/appReducer';
import PictureZoom from '../../PictureZoomModal/PictureZoomModal';

import deleteProductPicture from '../../../store/middlewares/deleteProductPicture';
import convertBase64 from '../../../store/middlewares/convertBase64';
import addProduct from '../../../store/middlewares/addProduct';
import { useNavigate } from 'react-router-dom';
import getProductDetail from '../../../store/middlewares/getProductDetail';
import { actionResetCurrentProductState } from '../../../store/reducers/catalogReducer';

interface Props {
  changeField: (value: string, name: 'title' | 'price' | 'description') => void;
  productId: number;
  medias: {
    url: string | undefined;
  }[];
}
function ProductUpdateForm({ changeField, productId, medias }: Props) {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [picturesList, setPicturesList] = useState(['']);
  const [mediasToDisplay, setMediasToDisplay] = useState(medias);
  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, []);
  useEffect(() => {
    setMediasToDisplay(medias);
  }, [medias]);
  const description = useAppSelector(
    (state) => state.catalogReducer.currentProduct.description
  );
  const title = useAppSelector(
    (state) => state.catalogReducer.currentProduct.title
  );
  const price = useAppSelector((state) =>
    state.catalogReducer.currentProduct.price.toString()
  );
  const handleChangeField =
    (name: 'title' | 'price' | 'description') => (value: string) => {
      changeField(value, name);
    };
  // Fonction qui va mettre à jour le state avec les infos rentrées par l'utilisateur dans les champs, en live
  const handleChangeDescriptionField = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    changeField(event.target.value, 'description');
  };
  const handlePictureZoom = (currentPicture: string) => {
    dispatch(actionOpenPictureZoom({ currentPicture }));
  };
  const isPictureZoomOpen = useAppSelector(
    (state) => state.appReducer.pictureZoom.isPictureZoomOpen
  );
  const currentPictureForZoom = useAppSelector(
    (state) => state.appReducer.pictureZoom.currentPicture
  );
  const handlePictureDelete = (urlToRemove: string) => {
    dispatch(deleteProductPicture({ id: productId, url: urlToRemove }));
    dispatch(actionResetCurrentProductState());
    dispatch(getProductDetail(productId));
  };
  const handleNewPicture = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setPicturesList([...picturesList, event.target.files[0].name]);
      dispatch(convertBase64(event.target.files[0]));
    }
  };
  const pictures = useAppSelector((state) => state.appReducer.image64);
  // A la soumission du formulaire, on empêche de renvoyer une requête http (car on est Single Page Application) et on dispatche l'action de change (qui va envoyer les infos par l'API et modifier l'utilisateur dans la BDD)
  const handleSubmitUpdateProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mediaPayload = pictures.map((picture) => {
      return { image64: picture };
    });
    const newProductInfos = {
      infos: { title, price, description, media: mediaPayload },
      id: productId,
    };
    setPicturesList(['']);
    dispatch(actionResetAppReducer());
    dispatch(actionResetCurrentProductState());
    dispatch(updateProduct(newProductInfos));
    dispatch(getProductDetail(productId));
  };

  return (
    <div className="productupdateform">
      {mediasToDisplay[0] && (
        <div className="mainpicture__wrapper">
          <button
            type="button"
            data-url={mediasToDisplay[0].url}
            className="deleteImageButton"
            onClick={() => {
              handlePictureDelete(mediasToDisplay[0].url);
            }}
          >
            <X />
          </button>
          <img
            className="product--picture__main"
            key={mediasToDisplay[0].url}
            src={`${baseProductPictureURL}/${medias[0].url}`}
            alt=""
          />
        </div>
      )}
      <div className="product--pictures">
        {mediasToDisplay &&
          mediasToDisplay.slice(1).map((picture) => (
            <div key={picture.url} className="product--picture__wrapper">
              <button
                type="button"
                data-url={picture.url}
                className="deleteImageButton"
                onClick={(event) => {
                  handlePictureDelete(event.currentTarget.dataset.url);
                }}
              >
                <X />
              </button>
              <button
                className="product--pictures__item"
                type="button"
                key={picture.url}
                onClick={() => handlePictureZoom(picture.url)}
              >
                <img
                  src={`${baseProductPictureURL}/${picture.url}`}
                  alt="détail du produit"
                  style={{ display: 'block' }}
                />
              </button>
            </div>
          ))}
      </div>
      {isPictureZoomOpen && <PictureZoom picture={currentPictureForZoom} />}
      <form className="form-full" onSubmit={handleSubmitUpdateProduct}>
        <Field
          fieldDisplayedName="Titre de l'annonce"
          type="text"
          onChange={handleChangeField('title')}
          placeholder=""
          value={title}
          required
          search={false}
          edit
        />
        <Field
          fieldDisplayedName="Prix proposé (privilégier les dons !)"
          type="text"
          onChange={handleChangeField('price')}
          placeholder=""
          value={price}
          required={false}
          search={false}
          edit
          // TBC s'il faudra mettre true ou si ça marche tout seul car la BDD met 0 par défaut si null, au cas où l'utilisateur supprime le zéro mis par défaut
        />
        <p>
          <label htmlFor="description">
            <span>Description :</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={description}
            onChange={handleChangeDescriptionField}
          />
        </p>
        <ul style={{ listStyleType: 'none', textAlign: 'left' }}>
          {picturesList.map((picture) => (
            <li key={picture}>{picture}</li>
          ))}
        </ul>
        <input
          type="file"
          placeholder=""
          required={false}
          onChange={handleNewPicture}
          accept=".bmp, .jpeg, .jpg, .png, .svg, .webp, .avif"
        />

        <button type="submit">Valider les modifications</button>
      </form>
    </div>
  );
}

export default ProductUpdateForm;

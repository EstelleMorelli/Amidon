import './AddProductForm.scss';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Field from '../Field/Field';
import { useAppSelector, useAppDispatch } from '../../store/hooks-redux';
import addProduct from '../../store/middlewares/addProduct';
import convertBase64 from '../../store/middlewares/convertBase64';
import { actionResetCurrentProductState } from '../../store/reducers/catalogReducer';
import { actionResetAppReducer } from '../../store/reducers/appReducer';

interface Props {
  changeField: (value: string, name: 'title' | 'price' | 'description') => void;
}

function AddProductForm({ changeField }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [picturesList, setPicturesList] = useState(['']);
  useEffect(() => {
    dispatch(actionResetCurrentProductState());
  }, []);
  const description = useAppSelector(
    (state) => state.catalogReducer.currentProduct.description
  );
  const title = useAppSelector(
    (state) => state.catalogReducer.currentProduct.title
  );
  const price = useAppSelector((state) =>
    state.catalogReducer.currentProduct.price.toString()
  );
  const pictures = useAppSelector((state) => state.appReducer.image64);
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

  // A la soumission du formulaire, on empêche de renvoyer une requête http (car on est Single Page Application) et on dispatche l'action de change (qui va envoyer les infos par l'API et modifier l'utilisateur dans la BDD)
  const handleSubmitAddProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const media = pictures.map((picture) => {
      return { image64: picture };
    });
    const newProductInfos = {
      title,
      price,
      description,
      media,
    };
    setPicturesList(['']);
    dispatch(addProduct(newProductInfos));
    dispatch(actionResetAppReducer());
    navigate('/mon_profil');
  };

  const handleNewPicture = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setPicturesList([...picturesList, event.target.files[0].name]);
      dispatch(convertBase64(event.target.files[0]));
    }
  };
  return (
    <div className="addproductpage">
      <h1> Ajouter un produit </h1>
      <form
        className="addproductform form-full"
        onSubmit={handleSubmitAddProduct}
      >
        <Field
          fieldDisplayedName="Title"
          value={title}
          type="text"
          placeholder="Veuillez saisir un titre"
          required={false}
          search={false}
          edit
          onChange={handleChangeField('title')}
        />
        <div className="descriptionfield">
          <label className="mediafield--inputlabel">Description</label>
          <textarea
            name="description"
            rows={5}
            placeholder="Veuillez saisir une description de votre objet et décrire son état."
            required
            onChange={handleChangeDescriptionField}
          />
        </div>
        <Field
          fieldDisplayedName="Price"
          value={price}
          type="number"
          placeholder="0"
          required={false}
          search={false}
          edit
          onChange={handleChangeField('price')}
        />
        <div className="mediafield">
          <label className="mediafield--inputlabel">Photo(s)</label>
          <ul
            style={{
              listStyleType: 'none',
              textAlign: 'center',
              padding: '0',
            }}
          >
            {picturesList.map((picture) => (
              <li key={picture}>{picture}</li>
            ))}
          </ul>
          <label
            htmlFor="file-upload"
            className="mediafield--filefakeinput button-orange-simple"
          >
            Cliquer pour télécharger votre photo
            <input
              id="file-upload"
              className="mediafield--fileinput"
              type="file"
              placeholder=""
              required={false}
              onChange={handleNewPicture}
              accept=".bmp, .jpeg, .jpg, .png, .svg, .webp, .avif"
            />
          </label>
        </div>
        <button type="submit" className="button-orange-simple">
          VALIDER
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;

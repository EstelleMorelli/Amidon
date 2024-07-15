import { ChangeEvent, FormEvent } from 'react';
import Field from '../../Field/Field';
import './ProductUpdateForm.scss';
import { useAppSelector, useAppDispatch } from '../../../store/hooks-redux';
import updateProduct from '../../../store/middlewares/updateProduct';

interface Props {
  changeField: (value: string, name: 'title' | 'price' | 'description') => void;
  productId: number;
}
function ProductUpdateForm({ changeField, productId }: Props) {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();
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

  // A la soumission du formulaire, on empêche de renvoyer une requête http (car on est Single Page Application) et on dispatche l'action de change (qui va envoyer les infos par l'API et modifier l'utilisateur dans la BDD)
  const handleSubmitUpdateProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newProductInfos = {
      infos: { title, price, description },
      id: productId,
    };
    dispatch(updateProduct(newProductInfos));
  };
  return (
    <div className="productupdateform">
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
        <button type="submit">Modifier les informations</button>
      </form>
    </div>
  );
}

export default ProductUpdateForm;

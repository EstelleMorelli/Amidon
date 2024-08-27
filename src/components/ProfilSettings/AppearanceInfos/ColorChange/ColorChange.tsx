import './ColorChange.scss';
import { ArrowDown, ArrowRight } from 'react-feather';
import { ChangeEvent, FormEvent, useRef } from 'react';
import ProductCard from '../../../ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks-redux';
import modifyUser from '../../../../store/middlewares/modifyUser';
import DefaultPicture from '../../../../assets/logos/amidon_logo_full.png';

interface ColorChangeProps {
  changeField: (value: string, name: 'color') => void;
}

function ColorChange({ changeField }: ColorChangeProps) {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  const selfProducts = useAppSelector(
    (state) => state.catalogReducer.selfProducts
  );

  const color = useAppSelector(
    (state) => state.userReducer.connectedUser.color
  );

  const initialColor = useRef<string>(color);

  // Fonction qui va mettre à jour le state avec les infos rentrées par l'utilisateur dans les champs, en live
  const handlechangeColorField = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    changeField(event.target.value, 'color');
  };

  // A la soumission du formulaire, on empêche de renvoyer une requête http (car on est Single Page Application) et on dispatche l'action de change (qui va envoyer les infos par l'API et modifier l'utilisateur dans la BDD)
  const handleSubmitChangeUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const infos = { color };
    dispatch(modifyUser(infos));
  };

  const handleSetBackColorField = (
    event: ChangeEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    changeField(initialColor.current, 'color');
    dispatch(modifyUser({ color: initialColor.current }));
  };

  return (
    <div className="colorchange">
      <div className="colorchange__visual">
        <ProductCard
          product={
            selfProducts.length !== 0
              ? selfProducts[0]
              : {
                  id: 0,
                  title: 'Titre de votre produit',
                  description: 'Description de votre produit',
                  price: 0,
                  created_at: '',
                  updated_at: null,
                  media: [{ url: DefaultPicture }],
                }
          }
        />
      </div>
      <div>
        <form onSubmit={handleSubmitChangeUser}>
          <div className="colorchange__selector">
            <p>
              Cliquer pour changer la couleur d&#39;ombre sur les vignettes des
              produits et de réservation
            </p>
            <ArrowDown className="colorchange__selector--icon" />
            <div
              className="colorchange__selector--input--box"
              style={{ backgroundColor: color }}
            >
              <input
                className="colorchange__selector--input--field"
                type="color"
                value={color}
                onChange={handlechangeColorField}
              />
            </div>
          </div>
          <button
            className="colorchange__selector--input--button button-orange-simple"
            type="submit"
          >
            Valider la couleur
          </button>
        </form>
        <form onSubmit={handleSetBackColorField} className="back">
          <button
            className="colorchange__selector--input--button--back button-orange-simple"
            type="submit"
          >
            <input type="hidden" value={initialColor.current} />
            Annuler les changements de couleur
          </button>
        </form>
      </div>
    </div>
  );
}

export default ColorChange;

import { Edit } from 'react-feather';
import Field from '../../Field/Field';
import './SelfInfos.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks-redux';
import { ChangeEvent, FormEvent } from 'react';
import modifyUser from '../../../store/middlewares/modifyUser';

interface SelfInfosFormProps {
  changeField: (
    value: string,
    name: 'lastname' | 'firstname' | 'description'
  ) => void;
}
function SelfInfos({ changeField }: SelfInfosFormProps) {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  // Fonction qui va mettre à jour le state avec les infos rentrées par l'utilisateur dans les champs, en live
  const handleChangeField =
    (name: 'lastname' | 'firstname' | 'description') => (value: string) => {
      changeField(value, name);
    };

  // Fonction qui va mettre à jour le state avec les infos rentrées par l'utilisateur dans les champs, en live
  const handleChangeDescriptionField = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    changeField(event.target.value, 'description');
  };

  // On récupère les différentes données du state (qui ont donc été changées en même temps que l'utilisateur écrivait)
  const firstname = useAppSelector(
    (state) => state.userReducer.connectedUser.firstname
  );
  const lastname = useAppSelector(
    (state) => state.userReducer.connectedUser.lastname
  );
  const description = useAppSelector(
    (state) => state.userReducer.connectedUser.description
  );

  // A la soumission du formulaire, on empêche de renvoyer une requête http (car on est Single Page Application) et on dispatche l'action de change (qui va envoyer les infos par l'API et modifier l'utilisateur dans la BDD)
  const handleSubmitChangeUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const infos = { firstname, lastname, description };
    dispatch(modifyUser(infos));
  };

  return (
    <div className="selfinfos">
      <form className="form-full" onSubmit={handleSubmitChangeUser}>
        <div>
          <Field
            fieldDisplayedName="Prénom"
            instructions="Entre 2 et 50 caractères"
            type="text"
            placeholder=""
            value={firstname}
            onChange={handleChangeField('firstname')}
            required={false}
            search={false}
            edit={true}
          />
        </div>
        <div>
          <Field
            fieldDisplayedName="Nom"
            instructions="Entre 2 et 50 caractères"
            type="text"
            placeholder=""
            value={lastname}
            onChange={handleChangeField('lastname')}
            required={false}
            search={false}
            edit={true}
          />
        </div>
        <div className="selfinfos__description">
          <label htmlFor="description">
            <span className="selfinfos__description--title">Description :</span>
          </label>
          <p className="field__instructions">(Maximum 500 caractères)</p>
          <textarea
            className="selfinfos__description--textarea"
            id="description"
            name="description"
            rows={5}
            value={description ? description : ''}
            onChange={handleChangeDescriptionField}
          />
          <span className="selfinfos__description--icon">
            <Edit />
          </span>
        </div>
        <button className="button-orange-simple" type="submit">
          Modifier les informations
        </button>
      </form>
    </div>
  );
}

export default SelfInfos;

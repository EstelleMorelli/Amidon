import './RegisterForm.scss';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Field from '../Field/Field';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import register from '../../store/middlewares/register';
import convertBase64 from '../../store/middlewares/convertBase64';

interface LoginFormProps {
  changeField: (
    value: string,
    name: 'lastname' | 'firstname' | 'email' | 'password' | 'picture'
  ) => void;
}

function RegisterForm({ changeField }: LoginFormProps) {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  // Fonction qui va mettre à jour le state avec les infos rentrées par l'utilisateur dans les champs, en live
  const handleChangeField =
    (name: 'lastname' | 'firstname' | 'email' | 'password' | 'picture') =>
    (value: string) => {
      changeField(value, name);
    };

  // On récupère les différentes données du state (qui ont donc été changées en même temps que l'utilisateur écrivait)
  const email = useAppSelector(
    (state) => state.userReducer.connectedUser.email
  );
  const password = useAppSelector(
    (state) => state.userReducer.connectedUser.password
  );
  const firstname = useAppSelector(
    (state) => state.userReducer.connectedUser.firstname
  );
  const lastname = useAppSelector(
    (state) => state.userReducer.connectedUser.lastname
  );

  const msg = useAppSelector((state) => state.userReducer.msg);
  const logged = useAppSelector((state) => state.userReducer.logged);

  // On créer un state local pour le check de password car pas besoin ailleur
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordFitErrorMsg, setPasswordFitErrorMsg] = useState('');

  // On utilise le hook useNavigate de react-router-dom qui permet de naviguer sans recharger la page
  const navigate = useNavigate();

  // A la soumission du formulaire, on empêche de renvoyer une requête http (car on est Single Page Application) et on dispatche l'action de register (qui va envoyer les infos par l'API et créer un nouvel utilisateur dans la BDD puis faire l'action login) si les mots de passe match + on ajuste le message d'erreur lié au password selon le cas
  const handleSubmitNewUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === passwordCheck) {
      setPasswordFitErrorMsg('');
      dispatch(register());
    } else {
      setPasswordFitErrorMsg('Les mots de passe ne correspondent pas.');
    }
  };

  // On crée un élément "fixe" qui ne se redéclenche pas au rechargement des composants
  const renderCount = useRef(0);
  renderCount.current += 1;

  // On ne fait la redirection que si nous ne sommes pas au 1er rendu et que le msg n'est pas vide
  useEffect(() => {
    if (renderCount.current > 1) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged]);

  const handleChangePictureField = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files && event.target.files[0]) {
      dispatch(convertBase64(event.target.files[0]));
    }
  };

  return (
    <div className="registerpage">
      <h1>Inscription</h1>
      <form className="registerform form-full" onSubmit={handleSubmitNewUser}>
        <p className="form-full__mandatoryfieldswarning">
          Les champs obligatoires sont suivis par un
          <span aria-label="required">*</span>
        </p>
        <div className="registerform__desktop-flexbox">
          <Field
            fieldDisplayedName="Nom"
            type="text"
            placeholder="Merci de saisir votre nom de famille"
            value={lastname}
            onChange={handleChangeField('lastname')}
            required
            search={false}
            edit={false}
          />
          <Field
            fieldDisplayedName="Prénom"
            type="text"
            placeholder="Votre prénom"
            value={firstname}
            onChange={handleChangeField('firstname')}
            required
            search={false}
            edit={false}
          />
          <Field
            fieldDisplayedName="Adresse mail"
            type="email"
            placeholder="Votre adresse mail pour le compte"
            onChange={handleChangeField('email')}
            value={email}
            required
            search={false}
            edit={false}
          />
          <input
            type="file"
            placeholder=""
            required={false}
            onChange={handleChangePictureField}
            accept="image/*"
          />
          <Field
            fieldDisplayedName="Mot de passe"
            type="password"
            placeholder="Saisir un mot de passe"
            onChange={handleChangeField('password')}
            value={password}
            required
            search={false}
            edit={false}
          />
          <Field
            fieldDisplayedName="Confirmation du mot de passe"
            type="password"
            placeholder="Merci de confirmer le mot de passe saisi"
            onChange={setPasswordCheck}
            value={passwordCheck}
            required
            search={false}
            edit={false}
          />
        </div>

        {passwordFitErrorMsg && (
          <p className="errorMsg">{passwordFitErrorMsg}</p>
        )}
        {msg && <p className="errorMsg">{msg}</p>}

        {/* Masquage de la fonctionnalité "rester connecté" */}
        {/* <p className="registerform__stayconnected">
          <label htmlFor="stayconnected">
            <span>Rester connecté</span>
          </label>
          <input
            type="checkbox"
            id="stayconnected"
            name="stayconnected"
            className="registerform__stayconnected--box"
          />
        </p> */}
        <button type="submit" className="button-orange-simple">
          VALIDER
        </button>
      </form>

      <Link to="/connexion" className="loginlink">
        J&#39;ai déjà un compte
      </Link>
    </div>
  );
}

export default RegisterForm;

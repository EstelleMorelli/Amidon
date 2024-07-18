import './RegisterForm.scss';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Field from '../Field/Field';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import register from '../../store/middlewares/register';
import convertBase64 from '../../store/middlewares/convertBase64';
import {
  actionChangeUserStateInfo,
  actionEmptyUserMsg,
} from '../../store/reducers/userReducer';
import { actionEmptyImage64 } from '../../store/reducers/appReducer';
import { X } from 'react-feather';

interface LoginFormProps {
  changeField: (
    value: string,
    name: 'lastname' | 'firstname' | 'email' | 'password' | 'picture'
  ) => void;
}

function RegisterForm({ changeField }: LoginFormProps) {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  // A l'arrivée sur la page, on vide le password d'userState au cas où l'utilisateur vienne de la page login (mais on garde l'email pour plus de confort) et l'image64 au cas où il revienne d'une autre page, après avoir déjà chargé une image, pour ne pas en avoir 2.
  useEffect(() => {
    dispatch(actionEmptyImage64());
    dispatch(
      actionChangeUserStateInfo({ newValue: '', fieldName: 'password' })
    );
    dispatch(actionEmptyUserMsg());
  }, []);

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

  const errorMsg = useAppSelector((state) => state.userReducer.errorMsg);
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
          <div className="mediafield">
            <label className="mediafield--inputlabel">Photo de profil</label>
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
                onChange={handleChangePictureField}
                accept=".bmp, .jpeg, .jpg, .png, .svg, .webp, .avif"
              />
            </label>
          </div>

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
          <p className="errorMsg">
            <X size={15} className="errorMsg--icon" />{' '}
            <span className="errorMsg--text">{passwordFitErrorMsg}</span>
          </p>
        )}
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

      <Link to="/connexion" className="link">
        J&#39;ai déjà un compte
      </Link>
    </div>
  );
}

export default RegisterForm;

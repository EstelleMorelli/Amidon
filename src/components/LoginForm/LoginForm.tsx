import './LoginForm.scss'; //Import du scss de la page
// Import des composants utilisés :
import Field from '../Field/Field';
// Import des éléments de nos dépendances installées :
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useRef } from 'react';
// Import des éléments de notre store :
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import login from '../../store/middlewares/login';

// Interface pour typer les props de notre composant Loginform :
interface LoginFormProps {
  changeField: (value: string, name: 'email' | 'password') => void;
}

function LoginForm({ changeField }: LoginFormProps) {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  // Fonction qui va mettre à jour le state avec les infos rentrées par l'utilisateur dans les champs, en live
  const handleChangeField = (name: 'email' | 'password') => (value: string) => {
    changeField(value, name);
  };

  // On récupère l'email et le password du state (qui ont donc été changés en même temps que l'utilisateur écrivait), ainsi que le status logged
  const email = useAppSelector(
    (state) => state.userReducer.connectedUser.email
  );
  const password = useAppSelector(
    (state) => state.userReducer.connectedUser.password
  );
  const msg = useAppSelector((state) => state.userReducer.msg);
  const logged = useAppSelector((state) => state.userReducer.logged);

  // On utilise le hook useNavigate de react-router-dom qui permet de naviguer sans recharger la page
  const navigate = useNavigate();

  // A la soumission du formulaire, on empêche de renvoyer une requête http (car on est Single Page Application), on dispatche l'action de login (qui va envoyer email et mdp par l'API et check qu'il existe dans la BDD) puis quand login a fini, on redirige vers l'accueil
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login());
  };

  // On crée un élément "fixe" qui ne se redéclenche pas au rechargement des composants
  const renderCount = useRef(0);
  renderCount.current += 1;

  // On ne fait la redirection que si nous ne sommes pas au 1er rendu et que le msg n'est pas vide
  useEffect(() => {
    if (renderCount.current > 1) {
      navigate('/');
    }
  }, [logged]);

  return (
    <div className="loginpage">
      <h1>Connexion</h1>
      <form className="loginform form-full" onSubmit={handleSubmit}>
        <p className="form-full__mandatoryfieldswarning">
          Les champs obligatoires sont suivis par un
          <span aria-label="required"> *</span>
        </p>
        <Field
          fieldDisplayedName="Adresse mail"
          type="email"
          placeholder="Votre adresse mail de compte"
          onChange={handleChangeField('email')}
          value={email}
          required={true}
          search={false}
          edit={false}
        ></Field>
        <Field
          fieldDisplayedName="Mot de passe"
          type="password"
          placeholder="Votre mot de passe"
          onChange={handleChangeField('password')}
          value={password}
          required={true}
          search={false}
          edit={false}
        ></Field>
        {msg && <p className="errorMsg">{msg}</p>}
        {/* Masquage de la fonctionnalité "rester connecté" */}
        {/* <p className="loginform__stayconnected">
          <label htmlFor="stayconnected">
            <span>Rester connecté</span>
          </label>
          <input
            type="checkbox"
            id="stayconnected"
            name="stayconnected"
            className="loginform__stayconnected--box"
          />
        </p> */}
        <button type="submit" className="button-orange-simple">
          Se connecter
        </button>
      </form>
      <Link to="/inscription" className="registerlink">
        Créer un compte
      </Link>
    </div>
  );
}

export default LoginForm;

import { FormEvent, useEffect, useState } from 'react';
import Field from '../../Field/Field';
import './PasswordChange.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks-redux';
import modifyUser from '../../../store/middlewares/modifyUser';
import {
  actionChangeUserStateInfo,
  actionEmptyUserMsg,
} from '../../../store/reducers/userReducer';
import { X } from 'react-feather';
interface PasswordFormProps {
  changeField: (value: string, name: 'password') => void;
}
function PasswordChange({ changeField }: PasswordFormProps) {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  useEffect(() => {
    setOldPassword('');
    setConfirmationPassword('');
    dispatch(
      actionChangeUserStateInfo({ newValue: '', fieldName: 'password' })
    );
  }, []);

  const handleChangeField = (name: 'password') => (value: string) => {
    changeField(value, name);
  };

  const newPassword = useAppSelector(
    (state) => state.userReducer.connectedUser.password
  );

  const [oldPassword, setOldPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [passwordFitErrorMsg, setPasswordFitErrorMsg] = useState('');

  const handleSubmitChangePassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(actionEmptyUserMsg());
    if (newPassword === confirmationPassword) {
      const infos = { password: oldPassword, newPassword };
      setPasswordFitErrorMsg('');
      dispatch(modifyUser(infos));
      setOldPassword('');
      setConfirmationPassword('');
    } else {
      setPasswordFitErrorMsg('Les mots de passe ne correspondent pas.');
    }
  };

  return (
    <div className="passwordchange">
      <form className="form-full" onSubmit={handleSubmitChangePassword}>
        <div className="passwordchange__fields">
          <Field
            fieldDisplayedName="Mot de passe actuel"
            instructions="Minimum 8 caractères dont 1 majuscule et 1 caractère spécial"
            type="password"
            onChange={(value: string) => setOldPassword(value)}
            placeholder=""
            value={oldPassword}
            required={true}
            search={false}
            edit={true}
          />
          <Field
            fieldDisplayedName="Nouveau mot de passe"
            instructions="Minimum 8 caractères dont 1 majuscule et 1 caractère spécial"
            type="password"
            onChange={handleChangeField('password')}
            placeholder=""
            // Comment faire pour que le champs soit vide si on a commencé à mettre un nouveau mot de passe et on a changé de page (donc il est changé dans le state)
            value={newPassword}
            required={true}
            search={false}
            edit={true}
          />
          <Field
            fieldDisplayedName="Confirmer le nouveau mot de passe"
            instructions="Minimum 8 caractères dont 1 majuscule et 1 caractère spécial"
            type="password"
            onChange={(value: string) => setConfirmationPassword(value)}
            placeholder=""
            value={confirmationPassword}
            required={true}
            search={false}
            edit={true}
          />
        </div>
        {passwordFitErrorMsg && (
          <p className="errorMsg">
            <X size={15} className="errorMsg--icon" />{' '}
            <span className="errorMsg--text">{passwordFitErrorMsg}</span>
          </p>
        )}
        <button className="button-orange-simple" type="submit">
          Modifier le mot de passe
        </button>
      </form>
    </div>
  );
}

export default PasswordChange;

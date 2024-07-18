import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import AppearanceInfos from './AppearanceInfos/AppearanceInfos';
import MailAndSharecode from './MailAndSharecode/MailAndSharecode';
import PasswordChange from './PasswordChange/PasswordChange';
import './ProfilSettings.scss';
import SelfInfos from './SelfInfos/SelfInfos';
import { actionEmptyUserMsg } from '../../store/reducers/userReducer';
import { Check, X } from 'react-feather';

interface ProfilFormProps {
  changeField: (
    value: string,
    name:
      | 'lastname'
      | 'firstname'
      | 'email'
      | 'password'
      | 'picture'
      | 'description'
      | 'color'
  ) => void;
}

function ProfilSettings({ changeField }: ProfilFormProps) {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  // A l'arrivée sur la page, on vide le password d'userState au cas où l'utilisateur vienne de la page login (mais on garde l'email pour plus de confort) et l'image64 au cas où il revienne d'une autre page, après avoir déjà chargé une image, pour ne pas en avoir 2.
  useEffect(() => {
    dispatch(actionEmptyUserMsg());
  }, []);

  const errorMsg = useAppSelector((state) => state.userReducer.errorMsg);
  const okMsg = useAppSelector((state) => state.userReducer.okMsg);
  return (
    <div className="profilsettings">
      <h1>Mes informations</h1>
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
      {okMsg && (
        <div className="msgBox">
          {okMsg.map((okMsg) => (
            <p key={okMsg} className="okMsg">
              <Check size={15} className="okMsg--icon" />
              <span className="okMsg--text">{okMsg}</span>
            </p>
          ))}
        </div>
      )}
      <div className="profilsettings__all">
        <div className="profilsettings__all--butpassword">
          <div className="profilsettings__all--butpassword--andappaerance">
            <MailAndSharecode />
            <SelfInfos changeField={changeField} />
          </div>
          <AppearanceInfos changeField={changeField} />
        </div>
        <PasswordChange changeField={changeField} />
      </div>
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
      {okMsg && (
        <div className="msgBox">
          {okMsg.map((okMsg) => (
            <p key={okMsg} className="okMsg">
              <Check size={15} className="okMsg--icon" />
              <span className="okMsg--text">{okMsg}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilSettings;

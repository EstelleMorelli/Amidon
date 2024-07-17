import AppearanceInfos from './AppearanceInfos/AppearanceInfos';
import MailAndSharecode from './MailAndSharecode/MailAndSharecode';
import PasswordChange from './PasswordChange/PasswordChange';
import './ProfilSettings.scss';
import SelfInfos from './SelfInfos/SelfInfos';

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
  return (
    <div className="profilsettings">
      <h1>Mes informations</h1>
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
    </div>
  );
}

export default ProfilSettings;

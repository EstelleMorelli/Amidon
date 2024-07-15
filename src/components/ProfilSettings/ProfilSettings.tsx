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
      <MailAndSharecode />
      {/* TODO : changer en une fonction réutilisable */}
      <SelfInfos changeField={changeField} />
      <AppearanceInfos changeField={changeField} />
      <PasswordChange changeField={changeField} />
    </div>
  );
}

export default ProfilSettings;

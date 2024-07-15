import './AppearanceInfos.scss';
import ColorChange from './ColorChange/ColorChange';
import PictureChange from './PictureChange/PictureChange';

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

function AppearanceInfos({ changeField }: ProfilFormProps) {
  return (
    <div className="appearanceinfos form-full">
      <PictureChange />
      <ColorChange changeField={changeField} />
    </div>
  );
}

export default AppearanceInfos;

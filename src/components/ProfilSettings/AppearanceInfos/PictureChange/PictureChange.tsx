import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks-redux';
import './PictureChange.scss';
import { Upload } from 'react-feather';
import modifyUser from '../../../../store/middlewares/modifyUser';
import convertBase64 from '../../../../store/middlewares/convertBase64';
import { baseUserPictureURL } from '../../../../utils/data';

function PictureChange() {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  const picture = useAppSelector(
    (state) => state.userReducer.connectedUser.picture
  );

  const handleSubmitChangeUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const infos = { picture: '' };
    dispatch(modifyUser(infos));
  };

  const handleChangePictureField = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files && event.target.files[0]) {
      dispatch(convertBase64(event.target.files[0]));
    }
  };

  return (
    <div className="picturechange">
      <img
        className="picturechange--picture"
        src={`${baseUserPictureURL}/${picture}`}
        alt="ma_photo"
      />
      <form onSubmit={handleSubmitChangeUser}>
        <div className="picturechange--field">
          <input
            type="file"
            placeholder=""
            required={false}
            onChange={handleChangePictureField}
            accept="image/*"
          />
        </div>
        <button className="picturechange--button button-orange-simple">
          <Upload size={28} />
          <span>Télécharger une autre photo de profil</span>
        </button>
      </form>
    </div>
  );
}

export default PictureChange;

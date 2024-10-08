import { FormEvent, useEffect } from 'react';
import { CheckCircle, XCircle, X, Check } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import searchGiver from '../../store/middlewares/searchGiver';
import { actionToggleIsAddFriendModalOpen } from '../../store/reducers/appReducer';
import Field from '../Field/Field';
import ProfilCard from '../ProfilCard/ProfilCard';
import './AddFriendModal.scss';
import follow from '../../store/middlewares/follow';
import {
  actionResetGiverInfo,
  actionEmptySearchedGiver,
  actionEmptyUserMsg,
} from '../../store/reducers/userReducer';

interface LoginFormProps {
  changeField: (
    value: string,
    name: 'lastname' | 'firstname' | 'share_code'
  ) => void;
}

function AddFriendModal({ changeField }: LoginFormProps) {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionEmptyUserMsg());
  }, []);

  // Au click, on toggle le booléan isAddFriendModalOpen
  const handleXBtnClick = () => {
    dispatch(actionToggleIsAddFriendModalOpen());
    dispatch(actionResetGiverInfo());
  };

  // Fonction qui va mettre à jour le state avec les infos rentrées par l'utilisateur dans les champs, en live
  const handleChangeField = (name: 'share_code') => (value: string) => {
    changeField(value, name);
  };

  // On récupère le sharecode du state (qui a donc été changé en même temps que l'utilisateur écrivait)
  const shareCode = useAppSelector(
    (state) => state.userReducer.searchedGiver.share_code
  );
  const searchedGiver = useAppSelector(
    (state) => state.userReducer.searchedGiver
  );
  const firstname = useAppSelector(
    (state) => state.userReducer.searchedGiver.firstname
  );

  const errorMsg = useAppSelector((state) => state.userReducer.errorMsg);
  const okMsg = useAppSelector((state) => state.userReducer.okMsg);

  const handleSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(searchGiver());
  };

  const handleSubmitConfirmation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(follow());
  };

  const handleSubmitCancellation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(actionEmptySearchedGiver());
  };

  return (
    <div className="addfriendmodal form-full">
      <button
        className="addfriendmodal__button--close"
        type="button"
        onClick={handleXBtnClick}
      >
        <X />
      </button>
      <p className="form-full__mandatoryfieldswarning">
        Les champs obligatoires sont suivis par un
        <span aria-label="required"> *</span>
      </p>
      <form onSubmit={handleSubmitSearch}>
        <div className="addfriendmodal__searchfield">
          <Field
            fieldDisplayedName="Entrer le code de partage de votre ami"
            type="text"
            placeholder="Exemple : 4325315810"
            onChange={handleChangeField('share_code')}
            value={shareCode}
            required
            search
            edit={false}
          />
        </div>
      </form>
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
      {firstname && (
        <div className="addfriendmodal__searchresult">
          <ProfilCard friend={searchedGiver} />
          <div className="addfriendmodal__searchresult--buttons">
            <form onSubmit={handleSubmitConfirmation}>
              <button type="submit">
                <CheckCircle color="green" />
              </button>
            </form>
            <form onSubmit={handleSubmitCancellation}>
              <button type="submit">
                <XCircle color="red" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddFriendModal;

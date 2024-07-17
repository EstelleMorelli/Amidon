import { useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { CheckCircle, XCircle } from 'react-feather';
import { useAppDispatch } from '../../store/hooks-redux';
import { actionToggleIsWarningMessage } from '../../store/reducers/appReducer';

interface Props {
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteAction: any;
  // eslint-disable-next-line react/require-default-props
  actionParam?: number;
  navigateLocation: string;
}

function DeleteWarningMessage({
  description,
  deleteAction,
  actionParam,
  navigateLocation,
}: Props) {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmitConfirmation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (actionParam !== undefined) {
      dispatch(deleteAction(actionParam));
    } else {
      dispatch(deleteAction());
    }
    dispatch(actionToggleIsWarningMessage());
    if (navigateLocation) {
      navigate(navigateLocation);
    }
  };

  const handleSubmitCancellation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(actionToggleIsWarningMessage());
  };

  return (
    <div className="addfriendmodal form-full">
      <h2>Êtes-vous sûr de vouloir {description} ?</h2>
      <div className="addfriendmodal__searchresult">
        <div className="addfriendmodal__searchresult--buttons">
          <form onSubmit={handleSubmitConfirmation}>
            <button type="submit">
              <CheckCircle color="green" /> Oui, {description} définitivement.
            </button>
          </form>
          <form onSubmit={handleSubmitCancellation}>
            <button type="submit">
              <XCircle color="red" /> Non, annuler la suppression .
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteWarningMessage;

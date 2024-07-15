import './AddFriendButton.scss';
import { UserPlus } from 'react-feather';
import { useAppDispatch } from '../../store/hooks-redux';
import { actionToggleIsAddFriendModalOpen } from '../../store/reducers/appReducer';

function AddFriendButton() {
  // stock dans une variable dispatch le Hook useAppDispatch() (version typée du hook useDispatch() de redux) -> C'est ce qui envoie une action au store et exécute le reducer avec l'info de cette action à faire
  const dispatch = useAppDispatch();

  // Au click, on toggle le booléan isAddFriendModalOpen
  const handleAddFriendBtnClick = () => {
    dispatch(actionToggleIsAddFriendModalOpen());
  };

  return (
    <div className="addfriendbutton volumebutton">
      <button type="button" onClick={handleAddFriendBtnClick}>
        <UserPlus />
      </button>
    </div>
  );
}

export default AddFriendButton;

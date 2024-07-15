import './ProfilCard.scss';
import ProfilIcon from '../../assets/logos/amidon_logo_icon.png';
import { IFriendProduct } from '../../@types/product';
import { IFriend, IUser } from '../../@types/user';
import { baseUserPictureURL } from '../../utils/data';

interface Props {
  friend: IFriendProduct | IFriend | IUser;
}
function ProfilCard({ friend }: Props) {
  // Si l'ami n'a pas de photo de profil : il aura une image par défaut
  const picture = friend.picture ? friend.picture : ProfilIcon;
  const firstnameCapitalized =
    friend.firstname.charAt(0).toUpperCase() + friend.firstname.slice(1);
  const lastnameInitial = friend.lastname.slice(0, 1);

  return (
    <div className="profilcard">
      {picture && (
        <img
          className="profilcard--picture"
          src={`${baseUserPictureURL}/${picture}`}
          alt="ami"
        />
      )}
      <p>
        {firstnameCapitalized} {lastnameInitial}
      </p>
    </div>
  );
}

export default ProfilCard;

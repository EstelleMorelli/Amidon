import { useAppSelector } from '../../../store/hooks-redux';
import './MailAndSharecode.scss';

function MailAndSharecode() {
  const shareCode = useAppSelector(
    (state) => state.userReducer.connectedUser.share_code
  );
  const mail = useAppSelector((state) => state.userReducer.connectedUser.email);

  return (
    <div className="mailandsharecode form-full">
      <div>
        <h4>Mon code de partage</h4>
        <p className="fakefield">{shareCode}</p>
      </div>
      <div>
        <h4>Mon email de compte</h4>
        <p className="fakefield">{mail}</p>
      </div>
    </div>
  );
}

export default MailAndSharecode;

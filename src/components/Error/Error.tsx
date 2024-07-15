import { Link } from 'react-router-dom';
import './Error.scss';

function Error() {
  return (
    <div className="error">
      <p>
        <span> 404 NOT FOUND </span>
        Oups, une erreur est survenue ! La page demandée n &rsquo; existe pas...
      </p>
      <Link to="/">
        <h2 className="error"> Retourner à la page d &rsquo; accueil</h2>
      </Link>
    </div>
  );
}

export default Error;

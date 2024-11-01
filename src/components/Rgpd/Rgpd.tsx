import { Link } from 'react-router-dom';
import './Rgpd.scss';

function Rgpd() {
  return (
    <div className="rgpd__container">
      <h1 className="rgpd__title">Politique de confidentialité</h1>
      <div className="rgpd__content">
        <p>
          Les informations recueillies sur ce site sont enregistrées dans une
          base de donnée informatisée par les propriétaires de l'application (
          Marion LEBLANC, Romain DESCHASEAUX, Yoan SALANGROS et Estelle MORELLI
          / email de contact : amidon.contact@gmail.com) pour garantir le bon
          fonctionnement du site et des fonctionnalités de mise en relation
          entre utilisateurs. Les données facultatives sont collectées pour
          améliorer l'expérience d'utilisation de site web. La base légale du
          traitement est le consentement.
        </p>
        <span>
          <br />
        </span>
        <p>
          Les données collectées seront communiquées aux seuls destinataires
          suivants : les propriétaires de l'application et les utilisateurs de
          l'application pour les données hors nom de famille complet.
        </p>
        <span>
          <br />
        </span>
        <p>
          Les données sont conservées pendant la durée d'existance du compte
          utilisateur. Vous pouvez accéder aux données vous concernant, les
          rectifier, demander leur effacement ou exercer votre droit à la
          limitation du traitement de vos données. Vous pouvez retirer à tout
          moment votre consentement au traitement de vos données. Vous pouvez
          également vous opposer au traitement de vos données.
        </p>
        <span>
          <br />
        </span>
        <p>
          Consultez le site cnil.fr pour plus d’informations sur vos droits.
          Pour exercer ces droits ou pour toute question sur le traitement de
          vos données dans ce dispositif, vous pouvez contacter les
          propriétéaires de l'application. Si vous estimez, après nous avoir
          contactés, que vos droits « Informatique et Libertés » ne sont pas
          respectés, vous pouvez adresser une réclamation à la CNIL.
        </p>
      </div>
      <p className="rgpd__update">
        <strong>Date de la dernière mise à jour :</strong> 01/11/2024
      </p>

      <Link to="/" className="link">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default Rgpd;

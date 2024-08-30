import './LegalMentions.scss';

function LegalMentions() {
  return (
    <div className="container">
      <h1 className="title">
        {' '}
        Mentions Légales et Conditions d &#39 Utilisation{' '}
      </h1>
      <h2 className="subtitle">1. Présentation de l&#39Application</h2>
      <p className="content">
        La plateforme Amidon (ci-après dénommée &#34 l&#39Application &#34) est
        une application web qui facilite le don d&#39objets entre amis. Elle
        permet aux utilisateurs de partager des objets dont ils souhaitent se
        séparer, avec leurs amis via un code donneur, et de réserver des objets
        mis à disposition par leurs contacts. Bien que l&#39Application
        privilégie le don gratuit, les utilisateurs ont également la possibilité
        de fixer un prix pour leurs objets. Toutefois, l&#39Application ne prend
        pas en charge les transactions financières, ni la messagerie entre
        utilisateurs, les échanges se faisant en main propre.
      </p>

      <h2 className="subtitle">2. Propriétaire de l&#39Application </h2>
      <p className="content">
        {' '}
        Les proprétaires de l&#39application sont Marion LEBLANC, Romain
        DESCHASEAUX, Yoan SALANGROS et Estelle MORELLI
      </p>
      <p>Email : amidon.contact@gmail.com</p>
      <h2 className="subtitle">
        {' '}
        3. Acceptation des Conditions d&#39;Utilisation{' '}
      </h2>
      <p className="content">
        En utilisant l&#39;Application, les utilisateurs acceptent les présentes
        conditions d&#39;utilisation. Si un utilisateur n&#39;accepte pas ces
        conditions, il doit cesser immédiatement d&#39;utiliser
        l&#39;Application. Le propriétaire se réserve le droit de modifier les
        présentes conditions à tout moment. Les utilisateurs seront informés des
        modifications via l&#39;Application ou par email.
      </p>

      <h2 className="subtitle">
        Inscription et Utilisation de l&#39;Application
      </h2>
      <h3>4.1. Inscription</h3>
      <p className="content">
        Pour utiliser l&#39;Application, les utilisateurs doivent créer un
        compte en fournissant des informations exactes et à jour. Les
        utilisateurs sont responsables de la confidentialité de leurs
        identifiants de connexion et de toute activité effectuée sous leur
        compte.
      </p>

      <h3>4.2. Partage d&#39;Objets</h3>
      <p className="content">
        Les utilisateurs peuvent ajouter des objets qu&#39;ils souhaitent donner
        ou vendre à un prix symbolique via l&#39;Application. En partageant un
        objet, l&#39;utilisateur déclare être le propriétaire légal de
        l&#39;objet ou avoir le droit de le céder.
      </p>

      <h3>4.3. Réservation d&#39;Objets</h3>
      <p className="content">
        Les utilisateurs peuvent réserver des objets partagés par leurs amis en
        utilisant le code donneur. La réservation ne constitue pas un transfert
        de propriété, et les conditions finales de l&#39;échange (date, lieu,
        remise en main propre, etc.) doivent être déterminées directement entre
        les utilisateurs.
      </p>

      <h2 className="subtitle">5. Limitation de Responsabilité</h2>

      <h3>5.1. Échanges et Transactions</h3>
      <p className="content">
        L&#39;Application ne gère ni ne garantit les transactions financières
        entre utilisateurs. Les utilisateurs doivent organiser les modalités de
        paiement et d&#39;échange en dehors de l&#39;Application. Le
        propriétaire de l&#39;Application décline toute responsabilité en cas de
        litige entre utilisateurs concernant un échange ou une transaction.
      </p>

      <h3>5.2. Qualité et Conformité des Objets</h3>
      <p className="content">
        Le propriétaire de l&#39;Application ne vérifie pas la qualité, la
        conformité, ni la légalité des objets échangés via l&#39;Application.
        Chaque utilisateur est responsable de l&#39;évaluation des objets
        qu&#39;il souhaite obtenir.
      </p>

      <h3>5.3. Problèmes Techniques</h3>
      <p className="content">
        Le propriétaire de l&#39;Application s&#39;efforce de maintenir un accès
        continu à l&#39;Application, mais ne peut garantir une disponibilité
        ininterrompue. Le propriétaire décline toute responsabilité en cas
        d&#39;indisponibilité temporaire de l&#39;Application ou de perte de
        données.
      </p>

      <h2 className="subtitle">6. Protection des Données Personnelles</h2>
      <p className="content">
        Les données personnelles collectées lors de l&#39;inscription sont
        traitées conformément à la politique de confidentialité de
        l&#39;Application. Les utilisateurs disposent d&#39;un droit
        d&#39;accès, de rectification, et de suppression de leurs données
        personnelles directement sur leur compte ou en contactant le
        propriétaire via les coordonnées fournies.
      </p>

      <h2 className="subtitle">7. Propriété Intellectuelle</h2>
      <p className="content">
        L&#39;Application et tous ses contenus (textes, images, logos, etc.)
        sont protégés par les droits de propriété intellectuelle. Toute
        reproduction, représentation, modification, ou exploitation non
        autorisée est interdite.
      </p>

      <h2 className="subtitle">8. Résiliation</h2>
      <p className="content">
        Le propriétaire de l&#39;Application se réserve le droit de suspendre ou
        de résilier le compte d&#39;un utilisateur en cas de non-respect des
        présentes conditions, sans préavis ni indemnité.
      </p>

      <h2 className="subtitle">9. Droit Applicable et Juridiction</h2>
      <p className="content">
        Les présentes conditions sont régies par le droit français. En cas de
        litige relatif à l&#39;interprétation ou à l&#39;exécution des présentes
        conditions, les parties s&#39;efforceront de résoudre le différend à
        l&#39;amiable. À défaut, le litige sera soumis à la juridiction
        compétente des tribunaux du siège social du propriétaire de
        l&#39;Application.
      </p>

      <h2 className="subtitle">
        10. Respect du Droit Français en Matière de Publication d&#39;Objets
      </h2>
      <p className="content">
        Les utilisateurs s&#39;engagent à respecter les lois françaises en
        vigueur concernant la publication d&#39;objets sur l&#39;Application. Il
        est strictement interdit de proposer au don ou à la vente des objets
        dont la possession, la cession ou la vente est illégale en France. Cela
        inclut, mais ne se limite pas à :
      </p>
      <ul>
        <li>
          Les animaux vivants, sauf dans les conditions spécifiquement
          autorisées par la législation en vigueur.
        </li>
        <li>
          Les substances dangereuses ou illicites, telles que les drogues, les
          armes, les explosifs, ou tout matériel relevant de la réglementation
          sur les matériels de guerre.
        </li>
        <li>
          Les produits contrefaits, piratés ou en violation des droits de
          propriété intellectuelle.
        </li>
        <li>
          Tout bien dont la commercialisation est interdite ou réglementée (ex :
          médicaments, produits alimentaires périssables, etc.).
        </li>
      </ul>
      <p className="content">
        Le propriétaire de l&#39;Application se réserve le droit de retirer tout
        contenu ne respectant pas ces règles sans préavis, et de suspendre ou
        résilier le compte de l&#39;utilisateur en cas de non-respect. En cas de
        doute sur la légalité d&#39;un objet, les utilisateurs sont invités à se
        renseigner auprès des autorités compétentes avant de publier une
        annonce.
      </p>

      <p className="content">
        <strong>Date de la dernière mise à jour :</strong> 30/08/2024
      </p>
    </div>
  );
}

export default LegalMentions;

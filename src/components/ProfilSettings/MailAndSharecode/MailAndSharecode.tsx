import './MailAndSharecode.scss';

function MailAndSharecode() {
  const shareCode = '1234567890';
  const mail = 'marion@marion.com';

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

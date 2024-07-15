import './BookButton.scss';

interface Props {
  handleBookingClick: () => void;
}
function BookButton({ handleBookingClick }: Props) {
  return (
    <div className="bookbutton">
      <button
        type="button"
        className="button-orange-simple"
        onClick={handleBookingClick}
      >
        Réserver ce produit
      </button>
    </div>
  );
}

export default BookButton;

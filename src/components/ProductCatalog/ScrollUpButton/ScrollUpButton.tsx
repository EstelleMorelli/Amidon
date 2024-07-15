import './ScrollUpButton.scss';
import { ArrowUpCircle } from 'react-feather';

function ScrollUpButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Pour un scroll fluide
    });
  };
  return (
    <button type="button" className="scrollupbutton" onClick={scrollToTop}>
      <ArrowUpCircle size={36} />
    </button>
  );
}

export default ScrollUpButton;

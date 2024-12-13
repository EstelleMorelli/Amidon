import './AvailableFilterButton.scss';

interface Props {
  setAvailableFilter: React.Dispatch<React.SetStateAction<boolean>>;
  availableFilter: boolean;
}

function AvailableFilterButton({ setAvailableFilter, availableFilter }: Props) {
  const handleAvailableFilterClick = () => {
    setAvailableFilter(!availableFilter);
  };

  return (
    <button
      className={`availablefilterbutton filters__button ${
        availableFilter ? 'availablefilterbutton--active' : ''
      }`}
      type="button"
      onClick={handleAvailableFilterClick}
    >
      100 % disponible
    </button>
  );
}

export default AvailableFilterButton;

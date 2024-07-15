import './PricelessFilterButton.scss';

interface Props {
  setPricelessFilter: React.Dispatch<React.SetStateAction<boolean>>;
  pricelessFilter: boolean;
}

function PricelessFilterButton({ setPricelessFilter, pricelessFilter }: Props) {
  const handlePricelessFilterClick = () => {
    setPricelessFilter(!pricelessFilter);
  };
  return (
    <button
      className={`pricelessfilterbutton ${
        pricelessFilter ? 'pricelessfilterbutton--active' : ''
      }`}
      type="button"
      onClick={handlePricelessFilterClick}
    >
      100 % gratuits
    </button>
  );
}

export default PricelessFilterButton;

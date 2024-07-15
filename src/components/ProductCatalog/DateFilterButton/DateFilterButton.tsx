import './DateFilterButton.scss';

interface Props {
  setCreatedAtSort: React.Dispatch<React.SetStateAction<boolean>>;
  createdAtSort: boolean;
}

function DateFilterButton({ setCreatedAtSort, createdAtSort }: Props) {
  const handleDateFilterClick = () => {
    setCreatedAtSort(!createdAtSort);
  };
  return (
    <div className="datefilterbutton">
      <button
        className={`datesortbutton ${
          createdAtSort ? 'datesortbutton--active' : ''
        }`}
        type="button"
        onClick={handleDateFilterClick}
      >
        Derniers ajouts
      </button>
    </div>
  );
}

export default DateFilterButton;

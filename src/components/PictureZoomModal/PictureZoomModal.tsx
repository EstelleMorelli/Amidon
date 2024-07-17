import { X } from 'react-feather';
import { baseProductPictureURL } from '../../utils/data';
import { useAppDispatch } from '../../store/hooks-redux';
import { actionClosePictureZoom } from '../../store/reducers/appReducer';
import './PictureZoomModal.scss';

interface Props {
  picture: string;
}
function PictureZoom({ picture }: Props) {
  const dispatch = useAppDispatch();
  const handleCrossClick = () => {
    dispatch(actionClosePictureZoom());
  };
  return (
    <div className="picturezoom">
      <img
        className="picturezoom--picture"
        src={`${baseProductPictureURL}/${picture}`}
        alt="produit agrandit"
      />
      <button
        className="closingButton"
        type="button"
        onClick={handleCrossClick}
      >
        <X size={76} />
      </button>
    </div>
  );
}

export default PictureZoom;

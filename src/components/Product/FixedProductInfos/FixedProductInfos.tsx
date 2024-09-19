import './FixedProductInfos.scss';
import { ICurrentProduct } from '../../../@types/product';
import { baseProductPictureURL } from '../../../utils/data';
import { useAppDispatch, useAppSelector } from '../../../store/hooks-redux';
import { actionOpenPictureZoom } from '../../../store/reducers/appReducer';
import PictureZoom from '../../PictureZoomModal/PictureZoomModal';

interface Props {
  product: ICurrentProduct;
  medias: {
    url: string | undefined;
  }[];
}

function FixedProductInfos({ product, medias }: Props) {
  const dispatch = useAppDispatch();
  const handlePictureZoom = (currentPicture: string) => {
    dispatch(actionOpenPictureZoom({ currentPicture }));
  };
  const currentPictureForZoom = useAppSelector(
    (state) => state.appReducer.pictureZoom.currentPicture
  );
  const isPictureZoomOpen = useAppSelector(
    (state) => state.appReducer.pictureZoom.isPictureZoomOpen
  );
  return (
    <div className="fixedproductinfos">
      <div className="fixedproductinfos__pictures">
        {medias.length !== 0 && (
          <button
            className="product--picture__main__button"
            type="button"
            key={medias[0].url}
            onClick={() => handlePictureZoom(medias[0].url!)}
          >
            <img
              className="product--picture__main"
              key={medias[0].url}
              src={`${baseProductPictureURL}/${medias[0].url}`}
              alt=""
            />
          </button>
        )}
        <div className="product--pictures__wrapper">
          <div className="product--pictures__flexbox">
            {medias.slice(1).length !== 0 &&
              medias.slice(1).map((picture) => (
                <div key={picture.url} className="product--pictures__item">
                  <div
                    className="product--pictures__item__button"
                    onClick={() => handlePictureZoom(picture.url!)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        handlePictureZoom(picture.url!);
                      }
                    }}
                  >
                    <div className="product--pictures__item__img">
                      <img
                        src={`${baseProductPictureURL}/${picture.url}`}
                        alt="détail du produit"
                        style={{ display: 'block' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {isPictureZoomOpen && <PictureZoom picture={currentPictureForZoom} />}
      <h2 className="fixedproductinfos--title">{product.title}</h2>
      <p>
        {` Prix : `}
        {product.price > 0 && (
          <span>
            {product.price}
            {` €`}
          </span>
        )}
        {product.price === 0 && <span>{` Gratuit`}</span>}
      </p>
      <p className="fixedproductinfos--description">{product.description}</p>
    </div>
  );
}
export default FixedProductInfos;

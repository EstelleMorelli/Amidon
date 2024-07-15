import './FixedProductInfos.scss';
import { ICurrentProduct } from '../../../@types/product';

interface Props {
  product: ICurrentProduct;
}

function FixedProductInfos({ product }: Props) {
  return (
    <div className="fixedproductinfos">
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

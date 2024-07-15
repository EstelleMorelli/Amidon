import './ProductCard.scss';
import { IProduct, ISelfProduct } from '../../@types/product';
import { useAppSelector } from '../../store/hooks-redux';
import DefaultPicture from '../../assets/logos/amidon_logo_full.png';
import { baseProductPictureURL } from '../../utils/data';

interface Props {
  product: IProduct | ISelfProduct;
}

function ProductCard({ product }: Props) {
  const friendsState = useAppSelector(
    (state) => state.catalogReducer.friendProducts
  );
  const ownerFriend = friendsState.find(
    (friend) => friend.own_products?.includes(product) === true
  );
  const colorFriend = ownerFriend?.color;
  const colorUser = useAppSelector(
    (state) => state.userReducer.connectedUser.color
  );
  let picture = '';
  if (product.media[0]) {
    // TODO! : possible de pas avoir url en undefined ?
    if (product.media[0].url) {
      picture = `${baseProductPictureURL}/${product.media[0].url}`;
    }
  } else {
    picture = DefaultPicture;
  }
  return (
    <div
      className="productcard"
      style={{
        boxShadow: `0.5rem 0.5rem 1rem -0.6rem ${
          colorFriend ? colorFriend : colorUser
        }`,
      }}
    >
      <img
        className="productcard--picture"
        src={picture}
        alt="produit en don"
      />
      <div className="productcard--overlay">
        <div className="productcard--header">
          <svg className="productcard--arc" xmlns="http://www.w3.org/2000/svg">
            <path />
          </svg>
          <h2 className="productcard--title"> {product.title} </h2>
        </div>
        <p className="productcard--description"> {product.description}</p>
        {/* A METTRE visible seulement pour la version web */}
      </div>
    </div>
  );
}

export default ProductCard;

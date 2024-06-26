import './ProductListItem.css';
import { Link } from 'react-router-dom';

const ProductListItem = ({ id, title, image, price}) => {

  return (
    <li className="product__list-item">
    <Link to={`/items/${id}`}>
      <div className="display">
        <img className="product__list-item__image" src={image}></img>
        <section className='product__list-item__section'>
          <h2>{title}</h2>
          <h1>{price}€</h1>
        </section>
      </div>
      </Link>
    </li>
  )
};

export default ProductListItem;
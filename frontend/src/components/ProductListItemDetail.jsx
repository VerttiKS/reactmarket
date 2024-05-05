import './ProductListItem.css';

const ProductListItemDetail = ({title, image, price, description, owner}) => {

return (
    <li className="product__list-item">
      <div className="displayBig">
        <img className="product__list-item__image" src={image}></img>
        <section className='product__list-item__section'>
          <h2>{title}</h2>
          <h1>{price}€</h1>
          <h4>seller: {owner}</h4>
        </section>
      </div>
      <div className="descriptionDiv">
        <p>{description}</p>
      </div>
    </li>
  )
};

export default ProductListItemDetail;
import './ProductListItem.css';
import { Context } from '../App.jsx';
import { useContext } from 'react';

const ProductListItem = ({ id, title, desc, image, price, owner }) => {

  const [cart, setCart] = useContext(Context);

  const AddToCart = () => {

    //Basically. If you're adding, you're adding to an existing data in the cart. If you're not, you're adding a new piece of data to a cart
    let adding = false;
    cart.forEach(element => {
      if (id == element.id) {
        element.quantity += 1;

        adding = true;
        return;
      }
    });

    if (!adding) {
      const data = {
        id: id,
        quantity: 1,
        price: price
      }

      setCart(cart => [...cart, data]);
    }
  }

  return (
    <li className="product__list-item">
      <div className="display">
        <img className="product__list-item__image" src={image}></img>
        <section className='product__list-item__section'>
          <h2>{title}</h2>
          <h4>seller: {owner}</h4>
          <p>{desc}</p>
          <h1>{price}€</h1>
          <button onClick={AddToCart}>add to cart</button>
        </section>
      </div>
    </li>
  )
};

export default ProductListItem;
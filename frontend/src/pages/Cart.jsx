import { useState, useCallback, useEffect, useContext } from 'react';
import { Context } from '../App.jsx';
import { Link } from 'react-router-dom';

import CartList from './../components/CartList.jsx';
import '../components/CartList.css';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fullPrice, setFullPrice] = useState(0);

  const [cart, setCart] = useContext(Context);

  const fetchProducts = useCallback(async () => {
    try {
      setError(null)
      setIsLoading(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/menuitems`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      setError(error.message);
      console.error('Error: ', error);
    }
    setIsLoading(false);

  }, []);

  const countPrice = () => {
    let amount = 0;
    cart.forEach(element => {
      amount += (element.quantity * element.price)
    });

    setFullPrice(amount.toFixed(2));
  }

  useEffect(() => {
    fetchProducts();
    countPrice();
  }, [fetchProducts]);

  //display content based on the outcome of fetchProducts
  let content = <p>No cart data found</p>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Looking for items... </p>;
  }

  if (products.length > 0) {

    if (cart.length > 0) {
      content = <CartList products={products} />
    }
    else {
      content = <p>It's empty!</p>
    }
  }

  console.log(cart);

  return (
    <>
      <ul className="cart__list" onClick={countPrice}>
        <h1>Cart</h1>
        {content}
        <Link to="/checkout" className='cart__list_link'>
          <button>Checkout - {fullPrice}€</button>
        </Link>
      </ul>
    </>
  )
}


export default Cart;
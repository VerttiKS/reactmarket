import './CartListItem.css';
import { Context } from '../App.jsx';
import { useContext, useState, useEffect } from 'react';

import upwardImage from './../assets/upward.svg';
import downwardImage from './../assets/downward.svg';

const CartListItem = ({ id, title, price, AddPost }) => {

  const [cart, setCart] = useContext(Context);
  const [amount, setAmount] = useState(0);


  //Set item count up
  const AddMoreOfItem = () => {

    cart.forEach(element => {
      if (id == element.id) {
        element.quantity += 1;
        setAmount(element.quantity);
        return;
      }
    });
  }

  //Set item count down. Item counts with 0 wil be removed later
  const RemoveItem = () => {

    cart.forEach(element => {
      if (id == element.id) {
        if (element.quantity != 0) {
          element.quantity -= 1;
        }
        setAmount(element.quantity);
        return;
      }
    });
  }

  //Make sure we're using the right id
  let currentID = false;
  let theAmount = 0;
  cart.forEach(element => {
    if (id == element.id) {
      if (element.quantity != 0) {
        theAmount = element.quantity;
        currentID = true;
      }
      return;
    }
  });

  //Runs only on the first render
  useEffect(() => {
    setAmount(theAmount);
  }, []);

  useEffect(() => {
    setCart(cart);
  }, [theAmount, setAmount]);

  //Return nothing, if not in use
  if (!currentID) {
    return (
      <></>
    )
  }

  return (
    <li className="cart__list-item">
      <div className="cart_display">
        <section className='cart__list-item__section'>
          <h2>{title} - {price * amount}€</h2>
          <br></br>
          <button onClick={AddMoreOfItem}><img src={upwardImage}></img></button>
          <h2>{amount}</h2>
          <button onClick={RemoveItem}><img src={downwardImage}></img></button>
        </section>
      </div>
    </li>
  )
};

export default CartListItem;
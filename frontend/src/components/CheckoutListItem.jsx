import './CheckoutListItem.css';
import { Context } from '../App.jsx';
import { useContext, useState, useEffect } from 'react';

const CheckoutListItem = ({ id, title, price }) => {

  const [cart, setCart] = useContext(Context);
  const [amount, setAmount] = useState(0);

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

  //Return nothing, if not in use
  if (!currentID) {
    return (
      <></>
    )
  }

  return (
    <li className="checkout__list-item">
      <div className="checkout_display">
        <section className='checkout__list-item__section'>
          <p>{amount} {title} - {price * amount}€</p>
        </section>
      </div>
    </li>
  )
};

export default CheckoutListItem;
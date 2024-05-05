import '../App.css';
import { useState, useCallback, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { Context } from '../App.jsx';

import CheckoutList from './../components/CheckoutList.jsx'
import '../components/CheckoutList.css';


const Success = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alerted, setAlerted] = useState(false);

    const [fullPrice, setFullPrice] = useState(0);
    const [cart, setCart] = useContext(Context);

    const fetchProducts = useCallback( async() => {
        try {
          setError(null)
          setIsLoading(true);
          
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items`);
          if(!response.ok) {
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

    const countPrice= () => {
        let amount = 0;
        cart.forEach(element => {
          amount += (element.quantity * element.price)
        });

        setFullPrice(amount.toFixed(2));
    }


    useEffect(() => {

        if(!alerted)
        {
            alert("Order successful!");
            setAlerted(true);
        }

        fetchProducts();
        countPrice();
    }, [fetchProducts]);

    let content = <p>No cart data found</p>;
  
    if (error) {
      content = <p>{error}</p>;
    }
  
    if (isLoading) {
      content = <p>Fetching shopping cart... </p>;
    }
  
    if (products.length > 0) {

      if(cart.length > 0)
      {
        content = <CheckoutList products={products}/>;
      }
      else
      {
        content = <p>Your cart is empty!</p>
      }
    }

    
    return (
        <>
            <ul className="checkout__list">
              <h2>Order:</h2>
              {content}
              <p>Total: {fullPrice}€</p>
              <br/>
              <h2>Order placed succesfully!</h2>
            </ul>
        </>
    )
}



export default Success;
import '../App.css';
import { useState, useCallback, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { Context } from '../App.jsx';
import { useNavigate } from "react-router-dom";

import CheckoutList from './../components/CheckoutList.jsx'
import '../components/CheckoutList.css';


const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [status, setStatus] = useState("");
  const [fullPrice, setFullPrice] = useState(0);
  const [cart, setCart] = useContext(Context);

  const navigate = useNavigate();

  //fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setError(null)
      setIsLoading(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items`);
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

  //post data
  async function postData(url, data) {
    console.log(data);
    console.log(JSON.stringify(data));

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    const reply = await response.json();

    if (reply.message == "Order created!") {
      setStatus("Success!");
      navigate("/success");
    }
    else {
      setStatus("Error: " + reply.message);
    }

    console.log(reply.message);
    return reply;
  }

  //get form ready
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  //this happens when the form is submitted
  const onSubmit = (data) => {
    //we first make sure that cart data isn't zero
    if (cart.length != 0) {

      //We make a newCart
      const newCart = [];
      cart.forEach(element => {

        if (element.quantity != 0) {
          //If the element quantity isn't 0, we push the id and quantity to the newCart
          newCart.push({
            id: element.id,
            quantity: element.quantity
          });
        }
      });

      if (newCart.length != 0) {

        //If the new cart isn't empty, we send it as the items. It's formatted perfectly for it. Also this gets rid of quantity zeros in the order.
        const order = {
          order: {
            customer: data,
            items: newCart
          }
        };

        //We post the data
        postData(`${import.meta.env.VITE_API_URL}/api/orders`, order);
      }
      else {
        setStatus("Your cart is empty!");
      }
    }
    else {
      setStatus("Your cart is empty!");
    }
  }

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
  let content = <p>No product data found</p>;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Fetching shopping cart... </p>;
  }

  if (products.length > 0) {

    if (cart.length > 0) {
      content = <CheckoutList products={products} />;
    }
    else {
      content = <p>Your cart is empty!</p>
    }
  }


  return (
    <>
      <ul className="checkout__list">
        <h2>Order:</h2>
        {content}
        <p>total: {fullPrice}€</p>
      </ul>
      <br />
      <form className='submit__form' onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="name">name</label>
        <input {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}

        <br />
        <label htmlFor="email">email</label>
        <input {...register("email", { required: true })} pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" />
        {errors.email && <span>This field is required</span>}

        <br />
        <label htmlFor="street">street</label>
        <input {...register("street", { required: true })} />
        {errors.street && <span>This field is required</span>}

        <br />
        <label htmlFor="postal-code">postal code</label>
        <input {...register("postal-code", { required: true })} />
        {errors.postalcode && <span>This field is required</span>}

        <br />
        <label htmlFor="city">city</label>
        <input {...register("city", { required: true })} />
        {errors.city && <span>This field is required</span>}

        <br />
        <br />
        <input type="submit" value="Send order" />

        <h1>{status}</h1>
      </form>
    </>
  )
}



export default Checkout;
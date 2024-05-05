import { useState, useCallback, useEffect, useContext } from 'react';
import { Context } from '../App.jsx';

import ProductList from './../components/ProductList.jsx'
import '../components/ProductList.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cart, setCart] = useContext(Context);

  const fetchProducts = useCallback(async () => {
    try {
      setError(null)
      setIsLoading(true);

      console.log(`${import.meta.env.VITE_API_URL}/api/items`);

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

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  //display content based on the outcome of fetchProducts
  let content = <p className='store__status'>No menu found</p>;

  if (error) {
    content = <p className='store__status'>{error}</p>;
  }

  if (isLoading) {
    content = <p className='store__status'>Fetching menu... </p>;
  }

  if (products.length > 0) {
    content = <ProductList products={products} />
  }

  return (
    <>
      <h1 className='store__title'>React Market</h1>
      <ul className="product__list">
        {content}
      </ul>
    </>
  )
}


export default Products;
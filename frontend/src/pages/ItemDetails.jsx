import { useParams } from "react-router-dom";
import { useState, useCallback, useEffect } from 'react';
import ProductListItem from './../components/ProductListItemDetail';
import '../components/ProductList.css';

const ItemDetails = () => {

    
    const params = useParams();

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchProducts = useCallback(async () => {
      try {
        setError(null)
        setIsLoading(true);
  
        console.log(`${import.meta.env.VITE_API_URL}/api/items/` + params.id);
  
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items/` + params.id);
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
  
  
  
    let content = <p>No product data found</p>;
  
    if (error) {
      content = <p>{error}</p>;
    }
  
    if (isLoading) {
      content = <p>Fetching data... </p>;
    }

    if (products.id != null) {
      content = <ProductListItem key={products.id} title={products.title} image={products.image} price={products.price} description={products.description} owner={products.owner}/>
    }

    return(
        <>
            <div className="product__list__detail">
                {content}
            </div>
        </>
    )
}



export default ItemDetails;
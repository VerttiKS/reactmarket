import ProductListItem from './ProductListItem';
import { Link } from 'react-router-dom';


const ProductList = ({ products }) => {
  return (
    <div>
      {products?.map((p) => <ProductListItem key={p.id} id={p.id} title={p.name} desc={p.description} image={"http://localhost:5000/" + p.image} price={p.price} />)}
    </div>
  )
};

export default ProductList;
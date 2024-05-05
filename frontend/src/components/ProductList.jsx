import ProductListItem from './ProductListItem';
import { Link } from 'react-router-dom';


const ProductList = ({ products }) => {
  return (
    <div>
      {products?.map((p) => <ProductListItem key={p.id} id={p.id} title={p.title} desc={p.description} image={p.image} price={p.price} owner={p.owner} />)}
    </div>
  )
};

export default ProductList;
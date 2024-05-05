import CartListItem from './CartListItem';
import { Link } from 'react-router-dom';


const CartList = ({ products }) => {

  return (
    <div>
      {products?.map((p) => <CartListItem key={p.id} id={p.id} title={p.name} price={p.price} />)}
    </div>
  )
};

export default CartList;
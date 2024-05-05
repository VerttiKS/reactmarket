import CheckoutListItem from './CheckoutListItem';


const CheckoutList = ({ products }) => {
  return (
    <div>
      {products?.map((p) => <CheckoutListItem key={p.id} id={p.id} title={p.name} price={p.price} />)}
    </div>
  )
};

export default CheckoutList;
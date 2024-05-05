
import React from "react";
import ItemsItem from './ItemsItem.jsx';
import './ItemsList.css';
const ItemsList = props => {
  return <ul className="items-list">
    {props.items.map(item => 
      <ItemsItem
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        description={item.description}
        image={item.image}
        owner={item.owner}
      />
    )}
    </ul>
};
export default ItemsList;
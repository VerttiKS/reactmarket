
import React from "react";
import MenuitemsItem from './MenuitemsItem.jsx';
import './MenuitemsList.css';
const MenuitemsList = props => {
  return <ul className="menuitems-list">
    {props.items.map(menuitem => 
      <MenuitemsItem
        key={menuitem.id}
        id={menuitem.id}
        name={menuitem.name}
        price={menuitem.price}
        description={menuitem.description}
        image={'http://localhost:5000/' + menuitem.image}
      />
    )}
    </ul>
};
export default MenuitemsList;
import React from 'react';
import Item from './Item';
import ManageItems from './ManageItems';

export default function ItemList(props) {

  function regularList() {
    return (
      <ul>
        {props.items.map((i) => (
          <Item
            key={i.itemId}
            id={i.itemId}
            name={i.itemName}
            price={i.itemPrice}
            weight={i.itemWeight}
            volume={i.itemVolume}
            quantity={i.itemQuantity}
            available={i.itemAvailable}
          />
        ))}
      </ul>
    );
  }
  
  function adminList() {
    return (
      <ul>
        {props.items.map((i) => (
          <ManageItems
            key={i.itemId}
            id={i.itemId}
            name={i.itemName}
            price={i.itemPrice}
            weight={i.itemWeight}
            volume={i.itemVolume}
            quantity={i.itemQuantity}
            available={i.itemAvailable}
          />
        ))}
      </ul>
    );
  }


  if(props.target === "regularList") {
    return regularList();
  } else {
    return adminList();
  }
}

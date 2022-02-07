import React from 'react';
import Item from './Item';

export default function ItemList(props) {
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

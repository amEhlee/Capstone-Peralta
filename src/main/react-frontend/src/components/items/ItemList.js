// Import Dependencies
import React from 'react';

// Import Components
import Item from './Item';
import ManageItems from './ManageItems';

// Import Styles
import style from '../../assets/styles/ItemCardLayout.module.css'
import CartItems from './CartItems';

export default function ItemList(props) {

  
  function regularList() {
    return (
      <ul className={style.unorderedList}>
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
      <tbody>
        {props.items.filter((val) => {
          if (props.search == "") {
            return val;
          } else if (val.itemName.toLowerCase().includes(props.search.toLowerCase())) {
            return val;
          }
        }
        ).map((i) => (
          <ManageItems
          key={i.itemId}
          id={i.itemId}
          name={i.itemName}
            category={i.category}
            price={i.itemPrice}
            weight={i.itemWeight}
            volume={i.itemVolume}
            quantity={i.itemQuantity}
            available={i.itemAvailable}
            item={i}
            />
            ))}
      </tbody>
    );
  }

  // const counts = {};
  // const sampleArray = ['a', 'a', 'b', 'c'];
  // sampleArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
  // console.log(counts)

  function cartList() {
    // const counts = {};
    // props.items.map((i) => (
    //     counts[i] = (counts[i] || 0) + 1
    // ));
    // console.log(counts);
    return (
      <tbody>
        {props.items.map((i) => (
          <CartItems
            key={i.itemId}
            itemName={i.itemName}
            itemQuantity={i.itemQuantity}
            itemPrice={i.itemPrice}
          />
        ))}
      </tbody>
    )
  }

  if(props.target === "regularList") {
    return regularList();
  } else if (props.target === "adminList" ){
    return adminList();
  } else if (props.target === "cartList") {
    return cartList();
  }
}

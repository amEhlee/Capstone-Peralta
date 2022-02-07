import React from "react";

export default function Item(props) {
  return (
    <div>
      <li>
        <h3>{props.name}</h3>
        <p>Item ID:{props.id}</p>
        <p>Price ${props.price}</p>
        <p>Quantity: {props.quantity}</p>
        <button>Buy Item</button>
      </li>
    </div>
  );
}

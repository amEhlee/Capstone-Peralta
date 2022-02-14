import React from "react";
import style from './ItemCardLayout.module.css'

export default function Item(props) {
    return (
        <div className={style.card}>
            <li>
                <h3>{props.name}</h3>
                <p>Item ID:{props.id}</p>
                <p>Price ${props.price}</p>
                <p>Quantity: {props.quantity}</p>
                <button>Add To Cart</button>
            </li>
        </div>
    );
}
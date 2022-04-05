/**
 * A modal that shows Item total,
 * order total(include shipping) , shipping cost , List of items (includes the cost and quantity of each item)
 * Cancel order IF THE ORDER IS NOT SHIPPED YET AT THE BOTTOM IT IS THE SHIPPING COST, ORDER TOTAL
 *
 */


// Import Dependencies
import React from "react";

// Import Components
import {Card, Button, Table} from "react-bootstrap";
import {useNavigate} from "react-router";

// Import Styles
import style from '../../assets/styles/ItemCardLayout.module.css'
import TotalCart from "./TotalCart";


// Future update: add item id for dynamic navigation
export default function Order(props) {
    const history = useNavigate();

    return (

        <div>

            <h1> Order ID #123456789</h1>
            <h3> Date Placed 4/4/2022 </h3>
        <Table striped bordered hover style={{ width: '100%' }}>
            <thead>
            <tr>
                <th>Quantity</th>
                <th>Item Name</th>
                <th>Price Per Item</th>
                <th>Item Total </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>2</td>
                <td>Item 1</td>
                <td>$5</td>
                <td>$10</td>
            </tr>

            <tr>
                <td>1</td>
                <td>Item 2</td>
                <td>$10</td>
                <td>$10</td>
            </tr>
            </tbody>
        </Table>
<TotalCart/>
        </div>


    );
}
import { Button, Card, ListGroup } from "react-bootstrap";
import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import styles from "../assets/styles/CartPageCardLayout.module.css";
import Image from "../components/items/Image";
import axios from "axios";

function CartPage() {
    const givenContext = useContext(UserContext);
    const token = givenContext.token;
    const cart = givenContext.contextData.cart;
    let totalPrice = 0.0;

    // testing for email service
    const EMAILSERV_URL = "http://localhost:8080/email/send";
    function sendEmail(){
        axios.post(EMAILSERV_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res) // return response
            })
    }

    function removeFromCart(givenIndex) {
        // remove item from cart
        cart.splice(givenIndex, 1);

        //update cart in context
        givenContext.setContextData((prevData) => {
            return {
                ...prevData,
                cart: cart,
            };
        });

    }

    return (
        <>
            <h1>Cart Page</h1>
            <Button onClick={() => {sendEmail()}}>Email Test</Button>

            {/* Optinally display the below line to indicate empty cart */}
            {cart.length ? "" : <p>Your Cart is Empty! Add Items on Homepage</p>}

            {/* Display actual cart data and create delete buttons for each entry*/}
            <div className={styles.wrapper}>
                <ListGroup variant="flush">
                    {/* Iterate through all items in our currently available cart */}
                    {cart.map((cartObject, index) => {
                        // acess the item object and derrive its total price
                        const givenItem = cartObject.item;
                        const givenQuantity = cartObject.quantity;
                        totalPrice += givenItem.itemPrice * givenQuantity;

                        // create a card for each item in cart
                        return (
                            <div key={givenItem.itemName}>
                                <ListGroup.Item className={styles.cartSpacing}>
                                    <div className={styles.itemDisplay}>
                                        <Image itemID={givenItem.itemId} size={"150px"} />
                                        <div className={styles.itemDetails}>
                                            <b>{givenItem.itemName}</b> <br />
                                            Price ${givenItem.itemPrice} <br />
                                            Quantity: {givenQuantity} <br />
                                            <Button variant="danger" onClick={() => {removeFromCart(index)}}>Remove From Cart</Button> <br />
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            </div>
                        );
                    })}
                </ListGroup>

                {/* Seperate div to display price and subtotal information */}
                <div className={styles.orderDetails}>
                    <Card className={styles.card}>
                        <Card.Body>
                            <Card.Title>Subtotal</Card.Title>
                            <Card.Text>Price ${totalPrice.toFixed(2)}</Card.Text>
                            <Button variant="primary" onClick={() => {sendEmail()}}>Buy Now</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default CartPage;
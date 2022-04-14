/**
 * A modal that shows Item total,
 * order total(include shipping) , shipping cost , List of items (includes the cost and quantity of each item)
 * Cancel order IF THE ORDER IS NOT SHIPPED YET AT THE BOTTOM IT IS THE SHIPPING COST, ORDER TOTAL
 *
 */

// Import Dependencies
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

// Import Components
import { Table } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router";

// Import Styles
import style from "../../assets/styles/ItemCardLayout.module.css";
import { UserContext } from "../../UserContext";
import OrderList from "./OrderList";

// Future update: add order id for dynamic navigation
export default function Order(props) {
    const history = useNavigate();
    const { order } = props;
    const token = useContext(UserContext).contextData.token;
    const userContext = useContext(UserContext).contextData.user;
    const navigate = useNavigate();
    var [orderJson, setOrderJson] = useState([]);


    function gatherData() {

        // if the user is null redirect back to home
        if(userContext === null) {
            navigate("/");
            return;
        }

        // if the user has proper values attempt to get their order information
        const FETCH_URL ="http://localhost:8080/order/get/user/" + userContext.userId;
        return axios
            .get(FETCH_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setOrderJson(res.data || "no data returned");
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        gatherData();
    }, []);



    if (orderJson === "no data returned") {
        return (
            <section>
                <p>No Orders Found</p>
            </section>
        );
    }
    else {
        return (
            <div>
                <h1>All Orders</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Item Quantity</th>
                            <th>Order Status</th>
                            <th>Order Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderJson.map((i) =>
                            <OrderList
                                key={i.orderId}
                                orderId={i.orderId}
                                itemAmount={i.itemAmount}
                                orderStatus={i.orderStatus}
                                orderTotal={i.orderTotal}
                                itemList={i.itemList}
                            />
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

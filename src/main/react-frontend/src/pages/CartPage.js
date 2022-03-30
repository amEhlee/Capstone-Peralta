import { Table, Modal, Button } from "react-bootstrap";
import React, {useState, useEffect, useContext} from "react";
import ItemList from "../components/items/ItemList";
import axios from "axios";
import {UserContext} from "../UserContext";

function CartPage() {
    const FETCH_URL = "http://localhost:8080/item/get/all";
    const token = useContext(UserContext).contextData.token;
    const [datajson, setDataJson] = useState([]);

// function that will be called when the page loads purpose is to handle and process the axios get request
function gatherData() {
    return axios
        .get(FETCH_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }) // preform get request
        .then((res) => {
            return res.data; // return response
        })
        .catch((err) => console.error(err));
}

// testing for email service
const EMAILSERV_URL = "http://localhost:8080/send/";
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

// runs the gatherdata function when the page loads
useEffect(() => {
    gatherData().then((data) => {
        console.log(data); // log returned data
        setDataJson(data || "no data returned"); // store returned data in a variable
    });
}, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                        <th><Button onClick={() => {sendEmail()}}>test</Button></th>
                    </tr>
                </thead>
                <ItemList
                    items={datajson}
                    target="cartList"
                />
            </Table>
        </>
    );
}
export default CartPage;
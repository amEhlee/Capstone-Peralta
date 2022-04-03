/**
 * This Page stores the Customer's Data about their Personal information like their name and email
 * Then Gets their Shipping information like their address and such to send them the item
 * The checkout button will send the admin an email about their information
 *
 *
 */



import React from "react";


// Import Components
import {Form, FormGroup, InputGroup, Button, FormControl, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Style from "../../assets/styles/UserSide.module.css";
import CustomerInfo from "./CustomerInfo";
import BillingInfo from "./BillingInfo";


export default function CheckoutItem() {

    const navigate = useNavigate();


    return (
        <Form >
            <h3>Customer Info</h3>
            <CustomerInfo/>

            <h3> Shipping Info </h3>
            <BillingInfo/>

            <FormGroup>

                <Button type="submit" className="mb-3 btn btn-success " onClick={() => {navigate("./")}}>
                   Checkout and send email
                </Button>
            </FormGroup>
        </Form>
    )
}
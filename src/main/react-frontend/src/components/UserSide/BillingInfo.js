/**
 * This is the Form that collects the Shipping Info from the user
 *
 *
 *
 */

import React from "react";



// Import Components
import {Form, FormGroup, InputGroup, Button, FormControl, Col, Row, } from "react-bootstrap";
import {useNavigate} from "react-router-dom";




export default function CheckoutItem() {

    const navigate = useNavigate();


    return (

        <Form>
            <FormGroup>
                <Form.Label> Address: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="123 x street NE"

                />

            </FormGroup>


            <FormGroup>
            <Form.Label> Postal Code: </Form.Label>
            <Form.Control
                type="text"
                placeholder="A1B1C1"

            />
            </FormGroup>


            <FormGroup>

                <Form.Label> Country: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Canada"

                />


            </FormGroup>

                <FormGroup>

                    <Form.Label> City: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Calgary"

                    />


                </FormGroup>

                <FormGroup>

                    <Form.Label> Province: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Alberta"

                    />


                </FormGroup>


        </Form>
    )
}
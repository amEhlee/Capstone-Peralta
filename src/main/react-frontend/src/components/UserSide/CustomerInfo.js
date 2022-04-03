/**
 * This is the Form that collects the Personal Info from the
 *
 *
 *
 */



import React from "react";


// Import Components
import {Form, FormGroup, InputGroup, Button, FormControl, Col, Row } from "react-bootstrap";
import {useNavigate} from "react-router-dom";




export default function CustomerInfo() {

    const navigate = useNavigate();


    return (

        <Form>
            <FormGroup>
                <Form.Label> First Name: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="john"

                />

            </FormGroup>


            <FormGroup>
                <Form.Label> Last Name: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Doe"

                />
                </FormGroup>


                    <FormGroup>

                        <Form.Label> Email: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="abcd@example.com"

                        />


                    </FormGroup>




        </Form>

    )
}
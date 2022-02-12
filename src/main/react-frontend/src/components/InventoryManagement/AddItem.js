import React from "react";
import { useRef } from "react";
import {Link} from "react-router-dom";
import {Form, FormGroup, InputGroup, Button} from "react-bootstrap";
import axios from "axios";

export default function AddItem({ onSubmit }) {
    const itemNameRef = useRef();
    const itemPriceRef = useRef();
    const itemWeightRef = useRef();

    function submitHandler(event) { 

        const returnedName = itemNameRef.current.value;
        const returnedPrice = itemPriceRef.current.value;
        const returnedWeight = itemWeightRef.current.value;

        const item = {
            itemId: null,
            category_id: null,
            itemAvailable: 1,
            itemName: returnedName,
            itemPrice: returnedPrice, 
            itemQuantity: 2, 
            itemVolume: 2,
            itemWeight: returnedWeight
        };

        const POST_URL = "http://localhost:8080/item/add"; // fetch url
        axios.post(POST_URL, item)
            .then((res) => {
                console.log(res);
            });
    }

    return (
        <Form onSubmit={submitHandler}>
            <FormGroup className="mb-3" controlId="formItemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Item Name" ref={itemNameRef}/>
            </FormGroup>

            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Item Images</Form.Label>
                <Form.Control type="file" multiple/>
            </Form.Group>

            <FormGroup className="mb-3" controlId="formItemDescription">
                <Form.Label>Item Description</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="Enter Item Description"/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemCategory">
                {/* checkbox */}
                <Form.Label>Item Category</Form.Label>
                <Form.Check type="checkbox" label="Food"/>
                <Form.Check type="checkbox" label="Clothing"/>
                <Form.Check type="checkbox" label="Electronics"/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemPrice">
                <Form.Label>Item Price</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control aria-label="Amount (to the nearest dollar)" ref={itemPriceRef}/>
                    <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemWeight">
                <Form.Label>Item Weight</Form.Label>
                <Form.Control type="number" placeholder="Enter Item Weight" ref={itemWeightRef}/>
            </FormGroup>


            <Button type="submit" className="btn btn-success">
                Add
            </Button>
        </Form>
    );
}

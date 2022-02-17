import React from "react";
import { useRef } from "react";
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap";
import axios from "axios";

export default function AddItem() {
    const itemNameRef = useRef();
    const itemPriceRef = useRef();
    const itemWeightRef = useRef();
    const itemVolumeRef = useRef();
    const itemQuantityRef = useRef();
    const itemAvailableRef = useRef();
    const imageRef = useRef();
    let formData = new FormData();

    function submitHandler() {
        const returnedName = itemNameRef.current.value;
        const returnedPrice = itemPriceRef.current.value;
        const returnedWeight = itemWeightRef.current.value;
        const returnedVolume = itemVolumeRef.current.value;
        const returnedQuantity = itemQuantityRef.current.value;
        let returnedAvailable = itemAvailableRef.current.checked;
        const imageData = imageRef.current;

        // parse checkbox result e.g if checkbox_clicked true = 1 if checkbox_clicked false = 0
        returnedAvailable === true ? (returnedAvailable = 1) : (returnedAvailable = 0);

        const item = {
            itemId: null,
            category_id: null,
            itemAvailable: returnedAvailable,
            itemName: returnedName,
            itemPrice: returnedPrice,
            itemQuantity: returnedQuantity,
            itemVolume: returnedVolume,
            itemWeight: returnedWeight,
        };

        const POST_URL = "http://localhost:8080/item/add"; // fetch url
        axios.post(POST_URL, item).then((res) => {
            console.log(res);
        });

        const UPLOAD_URL = "http://localhost:8080/upload";
        formData.append('image', imageData.files[0]);
        axios.post(UPLOAD_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            console.log(res);
        });
    }

    return (
        <Form onSubmit={submitHandler}>
            <FormGroup className="mb-3" controlId="formItemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Item Name"
                    ref={itemNameRef}
                />
            </FormGroup>

            <FormGroup controlId="formFile" className="mb-3">
                <Form.Label>Item Image</Form.Label>
                <Form.Control type="file"
                              ref={imageRef}
                />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemDescription">
                <Form.Label>Item Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="Enter Item Description"
                />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemCategory">
                {/* checkbox */}
                <Form.Label>Item Category</Form.Label>
                <Form.Check type="checkbox" label="Food" />
                <Form.Check type="checkbox" label="Clothing" />
                <Form.Check type="checkbox" label="Electronics" />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemAvailable">
                <Form.Label>Available</Form.Label>
                <Form.Check type="checkbox" label="Available" ref={itemAvailableRef} />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemPrice">
                <Form.Label>Item Price</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                        aria-label="Amount (to the nearest dollar)"
                        ref={itemPriceRef}
                    />
                    <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemQuantity">
                <Form.Label>Item Quantity</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter Item Quantity"
                    ref={itemQuantityRef}
                />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemWeight">
                <Form.Label>Item Weight</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter Item Weight"
                    ref={itemWeightRef}
                />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemVolume">
                <Form.Label>Item Volume</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter Item Volume"
                    ref={itemVolumeRef}
                />
            </FormGroup>

            <Button type="submit" className="btn btn-success">
                Add Item
            </Button>
        </Form>
    );
}
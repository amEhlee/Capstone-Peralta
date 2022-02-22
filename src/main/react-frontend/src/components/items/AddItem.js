// Import Dependencies
import React, {useRef, useState, useEffect} from "react";
import axios from "axios";

// Import Components
import {Form, FormGroup, InputGroup, Button, FormControl} from "react-bootstrap";
import Item from "./Item";
import CategoryChecklist from "../categories/SelectCategory";
import SelectCategory from "../categories/SelectCategory";

// Import Styles
import Style from "../../assets/styles/ItemStyle.module.css"



export default function AddItem() {

    const itemNameRef = useRef();
    const itemPriceRef = useRef();
    const itemWeightRef = useRef();
    const itemVolumeRef = useRef();
    const itemQuantityRef = useRef();
    const itemAvailableRef = useRef();
    const imageRef = useRef();
    let formData = new FormData();

    const itemCategoryRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const returnedName = itemNameRef.current.value;
        const returnedPrice = itemPriceRef.current.value;
        const returnedWeight = itemWeightRef.current.value;
        const returnedVolume = itemVolumeRef.current.value;
        const returnedQuantity = itemQuantityRef.current.value;
        let returnedAvailable = itemAvailableRef.current.value;
        const imageData = imageRef.current;
        //const returnedCategories = itemCategoryRef.current.value;
  
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

        const UPLOAD_URL = "http://localhost:8080/upload/";
        formData.append('image', imageData.files[0]);

        const imagePost = async(itemId) => {
            try {
                const res = await axios.post(UPLOAD_URL + itemId, formData);
                console.log("response image add: " + res);
                formData.delete('image');
                window.location.reload(false);
            } catch (err) {
                console.error(err);
            }
        }

        const POST_URL = "http://localhost:8080/item/add"; // fetch url
        const itemPost = async () => {
            try {
                const res = await axios.post(POST_URL, item);
                    console.log("response item add: " + res.data);
                    // setResItemId(res.data.itemId);
                    imagePost(res.data.itemId);
                    // console.log(resItemId);
            } catch (err) {
                console.error(err);
            }
        };

        itemPost();
    }

    return (
        <Form onSubmit={submitHandler} className={Style.cute}>
            <FormGroup className="mb-3" controlId="formItemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Item Name"
                    ref={itemNameRef}
                />
            </FormGroup>

            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Item Images</Form.Label>
                <Form.Control type="file"
                multiple
                ref={imageRef}/>
            </Form.Group>

            <FormGroup className="mb-3" controlId="formItemDescription">
                <Form.Label>Item Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="Enter Item Description"
                />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemCategory">

                <Form.Label>Item Category</Form.Label>
                
                <SelectCategory ref={itemCategoryRef}/>
        
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemAvailable">
                <Form.Label>Available</Form.Label>
                <Form.Check type="switch" ref={itemAvailableRef}/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemPrice">
                <Form.Label>Item Price</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                        aria-label="Amount (to the nearest dollar)"
                        ref={itemPriceRef}
                    />
                </InputGroup>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemQuantity">
                <Form.Label>Item Quantity</Form.Label>
                <Form.Control
                    type="number"
                    min="0"
                    placeholder="Enter Item Quantity"
                    ref={itemQuantityRef}
                />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemWeight">
                <Form.Label>Item Weight</Form.Label>
                <InputGroup className="mb-3">
                <Form.Control
                    type="number"
                    placeholder="Enter Item Weight"
                    ref={itemWeightRef}
                />
                <InputGroup.Text>kg</InputGroup.Text>
                </InputGroup>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemVolume">
                <Form.Label>Item Volume</Form.Label>
                <Form.Control
                    type="number"
                    min="0"
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
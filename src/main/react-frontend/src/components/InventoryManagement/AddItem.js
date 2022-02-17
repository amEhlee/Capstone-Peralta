import React from "react";
import {useRef, useState, useEffect} from "react";
import {Form, FormGroup, InputGroup, Button, FormControl} from "react-bootstrap";
import axios from "axios";

import Item from "../items/Item";

export default function AddItem() {
    //grabs the categories
    var [categoryjson, setcategoryjson] = useState([]);
    const FETCH_URL = "http://localhost:8080/category/all";

    //to check the state of checkbox for each category also updates the state n stuff
    const [checkedState, setCheckedState] = useState(
        new Array(categoryjson.length).fill(false)
    );

    const itemNameRef = useRef();
    const itemPriceRef = useRef();
    const itemWeightRef = useRef();
    const itemVolumeRef = useRef();
    const itemQuantityRef = useRef();
    const itemAvailableRef = useRef();
    const imageRef = useRef();
    let formData = new FormData();

    //initializing array of checked categories
    const checkedCategories = [];


    function getCategories() {
        return axios
            .get(FETCH_URL) // preform get request
            .then((res) => {
                return res.data; // return response
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        getCategories().then((data) => {
            console.log(data); // log returned data

            setcategoryjson(data || "no data returned"); // store returned data in a variable
        });
    }, []);

    console.log(categoryjson);


    // const handleOnChange = (position) => {
    //     const updatedCheckedState = checkedState.map((item, index) =>
    //         index === position ? !item : item
    //     );
    //
    //     setCheckedState(updatedCheckedState);
    // }


    function submitHandler(event) {
        event.preventDefault();
        const returnedName = itemNameRef.current.value;
        const returnedPrice = itemPriceRef.current.value;
        const returnedWeight = itemWeightRef.current.value;
        const returnedVolume = itemVolumeRef.current.value;
        const returnedQuantity = itemQuantityRef.current.value;
        let returnedAvailable = itemAvailableRef.current.checked;
        const imageData = imageRef.current;

        //parses through the checked categories and adds the category_id to an array
        // const itemCategories = updatedCheckedState.reduce(
        //     (currentState, index) => {
        //         if(currentState === true){
        //             checkedCategories.push(categoryjson[index].category_id);
        //         }
        //     }
        // )

        // const returnedItemCategories = checkedCategories;


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

        const UPLOAD_URL = "http://localhost:8080/upload/";
        formData.append('image', imageData.files[0]);
        const imagePost = async(itemId) => {
            try {
                const res = await axios.post(UPLOAD_URL + itemId, formData);
                console.log("image itemId: " + itemId);
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
                    console.log(res.data);
                    console.log("Response itemId: " + res.data.itemId);
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
        <Form onSubmit={submitHandler}>
            <FormGroup className="mb-3" controlId="formItemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Item Name"
                    ref={itemNameRef}
                />
            </FormGroup>


            {/* TODO idk if this is correct im just doing ecause its here :)
            <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Item Images</Form.Label>
            <Form.Control type="file" multiple/>
            </Form.Group>
            */}

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

                {categoryjson.map((i) => (
                    <Form.Check type="checkbox" name="category" value={i.category_id} label={i.categoryName}
                                // checked={checkedState[index]} onChange={handleOnChange(index)}  <- attempted to put items in array
                    />
                ))}


                {/*the following will allow you to create a checkbox with custom text....*/}
                {/*<InputGroup className="mb-3">*/}
                {/*    <InputGroup.Checkbox aria-label="Checkbox for following text input" />*/}
                {/*    <FormControl aria-label="Text input with checkbox" />*/}
                {/*</InputGroup>*/}
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemAvailable">
                <Form.Label>Available</Form.Label>
                <Form.Check type="checkbox" label="Available" ref={itemAvailableRef}/>
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

            <Button className="btn btn-success" onClick={getCategories}>console </Button>
        </Form>
    );
}
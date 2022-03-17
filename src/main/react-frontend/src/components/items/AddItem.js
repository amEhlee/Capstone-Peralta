// Import Dependencies
import React, {useRef, useState, useEffect} from "react";
import axios from "axios";

// Import Components
import {Form, FormGroup, InputGroup, Button, FormControl, Col, Row} from "react-bootstrap";
import Item from "./Item";
import CategoryChecklist from "../categories/SelectCategory";
//import SelectCategory from "../categories/SelectCategory";

// Import Styles
import Style from "../../assets/styles/ItemStyle.module.css"
import Select from 'react-select'



export default function AddItem() {


    var [categoryjson, setcategoryjson] = useState([]);

    //sets the catergory URL
    const FETCH_URL = "http://localhost:8080/category/all";

    //sets CategoryList to a copy of categoryjson
    var CategoryList = [...categoryjson.map((i) => (
        {value: i.categoryId, label: i.categoryName}))];

    //fetches all categories from the database using axios
    function getCategories() {
        return axios
            .get(FETCH_URL) // preform get request
            .then((res) => {
                setcategoryjson(res.data || "no data returned");
                console.log(res.data); // return response
            })
            .catch((err) => console.error(err));
    }

    //runs getCategories function on every render
    useEffect(() => {
        getCategories();
    }, []);

    //sets the state of the item
    const itemNameRef = useRef();
    const itemPriceRef = useRef();
    const itemWeightRef = useRef();
    const itemVolumeRef = useRef();
    const itemQuantityRef = useRef();
    const itemAvailableRef = useRef();
    const itemDescriptionRef = useRef();
    const imageRef = useRef();
    const addCategoryRef = useRef();
    let formData = new FormData();

    const itemCategoryRef = useRef();

    //sets the category
    function submitCategory() {
        const returnedCategory = addCategoryRef.current.value;

        const category = {
            categoryName: returnedCategory 
        }

        const CATEGORY_URL = "http://localhost:8080/category/add"
        const categoryPost = async() => {
            try {
                await axios.post(CATEGORY_URL, category)
                getCategories();
            } catch (err) {
                console.error(err);
            }
        }

        categoryPost();
    }

    function submitHandler(event) {
        event.preventDefault();
        const returnedName = itemNameRef.current.value;
        const returnedPrice = itemPriceRef.current.value;
        const returnedWeight = itemWeightRef.current.value;
        const returnedVolume = itemVolumeRef.current.value;
        const returnedQuantity = itemQuantityRef.current.value;
        const returnedDescription = itemDescriptionRef.current.value;
        let returnedAvailable = itemAvailableRef.current.checked;
        const imageData = imageRef.current;
        const returnedCategoriesValue = itemCategoryRef.current.props.value.value;
  
        returnedAvailable === true ? (returnedAvailable = 1) : (returnedAvailable = 0);

        const item = {
            itemId: null,
            category_id: null,
            itemAvailable: returnedAvailable,
            itemName: returnedName,
            itemDescription: returnedDescription,
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

        const POST_URL = "http://localhost:8080/item/add/" + returnedCategoriesValue; // fetch url
        const itemPost = async () => {
            try {
                const res = await axios.post(POST_URL, item);
                    // console.log("response item add: " + res.data);
                    // setResItemId(res.data.itemId);
                    if (imageData.files[0]){
                        imagePost(res.data.itemId);
                    }
                    console.log(returnedCategoriesValue);
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
                    ref={itemDescriptionRef}
                />
            </FormGroup>

            
            <FormGroup className="mb-3" controlId="formAddCategory">
                <Form.Label>Add Category</Form.Label>
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter Category Name"
                            ref={addCategoryRef}
                        />
                    </Col>
                    <Col lg={4}>
                        <Button variant="primary" onClick={submitCategory}>Add Category</Button>
                    </Col>
                </Row>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formItemCategory">
                <Form.Label>Category</Form.Label>
                <Select
                    options={categoryjson.map((i) => (
        {value: i.categoryId, label: i.categoryName}))}

                    placeholder="Select Category"
                    isSearchable
                    isClearable

                    ref={itemCategoryRef}
                />

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
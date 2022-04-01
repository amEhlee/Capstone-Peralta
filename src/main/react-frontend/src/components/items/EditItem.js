// Import Dependencies
import React, { useContext, useState, useRef, useEffect} from "react";
import axios from "axios";

// Import Components
import { Form, FormGroup, InputGroup, Button, Col, Row } from "react-bootstrap";
import { UserContext } from "../../UserContext";
import Select from 'react-select'

// Import Styles
import Style from "../../assets/styles/ItemStyle.module.css";

export default function EditItem(props) {
	//sets CategoryList to a copy of categoryjson
    const [categoryjson, setcategoryjson] = useState([]);
    //sets the catergory URL
    const FETCH_URL = "http://localhost:8080/category/all";
	// sets the state of the item
	const token = useContext(UserContext).contextData.token;
	const itemNameRef = useRef();
	const itemPriceRef = useRef();
	const itemWeightRef = useRef();
	const itemVolumeRef = useRef();
	const itemQuantityRef = useRef();
	const itemAvailableRef = useRef();
	const addCategoryRef = useRef();
	const imageRef = useRef();
	let formData = new FormData();

	//fetches all categories from the database using axios
    function getCategories() {
        return axios
            .get(FETCH_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }) // preform get request
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
                await axios.post(CATEGORY_URL, category, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                getCategories();
            } catch (err) {
                console.error(err);
            }
        }

        categoryPost();
    }

	function submitHandler(event) {
		// prevent default form submit page reload
		event.preventDefault();

		// close the modal TODO: MOVE TO PUT REQUEST SUCESS
		props.handleClose();
		
		// gather form data
		const returnedName = itemNameRef.current.value;
		const returnedPrice = itemPriceRef.current.value;
		const returnedWeight = itemWeightRef.current.value;
		const returnedVolume = itemVolumeRef.current.value;
		const returnedQuantity = itemQuantityRef.current.value;
		let returnedAvailable = itemAvailableRef.current.checked;
		const imageData = imageRef.current;
		const returnedCategoriesValue = itemCategoryRef.current.props.value.value;

		// parse checkbox result e.g if checkbox_clicked true = 1 if checkbox_clicked false = 0
		returnedAvailable === true
			? (returnedAvailable = 1)
			: (returnedAvailable = 0);

		// create a new item object based on fields
		const item = {
			itemId: props.item.itemId,
			category_id: null,
			itemAvailable: returnedAvailable,
			itemName: returnedName,
			itemPrice: returnedPrice,
			itemQuantity: returnedQuantity,
			itemVolume: returnedVolume,
			itemWeight: returnedWeight,
		};


		const UPLOAD_URL = "http://localhost:8080/image/upload/";
		formData.append("image", imageData.files[0]);
		const imagePost = async (itemId) => {
			try {
				const res = await axios.post(UPLOAD_URL + itemId, formData, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log("response image post: " + res);
				formData.delete("image");
			} catch (err) {
				console.error(err);
			}
		};

		// put destination url
		const PUT_URL = "http://localhost:8080/item/update"; 
		const itemPost = async () => {
			try {
				const res = await axios.put(PUT_URL, item, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log(res.data);
				if (imageData.files[0]){
					imagePost(res.data.itemId);
				}
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
					defaultValue={props.item.itemName}
				/>
			</FormGroup>

			<Form.Group controlId="formFileMultiple" className="mb-3">
				<Form.Label>Item Images</Form.Label>
				<Form.Control type="file" ref={imageRef} />
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
				<Form.Check type="checkbox" label="Available" ref={itemAvailableRef} />
			</FormGroup>

			<FormGroup className="mb-3" controlId="formItemPrice">
				<Form.Label>Item Price</Form.Label>
				<InputGroup className="mb-3">
					<InputGroup.Text>$</InputGroup.Text>
					<Form.Control
						aria-label="Amount (to the nearest dollar)"
						ref={itemPriceRef}
						defaultValue={props.item.itemPrice}
					/>
				</InputGroup>
			</FormGroup>

			<FormGroup className="mb-3" controlId="formItemQuantity">
				<Form.Label>Item Quantity</Form.Label>
				<Form.Control
					type="number"
					placeholder="Enter Item Quantity"
					ref={itemQuantityRef}
					defaultValue={props.item.itemQuantity}
				/>
			</FormGroup>

			<FormGroup className="mb-3" controlId="formItemWeight">
				<Form.Label>Item Weight</Form.Label>
				<InputGroup className="mb-3">
					<Form.Control
						type="number"
						placeholder="Enter Item Weight"
						ref={itemWeightRef}
						defaultValue={props.item.itemWeight}
					/>
					<InputGroup.Text>kg</InputGroup.Text>
				</InputGroup>
			</FormGroup>

			<FormGroup className="mb-3" controlId="formItemVolume">
				<Form.Label>Item Volume</Form.Label>
				<Form.Control
					type="number"
					placeholder="Enter Item Volume"
					ref={itemVolumeRef}
					defaultValue={props.item.itemVolume}
				/>
			</FormGroup>

			<Button type="submit" className="btn btn-success">
				Edit Item
			</Button>
		</Form>
	);
}

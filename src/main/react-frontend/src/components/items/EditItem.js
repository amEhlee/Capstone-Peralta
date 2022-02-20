// Import Dependencies
import React, { useRef } from "react";
import axios from "axios";

// Import Components
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap";

// Import Styles
import Style from "../../assets/styles/ItemStyle.module.css";

export default function EditItem(props) {
	const itemNameRef = useRef();
	const itemPriceRef = useRef();
	const itemWeightRef = useRef();
	const itemVolumeRef = useRef();
	const itemQuantityRef = useRef();
	const itemAvailableRef = useRef();
	const imageRef = useRef();
	let formData = new FormData();

	function submitHandler(event) {
		event.preventDefault();
		const returnedName = itemNameRef.current.value;
		const returnedPrice = itemPriceRef.current.value;
		const returnedWeight = itemWeightRef.current.value;
		const returnedVolume = itemVolumeRef.current.value;
		const returnedQuantity = itemQuantityRef.current.value;
		let returnedAvailable = itemAvailableRef.current.checked;
		const imageData = imageRef.current;

		// parse checkbox result e.g if checkbox_clicked true = 1 if checkbox_clicked false = 0
		returnedAvailable === true
			? (returnedAvailable = 1)
			: (returnedAvailable = 0);

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


		// TODO possible modifications as this is for edit item NOT SURE THO :L
		const UPLOAD_URL = "http://localhost:8080/upload/";
        formData.append('image', imageData.files[0]);
        const imagePost = async(itemId) => {
            try {
                const res = await axios.post(UPLOAD_URL + itemId, formData); // TODO should be a put request 
                console.log("response image post: " + res);
                formData.delete('image');
                window.location.reload(false);
            } catch (err) {
                console.error(err);
            }
        }

        const PUT_URL = "http://localhost:8080/item/update"; // fetch url
        const itemPost = async () => {
            try {
                const res = await axios.put(PUT_URL, item);
                    console.log("response item put: " + res.data);
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
          defaultValue={props.item.itemName}
				/>
			</FormGroup>

			<Form.Group controlId="formFileMultiple" className="mb-3">
				<Form.Label>Item Images</Form.Label>
				<Form.Control type="file" 
					ref={imageRef}
				/>
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

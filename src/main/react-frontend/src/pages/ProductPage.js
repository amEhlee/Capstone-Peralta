import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";

import {
	Container,
	Col,
	Row,
	Button,
	Form,
	Stack,
	Alert,
} from "react-bootstrap";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import Image from "../components/items/Image";

export default function ProductPage() {
	// get item id from navbar
	let { itemid } = useParams();

	//Fetches the item using item ID
	const FETCH_URL = "http://localhost:8080/item/get/" + itemid;
	const token = useContext(UserContext).contextData.token;
	var [datajson, setDataJson] = useState([]);
	var [itemCategory, setItemCategory] = useState();
	const [itemAddedAlert, setItemAddedAlert] = useState(false);

	// form refs
	const selectedQuantity = useRef(); // quantity that the user selects

	// function that will be called when the page loads purpose is to handle and process the axios get request
	async function gatherData() {
		return await axios
			.get(FETCH_URL, {
				// include authorization header to be able to access the protected route
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}) // preform get request
			.then((res) => {
				setItemCategory(res.data.category.categoryName);
				return res.data; // return response data
			})
			.catch((err) => console.error(err));
	}

	// runs the gatherdata function when the page loads
	useEffect(() => {
		gatherData().then((data) => {
			setDataJson(data || "no data returned"); // store returned data in a variable
		});
	}, []);

	// this function will itemAddedAlert the alert in a seperate div when a user adds an item to their cart
	function conditionalAlertRender() {
		// let us know if item was added
		if (itemAddedAlert) {
			// return this seperate success alert
			return (
				<Alert variant="success" onClose={() => setItemAddedAlert(false)} dismissible>
					<Alert.Heading>Item added to cart</Alert.Heading>
					<p>Click the cart button to view your newly added items</p>
				</Alert>
			);
		}
	}

	//if no data is found return NO DATA FOUND
	if (datajson === "no data returned") {
		return (
			<section>
				<p>{datajson}</p>
				<p>NO DATA FOUND</p>
			</section>
		);
	} else {
		//if data is found return the data (item information)
		return (
			<>
				{conditionalAlertRender()}
				<Container fluid={"xxl"}>
					<Row>
						<Col md="auto" xs={10}>
							<Image itemId={itemid} size="350px" />
						</Col>

						<Col md="auto">
							<div><b>{datajson.itemName}</b></div>
							<div>{itemCategory}</div>
							<div>${datajson.itemPrice}</div>

							<Form>

								<Form.Group controlId="quantity-select" className="mb-3">
									<Form.Label>Select Quantity</Form.Label>
									<Form.Control
										type="number"
										min="0"
										max={datajson.itemQuantity}
										placeholder="Enter Item Quantity"
										ref={selectedQuantity}
										defaultValue={1}
									/>
								</Form.Group>

								{/*Adds to cart using previous*/}
								<UserContext.Consumer>
									{(value) => {
										function AddToCart() {
											// get the quantity from the form
											const givenQuantity = parseInt(selectedQuantity.current.value);

											// new cart that will replace the one saved in context
											let newCart = value.contextData.cart;

											// check to see if item is already in cart if so update quantity
											for (let i = 0; i < newCart.length; i++) {
												if (newCart[i].item.itemName === datajson.itemName) {
													newCart[i].quantity += givenQuantity;
													return newCart;
												}
											}

											// if item is not in cart push a new entry
											newCart.push({ item: datajson, quantity: givenQuantity });

											// inform the user that the item has been added
											setItemAddedAlert(true);

											// return the cart
											return newCart;
										}

										return (
											<Button
												variant={"primary"}
												className={"m-1"}
												onClick={() => {
													// Onclick set new cart data
													value.setContextData((prevData) => {
														return {
															...prevData,
															cart: AddToCart(),
														};
													});
												}}
											>
												Add To Cart
											</Button>
										);
									}}
								</UserContext.Consumer>
							</Form>
						</Col>
					</Row>

					<Row>
						{/*item desciption placeholder*/}
						<Stack gap={3}>
							<div />
							<div>{datajson.itemDescription}</div>
						</Stack>
					</Row>
				</Container>
			</>
		);
	}
}

import React, {useContext, useEffect, useState, useRef} from "react";
import axios from "axios";

import {Container,Col,Row,Button,Form,Stack} from "react-bootstrap";
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

	//if no data is found return NO DATA FOUND
	if (datajson === "no data returned") { 
		return (
			<section>
				<p>{datajson}</p>
				<p>NO DATA FOUND</p>
			</section>
		);
	} else { //if data is found return the data (item information)
		return (
			<>
				<Container fluid={"xxl"}>
					<Row>
						<Col md="auto" xs={10}>
							<Image itemId={itemid} size="350px" />
						</Col>

						<Col md="auto">
							<div>{datajson.itemName}</div>
							<div>{itemCategory}</div>
							<div>${datajson.itemPrice}</div>

							<Form>
								<Form.Group controlId="size-select" className={"mb-3"}>
									<Form.Label>Select Size</Form.Label>
									<Form.Control as="select">
										<option>Small</option>
										<option>Medium</option>
										<option>Large</option>
									</Form.Control>
								</Form.Group>

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
								<UserContext.Consumer >
									{(value) => {
										function AddToCart() {
											//TODO checking should be done here to make sure quantity is valid
											const givenQuantity = parseInt(selectedQuantity.current.value);
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
											return newCart;
										}

										return (
											<Button variant={"primary"} className={"m-1"}
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
								{/*TODO Add Logic for Buy Now Button*/}
								{/*Buy now will just send the user directly to checkout with the specified item*/}
								<Button variant={"primary"} className={"m-1"}>
									Buy Now
								</Button>
							</Form>
						</Col>
					</Row>

					<Row>
						{/*item desciption placeholder*/}
						<Stack gap={3}>
							<div/>
							<div>
								{datajson.itemDescription}
							</div>
						</Stack>
					</Row>
				</Container>


			</>
		);
	}
}

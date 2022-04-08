/**
 * This Page stores the Customer's Data about their Personal information like their name and email
 * Then Gets their Shipping information like their address and such to send them the item
 * The checkout button will send the admin an email about their information
 *
 *
 */
// import dependencies
import React, { useContext, useRef } from "react";
import axios from "axios";

// Import Components
import { Form, FormGroup, Button } from "react-bootstrap";
import { UserContext } from "../UserContext";
import Style from "../assets/styles/UserSide.module.css";

export default function CheckoutPage() {

	// instansiate user cart and user object
	const cart = useContext(UserContext).contextData.cart;
	let user = useContext(UserContext).contextData.user;

	// setup refs for the form
	const orderEmailRef = useRef();
	const orderAddressRef = useRef();

	// set blank user if information is null
	if (user === null) {
		user = {
			userId: null,
			firstName: "",
			lastName: "",
			password: null,
			email: "",
			address: "",
			postalCode: "",
			phoneNumber: "",
		};
	}

	function submitHandler(event) {
		// prevent default submit behaviour
		event.preventDefault();

		// will hold later items
		const formattedCart = [];

		// add itemIds to cart
		for (let i = 0; i < cart.length; i++) {
			for (let j = 0; j < cart[i].quantity; j++) {
				formattedCart.push(cart[i].item.itemId);
			}
		}

		// format order object to be sent
		let orderObject;

		orderObject = {
			orderId: null, // should be done on backend
			orderTotal: null, // should be done on backend
			itemAmount: null, // should be done on backend
			orderDate: null, // should be done on backend
			address: user.address,
			email: user.email,
			itemList: formattedCart,
			user: user,
		};

		console.log(orderObject);

		/* TODO Uncomment when you want to test!
		const POST_URL = "http://localhost:8080/order/add"; // fetch url
		axios.post(POST_URL, orderObject).then((res) => {
			console.log(res);
		});
		*/
	}

	return (
		<Form onSubmit={submitHandler}>
			<h3>Customer Info</h3>
			<FormGroup>
				<Form.Label> First Name: </Form.Label>
				<Form.Control
					type="text"
					placeholder="john"
					defaultValue={user.firstName}
				/>
			</FormGroup>

			<FormGroup>
				<Form.Label> Last Name: </Form.Label>
				<Form.Control
					type="text"
					placeholder="Doe"
					defaultValue={user.lastName}
				/>
			</FormGroup>

			<FormGroup>
				<Form.Label> Email: </Form.Label>
				<Form.Control
					type="text"
					placeholder="abcd@example.com"
					ref={orderEmailRef}
					defaultValue={user.email}
				/>
			</FormGroup>

			<h3> Shipping Info </h3>
			<FormGroup>
				<Form.Label> Address: </Form.Label>
				<Form.Control
					type="text"
					placeholder="123 x street NE"
					ref={orderAddressRef}
					defaultValue={user.address}
				/>
			</FormGroup>

			<FormGroup>
				<Form.Label> Postal Code: </Form.Label>
				<Form.Control
					type="text"
					placeholder="A1B1C1"
					defaultValue={user.postalCode}
				/>
			</FormGroup>

			<FormGroup>
				<Form.Label> Country: </Form.Label>
				<Form.Control type="text" placeholder="Canada" />
			</FormGroup>

			<FormGroup>
				<Form.Label> City: </Form.Label>
				<Form.Control type="text" placeholder="Calgary" />
			</FormGroup>

			<FormGroup>
				<Form.Label> Province: </Form.Label>
				<Form.Control type="text" placeholder="Alberta" />
			</FormGroup>

			<FormGroup>
				<Button type="submit" className="mb-3 btn btn-success ">
					Checkout and send email
				</Button>
			</FormGroup>
		</Form>
	);
}

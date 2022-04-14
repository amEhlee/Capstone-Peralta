/**
 * This Page stores the Customer's Data about their Personal information like their name and email
 * Then Gets their Shipping information like their address and such to send them the item
 * The checkout button will send the admin an email about their information
 *
 *
 */
// import dependencies
import React, {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import {
	validateEmail,
	validatePostalCode,
} from "../components/validation/FormValidation.js";

// Import Components
import { Form, FormGroup, Button, Alert } from "react-bootstrap";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
	// setup refs for the form
	const orderFirstNameRef = useRef();
	const orderLastNameRef = useRef();
	const orderEmailRef = useRef();
	const orderAddressRef = useRef();
	const orderPostalCodeRef = useRef();

	const navigate = useNavigate();

	// instansiate user cart and user object
	const cart = useContext(UserContext).contextData.cart;
	let user = useContext(UserContext).contextData.user;


	const [fields, setFields] = useState({
		firstName: "",
		lastName: "",
		email: "",
		address: "",
		postalCode: "",
	});

	let emailToggle = false;


	function emptyRedirect() {
		if (cart.length === 0) {
			navigate("/");
			return;
		}
	}

	useEffect(() => {
		emptyRedirect();
	}, []);

	const [error, setError] = useState({});
	const [work, setWork] = useState(false);
	function conditionalAlertRender() {
		if (work) {
			return (
				<Alert variant="success" onClose={() => navigate("/order")} dismissible>
					<Alert.Heading>Successfully ordered</Alert.Heading>
					<p>An email has been sent to you regarding your info!</p>
				</Alert>
			);
		}
	}

	function validation() {
		let errorDisplay = {};

		if (!orderFirstNameRef.current.value) {
			errorDisplay.firstName = "￮ You need to enter your first name";
		}

		if (!orderLastNameRef.current.value) {
			errorDisplay.lastName = "￮ You need to enter your last name";
		}

		if (!orderEmailRef.current.value) {
			errorDisplay.email = "￮ You need to enter your email";
		}
		else if (!validateEmail(orderEmailRef.current.value) && !emailToggle) {
			errorDisplay.email = "￮ Invalid Email";
		}

		if (!orderAddressRef.current.value) {
			errorDisplay.address = "￮ You need to enter your address";
		}

		if (!orderPostalCodeRef.current.value) {
			errorDisplay.postalCode = "￮ You need to enter your postal code";
		}
		else if (!validatePostalCode(orderPostalCodeRef.current.value)) {
			errorDisplay.postalCode = "￮ Your postal code format should follow A1A A1A";
		}

		setError(errorDisplay);
		return Object.keys(errorDisplay).length === 0;
	}

	let orderDetails = "";
	let orderTtlPrice = 0;

	// Acquire each individual cart item and place the order detail into HTML table rows
	cart.map((cartObject) => {
		orderDetails +=
			'<tr>' +
			'<td>' + cartObject.item.itemName + '</td>' +
			'<td>' + cartObject.quantity + '</td>' +
			'<td>' + (cartObject.item.itemPrice * cartObject.quantity) + '</td>' +
			'</tr>';
		orderTtlPrice += (cartObject.item.itemPrice * cartObject.quantity);
	})
	orderTtlPrice = orderTtlPrice.toFixed(2);

	// Combine cart item rows to the table for formatting the email receipt
	let orderHTML =
		'<table>' +
		'<tr>' +
		'<th>Product</th>' +
		'<th>Quantity</th>' +
		'<th>Price</th>' +
		'</tr>' +  orderDetails +
		'</table>';


	// set blank user if information is null
	if (user === null) {
		user = {
			userId: 1,
			firstName: "",
			lastName: "",
			password: "",
			email: "",
			address: "",
			postalCode: "",
			phoneNumber: "",
		};
	}
	else {
		emailToggle = true;
	}

	function submitHandler(event) {
		// prevent default submit behaviour
		event.preventDefault();

		if (validation()) {
			// will hold later items
			const formattedCart = [];

			// set appropriate user information
			user.firstName = orderFirstNameRef.current.value;
			user.lastName = orderLastNameRef.current.value;
			user.email = orderEmailRef.current.value;
			user.address = orderAddressRef.current.value;
			user.postalCode = orderPostalCodeRef.current.value;

			console.log(user.email);
			// add itemIds to cart
			for (let i = 0; i < cart.length; i++) {
				for (let j = 0; j < cart[i].quantity; j++) {
					formattedCart.push(cart[i].item);
				}
			}

			// format order object to be sent
			let orderObject;
			orderObject = {
				orderId: null, // should be done on backend
				orderTotal: null, // should be done on backend
				orderStatus: null,
				itemAmount: null, // should be done on backend
				orderDate: null, // should be done on backend
				address: user.address,
				email: user.email,
				itemList: formattedCart,
				user: user,
			};

			console.log(orderObject);

			const POST_URL = "http://localhost:8080/order/add"; // fetch url
			axios.post(POST_URL, orderObject).then((res) => {
				console.log(res);
			});

			emailjs.sendForm("service_4u1fh14", "template_d489nzh", event.target, "QitERWWr6H0DNKr-1")
				.then((result) => {
					console.log(result.text);
				}, (error) => {
					console.log(error.text);
				});
			event.target.reset()
			// if everything was successful render the alert
			setWork(true);
		}
	}

	return (
		<>
            {/* conditionally rendered after successful order */}
            {conditionalAlertRender()}
			<Form onSubmit={submitHandler}>
				<h3>Customer Info</h3>
				<FormGroup>
					<Form.Label> First Name: </Form.Label>
					<Form.Control
						type="text"
						placeholder="John"
						ref={orderFirstNameRef}
						defaultValue={user.firstName}
						onChange={(e) => setFields({ ...fields, firstName: e.target.value })}
						name="firstName"
					/>
				</FormGroup>
				{error.firstName && (
					<p className="text-danger"> {error.firstName}</p>
				)}
				<FormGroup>
					<Form.Label> Last Name: </Form.Label>
					<Form.Control
						type="text"
						placeholder="Doe"
						ref={orderLastNameRef}
						defaultValue={user.lastName}
						onChange={(e) => setFields({ ...fields, lastName: e.target.value })}
						name="lastName"
					/>
				</FormGroup>
				{error.lastName && (
					<p className="text-danger"> {error.lastName}</p>
				)}
				<FormGroup>
					<Form.Label> Email: </Form.Label>
					<Form.Control
						type="text"
						placeholder="johnDoe@example.com"
						ref={orderEmailRef}
						defaultValue={user.email}
						onChange={(e) => setFields({ ...fields, email: e.target.value })}
						name="email"
						readOnly={emailToggle}
					/>
				</FormGroup>
				{error.email && (
					<p className="text-danger"> {error.email}</p>
				)}
				<h3> Shipping Info </h3>
				<FormGroup>
					<Form.Label> Address: </Form.Label>
					<Form.Control
						type="text"
						placeholder="12 Street NE"
						ref={orderAddressRef}
						defaultValue={user.address}
						onChange={(e) => setFields({ ...fields, address: e.target.value })}
						name="address"
					/>
				</FormGroup>
				{error.address && (
					<p className="text-danger"> {error.address}</p>
				)}
				<FormGroup>
					<Form.Label> Postal Code: </Form.Label>
					<Form.Control
						type="text"
						placeholder="A1B1C1"
						ref={orderPostalCodeRef}
						defaultValue={user.postalCode}
						onChange={(e) => setFields({ ...fields, postalCode: e.target.value })}
						name="postalCode"
					/>
				</FormGroup>
				{error.postalCode && (
					<p className="text-danger"> {error.postalCode}</p>
				)}

				<FormGroup>
					<Form.Control type="hidden" name="orderItems" value={orderHTML}/>
					<Form.Control type="hidden" name="orderTotal" value={orderTtlPrice}/>
					<Button type="submit" className="mb-3 mt-3 btn btn-success ">
						Checkout
					</Button>
				</FormGroup>
			</Form>
		</>
	);
}

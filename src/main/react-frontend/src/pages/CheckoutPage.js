/**
 * This Page stores the Customer's Data about their Personal information like their name and email
 * Then Gets their Shipping information like their address and such to send them the item
 * The checkout button will send the admin an email about their information
 *
 *
 */
// import dependencies
import React, {useContext, useRef, useState} from "react";
import axios from "axios";
import emailjs from "emailjs-com";

// Import Components
import {Form, FormGroup, Button} from "react-bootstrap";
import {UserContext} from "../UserContext";
import Style from "../assets/styles/UserSide.module.css";

export default function CheckoutPage() {

    const [fields, setFields] = useState({
		firstName: "",
		lastName: "",
		password: "",
		confirmPass:"",
		address: "",
		postalCode: "",
		phoneNumber: ""
	});

	const [error, setError] = useState({});

	const [work, setWork] = useState(false);
	if (work) {
		return (
			<Alert variant="success" onClose={() => setWork(false)} dismissible>
				<Alert.Heading>Successfully ordered</Alert.Heading>
				<p>
					An email has been sent to you regarding your info!
				</p>
			</Alert>
		);
	}


	function validation() {
		let errorDisplay={};

		if (!fields.firstName) {
			errorDisplay.firstName = "￮ You need to input your first name";
		}


		if (!fields.lastName) {
			errorDisplay.lastName = "￮ You need to input your last name";
		}

		if (!fields.password){
			errorDisplay.password= "￮ You need to input your Password"
		}

		else if (!/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/ .test(fields.password)){
			errorDisplay.password = "￮ your password is invalid";
		}
		//TODO: have to check for the password matching donno how yet
		if (!fields.address){
			errorDisplay.address= "￮ You need to input your address"
		}

		if (!fields.postalCode){
			errorDisplay.postalCode= "￮ You need to input your postal code"
		}
		else if (!/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/.test(fields.postalCode)){
			errorDisplay.postalCode = "￮ your postal code format should be like this A1A A1A";
		}

		if (!fields.phoneNumber){
			errorDisplay.phoneNumber= "￮ You need to input your phone number"
		}
		else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(fields.phoneNumber)){
			errorDisplay.postalCode = "￮ your phone number is invalid";
		}

		setError(errorDisplay);
		if (Object.keys(errorDisplay).length===0){
			return true;
		}else {
			return false;
		}


	};

    // instansiate user cart and user object
    const cart = useContext(UserContext).contextData.cart;
    let user = useContext(UserContext).contextData.user;

    // add each individual item for email receipt
    let formattedString = "";
    cart.map((i) => {
        formattedString += i.item.itemName + " Quantity:" + i.quantity + '<hr/>';
    })

    // setup refs for the form
    const orderFirstNameRef = useRef();
    const orderLastNameRef = useRef();
    const orderEmailRef = useRef();
    const orderAddressRef = useRef();
    const orderPostalCodeRef = useRef();

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

        if (validation(fields)){
			setWork(true);
		} else {
			setWork(false);
		}

        // will hold later items
        const formattedCart = [];

        // set appropriate user information
        user.firstName = orderFirstNameRef.current.value;
        user.lastName = orderLastNameRef.current.value;
        user.email = orderEmailRef.current.value;
        user.address = orderAddressRef.current.value;
        user.postalCode = orderPostalCodeRef.current.value;

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
            user: user
        };

        console.log(orderObject);

        // TODO Uncomment when you want to test!
        const POST_URL = "http://localhost:8080/order/add"; // fetch url
        axios.post(POST_URL, orderObject).then((res) => {
            console.log(res);
        });

        emailjs.sendForm('service_4u1fh14', 'template_d489nzh', event.target, 'QitERWWr6H0DNKr-1')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        event.target.reset()

    }

    return (
        <Form onSubmit={submitHandler}>
            <h3>Customer Info</h3>
            <FormGroup>
                <Form.Label> First Name: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="John"
                    ref={orderFirstNameRef}
                    defaultValue={user.firstName}
                    name="firstName"
                />
            </FormGroup>

            <FormGroup>
                <Form.Label> Last Name: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Doe"
                    ref={orderLastNameRef}
                    defaultValue={user.lastName}
                    name="lastName"
                />
            </FormGroup>

            <FormGroup>
                <Form.Label> Email: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="johnDoe@example.com"
                    ref={orderEmailRef}
                    defaultValue={user.email}
                    name="email"
                />
            </FormGroup>

            <h3> Shipping Info </h3>
            <FormGroup>
                <Form.Label> Address: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="12 Street NE"
                    ref={orderAddressRef}
                    defaultValue={user.address}
                    name="address"
                />
            </FormGroup>

            <FormGroup>
                <Form.Label> Postal Code: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="A1B1C1"
                    ref={orderPostalCodeRef}
                    defaultValue={user.postalCode}
                    name="postalCode"
                />
            </FormGroup>

            <FormGroup>
                <Form.Label> Country: </Form.Label>
                <Form.Control type="text" placeholder="Canada"/>
            </FormGroup>

            <FormGroup>
                <Form.Label> City: </Form.Label>
                <Form.Control type="text" placeholder="Calgary" name="city"/>
            </FormGroup>

            <FormGroup>
                <Form.Label> Province: </Form.Label>
                <Form.Control type="text" placeholder="Alberta" name="province"/>
            </FormGroup>

            <FormGroup>
                <Form.Control type="hidden" name="orderItems" value={formattedString}/>
                <Button type="submit" className="mb-3 btn btn-success ">
                    Checkout and send email
                </Button>
            </FormGroup>
        </Form>
    );
}

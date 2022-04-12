// Import Dependencies
import React, { Form, FormGroup, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import {UserContext} from "../UserContext";
import {validateEmail, validatePassword, validatePasswordsMatch, validatePostalCode, validatePhoneNumber} from "../components/validation/FormValidation.js";

// Import Styling
import userStyle from "../assets/styles/UserSide.module.css";
import cartE from "../assets/videos/cart.mp4";

export default function  SignUpUserPage() {
        const firstnameRef = useRef();
        const lastnameRef = useRef();
        const emailRef = useRef();
        const passwordRef = useRef();
        const confirmPasswordRef = useRef();
        const addressRef = useRef();
        const postalRef = useRef();
        const phoneNumberRef = useRef();


        const givenContext = useContext(UserContext);
        const navigate = useNavigate();

	const [fields, setFields] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPass:"",
		address: "",
		postalCode: "",
		phoneNumber: ""
	});

	const [error, setError] = useState({});

    const [show, setShow] = useState(false);
    if (show) {
        return (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Your new Account is created!</Alert.Heading>
                <p>
                    Use login page to access your account
                </p>
            </Alert>
        );
    }

	const validation = () => {
		let errorDisplay={};

		if (!fields.firstName) {
			errorDisplay.firstName = "￮ You need to enter your first name";
		}

		if (!fields.lastName) {
			errorDisplay.lastName = "￮ You need to enter your last name";
		}

		if (!fields.email) {
			errorDisplay.email = "￮ You need to enter your Email";
		}

		//TODO FIX THIS V

		const POST_URL = "http://localhost:8080/user/userCheck"; // fetch url
		const emailIsTaken = axios.post(POST_URL, emailRef.current.value).then((res) => {
			console.log(res.data);
			return res.data;
		}).catch((err) => console.error(err)).value;
		console.log(emailIsTaken);

		if (emailIsTaken) {
			errorDisplay.email = "￮ Email is already taken";
		}

		//FIX THIS ^

		if (!validateEmail(fields.email)){
			errorDisplay.email = "￮ Your email format should follow example@gmail.com";
		}

		if (!fields.password) {
			errorDisplay.password = "￮ You need to enter your password";
		}

		if (!validatePassword(fields.password)) {
			errorDisplay.password = "￮ Your password is invalid. Passwords need to at least be six characters long and require one digit"; //TODO: Make this message talk about password requirements
		}

		if (!fields.confirmPass) {
			errorDisplay.confirmPass = "￮ Confirm your password";
		}

		if (!validatePasswordsMatch(fields.password, fields.confirmPass)) {
			errorDisplay.confirmPass = "￮ Password does not match";
		}

		//TODO: have to check for the password matching donno how yet
		if (!fields.address){
			errorDisplay.address= "￮ You need to enter your address";
		}

		if (!fields.postalCode) {
			errorDisplay.postalCode = "￮ You need to enter your postal code";
		}

		if (!validatePostalCode(fields.postalCode)) {
			errorDisplay.postalCode = "￮ Your postal code format should follow A1A 1A1, etc";
		}

		if (!fields.phoneNumber) {
			errorDisplay.phoneNumber = "￮ You need to input your phone number";
		}

		if (!validatePhoneNumber(fields.phoneNumber)) {
			errorDisplay.phoneNumber = "￮ Your phone number is invalid";
		}

		setError(errorDisplay);
		if (Object.keys(errorDisplay).length===0){
			return true;
		}else {
			return false;
		}

	}

	async function submitHandler(event) {
		event.preventDefault();

		const returnedFirstName = firstnameRef.current.value;
		const returnedLastName = lastnameRef.current.value;
		const returnedEmail = emailRef.current.value;
		const returnedPassword = passwordRef.current.value;
		const returnedConfirmPassword = confirmPasswordRef.current.value;
		const returnedAddress = addressRef.current.value;
		const returnedPostalCode = postalRef.current.value;
		const returnedPhoneNumber = phoneNumberRef.current.value;


		//console.log(returnedPassword);
		//console.log(returnedConfirmPassword);

		if (validation(fields) == true) {
			setShow(true); //TODO: FIX THIS
			const user = {
				firstName: returnedFirstName,
				lastName: returnedLastName,
				email: returnedEmail,
				password: returnedPassword,
				address: returnedAddress,
				postalCode: returnedPostalCode,
				phoneNumber: returnedPhoneNumber,
			};
			console.log("test 2");
			console.log(user);

			const POST_URL = "http://localhost:8080/user/signup"; // fetch url
			await axios.post(POST_URL, user).then((res) => {
				//console.log(res);
				givenContext.setContextData((prevData) => {
					return {
						...prevData,
						token: res.data.access_token,
					};
				});
			});

			// on success navigtate back to login
			await navigate("/login");

		}
		else {
			setShow(false); //TODO: FIX THIS
		}
	}

	return (
		<div className="test">
			<video
				autoPlay
				loop
				muted
				style={{
					position: "absolute",
					width: "100%",
					top: "50%",
					left: "50%",
					objectFit: "cover",
					height: "100%",
					transform: "translate(-50%,-50%)",
					zIndex: "-1",
				}}
			>
				<source src={cartE} type="video/mp4" />
			</video>

			<Form className={userStyle.centrize} onSubmit={submitHandler}>
				<FormGroup className="mb-3" controlId="firstnameForm">
					<Form.Label>First Name: </Form.Label>
					<Form.Control
						type="text"
						placeholder="Input firstname"
						onChange={((e) => setFields({...fields, firstName: e.target.value}))}
						value={fields.firstName}
						ref={firstnameRef}
					/>

					{error.firstName &&
						<p className="text-danger"> {error.firstName}</p>
					}
				</FormGroup>

				<FormGroup className="mb-3" controlId="lastnameForm">
					<Form.Label>Last Name: </Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter lastname"
						onChange={((e) => setFields({...fields, lastName: e.target.value}))}
						value={fields.lastName}
						ref={lastnameRef}
					/>

					{error.lastName &&
						<p className="text-danger"> {error.lastName}</p>
					}
				</FormGroup>

				<FormGroup className="mb-3" controlId="emailForm">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter Email"
						onChange={((e) => setFields({...fields, email: e.target.value}))}
						value={fields.email}
						ref={emailRef}
					/>

					{error.email &&
						<p className="text-danger"> {error.email}</p>
					}
				</FormGroup>

				<FormGroup className="mb-3" controlId="passwordForm">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter your password"
						onChange={((e) => setFields({...fields, password: e.target.value}))}
						value={fields.password}
						ref={passwordRef}
					/>

					{error.password &&
						<p className="text-danger"> {error.password}</p>
					}
				</FormGroup>

				<FormGroup className="mb-3" controlId="confirmPasswordForm">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm your password"
						ref={confirmPasswordRef}
						onChange={((e) => setFields({...fields, confirmPass: e.target.value}))}
						value={fields.confirmPass}
						ref={confirmPasswordRef}
					/>

					{error.confirmPass &&
						<p className="text-danger"> {error.confirmPass}</p>
					}
				</FormGroup>

				<FormGroup className="mb-3" controlId="addressForm">
					<Form.Label>Address: </Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter address"
						onChange={((e) => setFields({...fields, address: e.target.value}))}
						value={fields.address}
						ref={addressRef}
					/>
					{error.address &&
						<p className="text-danger"> {error.address}</p>
					}
				</FormGroup>

				<FormGroup className="mb-3" controlId="postalcodeForm">
					<Form.Label>Postal Code: </Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Postal Code"
						onChange={((e) => setFields({...fields, postalCode: e.target.value}))}
						values={fields.postalCode}
						ref={postalRef}
					/>

					{error.postalCode &&
						<p className="text-danger"> {error.postalCode}</p>
					}
				</FormGroup>

				<FormGroup className="mb-3" controlId="phoneNumberForm">
					<Form.Label>Phone Number: </Form.Label>
					<Form.Control
						type="tel"
						placeholder="Enter Phone Number"
						onChange={((e) => setFields({...fields, phoneNumber: e.target.value}))}
						values={fields.phoneNumber}
						ref={phoneNumberRef}
					/>

					{error.phoneNumber &&
						<p className="text-danger"> {error.phoneNumber}</p>
					}
				</FormGroup>

				<FormGroup className="mb-3" controlId="haveAccount">
					<Form.Text className="text-muted">Already have an account?</Form.Text>
					<Link to="/login" className="ml-2">Login</Link>
				</FormGroup>

				<Button type="submit" variant="warning" >
					Sign Up
				</Button>
			</Form>
		</div>
	);
}




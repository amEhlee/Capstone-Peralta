// Import Dependencies
import React, { useRef, useState } from "react";
import { Form, FormGroup, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
	validateEmail,
	validatePassword,
	validatePasswordsMatch,
	validatePostalCode,
	validatePhoneNumber,
} from "../components/validation/FormValidation.js";
import axios from "axios";

// Import Styling
import userStyle from "../assets/styles/UserSide.module.css";
import cartE from "../assets/videos/cart.mp4";

export default function SignUpUserPage() {
	// gather form input
	const firstnameRef = useRef();
	const lastnameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();
	const addressRef = useRef();
	const postalRef = useRef();
	const phoneNumberRef = useRef();

	// get context informatino
	const navigate = useNavigate();
	
	// declare error state variables
	const [error, setError] = useState({});
	const [fields, setFields] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPass: "",
		address: "",
		postalCode: "",
		phoneNumber: "",
	});


	function validation() {
		let errorDisplay = {};

		if (!fields.firstName) {
			errorDisplay.firstName = "￮ You need to enter your first name";
		}

		if (!fields.lastName) {
			errorDisplay.lastName = "￮ You need to enter your last name";
		}

		if (!fields.email) {
			errorDisplay.email = "￮ You need to enter your Email";
		}

		if (!validateEmail(fields.email)) {
			errorDisplay.email =
				"￮ Your email format should follow example@gmail.com";
		}

		if (!fields.password) {
			errorDisplay.password = "￮ You need to enter your password";
		}

		if (!validatePassword(fields.password)) {
			errorDisplay.password =
				"￮ Your password is invalid. Passwords need to at least be six characters long and require one digit"; //TODO: Make this message talk about password requirements
		}

		if (!fields.confirmPass) {
			errorDisplay.confirmPass = "￮ Confirm your password";
		}

		if (!validatePasswordsMatch(fields.password, fields.confirmPass)) {
			errorDisplay.confirmPass = "￮ Password does not match";
		}

		//TODO: have to check for the password matching donno how yet
		if (!fields.address) {
			errorDisplay.address = "￮ You need to enter your address";
		}

		if (!fields.postalCode) {
			errorDisplay.postalCode = "￮ You need to enter your postal code";
		}

		if (!validatePostalCode(fields.postalCode)) {
			errorDisplay.postalCode =
				"￮ Your postal code format should follow A1A 1A1, etc";
		}

		if (!fields.phoneNumber) {
			errorDisplay.phoneNumber = "￮ You need to input your phone number";
		}

		if (!validatePhoneNumber(fields.phoneNumber)) {
			errorDisplay.phoneNumber = "￮ Your phone number is invalid";
		}

		setError(errorDisplay);
		if (Object.keys(errorDisplay).length === 0) {
			return true;
		} else {
			return false;
		}
	}

	// function to be called on form submit
	async function submitHandler(event) {
		event.preventDefault();
		console.log("edit")
		const returnedFirstName = firstnameRef.current.value;
		const returnedLastName = lastnameRef.current.value;
		const returnedEmail = emailRef.current.value;
		const returnedPassword = passwordRef.current.value;
		const returnedAddress = addressRef.current.value;
		const returnedPostalCode = postalRef.current.value;
		const returnedPhoneNumber = phoneNumberRef.current.value;

		if (validation(fields) === true) {

			// this function will attempt a signup using the users given email
			async function attemptSignup() {
				// fetch url and object to send
				const USER_CHECK_URL = "http://localhost:8080/user/userCheck"; // fetch url
				const userCheck = {
					email: emailRef.current.value,
				};

				// await response so we know what the user had in database
				const response = await axios.post(USER_CHECK_URL,userCheck);
				console.log(response.data);
				// this block will only run if the users email isnt already present in database
				if (!response.data) {

					// all checks have been passed! complete the signup
					const user = {
						firstName: returnedFirstName,
						lastName: returnedLastName,
						email: returnedEmail,
						password: returnedPassword,
						address: returnedAddress,
						postalCode: returnedPostalCode,
						phoneNumber: returnedPhoneNumber,
					};

					// preform request
					const POST_URL = "http://localhost:8080/user/signup"; // fetch url
					await axios.post(POST_URL, user).then((res) => {
						console.log(res.data);
					});

					// on success navigtate back to login
					navigate("/login");
				}
				else {
					setError((prevError) => {
						return {
							...prevError,
							email: "￮ This email is already in use",
						};
					});
				}
			}

			// call above function so we actually do stuff
			attemptSignup();
		} 
	}

	// form input fields and video background
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
						onChange={(e) =>
							setFields({ ...fields, firstName: e.target.value })
						}
						value={fields.firstName}
						ref={firstnameRef}
					/>

					{error.firstName && <p className="text-danger"> {error.firstName}</p>}
				</FormGroup>

				<FormGroup className="mb-3" controlId="lastnameForm">
					<Form.Label>Last Name: </Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter lastname"
						onChange={(e) => setFields({ ...fields, lastName: e.target.value })}
						value={fields.lastName}
						ref={lastnameRef}
					/>

					{error.lastName && <p className="text-danger"> {error.lastName}</p>}
				</FormGroup>

				<FormGroup className="mb-3" controlId="emailForm">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter Email"
						onChange={(e) => setFields({ ...fields, email: e.target.value })}
						value={fields.email}
						ref={emailRef}
					/>

					{error.email && <p className="text-danger"> {error.email}</p>}
				</FormGroup>

				<FormGroup className="mb-3" controlId="passwordForm">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter your password"
						onChange={(e) => setFields({ ...fields, password: e.target.value })}
						value={fields.password}
						ref={passwordRef}
					/>

					{error.password && <p className="text-danger"> {error.password}</p>}
				</FormGroup>

				<FormGroup className="mb-3" controlId="confirmPasswordForm">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm your password"
						ref={confirmPasswordRef}
						onChange={(e) =>
							setFields({ ...fields, confirmPass: e.target.value })
						}
						value={fields.confirmPass}
					/>

					{error.confirmPass && (
						<p className="text-danger"> {error.confirmPass}</p>
					)}
				</FormGroup>

				<FormGroup className="mb-3" controlId="addressForm">
					<Form.Label>Address: </Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter address"
						onChange={(e) => setFields({ ...fields, address: e.target.value })}
						value={fields.address}
						ref={addressRef}
					/>
					{error.address && <p className="text-danger"> {error.address}</p>}
				</FormGroup>

				<FormGroup className="mb-3" controlId="postalcodeForm">
					<Form.Label>Postal Code: </Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Postal Code"
						onChange={(e) =>
							setFields({ ...fields, postalCode: e.target.value })
						}
						values={fields.postalCode}
						ref={postalRef}
					/>

					{error.postalCode && (
						<p className="text-danger"> {error.postalCode}</p>
					)}
				</FormGroup>

				<FormGroup className="mb-3" controlId="phoneNumberForm">
					<Form.Label>Phone Number: </Form.Label>
					<Form.Control
						type="tel"
						placeholder="Enter Phone Number"
						onChange={(e) =>
							setFields({ ...fields, phoneNumber: e.target.value })
						}
						values={fields.phoneNumber}
						ref={phoneNumberRef}
					/>

					{error.phoneNumber && (
						<p className="text-danger"> {error.phoneNumber}</p>
					)}
				</FormGroup>

				<FormGroup className="mb-3" controlId="haveAccount">
					<Form.Text className="text-muted">Already have an account?</Form.Text>
					<Link to="/login" className="ml-2">
						Login
					</Link>
				</FormGroup>

				<Button type="submit" variant="warning">
					Sign Up
				</Button>
			</Form>
		</div>
	);
}

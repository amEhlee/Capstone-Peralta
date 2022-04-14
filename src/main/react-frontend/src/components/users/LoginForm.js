// Import Dependencies
import React, { useContext, useState } from "react";

// Import Components
import { Form, FormGroup, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { validateEmail } from "../validation/FormValidation";


// TODO: revise neccessity
export default function LoginForm() {
	// initalize form refrences
	const emailRef = useRef();
	const passwordRef = useRef();

	// initalize user context refrences
	const givenContext = useContext(UserContext);
	const navigate = useNavigate();

	// initalize state variables
	const [error, setError] = useState({});
	const [work, setWork] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [fields, setFields] = useState({
		email: "",
		password: "",
	});


	if (work) {
		return (
			<Alert variant="Danger" onClose={() => setWork(false)} dismissible>
				<Alert.Heading>Failed Login attempt</Alert.Heading>
				<p>{errorMsg}</p>
			</Alert>
		);
	}
	const validation = () => {
		let errorDisplay={};


		if (!validateEmail(fields.email)) {
			errorDisplay.email = "￮ Your email format should be like this example@gmail.com";
		}

		if (!fields.email){
			errorDisplay.email = "￮ You need to input your Email";
		}

		if (!fields.password){
			errorDisplay.password= "￮ You need to input your Password"
		}


		setError(errorDisplay);
		//if there are any errors show the message
		//if there are none don't show
		return Object.keys(errorDisplay).length === 0;
	};


    async function submitHandler(event) {
		event.preventDefault();
		const returnedEmail = emailRef.current.value;
		const returnedPassword = passwordRef.current.value;
		let givenToken = null;
		let loginCheck = true;
		let loadCheck = true;
		let errorMsg = "";

		if (validation(fields) === true)	{
			// build a new user object to be sent to the backend
			const user = new URLSearchParams();
			user.append("email", returnedEmail);
			user.append("password", returnedPassword);

			const USER_CHECK_URL = "http://localhost:8080/user/userCheck"; // fetch url
			const userForChecks = {
				email: emailRef.current.value,
			};

			// await response so we know what the user had in database
			const response = await axios.post(USER_CHECK_URL,userForChecks);
			console.log(response.data);
			// this block will only run if the users email is already present in database
			if (response.data) {

				// send a request to backend to attempt login
				const POST_URL = "http://localhost:8080/user/login"; // fetch url
				await axios.post(POST_URL, user).then((res) => {
					// if login is successful store associated access token
					givenToken = res.data.access_token;
					givenContext.setContextData((prevData) => {
						return {
							...prevData,
							token: res.data.access_token,
						};
					});
				}).catch((err) => {
					console.log(err);
					errorMsg = "Wrong credentials, try again!";
					setWork(true);
					loginCheck = false;
				});

				// should the users login request be valid load the associated user data too
				await axios
					.get("http://localhost:8080/user/load", {
						headers: {
							Authorization: `Bearer ${givenToken}`,
						},
					})
					.then((res) => {
						console.log(res);
						// store the loaded user data into context
						givenContext.setContextData((prevData) => {
							return {
								...prevData,
								user: res.data, // get the user after successful login

							};
						});
					}).catch((err) => {
						if (loginCheck === false) {
							loadCheck = false;
						}
						console.log(err);
					});
					// goto homepage after logging in

				if (loadCheck === true && loginCheck === true) {
					navigate("/");
				}
				else if (loadCheck === false && loginCheck === false) {
					const DISABLE_CHECK_URL = "http://localhost:8080/user/disableCheck"; // fetch url
					// await response so we know what the user had in database
					const response = await axios.post(DISABLE_CHECK_URL,userForChecks);
					if (response.data) {
						errorMsg = "Account Disabled!";
						setWork(true);
					}
				}
				if (errorMsg !== "") {
					setErrorMsg(errorMsg);
				}
			}
			else {
				setError((prevError) => {
					return {
						...prevError,
						email: "￮ This email doesn't exist",
					};
				});
			}

		}
		else {

		}
	}




	return (
		<div>
			{/*{conditionalAlertRender()}*/}
			<Form onSubmit={submitHandler}>
				<FormGroup className="mb-3" controlId="emailForm">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Email"
						ref={emailRef}
						value={fields.email}
						onChange={((e) => setFields({...fields, email: e.target.value}))}
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
						ref={passwordRef}
						value={fields.password}
						onChange={((e) => setFields({...fields, password: e.target.value}))}
					/>
					{error.password &&
						<p className="text-danger"> {error.password}</p>
					}
				</FormGroup>

				<FormGroup className="mb-3" controlId="noAccount">
					<Form.Text className="text-muted">
						Don't have an account yet?
					</Form.Text>
					<Link to="/signUp" className="btn btn-light ml-2">
						Sign Up
					</Link>
				</FormGroup>

				<Button type="submit" variant="primary" >
					Login
				</Button>
			</Form>
		</div>
	);
}

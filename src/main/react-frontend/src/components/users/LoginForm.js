// Import Dependencies
import React, { useContext, useState } from "react";

// Import Components
import { Form, FormGroup, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";

// Import Styles
import userStyle from "../../assets/styles/UserSide.module.css";

// TODO: revise neccessity
export default function LoginForm() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const givenContext = useContext(UserContext);
	const navigate = useNavigate();

	const [work, setWork] = useState(false);
	const [fields, setFields] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState({});

	if (work) {
		return (
			<Alert variant="Danger" onClose={() => setWork(false)} dismissible>
				<Alert.Heading>Failed Login attempt</Alert.Heading>
				<p>Wrong credentials, try again!</p>
			</Alert>
		);
	}
	const validation = () => {
		let errorDisplay={};

		if (!fields.email){
			errorDisplay.email = "￮ You need to input your Email";
		}
		else if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(fields.email)){
			errorDisplay.email = "￮ your email format should be like this example@gmail.com";
		}

		if (!fields.password){
			errorDisplay.password= "￮ You need to input your Password"
		}

		else if (!/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/ .test(fields.password)){
			errorDisplay.password = "￮ your password is invalid";
		}


		setError(errorDisplay);
		//if there are any errors show the message
		//if there are none don't show
		if (Object.keys(errorDisplay).length===0){
			return true;
		}else {
			return false;
		}
	};

	//if it doesn't validate correctly show the alert
	//if it renders don't show and proceed to homepage
	async function submitHandler (event) {
		if (event) event.preventDefault();

		if (validation(fields)){
			setWork(false);
		} else {
			setWork(true);
		}

	}

/*	async function submitHandler(event, token) {
		event.preventDefault();
		const returnedEmail = emailRef.current.value;
		const returnedPassword = passwordRef.current.value;
		let givenToken = null;

		const user = new URLSearchParams();
		user.append("email", returnedEmail);
		user.append("password", returnedPassword);

		const POST_URL = "http://localhost:8080/user/login"; // fetch url
		await axios.post(POST_URL, user).then((res) => {
			console.log(res);
			givenToken = res.data.access_token;
			givenContext.setContextData((prevData) => {
				return {
					...prevData,
					token: res.data.access_token,
				};
			});
		}).catch((err) => {
			console.log(err);
			setWork(true);
		});
 
		await axios
			.get("http://localhost:8080/user/load", {
				headers: {
					Authorization: `Bearer ${givenToken}`,
				},
			})
			.then((res) => {
				console.log(res);
				givenContext.setContextData((prevData) => {
					return {
						...prevData,
						user: res.data, // get the user after successful login
					};
				});
			});

		// goto homepage after logging in
		navigate("/");
	}*/




	return (
		<div>
			{/*{conditionalAlertRender()}*/}
			<Form onSubmit={submitHandler}>
				<FormGroup className="mb-3" controlId="emailForm">
					<Form.Label>Email Address</Form.Label>
					<Form.Control type="email" placeholder="Enter Email" ref={emailRef}
								  value={fields.email}
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

				<Button type="submit" variant="primary" onClick={() => setWork(true)}>
					Login
				</Button>
			</Form>
		</div>
	);
}

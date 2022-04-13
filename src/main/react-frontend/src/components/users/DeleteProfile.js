// Import Dependancies
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import Components
import {
	Form,
	FormGroup,
	InputGroup,
	Button,
	FormControl,
	Col,
	Row,
	Modal,
	Alert,
} from "react-bootstrap";
import { UserContext } from "../../UserContext";

export default function DeleteProfile() {
	const passwordRef = useRef();
	const givenContext = useContext(UserContext);
	const userContext = givenContext.contextData.user;
	const token = givenContext.contextData.token;
    
    const [error, setError] = useState({});
    const [show, setShow] = useState(false);
	const [fields, setFields] = useState({password: "",});
	const navigate = useNavigate();


	//todo: check if the password is the same as the login creds donno how

	if (show) {
		return (
			<Alert
				variant="success"
				onClose={() => {navigate("/logout");}}
				dismissible
			>
				<Alert.Heading>Your account is deleted</Alert.Heading>
				<p>Account deletion was successful! You Will be Signed Out.</p>
			</Alert>
		);
	}
	const validate = () => {
		let errorDisplay = {};

		if (!fields.password) {
			errorDisplay.password = "￮ You need to enter your Password";
		}

		setError(errorDisplay);
		if (Object.keys(errorDisplay).length === 0) {
			return true;
		} else {
			return false;
		}
	};

	//TODO: Make an axios call
	async function submitHandler(event) {
		event.preventDefault();
		console.log("we are here!");

		if (validate(fields)) {
			async function attemptDelete() {
				// Post url used to verify password
				const CHECK_PASSWORD_URL = "http://localhost:8080/user/verify";

				// content we will pass to post url
				const content = {
					email: userContext.email,
					password: passwordRef.current.value,
				};

				// expect boolean confirming wherher password is correct or not
				const responseCheck = await axios.post(CHECK_PASSWORD_URL, content, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				// BASED ON ABOVE AWAIT FUNCTION, IF PASSWORD IS CORRECT, THEN WE CAN DELETE USER
				if (responseCheck.data) {
                    // delete the user
					await axios.delete("http://localhost:8080/user/delete", {
							headers: {
								Authorization: `Bearer ${token}`,
							},
						})
						.then((res) => {
							console.log(res);
						})
						.catch((err) => console.error(err));

                    // on successful delete setshow to true to show success message
					console.log("Delete Success");
                    setShow(true)
				} else {
					setError((prevError) => {
						return {
							...prevError,
							currentPass: "￮ This password is inavlid",
						};
					});
				}
			}

			attemptDelete();
		} else {
			setShow(false);
		}
	}

	return (
		<Form onSubmit={submitHandler}>
			<FormGroup className="mb-3" controlId="formHeader">
				<Form.Label>Are you sure you want to delete your account? </Form.Label>
			</FormGroup>

			<FormGroup className="mb-3 text-muted">
				<Form.Label> *Input your password to confirm your choice</Form.Label>
			</FormGroup>

			<FormGroup className="mb-3" controlId="">
				<Form.Label>Password: </Form.Label>
				<Form.Control
					type="password"
					placeholder="Enter your password"
					value={fields.password}
					ref={passwordRef}
					onChange={(e) => setFields({ ...fields, password: e.target.value })}
				/>
				{error.password && <p className="text-danger"> {error.password}</p>}
			</FormGroup>

			<FormGroup>
				<Button type="submit" className="btn btn-danger mb-3">
					Delete Account
				</Button>
			</FormGroup>
		</Form>
	);
}

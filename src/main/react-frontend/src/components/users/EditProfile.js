// import Dependencies
import React, { useContext, useRef, useState } from "react";
import axios from "axios";

// Import Components
import { UserContext } from "../../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, FormGroup, Button, Modal } from "react-bootstrap";
import DeleteProfile from "./DeleteProfile";

// import styles from
import Style from "../../assets/styles/UserSide.module.css";

export default function EditProfile() {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const navigate = useNavigate();

	const userContext = useContext(UserContext).contextData.user;
	const token = useContext(UserContext).contextData.token;
	const userFirstNameRef = useRef();
	const userLastNameRef = useRef();
	const userConfirmPasswordRef = useRef();
	const userNewPasswordRef = useRef();
	const userNewPasswordConfirmRef = useRef();
	const userPhoneRef = useRef();
	const userAddressRef = useRef();
	const userPostalCodeRef = useRef();

	function checkPassword(givenEmail, givenPassword) {
		// Post url used to verify password
		const POST_URL = "http://localhost:8080/user/verify";

		// content we will pass to post url
		const content = {
			email: givenEmail,
			password: givenPassword,
		};

		let returnedResponse = true;

		// try post request
		axios
			.post(POST_URL, content, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				returnedResponse = res.data; // boolean depending on result of pass verify
			})
			.catch((err) => {
				console.log(err);
			});

		return returnedResponse;
	}

	function submitHandler(event) {
		event.preventDefault();
		const returnedFirstName = userFirstNameRef.current.value;
		const returnedLastName = userLastNameRef.current.value;
		const retunedConfirmPassword = userConfirmPasswordRef.current.value;
		const retunedNewPassword = userNewPasswordRef.current.value;
		const returnedUserNewPasswordConfirm = userNewPasswordConfirmRef.current.value;
		const returnedPhone = userPhoneRef.current.value;
		const returnedAddress = userAddressRef.current.value;
		const returnedPostalCode = userPostalCodeRef.current.value;
		const returnedEmail = userContext.email;

		const updatedUser = {
			userId: userContext.userId,
			firstName: returnedFirstName,
			lastName: returnedLastName,
			password: retunedNewPassword,
			email: returnedEmail,
			phoneNumber: returnedPhone,
			address: returnedAddress,
			postalCode: returnedPostalCode,
			roles: userContext.roles,
		};

		if(retunedNewPassword !== returnedUserNewPasswordConfirm) {
			console.log("Passwords do not match");
			return;
		}

		console.log("checking pass");
		console.log(checkPassword(returnedEmail, retunedConfirmPassword));
		if (checkPassword(returnedEmail, retunedConfirmPassword)) {
			console.log("trying to do update now");
			const PUT_URL = "http://localhost:8080/user/update"; // fetch url

			async function userPost() {
				await axios
					.put(PUT_URL, updatedUser, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => {
						console.log(res);
						navigate("./userProfile/saved");
					})
					.catch((err) => console.error(err));
			}

			userPost();
		}
	}

	// check if user is null if so rendirec to home
	if (!userContext) {
		return <Navigate to="/" />;
	} else {
		return (
			<Form onSubmit={submitHandler} className={Style.centrize}>
				<FormGroup className="mb-3" controlId="formFirstName">
					<Form.Label>First Name:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter First Name"
						ref={userFirstNameRef}
						defaultValue={userContext.firstName} /// TODO
					/>
				</FormGroup>

				<FormGroup className="mb-3" controlId="formLastName">
					<Form.Label>Last Name:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Last Name"
						ref={userLastNameRef}
						defaultValue={userContext.lastName}
					/>
				</FormGroup>

				<FormGroup className="mb-3" controlId="formConfirmPassword">
					<Form.Label>Confirm Previous Password: </Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm the Password"
						ref={userConfirmPasswordRef}
					/>
				</FormGroup>

				<FormGroup className="mb-3" controlId="formCurrentPassword">
					<Form.Label>New Password: </Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter New Password"
						ref={userNewPasswordRef}
					/>
				</FormGroup>

				<FormGroup className="mb-3" controlId="formCurrentPassword">
					<Form.Label>Confirm New Password: </Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter New Password"
						ref={userNewPasswordConfirmRef}
					/>
				</FormGroup>

				<FormGroup className="mb-3" controlId="formPhone">
					<Form.Label>Phone</Form.Label>
					<Form.Control
						type="tel"
						placeholder="403-111-1111"
						ref={userPhoneRef}
						defaultValue={userContext.phoneNumber}
					/>
				</FormGroup>

				<FormGroup className="mb-3" controlId="formAddress">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Address"
						ref={userAddressRef}
						defaultValue={userContext.address}
					/>
				</FormGroup>

				<FormGroup className="mb-3" controlId="formPostalCode">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="zip"
						placeholder="Enter Postal Code"
						ref={userPostalCodeRef}
						defaultValue={userContext.postalCode}
					/>
				</FormGroup>

				<Button type="submit" className="btn btn-success" >
					Save Changes
				</Button>

				<Button
					type="submit"
					className="btn btn-warning"
					onClick={handleShow}
					variant="primary"
					data-toggle="modal"
				>
					Delete Account
				</Button>

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Delete Account</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<DeleteProfile />
					</Modal.Body>
				</Modal>
			</Form>
		);
	}
}

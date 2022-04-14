// import Dependencies
import React, { useContext, useRef, useState } from "react";
import axios from "axios";

// Import Components
import { UserContext } from "../../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, FormGroup, Button, Modal, Alert } from "react-bootstrap";
import DeleteProfile from "./DeleteProfile";
import {
	validatePassword,
	validatePasswordsMatch,
	validatePostalCode,
	validatePhoneNumber,
} from "../validation/FormValidation";

// import styles from
import Style from "../../assets/styles/UserSide.module.css";

export default function EditProfile() {
	const givenContext = useContext(UserContext);
	const userContext = useContext(UserContext).contextData.user;
	const token = useContext(UserContext).contextData.token;
	const userFirstNameRef = useRef();
	const userLastNameRef = useRef();
	const userCurrentPasswordRef = useRef();
	const userNewPasswordRef = useRef();
	const userPhoneRef = useRef();
	const userAddressRef = useRef();
	const userPostalCodeRef = useRef();

	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const navigate = useNavigate();

	const [fields, setFields] = useState({
		firstName: "",
		lastName: "",
		currentPass: "",
		newPassword: "",
		confirmPass: "",
		address: "",
		postalCode: "",
		phoneNumber: "",
	});

	const [error, setError] = useState({});

	const [work, setWork] = useState(false);
	if (work) {
		return (
			<Alert variant="success" onClose={() => setWork(false)} dismissible>
				<Alert.Heading>Your changes have been saved!</Alert.Heading>
				<p>you can view your updated profile</p>
			</Alert>
		);
	}

	const validation = () => {
		let errorDisplay = {};

		if (!fields.firstName) {
			errorDisplay.firstName = "￮ You need to enter your first name";
		}

		if (!fields.lastName) {
			errorDisplay.lastName = "￮ You need to enter your last name";
		}

		if (!fields.currentPass) {
			errorDisplay.currentPass = "￮ You need to enter your current Password";
		}

		if (!validatePassword(fields.currentPass)) {
			errorDisplay.currentPass = "￮ Your current password is invalid";
		}

		if (fields.newPassword) {
			if (!validatePasswordsMatch(fields.newPassword, fields.confirmPass)) {
				errorDisplay.confirmPass = "￮ Your passwords do not match";
			}
			if (!validatePassword(fields.newPassword)) {
				errorDisplay.newPassword = "￮ Your new password is invalid";
			}
		}

		if (!fields.phoneNumber) {
			errorDisplay.phoneNumber = "￮ You need to enter your phone number";
		}

		if (!validatePhoneNumber(fields.phoneNumber)) {
			errorDisplay.phoneNumber = "￮ Your phone number is invalid";
		}

		if (!fields.address) {
			errorDisplay.address = "￮ You need to enter your address";
		}

		if (!fields.postalCode) {
			errorDisplay.postalCode = "￮ You need to enter your postal code";
		}

		if (!validatePostalCode(fields.postalCode)) {
			errorDisplay.postalCode =
				"￮ Your postal code format should follow A1A A1A";
		}

		setError(errorDisplay);
		return Object.keys(errorDisplay).length === 0;
	};

	function submitHandler(event) {
		event.preventDefault();

		if (validation(fields)) {
			async function attemptUpdate() {
				const returnedFirstName = userFirstNameRef.current.value;
				const returnedLastName = userLastNameRef.current.value;
				const returnedCurrentPassword = userCurrentPasswordRef.current.value;
				const returnedNewPassword = userNewPasswordRef.current.value;
				const returnedPhone = userPhoneRef.current.value;
				const returnedAddress = userAddressRef.current.value;
				const returnedPostalCode = userPostalCodeRef.current.value;
				const returnedEmail = userContext.email;

				let updatedUser = {
					userId: userContext.userId,
					firstName: returnedFirstName,
					lastName: returnedLastName,
					password: returnedCurrentPassword,
					email: returnedEmail,
					phoneNumber: returnedPhone,
					address: returnedAddress,
					postalCode: returnedPostalCode,
					roles: userContext.roles,
				};

				if (!(returnedNewPassword === "")) {
					updatedUser = {
						userId: userContext.userId,
						firstName: returnedFirstName,
						lastName: returnedLastName,
						password: returnedNewPassword,
						email: returnedEmail,
						phoneNumber: returnedPhone,
						address: returnedAddress,
						postalCode: returnedPostalCode,
						roles: userContext.roles,
					};
				}

				// Post url used to verify password
				const CHECK_PASSWORD_URL = "http://localhost:8080/user/verify";

				// content we will pass to post url
				const content = {
					email: returnedEmail,
					password: returnedCurrentPassword,
				};

				// expect boolean confirming wherher password is correct or not
				const responseCheck = await axios.post(CHECK_PASSWORD_URL, content, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				// BASED ON ABOVE AWAIT FUNCTION, IF PASSWORD IS CORRECT, THEN WE CAN UPDATE USER
				if (responseCheck.data) {
					// makes the next block entirely dependent on responseCheck variable
					// this entire block is called after the await is complete
					console.log("Trying Update and New User Load");

					await axios
						.put("http://localhost:8080/user/update", updatedUser, {
							headers: {
								Authorization: `Bearer ${token}`,
							},
						})
						.then(() => {
							console.log("Successfully Updated User");
						})
						.catch((err) => console.error(err));

					await axios
						.get("http://localhost:8080/user/load", {
							headers: {
								Authorization: `Bearer ${token}`,
							},
						})
						.then((res) => {
							console.log(res);
							givenContext.setContextData((prevData) => {
								return {
									...prevData,
									user: res.data, // get the user after successful edit
								};
							});
						})
						.catch((err) => console.error(err));

					// if everyone is good navigate back to user profile
					navigate("/userProfile/saved");
				} else {
					setError((prevError) => {
						return {
							...prevError,
							currentPass: "￮ This password is inavlid",
						};
					});
				}
			}

			attemptUpdate();
		}
	}

	// check if user is null if so redirect to home
	if (!userContext) {
		return <Navigate to="/" />;
	} else {
		return (
			<>
			<Form onSubmit={submitHandler} className={Style.centrize}>
				<FormGroup className="mb-3" controlId="formFirstName">
					<Form.Label>First Name:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter First Name"
						ref={userFirstNameRef}
						defaultValue={userContext.firstName}
						value={fields.firstName}
						onChange={(e) =>
							setFields({ ...fields, firstName: e.target.value })
						}
					/>

					{error.firstName && <p className="text-danger"> {error.firstName}</p>}
				</FormGroup>

				<FormGroup className="mb-3" controlId="formLastName">
					<Form.Label>Last Name:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Last Name"
						ref={userLastNameRef}
						defaultValue={userContext.lastName}
						value={fields.lastName}
						onChange={(e) => setFields({ ...fields, lastName: e.target.value })}
					/>

					{error.lastName && <p className="text-danger"> {error.lastName}</p>}
				</FormGroup>

				<FormGroup className="mb-3" controlId="formCurrentPassword">
					<Form.Label>Confirm Current Password: </Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter Current Password"
						ref={userCurrentPasswordRef}
						value={fields.currentPass}
						onChange={(e) =>
							setFields({ ...fields, currentPass: e.target.value })
						}
					/>
					{error.currentPass && (
						<p className="text-danger"> {error.currentPass}</p>
					)}
				</FormGroup>

				<FormGroup className="mb-3" controlId="formNewPassword">
					<Form.Label>New Password: </Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter New Password (Optional)"
						ref={userNewPasswordRef}
						value={fields.newPpassword}
						onChange={(e) =>
							setFields({ ...fields, newPassword: e.target.value })
						}
					/>
					{error.newPassword && (
						<p className="text-danger"> {error.newPassword}</p>
					)}
				</FormGroup>

				<FormGroup className="mb-3" controlId="formConfirmPassword">
					<Form.Label>Confirm New Password: </Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm New Password (Optional)"
						value={fields.confirmPass}
						onChange={(e) =>
							setFields({ ...fields, confirmPass: e.target.value })
						}
					/>
					{error.confirmPass && (
						<p className="text-danger"> {error.confirmPass}</p>
					)}
				</FormGroup>

				<FormGroup className="mb-3" controlId="formPhone">
					<Form.Label>Phone</Form.Label>
					<Form.Control
						type="tel"
						placeholder="403-111-1111"
						ref={userPhoneRef}
						defaultValue={userContext.phoneNumber}
						value={fields.phoneNumber}
						onChange={(e) =>
							setFields({ ...fields, phoneNumber: e.target.value })
						}
					/>
					{error.phoneNumber && (
						<p className="text-danger"> {error.phoneNumber}</p>
					)}
				</FormGroup>

				<FormGroup className="mb-3" controlId="formAddress">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Address"
						ref={userAddressRef}
						defaultValue={userContext.address}
						value={fields.address}
						onChange={(e) => setFields({ ...fields, address: e.target.value })}
					/>
					{error.address && <p className="text-danger"> {error.address}</p>}
				</FormGroup>

				<FormGroup className="mb-3" controlId="formPostalCode">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="zip"
						placeholder="Enter Postal Code"
						ref={userPostalCodeRef}
						defaultValue={userContext.postalCode}
						value={fields.postalCode}
						onChange={(e) =>
							setFields({ ...fields, postalCode: e.target.value })
						}
					/>

					{error.postalCode && (
						<p className="text-danger"> {error.postalCode}</p>
					)}
				</FormGroup>

				<Button type="submit" className="btn btn-success">
					Save Changes
				</Button>

				<Button
					type="button"
					className="btn btn-warning"
					onClick={handleShow}
					variant="primary"
					data-toggle="modal"
				>
					Delete Account
				</Button>

			</Form>
			<Modal show={show} onHide={handleClose} >
				<Modal.Header closeButton>
					<Modal.Title>Delete Account</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<DeleteProfile />
				</Modal.Body>
			</Modal>
		</>
		);


	}
}

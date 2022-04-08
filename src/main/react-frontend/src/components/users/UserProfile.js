import React, {useContext, useState} from "react";
import { UserContext } from "../../UserContext";

// Import Components
import { Form, FormGroup, Button, Alert } from "react-bootstrap";
import {Link, Navigate, useParams} from "react-router-dom";
import Style from "../../assets/styles/UserSide.module.css";


export default function UserProfile() {


	const userContext = useContext(UserContext).contextData.user;

	const [work, setWork] = useState(true);
	if (work) {
		return (
			<Alert variant="success" onClose={() => setWork(false)} dismissible>
				<Alert.Heading>You changes have been saved!</Alert.Heading>
				<p>
					you can view your updated profile
				</p>
			</Alert>
		);
	}

	let {saved} = useParams();

	if (saved === "saved") {
		setWork(true);
	}
	// check if user is null if so rendirec to home
	if (!userContext) {
		return <Navigate to="/" />
	} else {
		return (
			<>
				<div>
					<Form className={Style.centrize}>
						<h1>Personal Details</h1>
						<FormGroup className="mb-3" controlId="formFname">
							<Form.Label> First Name: </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your first name"
								disabled
								defaultValue={userContext.firstName}
							/>
						</FormGroup>

						<Form.Group controlId="formLname" className="mb-3">
							<Form.Label>Last Name: </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your last name"
								disabled
								defaultValue={userContext.lastName}
							/>
						</Form.Group>

						<FormGroup className="mb-3" controlId="formEmail">
							<Form.Label>Email: </Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your Email"
								disabled
								defaultValue={userContext.email}
							/>
						</FormGroup>

						<Link to="/editProfile">
							<Button type="submit" className="btn btn-success">
								Edit Account
							</Button>
						</Link>

						<Link to="/logout">
							<Button variant="primary" className="btn btn-warning">
								Log out
							</Button>
						</Link>
					</Form>
				</div>
			</>
		);
	}
}

// import dependencies
import React, { useContext } from "react";

// import components
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import styles from "../assets/styles/LogoutPage.module.css";

export default function LogoutUserPage() {
	// obtain user context
	const context = useContext(UserContext);

	// run this check to make sure the context only rerenders once
	if (context.contextData.user !== null) {
		// reset the user to null values
		context.setContextData((prevData) => {
			return {
				...prevData,
				user: null,
				token: null,
			};
		});
	}

	// inform the user of the logout and redirect to the home page
	return (
		<Container className={styles.logoutContainer}>
			<h1>Thank You for Your Visit</h1>
			<div>You have Been Successfully Signed Off</div>
			<p>Come Shop With us Again!</p>
			<Link to="/">
				<Button>Back To Homepage</Button>
			</Link>
		</Container>
	);
}

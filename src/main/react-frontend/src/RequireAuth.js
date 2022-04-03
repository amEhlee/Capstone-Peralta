import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth(props) {
	const context = useContext(UserContext);
	const token = context.contextData.token;
	let payload = null;

    // assumes user is guest and restricts them anyway
	if (token !== null) {
        // extract our roles from the token
		payload = JSON.parse(atob(token.split(".")[1]));

		// render regular page if user is admin else redirect to home
		return payload.roles.includes("ROLE_ADMIN") ? (
			<Outlet /> // render regular page
		) : (
			<Navigate to="/" /> // redirect to home
		);
	}

    // if not an admin just redirect to home
	return <Navigate to="/" />

}

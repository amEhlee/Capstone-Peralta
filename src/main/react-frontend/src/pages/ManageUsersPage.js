// Import Dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";

// Import Components
import { Table, Modal, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import ManageUsers from "../components/users/ManageUsers";
import PaginationNav from "../components/layout/Pagination";

export default function ManageUsersPage() {
	// requests
	const FETCH_URL = "http://localhost:8080/user/all"; // fetch url
	var [datajson, setDataJson] = useState([]); // used to store data

	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10); // initalize at 10 items per page change as required

	// searching
	var [searchName, setSearchName] = useState("");

	// function that will be called when the page loads purpose is to handle and process the axios get request
	function gatherData() {
		return axios
			.get(FETCH_URL) // preform get request
			.then((res) => {
                console.log(res);
				return res.data; // return response
			})
			.catch((err) => console.error(err));
	}

	// runs the gatherdata function when the page loads
	useEffect(() => {
		gatherData().then((data) => {
			console.log("response allUser get: " + data); // log returned data
			setDataJson(data || "no data returned"); // store returned data in a variable
		});
	}, []);

	if (datajson === "no data returned") {
		return (
			<section>
				<p>{datajson}</p>
			</section>
		);
	} else {
		return (
			<>
                {/* TODO Password is still sent in the request this is a backend problem and im not sure if it should be changed*/}
				<h1>Manage Users</h1>
				<div>
					<input
						type="text"
						placeholder="Search"
						onChange={(event) => {
							setSearchName(event.target.value);
						}}
					/>
					<BsSearch />
				</div>

				<Table striped bordered hover>
					<thead>
						<tr>
							<th>User ID</th>
							<th>Email</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Address</th>
							<th>Postal Code</th>
							<th>Phone Number</th>
						</tr>
					</thead>
					<ManageUsers users={datajson} search={searchName} />
				</Table>
				{/* <PaginationNav itemsPerPage={itemsPerPage} totalItems={datajson.length} paginate={paginate} currentPage={currentPage}/> */}
			</>
		);
	}
}

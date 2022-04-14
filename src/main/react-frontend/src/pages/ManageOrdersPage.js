// Import Dependencies
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

// Import Components
import { Table, Modal, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import ManageOrders from "../components/orders/ManageOrders";
import PaginationNav from "../components/layout/Pagination";

// Import Styling
import style from "../assets/styles/ManageOrdersPage.module.css";
import { UserContext } from "../UserContext";

export default function ManageUsersPage() {
	// requests
	const FETCH_URL = "http://localhost:8080/order/all"; // fetch url
	const REPORT_URL = "http://localhost:8080/report/generate";
	const token = useContext(UserContext).contextData.token;
	var [datajson, setDataJson] = useState([]); // used to store data

	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [ordersPerPage, setOrdersPerPage] = useState(10); // initalize at 10 items per page change as required

	// searching
	var [searchName, setSearchName] = useState("");

	// function that will be called when the page loads purpose is to handle and process the axios get request
	function gatherData() {
		return axios
			.get(FETCH_URL, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}) // preform get request
			.then((res) => {
				console.log(res);
				return res.data; // return response
			})
			.catch((err) => console.error(err));
	}

	function generateReport() {
		return axios
		.get(REPORT_URL, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}) // preform post request
		.then((res) => {
			console.log(res);
			return res.data; // return response
		})
		.catch((err) => console.error(err));
	}

	// pagination
	const indexOfLastPost = currentPage * ordersPerPage;
	const indexOfFirstPost = indexOfLastPost - ordersPerPage;
	const currentDataChunk = datajson.slice(indexOfFirstPost, indexOfLastPost);

	// change page
	function paginate(pageNumber) {
		setCurrentPage(pageNumber);
	}

	// runs the gatherdata function when the page loads
	useEffect(() => {
		gatherData().then((data) => {
			setDataJson(data || "no data returned"); // store returned data in a variable
		});
	}, []);

	if (datajson === "no data returned") {
		return (
			<section>
				<p>NO DATA RETURNED</p>
			</section>
		);
	} else {
		return (
			<>
				<div className={style.manageOrders}>
					{/* TODO Password is still sent in the request this is a backend problem and im not sure if it should be changed*/}
					<h1>Manage Orders</h1>
					<div className={style.searchwrapper}>
						<input
							type="text"
							placeholder="Search"
							className={style.searchBar}
							onChange={(event) => {
								paginate(0);
								setSearchName(event.target.value);
							}}
						/>
						<BsSearch />
					</div>
					<Button onClick={generateReport}>
							Generate Report
					</Button>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Order ID</th>
								<th>User Email</th>
								<th>Order Total</th>
								<th>Order Date</th>
								<th>Order Status</th>
							</tr>
						</thead>
						<ManageOrders paginateOrderList={currentDataChunk} fullOrderList={datajson} search={searchName} />
					</Table>
					<PaginationNav itemsPerPage={ordersPerPage} totalItems={datajson.length} paginate={paginate} currentPage={currentPage}/>
				</div>
			</>
		);
	}
}

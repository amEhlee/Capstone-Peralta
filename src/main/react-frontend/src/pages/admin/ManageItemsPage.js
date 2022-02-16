// import dependencies
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// import components
import PaginationNav from '../../components/layout/Pagination';
import ItemList from "../../components/items/ItemList";
import { Table, Modal, Button } from "react-bootstrap";
import AddItem from "../../components/InventoryManagement/AddItem";
import { BsSearch } from "react-icons/bs";
import style from "./ManageItemsPage.module.css";

export default function ManageItemsPage() {
	const FETCH_URL = "http://localhost:8080/item/get/all"; // fetch url
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	var [datajson, setDataJson] = useState([]); // used to store data
	var [searchName, setSearchName] = useState("");
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	// function that will be called when the page loads purpose is to handle and process the axios get request
	async function gatherData() {
        
		return await axios
			.get(FETCH_URL) // preform get request
			.then((res) => {
				return res.data; // return response
			})
			.catch((err) => console.error(err));
	}

	// runs the gatherdata function when the page loads
	useEffect(() => {
		gatherData().then((data) => {
			console.log(data); // log returned data
			setDataJson(data || "no data returned"); // store returned data in a variable
		});
	}, []);
    
	console.log(datajson);

	// pagination
	const indexOfLastPost = currentPage * itemsPerPage;
	const indexOfFirstPost = indexOfLastPost - itemsPerPage;
	const currentPosts = datajson.slice(indexOfFirstPost, indexOfLastPost);

    // change page
    function paginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

	if (datajson === "no data returned") {
		return (
			<section>
				<p>{datajson}</p>
			</section>
		);
	} else {
		return (
			<>
				<div>
					<h1>Manage Items Page</h1>

					<div className={style.searchwrapper}>
						<input
							type="text"
							placeholder="Search"
							className={style.searchBar}
							onChange={(event) => {
								setSearchName(event.target.value);
							}}
						></input>
						<BsSearch></BsSearch>
					</div>

					<Button variant="primary" onClick={handleShow}>
						Add Item
					</Button>

					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Price</th>
								<th>Weight</th>
								<th>Quantity</th>
								<th>Available</th>
								<th>Edit</th>
							</tr>
						</thead>
						<ItemList items={currentPosts} target="adminList" search={searchName} />
					</Table>
                    <PaginationNav itemsPerPage={itemsPerPage} totalItems={datajson.length} paginate={paginate} currentPage={currentPage}/>
				</div>

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add Item</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<AddItem />
					</Modal.Body>
				</Modal>
			</>
		);
	}
}

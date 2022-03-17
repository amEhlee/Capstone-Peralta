// Import Dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";

// Import Components
import { Table, Modal, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import PaginationNav from '../components/layout/Pagination';
import ItemList from "../components/items/ItemList";
import AddItem from "../components/items/AddItem";

// Import Styling
import style from "../assets/styles/ManageItemsPage.module.css";

export default function ManageItemsPage() {
	const [categoryjson, setCategoryJson] = useState([]);

	const FETCH_URL = "http://localhost:8080/item/get/all"; // fetch url
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10); // initalize at 10 items per page change as required
	var [datajson, setDataJson] = useState([]); // used to store data
	var [searchName, setSearchName] = useState("");
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	// function that will be called when the page loads purpose is to handle and process the axios get request
	function gatherData() {
		return axios
			.get(FETCH_URL) // preform get request
			.then((res) => {
				return res.data; // return response
			})
			.catch((err) => console.error(err));
	}

	// runs the gatherdata function when the page loads
	useEffect(() => {
		gatherData().then((data) => {
			setDataJson(data || "no data returned"); // store returned data in a variable
		});
	}, []);

	// pagination
	const indexOfLastPost = currentPage * itemsPerPage;
	const indexOfFirstPost = indexOfLastPost - itemsPerPage;
	const currentDataChunk = datajson.slice(indexOfFirstPost, indexOfLastPost);

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
                <div className={style.manageItems}>
                    <h1>Inventory</h1>

					<div className={style.searchwrapper}>
						<input
							type="text"
							placeholder="Search"
							className={style.searchBar}
							onChange={(event) => {
								setSearchName(event.target.value);
							}}
						/>
						<BsSearch/>
					</div>

                    <Button className={style.addBtn} bsPrefix="addBtn" variant="primary" onClick={handleShow}>
                        Add Item
                    </Button>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
								<th>Image</th>
                                <th>Product Name</th>
								<th>Category</th>
                                <th>Price</th>
                                <th>Weight</th>
                                <th>Quantity</th>
                                <th>Available</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <ItemList
                            items={currentDataChunk}
                            target="adminList"
                            search={searchName}
                        />
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

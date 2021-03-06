// Import Dependencies
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";

// Import Components
import {Table, Modal, Button, Alert} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import PaginationNav from '../components/layout/Pagination';
import ItemList from "../components/items/ItemList";
import AddItem from "../components/items/AddItem";

// Import Styling
import style from "../assets/styles/ManageItemsPage.module.css";
import {UserContext} from "../UserContext";
import {useParams} from "react-router-dom";

export default function ManageItemsPage() {
	const [categoryjson, setCategoryJson] = useState([]);

	const FETCH_URL = "http://localhost:8080/admin/get/allItems"; // fetch url
	const token = useContext(UserContext).contextData.token;
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10); // initalize at 10 items per page change as required
	var [datajson, setDataJson] = useState([]); // used to store data
	var [searchName, setSearchName] = useState("");
	const [added, setAdded] = useState(false);
	const [edited, setEdited] = useState(false);
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	// function that will be called when the page loads purpose is to handle and process the axios get request
	function gatherData() {
		return axios
			.get(FETCH_URL, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}) // preform get request
			.then((res) => {
				setDataJson(res.data || "no data returned"); // store returned data in a variable
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

	function showAdd() {
		setAdded(true)
	}

	function showEdit() {
		setEdited(true)
	}

	function conditionalAlertRender() {
		if (added) {
			return (
				<Alert variant="success" onClose={() => setAdded(false)} dismissible>
					<Alert.Heading>Item added</Alert.Heading>
				</Alert>
			);
		}
		if (edited) {
			return (
				<Alert variant="success" onClose={() => setEdited(false)} dismissible>
					<Alert.Heading>Item edited</Alert.Heading>
				</Alert>
			);
		}
	}

    if (datajson === "no data returned") {
        return (
            <section>
                <p> NO DATA RETURNED </p>
            </section>
        );
    } else {
        return (
            <>
				{/* render the alert based on given input */}
				<div style={{position: "fixed", zIndex: 1000, margin: "auto", marginLeft: "7%", width: "25%"}}>
					{conditionalAlertRender()}
				</div>
				
				{/* manage items form */}
                <div className={style.manageItems}>
                    <h1>Manage Inventory</h1>

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
							gatherData={gatherData}
							showAlert={showEdit}
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
						<AddItem handleClose={handleClose} gatherData={gatherData} showAlert={showAdd}/>
					</Modal.Body>
				</Modal>
			</>
		);
	}
}

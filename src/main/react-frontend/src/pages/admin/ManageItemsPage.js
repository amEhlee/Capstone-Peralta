// import dependencies
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// import components
import ItemList from "../../components/items/ItemList";
import Heading from "./Heading";
import { Table, Modal, Button, Form } from "react-bootstrap";
import AddItem from "../../components/InventoryManagement/AddItem";
import { BsSearch } from "react-icons/bs";
import style from "./ManageItemsPage.module.css";

export default function ManageItemsPage() {
    const FETCH_URL = "http://localhost:8080/item/get/all"; // fetch url
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
            console.log(data); // log returned data

            setDataJson(data || "no data returned"); // store returned data in a variable
        });
    }, []);

    console.log(datajson);

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
                        ></input>
                        <BsSearch></BsSearch>
                    </div>

                    <Button className={style.addBtn} bsPrefix="addBtn" variant="primary" onClick={handleShow}>
                        Add Item
                    </Button>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Weight</th>
                                <th>Quantity</th>
                                <th>Available</th>
                                <th></th>
                            </tr>
                        </thead>
                        <ItemList
                            items={datajson}
                            target="adminList"
                            search={searchName}
                        />
                    </Table>
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

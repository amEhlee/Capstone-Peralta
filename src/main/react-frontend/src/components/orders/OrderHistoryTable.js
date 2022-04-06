//Import Dpenedencies
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

//Import Components
import {Table} from "react-bootstrap";
import PaginationNav from '../components/layout/Pagination';


import {UserContext} from "../UserContext";
import ItemList from "../items/ItemList";

const FETCH_URL = 'http://localhost:8080/api/orders/';

function gatherData() {
    return axios
        .get(FETCH_URL)
}


function OrderHistoryTable() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
        <tr>
            <td>{props.id}</td>
            <td>{props.date}</td>
            <td>{props.totalCost}</td>
            <td>{props.status}</td>
            <td>
              <Button onClick={handleShow} variant="primary" data-toggle="modal"  size="sm">View Order</Button>
          </td>
        </tr>


        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>
                Order Details
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Order item={props.order} handleClose={handleClose} gatherData={gatherData}/>
            </Modal.Body>
        </Modal>
</>

    );
}

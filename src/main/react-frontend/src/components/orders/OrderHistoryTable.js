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
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.date}</td>
            <td>{props.totalCost}</td>
            <td>{props.totalItems}</td>
            <td>{props.status}</td>
        </tr>

    );
}

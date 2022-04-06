//Import Dependencies
import React, { useState, useEffect, useContext } from 'react';


//import components
import OrderHistoryTable from '../components/orders/OrderHistoryTable';


import {UserContext} from "../UserContext";

function OrderHistoryPage() {
    const FETCH_URL = ;
    const token = useContext(UserContext).contextData.token;
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(10); // initalize at 10 items per page change as required
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
                setOrders(res.data || "no data returned"); // store returned data in a variable
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
                    <h1>You do not have any open orders</h1>
                    <p>{datajson}</p>
                </section>
            );
        } else {
    return(
        <div>
            <h1>Order History</h1>
            <OrderHistoryTable />
        </div>
    );


}
}

export default OrderHistoryPage;
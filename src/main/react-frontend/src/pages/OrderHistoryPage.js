//Import Dependencies
import React, { useState, useEffect, useContext } from 'react';


//import components
import OrderHistoryTable from '../components/orders/OrderHistoryTable';


import {UserContext} from "../UserContext";

function OrderHistoryPage() {
    return(
        <div>
            <h1>Order History</h1>
            <OrderHistoryTable />
        </div>
    );


}

export default OrderHistoryPage;
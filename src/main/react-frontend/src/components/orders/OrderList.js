// Import Dependencies
import React, {useState} from "react";

// Import Components
import Order from "./Order";
import ManageItemsTable from "./ManageItemsTable";

// Import Styles
import style from "../../assets/styles/ItemCardLayout.module.css";

export default function OrderList(props) {
    function regularOrderList() {

        const [show, setShow] = useState(false);

        return (
            <ul className={style.unorderedList}>
                {props.items.map((i) => (
                    <Order
                        key={i.orderId}
                        id={i.orderId}
                        orderTotal={i.orderTotal}
                        orderDate={i.orderDate}
                    />
                ))}
            </ul>
        );

    }




    function adminOrderList() {
        return(<></>);
}
}
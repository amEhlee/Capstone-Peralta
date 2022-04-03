// Import Dependencies
import React from "react";

// Import Components
import Order from "./Order";
import ManageItemsTable from "./ManageItemsTable";

// Import Styles
import style from "../../assets/styles/ItemCardLayout.module.css";

export default function ItemList(props) {
    function regularOrderList() {
        return (
            <ul className={style.unorderedList}>
                {props.items.map((i) => (
                    <Order
                        key={i.itemId}
                        id={i.itemId}
                        name={i.itemName}
                        price={i.itemPrice}
                        weight={i.itemWeight}
                        volume={i.itemVolume}
                        quantity={i.itemQuantity}
                        available={i.itemAvailable}
                    />
                ))}
            </ul>
        );
    }

    function adminOrderList() {
        return (
            <tbody>
            {props.items
                .filter((val) => {
                    if (props.search == "") {
                        return val;
                    } else if (
                        val.itemName.toLowerCase().includes(props.search.toLowerCase())
                    ) {
                        return val;
                    }
                })
                .map((i) => (
                    <ManageItemsTable
                        key={i.itemId}
                        id={i.itemId}
                        name={i.itemName}
                        category={i.category}
                        price={i.itemPrice}
                        weight={i.itemWeight}
                        volume={i.itemVolume}
                        quantity={i.itemQuantity}
                        available={i.itemAvailable}
                        item={i}
                    />
                ))}
            </tbody>
        );
    }

    if (props.target === "regularList") {
        return regularList();
    } else if (props.target === "adminList") {
        return adminList();
    }
}

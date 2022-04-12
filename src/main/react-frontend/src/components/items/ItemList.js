// Import Dependencies
import React from "react";

// Import Components
import Item from "./Item";
import ManageItemsTable from "./ManageItemsTable";

// Import Styles
import style from "../../assets/styles/ItemCardLayout.module.css";

export default function ItemList(props) {

	// for regular users render out item cards for each item
	function regularList() {
		return (
			<ul className={style.unorderedList}>
				{props.items.map((i) => (
					// send items away to be made into cards
					<Item
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

	// for admins render a table version of the item list
	function adminList() {
		return (
			<tbody>
				{props.items
					.filter((val) => {
						// filter the information to send based on search query
						if (props.search == "") {
							return val;
						} else if (
							val.itemName.toLowerCase().includes(props.search.toLowerCase())
						) {
							return val;
						}
					})
					.map((i) => (
						// send input to be processed into a table
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
							gatherData={props.gatherData}
							showAlert={props.showAlert}
						/>
					))}
			</tbody>
		);
	}

	/*
		since our backend uses the same call between admin and regular users
		here we can figure out which list to render based on the props.admin
	*/
	if (props.target === "regularList") {
		return regularList();
	} else if (props.target === "adminList") {
		return adminList();
	}
}

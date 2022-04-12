// Import Dependencies
import React, { useState } from "react";

// import ManageItemsTable from "./ManageItemsTable";
import { Modal, Button, Table } from "react-bootstrap";

// Import Styles
import style from "../../assets/styles/ItemCardLayout.module.css";

export default function OrderList(props) {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const itemList = props.itemList;

	return (
		<>
			<tr>
				<td>{props.orderId}</td>
				<td>{props.itemAmount}</td>
				<td>{props.orderStatus}</td>
				<td>{props.orderTotal}</td>
				<td>
					<Button
						onClick={handleShow}
						variant="primary"
						data-toggle="modal"
						size="sm"
					>
						View Items
					</Button>
				</td>
			</tr>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Order Items</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Item Name</th>
								<th>Item Price</th>
							</tr>
						</thead>
						<tbody>
							{itemList.map((i) => (
								<tr>
									<td>{i.itemName}</td>
									<td>{i.itemPrice}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Modal.Body>
			</Modal>
		</>
	);
}

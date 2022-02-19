import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import EditForm from "../InventoryManagement/EditItem";
import Image from './Image'

export default function ManageItems(props) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

  return (
      <>
        <tr>
          <td>{props.id}</td>
          <td>
            <Image
              itemId={props.id}
            />
          </td>
          <td>{props.name}</td>
          <td>${props.price}</td>
          <td>{props.weight}kg</td>
          <td>{props.quantity}</td>
          <td><input type="checkbox" checked={props.available} readOnly={"readonly"} /></td>
          <td>
              <Button onClick={handleShow} variant="primary" data-toggle="modal"  size="sm">Edit</Button>

          </td>
        </tr>

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
        <Modal.Title>
            Edit Item
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <EditForm item={props.item}/>
          </Modal.Body>
      </Modal>
      </>
  );
}

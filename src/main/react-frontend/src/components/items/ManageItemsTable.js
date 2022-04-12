// Import Dependencies
import React, {useState} from "react";

// Import Components
import { Modal, Button } from 'react-bootstrap';
import EditForm from "./EditItem";
import Image from './Image'

export default function ManageItems(props) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    let category = null;
    if (props.category != null) {
        category = props.category.categoryName;
    }

  return (
      <>
        <tr>
          <td>{props.id}</td>
          <td>
            <Image
              itemId={props.id}
              size={"50px"}
            />
          </td>
          <td>{props.name}</td>
          <td>{category}</td>
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
              <EditForm item={props.item} handleClose={handleClose} showAlert={props.showAlert} gatherData={props.gatherData}/>
          </Modal.Body>
      </Modal>
      </>
  );
}

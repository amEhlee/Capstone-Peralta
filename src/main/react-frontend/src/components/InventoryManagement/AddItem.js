import React from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, FormLabel, InputGroup, Button } from "react-bootstrap";

export default function AddItem() {

  return (
    <Form>
      <FormGroup className="mb-3" controlId="formItemName">
        <Form.Label>Item Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Item Name" />
      </FormGroup>

      <Form.Group controlId="formFileMultiple" className="mb-3">
    <Form.Label>Item Images</Form.Label>
    <Form.Control type="file" multiple />
  </Form.Group>

      <FormGroup className="mb-3" controlId="formItemDescription">
        <Form.Label>Item Description</Form.Label>
        <Form.Control as="textarea" rows="3" placeholder="Enter Item Description" />
      </FormGroup>

      <FormGroup className="mb-3" controlId="formItemCategory">
      {/* checkbox */}
        <Form.Label>Item Category</Form.Label>
        <Form.Check type="checkbox" label="Food" />
        <Form.Check type="checkbox" label="Clothing" />
        <Form.Check type="checkbox" label="Electronics" />
      </FormGroup>

        <FormGroup className="mb-3" controlId="formItemPrice">
          <Form.Label>Item Price</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control aria-label="Amount (to the nearest dollar)" />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
        </FormGroup>

      <FormGroup className="mb-3" controlId="formItemWeight">
        <Form.Label>Item Weight</Form.Label>
        <Form.Control type="number" placeholder="Enter Item Weight" />
      </FormGroup>


        <Button type="submit" className="btn btn-success">
          Add
        </Button>
        <Link to="/" className="btn btn-light ml-2">
          Cancel
        </Link>
    </Form>
  );
}

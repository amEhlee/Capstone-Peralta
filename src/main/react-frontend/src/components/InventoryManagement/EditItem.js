import React from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, FormLabel, InputGroup, Button } from "react-bootstrap";

export default function EditItem() {
  return (
    <Form>
      <FormGroup>
        <FormLabel>Item</FormLabel>
        <InputGroup type="text" placeholder="put item name"></InputGroup>
      </FormGroup>

      <Button type="submit" className="btn btn-warning">
        Edit Item
      </Button>
      <Link to="/" className="btn btn-light ml-2">
        Cancel
      </Link>
    </Form>
  );
}

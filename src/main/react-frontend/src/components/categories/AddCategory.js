import React from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, FormLabel, InputGroup, Button } from "react-bootstrap";

export default function AddCategory() {

  return (
    <Form>
        <FormGroup className="mb-3" controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Category Name" />
        </FormGroup>
        <Button type="submit" className="btn btn-success">
            Add Category
        </Button>
    </Form>
  );
}

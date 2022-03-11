// Import Dependencies
import React, { useRef } from "react";
import axios from "axios";

// Import Componenets
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap";


export default function AddCategory() {
    const categoryNameRef = useRef();

    function submitHandler() {
        const returnedName = categoryNameRef;


        const category = {
            categoryId: null,
            categoryName: returnedName.current.value,
            active: true
        };

        const POST_URL = "http://localhost:8080/category/add"; // fetch url
        axios.post(POST_URL, category).then((res) => {
            console.log(res);
        });
    }

    return (
        <Form onSubmit={submitHandler}>
            <FormGroup className="mb-3" controlId="formCategoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Category Name"
                    ref={categoryNameRef} />
            </FormGroup>
            <Button type="submit" className="btn btn-success">
                Add Category
            </Button>
        </Form>
    );
}

/**
 * This
 *
 *
 *
 */


import React from "react";
import {useNavigate} from "react-router-dom"

// Import Components
import {Form, FormGroup, InputGroup, Button, FormControl, Col, Row, Modal} from "react-bootstrap";



export default function DeleteProfile() {
    const navigate = useNavigate();

    return (
        <Form>

            <FormGroup className="mb-3" controlId="formHeader">
                <Form.Label>Are you sure you want to delete your account? </Form.Label>
            </FormGroup>

            <FormGroup className="mb-3 text-muted">
                <Form.Label> *Input your password to confirm your choice</Form.Label>
            </FormGroup>

            <FormGroup className="mb-3" controlId="">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" placeholder="Enter your password"/>
            </FormGroup>

            <FormGroup>
            <Button type="submit" className="btn btn-danger mb-3" onClick={() => {navigate("./")}} >
            Delete Account
            </Button>
            </FormGroup>
        </Form>



    )
}
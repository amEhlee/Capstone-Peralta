import React from "react";
import {Form, FormGroup, Button} from "react-bootstrap";
import  {Link}  from "react-router-dom";
export default function  SignUpUser() {
    return (
        <Form>
            <FormGroup className="mb-3" controlId="firstnameForm">
                <Form.Label>First Name: </Form.Label>
                <Form.Control type="text" placeholder="Input firstname"/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="lastnameForm">
                <Form.Label>Last Name: </Form.Label>
                <Form.Control type="text" placeholder="Enter lastname"/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="emailForm">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email"/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="passwordForm">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password"/>
            </FormGroup>



            <FormGroup className="mb-3" controlId="haveAccount">
                <Form.Text className="text-muted">
                    Already have an account?
                </Form.Text>
                <Link to="/login" className="btn btn-light ml-2">Login</Link>
            </FormGroup>

            <Button type="submit" variant="warning">Signup</Button>




        </Form>
    )


}
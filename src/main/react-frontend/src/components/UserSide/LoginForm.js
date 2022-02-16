import React from "react";
import {Form, FormGroup, Button} from "react-bootstrap";
import userStyle from "./UserSide.module.css";
import {Link} from "react-router-dom";

export default function LoginForm() {
    return(
        <Form>

            <FormGroup className="mb-3" controlId="emailForm">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email"/>
            </FormGroup>


            <FormGroup className="mb-3" controlId="passwordForm">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password"/>
            </FormGroup>



            <FormGroup className="mb-3" controlId="noAccount">
                <Form.Text className="text-muted">
                    Don't have an account yet?
                </Form.Text>
                <Link to="/signUp" className="ml-2">Sign Up</Link>
            </FormGroup>

            <Button type="submit" variant="warning">Login</Button>

        </Form>
    )
}
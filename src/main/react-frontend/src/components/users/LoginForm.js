// Import Dependencies
import React, {useContext} from "react";

// Import Components
import { Form, FormGroup, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";

// Import Styles
import userStyle from "../../assets/styles/UserSide.module.css";

// TODO: revise neccessity
export default function LoginForm() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const givenContext = useContext(UserContext);
    const navigate = useNavigate();

    async function submitHandler(event, token) {
        event.preventDefault();
        const returnedEmail = emailRef.current.value;
        const returnedPassword = passwordRef.current.value;

        const user = new URLSearchParams();
        user.append("email", returnedEmail);
        user.append("password", returnedPassword);

        const POST_URL = "http://localhost:8080/user/login"; // fetch url
        await axios.post(POST_URL, user).then((res) => {
            console.log(res);
            givenContext.setContextData((prevData) => {
                return {
                    ...prevData,
                    token: res.data.access_token,
                };
            })
        });

        // goto homepage after logging in
        navigate("/");
    }

    return (
        <Form onSubmit={submitHandler}>
            <FormGroup className="mb-3" controlId="emailForm">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" ref={emailRef} />
            </FormGroup>

            <FormGroup className="mb-3" controlId="passwordForm">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    ref={passwordRef}
                />
            </FormGroup>

            <FormGroup className="mb-3" controlId="noAccount">
                <Form.Text className="text-muted">Don't have an account yet?</Form.Text>
                <Link to="/signUp" className="btn btn-light ml-2">
                    Sign Up
                </Link>
            </FormGroup>

            <Button type="submit" variant="primary">
                Login
            </Button>

        </Form>
    );
}

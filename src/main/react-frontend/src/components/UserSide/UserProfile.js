
import React, {useRef, useState, useEffect, useContext} from "react";
import axios from "axios";
import {UserContext} from "../../UserContext";

// Import Components
import {Form, FormGroup, InputGroup, Button, FormControl, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Style from "../../assets/styles/UserSide.module.css";


export default function UserProfile() {


    const userContext = useContext(UserContext).contextData.user;
    const navigate = useNavigate();


    return (
        <Form className={Style.centrize}>
            <h1>Personal Details</h1>
            <FormGroup className="mb-3" controlId="formFname">
                <Form.Label> First Name: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your first name" disabled
                    defaultValue={userContext.userFirstName}
                />
            </FormGroup>

            <Form.Group controlId="formLname" className="mb-3">
                <Form.Label>Last Name: </Form.Label>
                <Form.Control type="text"
                              placeholder="Enter your last name" disabled
                              defaultValue={userContext.userLastName}
                />
            </Form.Group>

            <FormGroup className="mb-3" controlId="formEmail">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your Email" disabled
                    defaultValue={userContext.email}
                />
            </FormGroup>

            <Button type="submit" className="btn btn-success" onClick={() => {navigate("/editProfile")}}>
                Edit Account
            </Button>

</Form>
            )
}
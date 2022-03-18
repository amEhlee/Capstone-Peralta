// Import Dependencies
import React, {Form, FormGroup, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

// Import Styling
import userStyle from "../assets/styles/UserSide.module.css";
import cartE from "../assets/videos/cart.mp4";

export default function  SignUpUserPage() {
    return (
        <div className="test">
            <video autoPlay loop muted
                   style={{
                       position:"absolute",
                       width:"100%",
                       top:"50%",
                       left:"50%",
                       objectFit:"cover",
                       height:"100%",
                       transform:"translate(-50%,-50%)",
                       zIndex:"-1"
                   }}
            >
                <source src={cartE} type="video/mp4"/>
            </video>

        <Form className={userStyle.centrize}>
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

            <FormGroup className="mb-3" controlId="lastnameForm">
                <Form.Label>Last Name: </Form.Label>
                <Form.Control type="text" placeholder="Enter lastname"/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="lastnameForm">
                <Form.Label>Last Name: </Form.Label>
                <Form.Control type="text" placeholder="Enter lastname"/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="lastnameForm">
                <Form.Label>Last Name: </Form.Label>
                <Form.Control type="text" placeholder="Enter lastname"/>
            </FormGroup>



            <FormGroup className="mb-3" controlId="haveAccount">
                <Form.Text className="text-muted">
                    Already have an account?
                </Form.Text>
                <Link to="/login" className="ml-2">Login</Link>
            </FormGroup>

            <Button type="submit" variant="warning">Sign Up</Button>


        </Form>
        </div>
    )


}
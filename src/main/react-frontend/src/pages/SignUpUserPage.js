// Import Dependencies
import React, {Form, FormGroup, Button, Alert} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useRef, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext";
import {validEmail, validPassword, validPostalCode, validPhoneNumber} from "../components/regex/RegEx.js";

// Import Styling
import userStyle from "../assets/styles/UserSide.module.css";
import cartE from "../assets/videos/cart.mp4";

export default function  SignUpUserPage() {
        const firstnameRef = useRef();
        const lastnameRef = useRef();
        const emailRef = useRef();
        const passwordRef = useRef();
        const confirmPasswordRef = useRef();
        const addressRef = useRef();
        const postalRef = useRef();
        const phoneNumberRef = useRef();
        const givenContext = useContext(UserContext);
        const navigate = useNavigate();

    const [show, setShow] = useState(true);
    if (show) {
        return (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>You changes have been saved!</Alert.Heading>
                <p>
                    you can view your updated profile
                </p>
            </Alert>
        );
    }

        async function submitHandler(event) {
            event.preventDefault();
            const returnedFirstName = firstnameRef.current.value;
            const returnedLastName = lastnameRef.current.value;
            const returnedEmail = emailRef.current.value;
            const returnedPassword = passwordRef.current.value;
            const returnedConfirmPassword = confirmPasswordRef.current.value;
            const returnedAddress = addressRef.current.value;
            const returnedPostal = postalRef.current.value;
            const returnedPhoneNumber = phoneNumberRef.current.value;


            console.log(returnedPassword);
            console.log(returnedConfirmPassword);



            if (validate() == true) {
                const user = {
                    firstName: returnedFirstName,
                    lastName: returnedLastName,
                    email: returnedEmail,
                    password: returnedPassword,
                    address: returnedAddress,
                    postalCode: returnedPostal,
                    phoneNumber: returnedPhoneNumber,
                };

                console.log(user);

                const POST_URL = "http://localhost:8080/user/signup"; // fetch url
                const userExists = await axios.post(POST_URL, user).then((res) => {
                    console.log(res);
                    givenContext.setContextData((prevData) => {
                        return {
                            ...prevData,
                            token: res.data.access_token,
                        };
                    })
                });

                if (userExists == null) {
                    alert("User Already Exists")
                }
                else {
                    // on success navigtate back to login
                    navigate("/login");
                }
            }


        }

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

        <Form className={userStyle.centrize} onSubmit={submitHandler}>
            <FormGroup className="mb-3" controlId="firstnameForm">
                <Form.Label>First Name: </Form.Label>
                <Form.Control type="text" placeholder="Input firstname" required ref={firstnameRef}/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="lastnameForm">
                <Form.Label>Last Name: </Form.Label>
                <Form.Control type="text" placeholder="Enter lastname" required ref={lastnameRef}/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="emailForm">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" required pattern="^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$" ref={emailRef} onChange={validateEmail}/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="passwordForm">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" required pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$" ref={passwordRef} onChange={validatePassword}/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="confirmPasswordForm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" required pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$" ref={confirmPasswordRef} onChange={validatePasswordsMatch}/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="addressForm">
                <Form.Label>Address: </Form.Label>
                <Form.Control type="text" placeholder="Enter address" required ref={addressRef}/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="postalcodeForm">
                <Form.Label>Postal Code: </Form.Label>
                <Form.Control type="text" placeholder="Enter Postal Code" required pattern="^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$" ref={postalRef} onChange={validatePostalCode}/>
            </FormGroup>

            <FormGroup className="mb-3" controlId="phoneNumberForm">
                <Form.Label>Phone Number: </Form.Label>
                <Form.Control type="tel" placeholder="Enter Phone Number" pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$" ref={phoneNumberRef} onChange={validatePhoneNumber}/>
            </FormGroup>



            <FormGroup className="mb-3" controlId="haveAccount">
                <Form.Text className="text-muted">
                    Already have an account?
                </Form.Text>
                <Link to="/login" className="ml-2">Login</Link>
            </FormGroup>

            <Button type="submit" variant="warning" onClick={() => setShow(true)}>Sign Up</Button>


        </Form>
        </div>
    )


    function validate() {
        switch(true) {
            case validatePassword():
            case validatePasswordsMatch():
            case validateEmail():
            case validatePostalCode():
            case validatePhoneNumber():
                return true;
                break;
            default:
                return false;
        }
    }


    function validateEmail() {
        const returnedEmail = emailRef.current.value;
        if (!validEmail.test(returnedEmail)) {
            console.log("Email invalid!");
            return false;
        }
        return true;
    }

    function validatePassword() {
        const returnedPassword = passwordRef.current.value;
        if (!validPassword.test(returnedPassword)) {
            console.log("Password Invalid");
            return false;
        }
        return validatePasswordsMatch();
    }

    function validatePasswordsMatch() {
        const returnedPassword = passwordRef.current.value;
        const returnedConfirmPassword = confirmPasswordRef.current.value;
        if (!(returnedPassword === returnedConfirmPassword)) {
            console.log("Passwords don't match");
            return false;
        }
        return true;
    }

    function validatePostalCode() {
        const returnedPostal = postalRef.current.value;
        if (!validPostalCode.test(returnedPostal)) {
            console.log("Postalcode invalid!");
            return false;
        }
        return true;
    }

    function validatePhoneNumber() {
        const returnedPhoneNumber = phoneNumberRef.current.value;
        if (!validPhoneNumber.test(returnedPhoneNumber)) {
            console.log("Phonenumber invalid!");
            return false;
        }
        return true;
    }


}
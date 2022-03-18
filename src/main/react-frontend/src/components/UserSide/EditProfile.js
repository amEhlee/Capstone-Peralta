import React, { useContext, useRef,   } from "react";
import { UserContext } from "../../UserContext";
import Style from "../../assets/styles/UserSide.module.css";
import {Form, FormGroup, Button} from "react-bootstrap";
import axios from "axios";

export default function EditUser() {
    const userContext = useContext(UserContext).contextData.user;
    const token = useContext(UserContext).contextData.token;
    const userFirstNameRef = useRef();
    const userLastNameRef = useRef();
    const userConfirmPasswordRef = useRef();
    const userNewPasswordRef = useRef();
    const userPhoneRef = useRef();
    const userAddressRef = useRef();
    const userPostalCodeRef = useRef();
    const userEmailRef = useRef();



    function submitHandler(event) {
        event.preventDefault();
        const returnedFirstName = userFirstNameRef.current.value;
        const returnedLastName = userLastNameRef.current.value;
        const retunedConfirmPassword = userConfirmPasswordRef.current.value;
        const returnedNewPassword = userNewPasswordRef.current.value;
        const returnedPhone = userPhoneRef.current.value;
        const returnedAddress = userAddressRef.current.value;
        const returnedPostalCode = userPostalCodeRef.current.value;
        const returnedEmail= userEmailRef.current.value;

        // TODO password logic here
        if (retunedConfirmPassword !== userContext.password) {
            //TODO render modal
            console.log("incorrect confirm password");
            return; // break out of function
        }

        const updatedUser = {
            userId: "", // TODO context api
            firstName: returnedFirstName,
            lastName: returnedLastName,
            password: returnedNewPassword,
            email: returnedEmail,
            phoneNumber: returnedPhone,
            address: returnedAddress,
            postalCode: returnedPostalCode,
        };

        const PUT_URL = "http://localhost:8080/user/add"; // fetch url

        async function userPost() {
            await axios
                .put(PUT_URL, updatedUser, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.error(err));
        }

        userPost();
    }

    return (
        <Form onSubmit={submitHandler} className={Style.centrize}>
            <FormGroup className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    ref={userFirstNameRef}
                    defaultValue={""} /// TODO
                />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    ref={userLastNameRef}
                    defaultValue={""}
                />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Current Password"
                    ref={userConfirmPasswordRef}
                />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formNewPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter New Password"
                    ref={userNewPasswordRef}
                />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="403-111-1111"
                    ref={userPhoneRef}
                    defaultValue={""}
                />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    ref={userAddressRef}
                    defaultValue={""}
                />
            </FormGroup>

            <FormGroup className="mb-3" controlId="formPostalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Postal Code"
                    ref={userPostalCodeRef}
                    defaultValue={""}
                />
            </FormGroup>

            <Button type="submit" className="btn btn-success">
                Save Changes
            </Button>
        </Form>
    );
}
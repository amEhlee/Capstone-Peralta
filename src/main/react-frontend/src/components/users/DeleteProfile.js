/**
 * This
 *
 *
 *
 */


import React, {useState} from "react";
import {useNavigate} from "react-router-dom"

// Import Components
import {Form, FormGroup, InputGroup, Button, FormControl, Col, Row, Modal, Alert} from "react-bootstrap";



export default function DeleteProfile() {
    const navigate = useNavigate();

    const [fields, setFields] = useState({
        password: "",

    });

    //todo: check if the password is the same as the login creds donno how
    const [error, setError] = useState({});


    const [show, setShow] = useState(false);
    if (show) {
        return (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Your account is deleted</Alert.Heading>
                <p>
                    Account deletion was successful!
                </p>
            </Alert>
        );
    }
    const validate = () => {
        let errorDisplay={};

        if (!fields.password){
            errorDisplay.password= "￮ You need to input your Password"
        }

        //TODO: Call the verification method and return a boolean so you can delete the account
        //if ()

        setError(errorDisplay);
        if (Object.keys(errorDisplay).length===0){
            return true;
        }else {
            return false;
        }
    };


    //TODO: Make an axios call
    async function submitHandler (event) {
        if (event) event.preventDefault();

        if (validate(fields)){
            setShow(true);
        } else {
            setShow(false);
        }

    }


    return (
        <Form>

            <FormGroup className="mb-3" controlId="formHeader" onSubmit={submitHandler}>
                <Form.Label>Are you sure you want to delete your account? </Form.Label>
            </FormGroup>

            <FormGroup className="mb-3 text-muted">
                <Form.Label> *Input your password to confirm your choice</Form.Label>
            </FormGroup>

            <FormGroup className="mb-3" controlId="">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" placeholder="Enter your password" value={fields.password} onChange={((e) => setFields({...fields, password: e.target.value}))} />
                {error.password &&
                    <p className="text-danger"> {error.password}</p>
                }
            </FormGroup>

            <FormGroup>
            <Button type="submit" className="btn btn-danger mb-3" onClick={() => {navigate("./")}} >
            Delete Account
            </Button>
            </FormGroup>
        </Form>



    )
}
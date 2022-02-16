import React from "react";
import {Form, FormGroup, Button} from "react-bootstrap";
import  {Link}  from "react-router-dom";
import userStyle from "./UserSide.module.css";
import shopBag from "../videos/shoppingBag.mp4";
import LoginForm from "./LoginForm";

export default function  LoginUser() {
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
        <source src={shopBag} type="video/mp4"/>
        </video>

        <div className={userStyle.centrize}>
            <LoginForm/>
        </div>


    </div>


    )


}

// Import Dependencies
import React from "react";

// Import Components
import LoginForm from "../components/users/LoginForm";

// Import Styling
import userStyle from "../assets/styles/UserSide.module.css";
import shopBag from "../assets/videos/shoppingBag.mp4";

export default function  LoginUserPage() {

    //document.getElementById("loginbox").append(LoginForm);

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

        <div id="loginbox" className={userStyle.centrize}>
            <LoginForm/>{/* TODO POSSIBLE MOVE THE ENTIRE FORM HERE removes need for extra component*/}
        </div>


    </div>


    )


}

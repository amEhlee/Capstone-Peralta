import IconButtons from "./IconButtons";
import CategoryNav from "./CategoryNav";
import {
    BsFillBagFill,
    BsSearch,
    BsFillBellFill,
    BsFillPersonFill,
    BsFillCartFill,
} from "react-icons/bs";
import style from "./NavBar.module.css";
import { Modal, Button } from "react-bootstrap";
import LoginForm from "../UserSide/LoginForm"
import SignUpUser from "../UserSide/SignUpUser"
import { useState, useEffect} from "react";

function NavBar() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
        <div>
            <header className={style.header}>
                <div className={style.logo}>
                    <BsFillBagFill />
                    Peralta Shop
                </div>
                {/* Search Functionality will be added in future update */}
                <div className={style.searchwrapper}>
                    <input
                        type="text"
                        placeholder="Search"
                        className={style.searchBar}
                    ></input>
                    <BsSearch></BsSearch>
                </div>
                <IconButtons
                    iconElement={BsFillBellFill()}
                    buttonVariant="light"
                    redirectURL="/"
                />
                <Button variant="light" onClick={handleShow}>
                    {BsFillPersonFill()}
                </Button>
                <IconButtons
                    iconElement={BsFillCartFill()}
                    buttonVariant="light"
                    redirectURL="/cart"
                />
            </header>
            <CategoryNav />

        </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NavBar;

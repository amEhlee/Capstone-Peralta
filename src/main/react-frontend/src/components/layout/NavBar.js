// Import Dependencies
import {useState, useEffect} from "react";

// Import Components
import {
    BsSearch,
    BsFillBellFill,
    BsFillPersonFill,
    BsFillCartFill, BsShop,
} from "react-icons/bs";

import {Modal, Button, Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

import IconButtons from "./IconButtons";
import CategoryNav from "./CategoryNav";
import LoginForm from "../users/LoginForm";
import SignUpUserPage from "../../pages/SignUpUserPage";

// Import Styles
import style from "../../assets/styles/NavBar.module.css";

function NavBar() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <div>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Navbar.Brand><BsShop/> <a href="/">Peralta Shop</a></Navbar.Brand>
                        <Nav>
                            {/*TODO: ADD NAVIGATION*/}
                            <NavDropdown title="Navigation">
                                <NavDropdown.Item href="/">Home</NavDropdown.Item>
                                <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>

                                <NavDropdown.Item href="/userProfile">User Profile</NavDropdown.Item>

                            </NavDropdown>
                        </Nav>
                        {/* Search Functionality will be added in future update */}
                        <div className={style.searchwrapper}>
                            <input
                                type="text"
                                placeholder="Search"
                                className={style.searchBar}
                            />
                            <BsSearch/>
                        </div>

                        <IconButtons
                            iconElement={BsFillBellFill()}
                            buttonVariant="light"
                            redirectURL="/"
                        />

                        <Link to="/login">
                            <Button variant="light" onClick={handleShow}>
                                {BsFillPersonFill()}
                            </Button>
                        </Link>

                        <IconButtons
                            iconElement={BsFillCartFill()}
                            buttonVariant="light"
                            redirectURL="/cart"
                        />
                    </Container>
                </Navbar>
                {/*<CategoryNav/>*/}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NavBar;

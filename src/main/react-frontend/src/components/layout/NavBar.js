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
import {useNavigate} from "react-router-dom";

function NavBar() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <div>
                <Navbar bg="light" variant="light">
                    <Container>
                        <button onClick={() => {
                            navigate("/")
                        }}>
                            <Navbar.Brand><BsShop/> Peralta Shop</Navbar.Brand>
                        </button>
                        {/*<Nav>*/}
                        {/*    /!*TODO: ADD NAVIGATION*!/*/}
                        {/*    <NavDropdown title="Navigation">*/}
                        {/*        <NavDropdown.Item onClick={() => {*/}
                        {/*            navigate("/")*/}
                        {/*        }}>Home</NavDropdown.Item>*/}
                        {/*        <NavDropdown.Item onClick={() => {*/}
                        {/*            navigate("/order")*/}
                        {/*        }}>Orders</NavDropdown.Item>*/}
                        {/*        <NavDropdown.Item onClick={() => {*/}
                        {/*            navigate("/userProfile")*/}
                        {/*        }}>User Profile</NavDropdown.Item>*/}
                        {/*        <NavDropdown.Item onClick={() => {*/}
                        {/*            navigate("/admin/manageItems")*/}
                        {/*        }}>Admin Side</NavDropdown.Item>*/}
                        {/*    </NavDropdown>*/}
                        {/*</Nav>*/}
                        {/* TODO: add search functionaliy */}
                        <div className={style.searchwrapper}>
                            <input
                                type="text"
                                placeholder="Search"
                                className={style.searchBar}
                            />
                            <BsSearch/>
                        </div>


                        {/*NOT USEFUL RN*/}
                        {/*<IconButtons*/}
                        {/*    iconElement={BsFillBellFill()}*/}
                        {/*    buttonVariant="light"*/}
                        {/*    redirectURL="/"*/}
                        {/*/>*/}


                        {/*<NavDropdown title="Account">*/}
                        {/*    <NavDropdown.Item>Order History</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item>Edit Account</NavDropdown.Item>*/}
                        {/*    <Link to="/login"><NavDropdown.Item href="/login">Log In</NavDropdown.Item></Link>*/}
                        {/*    <NavDropdown.Item>Log out</NavDropdown.Item>*/}


                        {/*</NavDropdown>*/}

                        <Nav>
                            {/*TODO: ADD NAVIGATION*/}
                            <NavDropdown title="Account">
                                <NavDropdown.Item onClick={() => {
                                    navigate("/order")
                                }}>Order History</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => {
                                    navigate("/signup")
                                }}>Sign Up</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => {
                                    navigate("/userProfile")
                                }}>Edit Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => {
                                    navigate("/login")
                                }}>Login</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>



                        {/*REDIRECTS TO ADMIN PAGE NOW*/}
                        <Link to="/admin">
                            <Button variant="light" onClick={handleShow}>
                                {BsFillPersonFill()}
                                <div>Admin</div>
                            </Button>
                        </Link>


                        {/*TODO: ADD AMOUNT OF ITEMS IN CARD TO THE NAVBAR*/}
                        <Link to="/cart">
                            <Button variant="light" onClick={handleShow}>
                                {BsFillCartFill()}
                                <div>Cart</div>
                            </Button>
                        </Link>

                        {/*<IconButtons*/}
                        {/*    iconElement={BsFillCartFill()}*/}

                        {/*    buttonVariant="light"*/}
                        {/*    redirectURL="/cart"*/}
                        {/*/>*/}

                    </Container>
                </Navbar>
                {/*<CategoryNav/>*/}
            </div>
            {/*<Modal show={show} onHide={handleClose}>*/}
            {/*    <Modal.Header closeButton>*/}
            {/*        <Modal.Title>Login</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        <LoginForm/>*/}
            {/*    </Modal.Body>*/}
            {/*</Modal>*/}
        </>
    );
}

export default NavBar;

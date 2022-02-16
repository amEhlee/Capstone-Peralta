import style from "./AdminBar.module.css";
import {BsFillBagFill} from "react-icons/bs";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

function AdminBar() {
    return (
            <div className={style.navBar}>
            <Navbar>
                <Nav className="container-fluid">
                    <Navbar.Brand className={style.logo} bsPrefix="logo">
                        <BsFillBagFill/> Peralta Shop
                    </Navbar.Brand>
                    <Nav.Item className="ml-auto">
                        <Nav.Link>
                        <NavDropdown title="ADMIN">
                            <NavDropdown.Item>Log out</NavDropdown.Item>
                        </NavDropdown>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
            </div>
    );
}

export default AdminBar;
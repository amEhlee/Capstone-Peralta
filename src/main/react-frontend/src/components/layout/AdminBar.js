// Import Components
import {BsShop} from "react-icons/bs";
import {Link, useNavigate, Navigate} from "react-router-dom"
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

function AdminBar() {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <button onClick={() => {navigate("/")}}>
                        <Navbar.Brand><BsShop/> Peralta Shop</Navbar.Brand>
                    </button>
                    <Nav>
                        <NavDropdown title="Navigation">
                            <NavDropdown.Item onClick={() => {navigate("/")}}>Home</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {navigate("/admin/manageItems")}}>Manage Inventory</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {navigate("/admin/manageOrders")}}>Manage Orders</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {navigate("/admin/manageUsers")}}>Manage Users</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {navigate("/admin/sales")}}>Sales</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {navigate("/admin/settings")}}>Settings</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Account">
                            <NavDropdown.Item onClick={() => {navigate("/logout")}}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default AdminBar;
import {BsShop} from "react-icons/bs";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

function AdminBar() {
    return (
            <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand><BsShop/> Peralta Shop</Navbar.Brand>
                    <Nav>
                        <NavDropdown title="Navigation">
                            <NavDropdown.Item href="/">Home</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/manageitems">Inventory</NavDropdown.Item>
                            <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/useraccounts">User Accounts</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/sales">Sales</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/settings">Settings</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Account">
                            <NavDropdown.Item>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            </div>
    );
}

export default AdminBar;
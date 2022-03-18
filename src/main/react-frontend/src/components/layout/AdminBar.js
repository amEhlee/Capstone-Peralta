// Import Components
import {BsShop} from "react-icons/bs";
import {Link} from "react-router-dom"
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

function AdminBar() {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand><BsShop/> Peralta Shop</Navbar.Brand>
                    <Nav>
                        <NavDropdown title="Navigation">
                            <Link to="/"><NavDropdown.Item href="/">Home</NavDropdown.Item></Link>
                            <Link to="/admin/manageItems"><NavDropdown.Item href="/admin/manageItems">Manage Inventory</NavDropdown.Item></Link>
                            <Link to="/admin/manageOrders"><NavDropdown.Item href="/admin/manageOrders">Manage Orders</NavDropdown.Item></Link>
                            <Link to="/admin/manageUsers"><NavDropdown.Item href="/admin/useraccounts">Manage Users</NavDropdown.Item></Link>
                            <Link to="/admin/sales"><NavDropdown.Item href="/admin/sales">Sales</NavDropdown.Item></Link>
                            <Link to="/admin/settings"><NavDropdown.Item href="/admin/settings">Settings</NavDropdown.Item></Link>
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
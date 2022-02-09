import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, Container, Button } from "react-bootstrap";

export default function Heading() {
  return (
    <Navbar color="light" light>
      <Container>
        <Nav>
          <NavItem>
            <Link className="btn btn-Info" to="/add">
              <Button>Add Item</Button>
            </Link>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
}

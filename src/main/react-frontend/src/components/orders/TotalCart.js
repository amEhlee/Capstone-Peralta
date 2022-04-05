import React from "react";

// Import Components
import {Card, Button, Table} from "react-bootstrap";
import {useNavigate} from "react-router";

export default function TotalCart() {

    return(
    <Card className="text-center" border="success" style={{ width: '35%' }}>
        <Card.Header>Checkout</Card.Header>
        <Card.Body>
            <Card.Title>Summary</Card.Title>
            <Card.Text>
                Total:                                   $20
            </Card.Text>
            <Card.Text className="mb-3">
                Shipping & Handling:                     $18.99
            </Card.Text>
            <Button variant="warning">Cancel Order</Button>
        </Card.Body>
        <Card.Footer className="text-muted">If the item is already shipped, you cannot cancel</Card.Footer>
    </Card>

    )
}
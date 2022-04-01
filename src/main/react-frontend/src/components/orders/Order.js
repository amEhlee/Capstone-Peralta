// Import Dependencies
import React from "react";

// Import Components
import {Card, Button} from "react-bootstrap";
import {useNavigate} from "react-router";

// Import Styles
import style from '../../assets/styles/ItemCardLayout.module.css'

// Future update: add item id for dynamic navigation
export default function Order(props) {
    const history = useNavigate();

    return (
        <div className={style.card} onClick={() => { history('/order/' + props.id)}}>
            <li>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>{props.name}</Card.Title>
                        <Card.Text>
                            Price ${props.price}
                        </Card.Text>
                        <Button variant="outline-secondary">Add To Cart</Button>
                    </Card.Body>
                </Card>
            </li>
        </div>
    );
}
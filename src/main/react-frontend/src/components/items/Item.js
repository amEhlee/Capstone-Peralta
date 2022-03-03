// Import Dependencies
import React from "react";

// Import Components
import {Card, Button} from "react-bootstrap";

// Import Styles
import style from '../../assets/styles/ItemCardLayout.module.css'

// Future update: add item id for dynamic navigation
export default function Item(props) {
    return (
        <div className={style.card}>
            <li>
                <Card style={{width: '18rem'}}>
                    {/* Temporary Image Placeholder: Add dynamic image import from DB in future update*/}
                    <Card.Img variant="top" src="https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png" />
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
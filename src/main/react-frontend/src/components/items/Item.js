// Import Dependencies
import React from "react";

// Import Components
import {Card, Button} from "react-bootstrap";
import {useNavigate} from "react-router";

// Import Styles
import style from '../../assets/styles/ItemCardLayout.module.css'

// Future update: add item id for dynamic navigation
export default function Item(props) {
    const history = useNavigate();
    let limitName = props.name;
    if(limitName.length > 20) {
        limitName = limitName.substring(0,20) + "...";
    }

    function tryRequire() {
        try {
            return require("../../assets/images/" + props.id + "_1.png");
        } catch (err) {
            return require("../../assets/images/default-image-620x600.jpg");
        }
    }
    return (
        <div className={style.card} onClick={() => { history('/item/' + props.id)}}>
            <li>
                <Card style={{width: '18rem'}}>
                    {/* Temporary Image Placeholder: Add dynamic image import from DB in future update*/}
                    <Card.Img variant="top" src={tryRequire()} />
                    <Card.Body>
                        <Card.Title>{limitName}</Card.Title>
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
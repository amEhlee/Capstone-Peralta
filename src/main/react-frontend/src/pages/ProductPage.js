import React, {useEffect, useState} from "react";
import axios from "axios";
import { Container, Col, Row, Carousel} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Image from '../components/items/Image';


export default function ProductPage() {
    let {itemid} = useParams();
    // const FETCH_URL = "http://localhost:8080/item/get/all"; // fetch url
    //Fetches the item using item ID
    const FETCH_URL = "http://localhost:8080/item/get/" + itemid;
    var [datajson, setDataJson] = useState([]); // used to store data TODO rename var

    // function that will be called when the page loads purpose is to handle and process the axios get request
    async function gatherData() {
        return await axios
            .get(FETCH_URL) // preform get request
            .then((res) => {
                return res.data; // return response
            })
            .catch((err) => console.error(err));
    }

    // runs the gatherdata function when the page loads
    useEffect(() => {
        gatherData().then((data) => {
            console.log("response item get:" + data); // log returned data

            setDataJson(data || "no data returned"); // store returned data in a variable
        });
    }, []);

    console.log(datajson);

    const map1 = new Map();
    map1.set(datajson);
    console.log(itemid);

    //sets what is output to the webpage
    if (datajson === "no data returned") {
        return <section><p>{datajson}</p><p>NO DATA FOUND</p></section>;
    } else {
        const result = datajson;
        console.log(result);
        return (

                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Image
                                itemId={itemid}
                            />

                        </Col>

                        <Col md="auto">
                            <div>{datajson.itemName}</div>
                            <div>item description placeholder</div>
                            <div>${datajson.itemPrice}</div>
                        </Col>
                    </Row>

                </Container>




        );
    }


}
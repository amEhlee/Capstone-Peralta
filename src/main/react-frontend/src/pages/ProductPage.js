import React, {useEffect, useState} from "react";
import axios from "axios";
import {Image, Container, Col, Row, Carousel} from "react-bootstrap";
import {useParams} from "react-router-dom";


export default function ProductPage() {
    const FETCH_URL = "http://localhost:8080/item/get/all"; // fetch url
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
            console.log("response allItem get:" + data); // log returned data

            setDataJson(data || "no data returned"); // store returned data in a variable
        });
    }, []);

    console.log(datajson);

    const map1 = new Map();
    map1.set(datajson);

    let {itemid} = useParams();

    console.log(itemid);

    //sets what is output to the webpage
    if (datajson === "no data returned") {
        return <section><p>{datajson}</p></section>;
    } else {
        var result = datajson.find(function (e) {
            return e.itemId == itemid;
        });
        console.log(result);
        return (
            <div>test</div>
        );
    }


}
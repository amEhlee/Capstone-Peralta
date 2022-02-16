import React, {useEffect, useState} from "react";
import axios from "axios";
import ItemList from "../components/items/ItemList";

function HomePage() {
    const FETCH_URL = "http://localhost:8080/item/get/all"; // fetch url
    var [datajson, setDataJson] = useState([]); // used to store data

    // function that will be called when the page loads purpose is to handle and process the axios get request
    function gatherData() {
        return axios
            .get(FETCH_URL) // preform get request
            .then((res) => {
                return res.data; // return response
            })
            .catch((err) => console.error(err));
    }

    // runs the gatherdata function when the page loads
    useEffect(() => {
        gatherData().then((data) => {
            console.log(data); // log returned data

            setDataJson(data || "no data returned"); // store returned data in a variable
        });
    }, []);

    console.log(datajson);

    if (datajson === "no data returned") {
        return <section><p>{datajson}</p></section>;
    } else {
        return (
            <div>
                <h1>Homepage</h1>
                <ItemList items={datajson} target="regularList" />
            </div>
        );
    }
}

export default HomePage;
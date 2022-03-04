// Import Dependencies
import React, {useEffect, useState} from "react";
import axios from "axios";

// Import Components
import ItemList from "../components/items/ItemList";

// Import Styling
import style from "../assets/styles/Layout.module.css";

export default function HomePage() {
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

    if (datajson === "no data returned") {
        return <section><p>{datajson}</p></section>;
    } else {
        return (
            <div className={style.homepage}>
                <h1>Homepage</h1>
                <ItemList items={datajson} target="regularList" />
            </div>
        );
    }
}
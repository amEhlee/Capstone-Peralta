// Import Dependencies
import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import {UserContext} from "../UserContext";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
// Import Components
import ItemList from "../components/items/ItemList";

// Import Styling
import style from "../assets/styles/Layout.module.css";
import style2 from "../assets/styles/Homepage.module.css";

export default function SearchPage() {
let { searchTerm } = useParams();

    const FETCH_URL = "http://localhost:8080/item/search/" + searchTerm; // fetch url
    var [datajson, setDataJson] = useState([]); // used to store data TODO rename var
    var [itemList, setitemList] = useState([])
    const token = useContext(UserContext).contextData.token;

    // function that will be called when the page loads purpose is to handle and process the axios get request
    async function gatherData() {


        return await axios
            .get(FETCH_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }) // preform get request
            .then((res) => {
                return res.data; // return response
            })
            .catch((err) => console.error(err));
    }

    // runs the gatherdata function when the page loads
    useEffect(() => {
        gatherData().then((data) => {
            setDataJson(data || "no data returned");
            setitemList(datajson) // store returned data in a variable
        });
    }, [ searchTerm]);


    const items = datajson.map;

    console.log(datajson);

    if (datajson === "no data returned") {
        return (
            <>
            <h1>NO ITEMS FOUND WITH PARAMETER</h1>
             <section>
                <Link to="/admin/manageItems">Try Manage Items Page</Link>
                <p>{datajson}</p>
            </section>


            </>
           
        );
    } else {
        return (
            
            <div>
            <h1>Results containing: "{ searchTerm }"</h1>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    
                    <ItemList items={datajson} target="regularList"/>
                </div>

            </div>
        );
    }
}

// Import Dependencies
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


// Import Components
import ItemList from "../components/items/ItemList";
import {UserContext} from "../UserContext";

export default function SearchPage() {
    // get search term from the nav bar
    let { searchTerm } = useParams();

    // set the search term to the search term from the nav bar
    const FETCH_URL = "http://localhost:8080/item/search/" + searchTerm;

    var [items, setItems] = useState([]);
    const token = useContext(UserContext).contextData.token;
    
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
            .catch((err) => console.error(err)); // catch error
    }

    useEffect(() => {
        gatherData().then((data) => {
            setItems(data || "no data returned"); // store returned data in a variable
        });
    }, []);

    console.log(items);

    return (
        <div>
            <ItemList items={items} target="regularList"/>
        </div>
    );



}
// Import Dependencies
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";

// Import Components
import ItemList from "../components/items/ItemList";
import {UserContext} from "../UserContext";

export default function ViewAllItemsPage() {
  const FETCH_URL = "http://localhost:8080/item/get/all"; // fetch url
  const token = useContext(UserContext).contextData.token;
  var [datajson, setDataJson] = useState([]); // used to store data

  // function that will be called when the page loads purpose is to handle and process the axios get request
  function gatherData() {
    return axios
      .get(FETCH_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })  // preform get request
      .then((res) => {
        return res.data; // return response
      })
      .catch((err) => console.error(err));
  }

  // runs the gatherdata function when the page loads
  useEffect(() => {
    gatherData().then((data) => {
      setDataJson(data || "no data returned"); // store returned data in a variable
    });
  }, []);

  console.log(datajson);

  if (datajson === "no data returned") {
    return <section><p>{datajson}</p></section>;
  } else {
    return (
      <div>
        <h1>Get All Items</h1>
        <ItemList items={datajson} target="regularList" />
      </div>
    );
  }
}

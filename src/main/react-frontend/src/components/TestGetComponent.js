import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function TestGetComponent() {
  const dataUrl = "http://localhost:8080//getItems"; // fetch url
  const [datajson, setDataJson] = useState([]); // used to store data 

  // function that will be called when the page loads purpose is to handle and process the axios get request
  function gatherData() {
    return axios
      .get(dataUrl) // preform get request
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

  return (
    <div>
      <h1>Data Down Below</h1>

      <p className="itemContainer">
        <div>
          <p>
            ID:{datajson.itemID}<br/>
            Name:{datajson.itemName}<br/>
            ${datajson.itemPrice}<br/>
            Quantity: {datajson.itemQuantity}<br/>
          </p>
        </div>
      </p>
    </div>
  );
}
export default TestGetComponent;

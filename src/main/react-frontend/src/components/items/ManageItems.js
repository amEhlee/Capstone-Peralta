import React from "react";
import { Link } from "react-router-dom";

export default function Item(props) {


  return (
    <div>
      <li>
        <h1>{props.id}</h1>
        <h3>{props.name}</h3>
        <Link to={"/admin/edit/" + props.id}>
          <button>Edit Item</button>
        </Link>
        <button>Delete Item</button>
      </li>
    </div>
  );
}

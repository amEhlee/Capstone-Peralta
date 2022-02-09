import React from "react";
import { Link } from "react-router-dom";

export default function Item(props) {


  return (
    <div>
      <li>
        <h2>#{props.id} {props.name}</h2>
        <Link to={"/admin/edit/" + props.id}>
          <button>Edit Item</button>
        </Link>
        <button>Delete Item</button>
      </li>
    </div>
  );
}

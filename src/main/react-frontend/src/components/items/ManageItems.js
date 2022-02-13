import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function Item(props) {


  return (
        <tr>
          <td>{props.id}</td>
          <td>{props.name}</td>
          <td>${props.price}</td>
          <td>{props.weight}kg</td>
          <td>{props.quantity}</td>
          <td>{props.available}</td>
          <td>
            <Link to={"/admin/edit/" + props.id}>
              <Button variant="primary" size="sm">Edit</Button>
            </Link>
          </td>
        </tr>
  );
}

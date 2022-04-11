import { Modal, Button, Table } from 'react-bootstrap';

export default function OrderItems(props) {
    return (
        <tr>
            <td>
                {props.itemName}
            </td>
            <td>
                {props.itemPrice}
            </td>
        </tr>
    );
}
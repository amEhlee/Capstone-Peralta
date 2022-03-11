import Image from './Image'
import { Modal, Button } from 'react-bootstrap';

export default function CartItems(props) {
    return (
        <>
            <tr>
                <td>
                    <Image
                        itemId={props.itemId}
                        size="50px"
                    />
                </td>
                <td>{props.itemName}</td>
                <td>{props.itemQuantity}</td>
                <td>{props.itemPrice}</td>
                <td>
                    <Button variant="danger">Remove</Button>
                </td>
            </tr>
        </>
    );
}
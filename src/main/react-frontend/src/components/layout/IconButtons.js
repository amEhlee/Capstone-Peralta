// Import Components
import { useNavigate } from 'react-router';
import {Button} from "react-bootstrap";

function IconButtons(props) {
    const history = useNavigate();
    {/* TODO CRUD methods will be added in future update */}
    const clickHandler = () => {
        history(props.redirectURL)
    }
    return (
        <div>
            <Button variant={props.buttonVariant} onClick={clickHandler}>
                {props.iconElement}
            </Button>
        </div>
    );
}

export default IconButtons;
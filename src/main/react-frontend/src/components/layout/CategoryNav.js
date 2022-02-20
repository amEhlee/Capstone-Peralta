// Import Components
import { useNavigate } from 'react-router';
import {Button} from "react-bootstrap";

// Import Styles
import style from '../../assets/styles/CategoryNav.module.css';

function CategoryNav() {
    const history = useNavigate();
    return (
        <body>
        {/* Proper redirect will be added in future update */}
        <div className={style.categoryNav}>
            <Button variant="outline-secondary" onClick={() => { history('/AllItems')}}>
                Bags
            </Button>
            <Button variant="outline-secondary" onClick={() => { history('/AllItems')}}>
                Clothing
            </Button>
            <Button variant="outline-secondary" onClick={() => { history('/AllItems')}}>
                Wallets
            </Button>
            <Button variant="outline-secondary" onClick={() => { history('/AllItems')}}>
                Accessories
            </Button>
        </div>
        </body>
    );
}

export default CategoryNav;
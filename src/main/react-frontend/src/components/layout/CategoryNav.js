// Import Components
import { useNavigate } from 'react-router-dom';
import {Button} from "react-bootstrap";

// Import Styles
import style from '../../assets/styles/CategoryNav.module.css';

function CategoryNav() {
    const history = useNavigate();
    return (
        <body>
        {/* Proper redirect will be added in future update */}
        <div className={style.categoryNav}>
            <Button variant="outline-secondary" onClick={() => { history('/')}}>
                Bags
            </Button>
            <Button variant="outline-secondary" onClick={() => { history('/')}}>
                Clothing
            </Button>
            <Button variant="outline-secondary" onClick={() => { history('/')}}>
                Wallets
            </Button>
            <Button variant="outline-secondary" onClick={() => { history('/')}}>
                Accessories
            </Button>
            <Button variant="outline-danger" onClick={() => { history('/admin/manageItems')}}>
                ADMIN VIEW
            </Button>
        </div>
        </body>
    );
}

export default CategoryNav;
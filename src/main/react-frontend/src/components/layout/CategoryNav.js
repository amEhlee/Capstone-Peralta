import style from './CategoryNav.module.css';
import { useNavigate } from 'react-router';

function CategoryNav() {
    const history = useNavigate();
    return (
        <body>
        <nav className={style.categoryNav}>
            <ul>
                {/* Proper redirect will be added in future update */}
                <li className={style.catButton} onClick={() => { history('/AllItems') }}>
                    <p>Bags</p>
                </li>
                <li className={style.catButton} onClick={() => { history('/AllItems') }}>
                    <p>Clothings</p>
                </li>
                <li className={style.catButton} onClick={() => { history('/AllItems') }}>
                    <p>Wallets</p>
                </li>
                <li className={style.catButton} onClick={() => { history('/AllItems') }}>
                    <p>Accessories</p>
                </li>
            </ul>
        </nav>
        </body>
    );
}

export default CategoryNav;
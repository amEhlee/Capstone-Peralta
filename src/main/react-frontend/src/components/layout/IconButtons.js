import { useNavigate } from 'react-router';
import style from './IconButtons.module.css';

function IconButtons(props) {
    const history = useNavigate();
    {/* CRUD methods will be added in future update */}
    const clickHandler = () => {
        history(props.redirectURL)
    }
    return (
        <div className={style.iconEffect}>
            <button className={style.buttonStyle} onClick={clickHandler}>
                <i class="material-icons">{props.iconName}</i>
            </button>
        </div>
    );
}

export default IconButtons;
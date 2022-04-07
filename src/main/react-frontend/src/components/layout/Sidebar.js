// Import Styles
import style from '../../assets/styles/Sidebar.module.css';

// Import Components
import {
    BsFillHouseFill,
    BsJustify,
    BsFillBagFill,
    BsFillPersonLinesFill,
    BsGraphUp,
    BsFillGearFill,
} from "react-icons/bs";

import {useNavigate} from "react-router-dom";


export default function AdminSidebar() {
    const navigate = useNavigate();

    return (
        <div className={style.Sidebar}>
            <ul className={style.SidebarList}>
                <li className={style.row} key={1} onClick={() => {navigate("/")}}>
                    <div className={style.rowIcon} id="icon"><BsFillHouseFill /></div>
                    <div className={style.rowTitle} id="title">Home</div>
                </li>
                <li className={style.row} key={2} onClick={() => {navigate("/admin/manageItems")}}>
                    <div className={style.rowIcon} id="icon"><BsJustify /></div>
                    <div className={style.rowTitle} id="title">Inventory</div>
                </li>
                <li className={style.row} key={3} onClick={() => {navigate("/admin/manageOrders")}}>
                    <div className={style.rowIcon} id="icon"><BsFillBagFill /></div>
                    <div className={style.rowTitle} id="title">Orders</div>
                </li>
                <li className={style.row} key={4} onClick={() => {navigate("/admin/manageUsers")}}>
                    <div className={style.rowIcon} id="icon"><BsFillPersonLinesFill /></div>
                    <div className={style.rowTitle} id="title">User Accounts</div>
                </li>

            </ul>
        </div>
    );
}
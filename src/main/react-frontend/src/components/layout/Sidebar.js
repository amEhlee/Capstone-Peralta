import style from './Sidebar.module.css';
import {SidebarData} from "./SidebarData";

function Sidebar(){
    return (
        <div className={style.Sidebar}>
            <ul className={style.SidebarList}>
            {SidebarData.map((val, key) => {
                return (
                    <li className={style.row} key={key} onClick={() => {window.location.pathname = val.link}}>
                        <div className={style.rowIcon} id="icon">{val.icon}</div>
                        <div className={style.rowTitle} id="title">{val.title}</div>
                    </li>
                )
            })}
            </ul>
        </div>
    );
}

export default Sidebar;
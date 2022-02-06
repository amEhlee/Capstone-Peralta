import style from './Layout.module.css';
import NavBar from './NavBar';
import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div>
            <main className={style.main}><Outlet> </Outlet></main>
        </div>
    );
}

export default AdminLayout;
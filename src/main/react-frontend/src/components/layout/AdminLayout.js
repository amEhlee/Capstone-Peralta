import style from './Layout.module.css';
import AdminNavBar from './AdminNavBar.js';
import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div>
            <AdminNavBar />
            <main className={style.main}><Outlet> </Outlet></main>
        </div>
    );
}

export default AdminLayout;
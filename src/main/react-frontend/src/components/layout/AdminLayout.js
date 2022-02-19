import style from '../../styles/Layout.module.css';
import NavBar from './NavBar';
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminBar from "./AdminBar";

function AdminLayout() {
    return (
        <div>
            <AdminBar/>
            <Sidebar/>
            <main className={style.main}><Outlet> </Outlet></main>
        </div>
    );
}

export default AdminLayout;
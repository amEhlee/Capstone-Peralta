import style from './Layout.module.css';
import NavBar from './NavBar';
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AdminLayout() {
    return (
        <div>
            <Sidebar></Sidebar>
            <main className={style.main}><Outlet> </Outlet></main>
        </div>
    );
}

export default AdminLayout;
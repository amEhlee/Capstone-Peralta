// Import Components
import { Outlet } from "react-router-dom";
import NavBar from './NavBar';
import Sidebar from "./Sidebar";
import AdminBar from "./AdminBar";

// Import Styles
import style from '../../assets/styles/Layout.module.css';

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
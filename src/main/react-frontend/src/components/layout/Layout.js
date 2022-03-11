// Import Components
import NavBar from './NavBar';
import { Outlet } from "react-router-dom";

// Import Styles
import style from '../../assets/styles/Layout.module.css';

function Layout() {
    return (
        <div>
            <NavBar />
            <main className={style.main}><Outlet> </Outlet></main>
        </div>
    );
}

export default Layout;
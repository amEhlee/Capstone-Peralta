import { Link } from 'react-router-dom';
import style from './NavBar.module.css';

function NavBar() {
    return (
        <header className={style.header}>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"></link>
            <div className={style.logo}>
                <i class="material-icons">language</i> Peralta Shop
            </div>
            {/* Search Functionality will be added in future update */}
            <div className={style.searchwrapper}>
                <input type="text" placeholder="Search" className={style.searchBar}></input>
                <i class="material-icons">search</i>
            </div>
            {/* Icon functionality will be added in future update */}
            <div className={style.icon}>
                <button>
                    <i class="material-icons">notifications</i>
                </button>
            </div>
            <div className={style.icon}>
                <button>
                    <i class="material-icons">account_circle</i>
                </button>
            </div>
            <div className={style.icon}>
                <button>
                    <i class="material-icons">shopping_cart</i>
                </button>
            </div>
        </header>
    );
}

export default NavBar;
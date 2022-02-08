import IconButtons from './IconButtons';
import CategoryNav from './CategoryNav';
import style from './NavBar.module.css';

function NavBar() {
    return (
        <div>
            <header className={style.header}>
                {/* Use material icon library from Google Material */}
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
                <IconButtons iconName="notifications" redirectURL="/"/>
                <IconButtons iconName="account_circle" redirectURL="/"/>
                <IconButtons iconName="shopping_cart" redirectURL="/cart"/>
            </header>
            <CategoryNav/>
        </div>
    );
}

export default NavBar;
import IconButtons from './IconButtons';
import CategoryNav from './CategoryNav';
import { BsFillBagFill, BsSearch, BsFillBellFill, BsFillPersonFill, BsFillCartFill } from "react-icons/bs";
import style from './NavBar.module.css';

function NavBar() {
    return (
        <div>
            <header className={style.header}>
                <div className={style.logo}>
                    <BsFillBagFill/>Peralta Shop
                </div>
                {/* Search Functionality will be added in future update */}
                <div className={style.searchwrapper}>
                    <input type="text" placeholder="Search" className={style.searchBar}></input>
                    <BsSearch></BsSearch>
                </div>
                <IconButtons iconElement={BsFillBellFill()} buttonVariant="light" redirectURL="/"/>
                <IconButtons iconElement={BsFillPersonFill()} buttonVariant="light" redirectURL="/"/>
                <IconButtons iconElement={BsFillCartFill()} buttonVariant="light" redirectURL="/cart"/>
            </header>
            <CategoryNav/>
        </div>
    );
}

export default NavBar;
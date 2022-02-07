import style from "./AdminNavBar.module.css";

function AdminNavBar() {
    return (
        <header className={style.header}>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"></link>
            <div className={style.logo}>
                <i className="material-icons">language</i> Peralta Shop
            </div>

            <div className={style.icon}>
                <button>
                    <i className="material-icons">account_circle</i>
                </button>
            </div>
        </header>
    );
}

export default AdminNavBar;
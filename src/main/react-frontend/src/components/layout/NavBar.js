// Import Dependencies
import { useState, useEffect } from "react";

// Import Components
import {
    BsFillBagFill,
	BsSearch,
	BsFillBellFill,
	BsFillPersonFill,
	BsFillCartFill,
} from "react-icons/bs";
import { Modal, Button } from "react-bootstrap";
import IconButtons from "./IconButtons";
import CategoryNav from "./CategoryNav";
import LoginForm from "../users/LoginForm";
import SignUpUserPage from "../../pages/SignUpUserPage";

// Import Styles
import style from "../../assets/styles/NavBar.module.css";

function NavBar() {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	return (
		<>
			<div>
				<header className={style.header}>
					<div className={style.logo}>
						<BsFillBagFill />
						Peralta Shop
					</div>
					{/* Search Functionality will be added in future update */}
					<div className={style.searchwrapper}>
						<input
							type="text"
							placeholder="Search"
							className={style.searchBar}
						></input>
						<BsSearch></BsSearch>
					</div>
					<IconButtons
						iconElement={BsFillBellFill()}
						buttonVariant="light"
						redirectURL="/"
					/>
					<Button variant="light" onClick={handleShow}>
						{BsFillPersonFill()}
					</Button>
					<IconButtons
						iconElement={BsFillCartFill()}
						buttonVariant="light"
						redirectURL="/cart"
					/>
				</header>
				<CategoryNav />
			</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<LoginForm />
				</Modal.Body>
			</Modal>
		</>
	);
}

export default NavBar;

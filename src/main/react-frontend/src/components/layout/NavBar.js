// Import Dependencies
import {useContext, useState} from "react";

// Import Components
import {BsSearch,BsFillPersonFill,BsFillCartFill,BsShop,BsBagCheck} from "react-icons/bs";
import {Button,Container,Navbar,Nav,} from "react-bootstrap";
import { Link } from "react-router-dom";

// user context information
import { UserContext } from "../../UserContext";

// Import Styles
import style from "../../assets/styles/NavBar.module.css";
import { useNavigate } from "react-router-dom";

// export navbar component
export default function NavBar() {
	const navigate = useNavigate();
	const [searchQuery, search] = useState('');

	// grab context information
	const context = useContext(UserContext).contextData;
	const user = context.user; // get user object from

	function manageProfileButton() {
		if (user) {
			//If user is an admin allow them to access admin page
			// breaks down auth part of token so we can extract the roles
            const payload = JSON.parse(atob(context.token.split(".")[1])); 
			if (payload.roles.includes("ROLE_ADMIN")) {
				return (
					<Link to="/admin">
						<Button variant="light" >
							{BsFillPersonFill()}
							<div>Admin</div>
						</Button>
					</Link>
				);
			} else {
				//If user is not an admin but logged in allow them to access their profile
				return (
					<Link to="/userProfile">
						<Button variant="light" >
							{BsFillPersonFill()}
							<div>Profile</div>
						</Button>
					</Link>
				);
			}
		} else {
			/*If user is not logged in allow them to login*/
			return (
				<Link to="/login">
					<Button variant="light" >
						{BsFillPersonFill()}
						<div>Login</div>
					</Button>
				</Link>
			);
		}
	}

	return (
		<>
			<div>
				<Navbar bg="light" variant="light">
					<Container>
						<button
							onClick={() => {
								navigate("/");
							}}
						>
							<Navbar.Brand>
								<BsShop /> Peralta Shop
							</Navbar.Brand>
						</button>

						{/* TODO: add search functionaliy */}
						<div className={style.searchwrapper}>
							<input
								type="text"
								placeholder="Search"
								className={style.searchBar}
								onChange={e => search(e.target.value)}
								onKeyPress={(e) => {
									if (e.key === "Enter"){
										navigate('/search/' + searchQuery);
									}
								}}
							/>
							<BsSearch onClick={() => {navigate('/search/' + searchQuery)}}/>
						</div>

						<Nav>
							<Link to="/order">
                                <Button variant="light">
                                    {BsBagCheck()}
                                    <div>Orders</div>
                                </Button>
                            </Link>
						</Nav>

						<Nav>
                            {manageProfileButton()}
                        </Nav>

						{/*TODO: ADD AMOUNT OF ITEMS IN CARD TO THE NAVBAR*/}
						<Link to="/cart">
							<Button variant="light" >
								{BsFillCartFill()}
								<div>Cart</div>
							</Button>
						</Link>

					</Container>
				</Navbar>
				{/*<CategoryNav/>*/}
			</div>
		</>
	);
}

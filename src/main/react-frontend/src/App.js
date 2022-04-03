// Import Components
import { Route, Routes, Navigate } from "react-router-dom";
import { UserProvider, UserContext } from "./UserContext";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import ViewAllItemsPage from "./pages/ViewAllItemsPage";
import AdminLayout from "./components/layout/AdminLayout";
import AddItem from "./components/items/AddItem";
import EditItem from "./components/items/EditItem";
import ManageItemsPage from "./pages/ManageItemsPage";

import RequireAuth from "./RequireAuth";

import LoginUserPage from "./pages/LoginUserPage";
import LogoutUserPage from "./pages/LogoutUserPage";
import SignUpUserPage from "./pages/SignUpUserPage";
import Checkout from "./components/UserSide/CheckoutItem";

import AddCategory from "./components/categories/AddCategory";
import SelectCategory from "./components/categories/SelectCategory";
import ManageUsersPage from "./pages/ManageUsersPage";

import ProductPage from "./pages/ProductPage";
import UserProfile from "./components/UserSide/UserProfile";
import EditProfile from "./components/UserSide/EditProfile";

// Import Styling
import "bootstrap/dist/css/bootstrap.min.css";
import SearchPage from "./pages/SearchPage";

export default function App() {
	return (
		<>
			<UserContext.Consumer>
				{(value) => {
					return console.log(value);
				}}
			</UserContext.Consumer>
			<Routes>
				{/*TODO Change path to be under /home or smth*/}
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/items" element={<ViewAllItemsPage />} />
					<Route path="/item/:itemid" element={<ProductPage />} />
					<Route path="search/:searchTerm" element={<SearchPage />} />

					<Route path="/userProfile" element={<UserProfile />} />
					<Route path="/checkout" element={<Checkout />} />
				</Route>

				<Route path="/logout" element={<LogoutUserPage />} />
				<Route path="/login" element={<LoginUserPage />} />
				<Route path="/signUp" element={<SignUpUserPage />} />
				<Route path="/editProfile" element={<EditProfile />} />

				<Route exact path="/admin" element={<RequireAuth />}>
					{/* Example Path Would Be e.g /admin/inventory */}
					<Route exact path="/admin" element={<AdminLayout />}>
						<Route index element={<AdminPage />} />
						<Route path="manageItems" element={<ManageItemsPage />} />
						<Route path="addCategory" element={<AddCategory />} />
						<Route path="selectCategory" element={<SelectCategory />} />
						<Route path="manageUsers" element={<ManageUsersPage />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

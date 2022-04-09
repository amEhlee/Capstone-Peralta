
// Import Components
import { Route, Routes } from "react-router-dom";
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
import ManageUsersPage from "./pages/ManageUsersPage";
import ManageOrdersPage from "./pages/ManageOrdersPage";

import LoginUserPage from "./pages/LoginUserPage";
import LogoutUserPage from "./pages/LogoutUserPage";
import SignUpUserPage from "./pages/SignUpUserPage";
import CheckoutPage from "./pages/CheckoutPage";

import AddCategory from "./components/categories/AddCategory";
import SelectCategory from "./components/categories/SelectCategory";

import ProductPage from "./pages/ProductPage";
import UserProfile from "./components/users/UserProfile";
import EditProfile from "./components/users/EditProfile";
import OrderUser from "./components/orders/Order";



// Import Styling
import "bootstrap/dist/css/bootstrap.min.css";
import SearchPage from "./pages/SearchPage";
//import OrderHistoryPage from "./pages/OrderHistoryPage"; no export default this breaks stuff

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
					{/* fix actual exported function first please */}
					{/* <Route path="/orderhistory" element={<OrderHistoryPage />} /> */}

					<Route path="/userProfile/:saved" element={<UserProfile/>}/>
					<Route path="/checkout" element={<CheckoutPage/>}/>
				</Route>

				<Route path="/order" element={<OrderUser />} />
				<Route path="/login" element={<LoginUserPage />} />
				<Route path="/logout" element={<LogoutUserPage />} />
				<Route path="/signUp" element={<SignUpUserPage />} />
				<Route path="/editProfile" element={<EditProfile/>}/>



				{/* Example Path Would Be e.g /admin/inventory */}
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<AdminPage />} />
					<Route path="manageItems/:added" element={<ManageItemsPage />} />
					<Route path="manageOrders" element={<ManageOrdersPage />} />
					<Route path="manageUsers" element={<ManageUsersPage />} />
					<Route path="addCategory" element={<AddCategory />} />
					<Route path="selectCategory" element={<SelectCategory />} />
				</Route>
			</Routes>
		</>
	);
}

import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import ViewAllItemsPage from "./pages/ViewAllItemsPage";
import AdminLayout from "./components/layout/AdminLayout";
import AddItem from "./components/items/AddItem";
import EditItem from "./components/items/EditItem";
import ManageItemsPage from "./pages/ManageItemsPage";
import LoginUserPage from "./pages/LoginUserPage";
import SignUpUserPage from "./pages/SignUpUserPage";
import AddCategory from "./components/categories/AddCategory";
import SelectCategory from "./components/categories/SelectCategory";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/allItems" element={<ViewAllItemsPage />} />
      </Route>

        <Route path="/login" element={<LoginUserPage />} />
        <Route path="/signUp" element={<SignUpUserPage/>}/>

      {/* Example Path Would Be e.g /admin/inventory */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="addItem" element={<AddItem />} />
        <Route path="editItem" element={<EditItem />} />
        <Route path="manageItems" element={<ManageItemsPage />}/>
        <Route path="addCategory" element={<AddCategory />} />
        <Route path="selectCategory" element={<SelectCategory />} />
    
      </Route>
    </Routes>
  );
}

export default App;

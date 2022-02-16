import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import ViewAllItemsPage from "./pages/ViewAllItemsPage";
import AdminLayout from "./components/layout/AdminLayout";
import AddItem from "./components/InventoryManagement/AddItem";
import EditItem from "./components/InventoryManagement/EditItem";
import ManageItemsPage from "./pages/admin/ManageItemsPage";
import LoginUser from "./components/UserSide/LoginUser";
import SignUpUser from "./components/UserSide/SignUpUser";
import AddCategory from "./components/categories/AddCategory";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/allItems" element={<ViewAllItemsPage />} />
      </Route>

        <Route path="/login" element={<LoginUser />} />
        <Route path="/signUp" element={<SignUpUser/>}/>

      {/* Example Path Would Be e.g /admin/inventory */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="addItem" element={<AddItem />} />
        <Route path="editItem" element={<EditItem />} />
        <Route path="manageItems" element={<ManageItemsPage />}/>
        <Route path="addCategory" element={<AddCategory />} />
    
      </Route>
    </Routes>
  );
}

export default App;

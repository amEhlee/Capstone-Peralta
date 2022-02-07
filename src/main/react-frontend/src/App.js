import {Route, Routes} from 'react-router-dom';
import Layout from './components/layout/Layout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from "./pages/AdminPage";
import CartPage from './pages/CartPage';
import ViewAllItemsPage from "./pages/ViewAllItemsPage";
import AdminLayout from "./components/layout/AdminLayout";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/allItems' element={<ViewAllItemsPage/>}/>
            </Route>

            <Route path='/admin' element={<AdminLayout/>}>
                <Route index element={<AdminPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;

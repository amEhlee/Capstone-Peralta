import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from "./pages/AdminPage";
import TestGetComponent from "./pages/TestGetComponent";
import AdminLayout from "./components/layout/AdminLayout";

function App() {
  return (
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/TestGet' element={<TestGetComponent />} />
          </Route>

          <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<AdminPage />} />
          </Route>
      </Routes>
  );
}

export default App;

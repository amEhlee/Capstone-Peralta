import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TestGetComponent from './pages/TestGetComponent';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/TestGet' element={<TestGetComponent />} />
      </Routes>
    </Layout>
  );
}

export default App;

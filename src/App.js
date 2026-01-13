import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar'; 
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import HomePage from './pages/HomePage/HomePage';
import DesignPage from './pages/DesignPage/DesignPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import OrderListPage from './pages/OrderListPage/OrderListPage';
import OrderFormPage from './pages/OrderFormPage/OrderFormPage';
import AdminPage from './pages/AdminPage/AdminPage';
import './App.css';

console.log('Navbar:', typeof Navbar);
console.log('ProtectedRoute:', typeof ProtectedRoute);
console.log('HomePage:', typeof HomePage);
console.log('DesignPage:', typeof DesignPage);
console.log('LoginPage:', typeof LoginPage);
console.log('RegistrationPage:', typeof RegistrationPage);
console.log('OrderListPage:', typeof OrderListPage);
console.log('OrderFormPage:', typeof OrderFormPage);
console.log('AdminPage:', typeof AdminPage);

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                
                <Route path="/design" element={
                    <ProtectedRoute>
                        <DesignPage />
                    </ProtectedRoute>
                } />
                <Route path="/orders" element={
                    <ProtectedRoute>
                        <OrderListPage />
                    </ProtectedRoute>
                } />
                <Route path="/orderForm" element={
                    <ProtectedRoute>
                        <OrderFormPage />
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
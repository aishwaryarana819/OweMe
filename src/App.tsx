import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Borrowings from './pages/Borrowings';
import Lendings from './pages/Lendings';
import Settings from './pages/Settings';

// Components
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/borrowings" element={<Borrowings />} />
                    <Route path="/lendings" element={<Lendings />} />

                    <Route path="/settings" element={<Settings />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

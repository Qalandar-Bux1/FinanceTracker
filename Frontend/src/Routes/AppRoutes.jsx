// AppRoutes.jsx or Route.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
        </Routes>
    );
}

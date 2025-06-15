import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Dashboard from '../Pages/Dashboard';
import Chart from '../Pages/Chart';
import Transaction from '../Pages/Transaction';
import Profile from '../Pages/Profile';
import Summry from '../Pages/Summry';

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      {/* Protected routes */}
      {isAuthenticated ? (
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Transaction />} /> {/* ✅ Default = Transactions */}
          <Route path="summry" element={<Summry />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="charts" element={<Chart />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

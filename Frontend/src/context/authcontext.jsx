// context/AuthContext.jsx
import React from 'react';
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("studentToken"));

  useEffect(() => {
    // Optional: Sync token status when it changes
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("studentToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (token) => {
    localStorage.setItem("studentToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("studentToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

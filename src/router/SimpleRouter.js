import React from "react";
import LoadCSV from "../pages/LoadCSVPage/LoadCSV";
import {BrowserRouter, createBrowserRouter , Route,  Routes } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import LoginForm from "../pages/auth/LoginScreen";
import RegisterForm from "../pages/auth/RegisterScreen";

function SimpleRouter() {
  return (

    <BrowserRouter>
    <Routes>
        <Route path="/data" element={
        <ProtectedRoute>
            <LoadCSV/>
        </ProtectedRoute>
     }/>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm/>} />

    </Routes>
    </BrowserRouter>

  );
}

export default SimpleRouter;

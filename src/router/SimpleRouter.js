import React from "react";
import LoginForm from "../pages/auth/LoginScreen";
import LoadCSV from "../components/LoadCSV";
import {BrowserRouter, createBrowserRouter , Route,  Routes } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import RegisterForm from "../pages/auth/RegisterScreen";


// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <LoginForm/>
//     },
//     {
//         path: "/register",
//         element: <RegisterForm/>,
//       },
//       {
//         path: "/data",
//         element: <ProtectedRoute/>,
//       },
//   ]);

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

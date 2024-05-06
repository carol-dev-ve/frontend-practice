import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export default function Layout({ children }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white py-4 px-6 flex flex-row justify-between">
        <h1 className="text-2xl font-semibold">My App</h1>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </header>
      <main className="flex-1 px-20">{children}</main>
      <footer className="bg-gray-800 text-white py-4 px-6 text-center">
        <p>&copy; 2024 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

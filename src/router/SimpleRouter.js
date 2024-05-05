import React from "react";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../pages/auth/LoginScreen";
import LoadCSV from "../components/LoadCSV";

const SimpleRouter = () => {
  const { user } = useAuth();
  return user?.email ? <LoadCSV /> : <LoginForm />;
};

export default SimpleRouter;

import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import { Loader } from "@mantine/core";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <Loader size="xl" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import { Loader } from "@mantine/core";

const AdminRoute = ({ children }) => {
  const { user, loading } = useUser();

  // Kullanıcı bilgisi sunucudan çekilirken ekrana loader gösterebilirsiniz
  if (loading) {
    return <Loader size="xl" />;
  }

  // Kullanıcı yoksa login sayfasına yönlendir
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Kullanıcı admin değilse anasayfaya yönlendir
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Şartlar sağlanıyorsa protected bileşeni render et
  return children;
};

export default AdminRoute;

import { MantineProvider, Loader } from "@mantine/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShellTest from "./layout/AppShellTest";
import "./App.css";
import "@mantine/core/styles.css";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";

import MyOrder from "./pages/MyOrder";
import { UserProvider } from "./contexts/userContext";
import Orders from "./pages/Orders";
import AppShellAdmin from "./layout/AppShellAdmin";
import AdminHome from "./pages/AdminHome";
import AddItemsPage from "./Admin/AddItemsPage";
import DetailPage from "./components/DetailPage/DetailPage";
import MyProfile from "./components/MyProfile/MyProfile";
import ListItemsPage from "./Admin/ListItemsPage";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import OrderDetail from "./components/Order/OrderDetail";

function App() {
  return (
    <>
      <MantineProvider>
        {" "}
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppShellTest />}>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<DetailPage />} />
                <Route path="/order-detail/:id" element={<OrderDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/myorders" element={<MyOrder />} />
                <Route
                  path="/myprofile"
                  element={
                    <ProtectedRoute>
                      <MyProfile />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route
                element={
                  <AdminRoute>
                    <AppShellAdmin />
                  </AdminRoute>
                }
              >
                <Route path="/admin" element={<AdminHome></AdminHome>} />
                <Route path="/addItem" element={<AddItemsPage />} />
                <Route path="/listItem" element={<ListItemsPage />} />
                <Route path="/admin/orders" element={<Orders />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </MantineProvider>
    </>
  );
}

export default App;

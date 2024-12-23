// contexts/userContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext(null);

// context'i kullanmak için özel hook
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  // Kullanıcı verisi çekilirken beklemek için loading state'i
  const [loading, setLoading] = useState(true);

  // Uygulama ilk açıldığında localStorage'dan token var mı diye bakıyoruz
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Token varsa kullanıcı bilgisini sunucudan çek
      fetchCurrentUser(storedToken);
    } else {
      // Token yoksa loading'i kapatıyoruz
      setLoading(false);
    }
  }, []);

  /**
   * Kullanıcı bilgilerini sunucudan çeken fonksiyon
   */
  const fetchCurrentUser = async (jwtToken) => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/user/account",
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      setUser(res.data);
    } catch (error) {
      console.error("fetchCurrentUser error: ", error?.response?.data || error);
      // Token geçersizse logout
      logout();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout işlemi: token'ı localStorage'dan silip user state'ini sıfırlıyoruz
   */
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  const contextValue = {
    token,
    setToken: (newToken) => {
      // Hem state'e hem localStorage'a kaydediyoruz
      localStorage.setItem("token", newToken);
      setToken(newToken);
      // Token değiştiğinde kullanıcı bilgilerini tekrar çek
      setLoading(true);
      fetchCurrentUser(newToken);
    },
    user,
    setUser,
    logout,
    loading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

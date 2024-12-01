import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const getCookie = (name) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return cookieValue ? decodeURIComponent(cookieValue.split("=")[1]) : null; // 디코딩된 값 반환
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const accessToken = getCookie("AccessToken");
    const userProfileId = getCookie("userProfileId");

    if (accessToken || userProfileId) {
      console.log("AccessToken:", accessToken);
      console.log("userProfileId:", userProfileId);

      localStorage.setItem("userProfileId", userProfileId);
      setIsLoggedIn(true);
    } else {
      console.log("Not logged in");
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    document.cookie =
      "AccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "userProfileId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    localStorage.removeItem("userProfileId");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

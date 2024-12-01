import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const getCookie = (name) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return cookieValue ? cookieValue.split("=")[1] : null;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const accessToken = getCookie("AccessToken");
    const userProfileIdFromCookie = getCookie("userProfileId");
    const userProfileIdFromStorage = localStorage.getItem("userProfileId");

    // 네이버 로그인 (쿠키 기반)
    if (accessToken && userProfileIdFromCookie) {
      localStorage.setItem("userProfileId", userProfileIdFromCookie);
      setIsLoggedIn(true);
    }
    // 일반 로그인 (로컬스토리지 기반)
    else if (userProfileIdFromStorage) {
      setIsLoggedIn(true);
    }
    // 로그아웃 상태
    else {
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

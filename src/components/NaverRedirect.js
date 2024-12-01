import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NaverRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userProfileId = params.get("userprofileid");

    if (userProfileId) {
      localStorage.setItem("userProfileId", userProfileId);

      setIsLoggedIn(true);

      navigate("/");
    } else {
      alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      navigate("/auth/login");
    }
  }, [location.search, navigate, setIsLoggedIn]);

  return <p>네이버 로그인을 처리 중입니다...</p>;
};

export default NaverRedirect;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout as logoutApi } from "../api/AuthApi";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  const handleLogout = async () => {
    try {
      await logoutApi();
      localStorage.removeItem("token");
      localStorage.removeItem("userProfileId");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("로그아웃 오류:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해 주세요.");
      localStorage.removeItem("token");
      localStorage.removeItem("userProfileId");
      window.location.reload();
    }
  };

  const handleMyPage = () => {
    const userProfileId = localStorage.getItem("userProfileId");
    if (userProfileId) {
      navigate(`/mypage/${userProfileId}`);
    } else {
      alert("사용자 정보가 없습니다.");
    }
  };

  return (
    <Container>
      <Left>
        <Logo onClick={() => navigate("/")}>Co-Mento</Logo>
        <Menu>
          <Item onClick={() => navigate("/problemlist")}>문제</Item>
          <Item onClick={() => navigate("/book")}>문제집</Item>
          <Item onClick={() => navigate("/rank")}>랭킹</Item>
          {/* <Item onClick={() => navigate("/board")}>게시판</Item> */}
        </Menu>
      </Left>
      <BtnBox>
        {isLoggedIn ? (
          <>
            <MyPage onClick={handleMyPage}>마이페이지</MyPage>
            <Logout onClick={handleLogout}>로그아웃</Logout>
          </>
        ) : (
          <>
            <Login onClick={() => navigate("/auth/login")}>로그인</Login>
            <Join onClick={() => navigate("/auth/join")}>회원가입</Join>
          </>
        )}
      </BtnBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray2};
  padding: 0 40px;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
`;
const Logo = styled.div`
  margin-right: 50px;
  font-size: 30px;
  ${(props) => props.theme.fonts.logo};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Menu = styled.div`
  display: flex;
  gap: 50px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
`;
const Item = styled.div`
  cursor: pointer;
`;
const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  font-size: 13px;
`;
const Login = styled.div`
  cursor: pointer;
`;
const Join = styled.div`
  cursor: pointer;
`;
const Logout = styled.div`
  cursor: pointer;
`;
const MyPage = styled.div`
  cursor: pointer;
`;

export default Header;

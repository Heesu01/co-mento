import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <Left>
        <Logo>Co-Mento</Logo>
        <Menu>
          <Item>문제</Item>
          <Item>문제집</Item>
          <Item>랭킹</Item>
          <Item>게시판</Item>
        </Menu>
      </Left>
      <BtnBox>
        <Login>로그인</Login>
        <Join>회원가입</Join>
      </BtnBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.colors.red};
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

export default Header;

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo>Co-Mento</Logo>
      <LoginBox>
        <Title>아이디</Title>
        <Input placeholder="아이디를 입력해주세요."></Input>
        <Title>비밀번호</Title>
        <Input placeholder="비밀번호를 입력해주세요."></Input>
        <P>
          계정이 없으신가요?{" "}
          <span onClick={() => navigate("/auth/join")}>회원가입</span>
        </P>
        <Btn onClick={() => navigate("/")}>로그인</Btn>
      </LoginBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Logo = styled.div`
  margin-top: 40px;
  ${(props) => props.theme.fonts.logo};
  font-size: 80px;
  color: ${(props) => props.theme.colors.red};
`;
const LoginBox = styled.div`
  width: 450px;
  height: auto;
  border-top: 2px solid ${(props) => props.theme.colors.red};
  border-radius: 0 0 15px 15px;
  box-shadow: 0px 5px 5px -1px ${(props) => props.theme.colors.gray};
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px 40px;
`;
const Title = styled.div`
  margin-left: 6px;
  margin-top: 15px;
`;
const Input = styled.input`
  width: 100%;
  height: 38px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray2};
  padding-left: 13px;

  &::placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }
  &:focus {
    outline: 1.4px solid ${(props) => props.theme.colors.red};
    border: none;
  }
`;
const P = styled.p`
  margin-top: 10px;
  font-size: 13px;
  display: flex;
  justify-content: flex-end;
  color: ${(props) => props.theme.colors.gray};

  span {
    color: ${(props) => props.theme.colors.pink};
    margin-left: 5px;
    cursor: pointer;
  }
`;
const Btn = styled.button`
  height: 38px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.pink};
  margin: 10px 0;
  color: ${(props) => props.theme.colors.white};
`;
export default Login;

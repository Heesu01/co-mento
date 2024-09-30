import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Join = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();

  const onSubmit = () => {
    if (!errors.confirmPassword) {
      navigate("/");
    }
  };

  const password = watch("password");

  return (
    <Container>
      <Logo>
        Co-Mento <span style={{ color: "black" }}>회원가입</span>{" "}
      </Logo>
      <JoinBox onSubmit={handleSubmit(onSubmit)}>
        <Title>아이디</Title>
        <Input
          placeholder="사용하실 이메일을 입력해주세요."
          {...register("id", {
            required: "아이디를 입력해주세요.",
            minLength: {
              value: 6,
              message: "아이디는 6자 이상이어야 합니다.",
            },
            maxLength: {
              value: 15,
              message: "아이디는 15자 이하이어야 합니다.",
            },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: "아이디는 영문과 숫자만 입력 가능합니다.",
            },
          })}
          onBlur={() => trigger("id")}
        />
        {errors.id && <Error>{errors.id.message}</Error>}

        <Title>닉네임</Title>
        <Input
          placeholder="사용하실 닉네임을 입력해주세요."
          {...register("name", {
            required: "닉네임를 입력해주세요.",
            minLength: {
              value: 2,
              message: "닉네임는 2자 이상이어야 합니다.",
            },
            maxLength: {
              value: 10,
              message: "닉네임는 10자 이하이어야 합니다.",
            },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: "닉네임는 영문과 숫자만 입력 가능합니다.",
            },
          })}
          onBlur={() => trigger("name")}
        />
        {errors.name && <Error>{errors.name.message}</Error>}

        <Title>비밀번호</Title>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상이어야 합니다.",
            },
            maxLength: {
              value: 15,
              message: "비밀번호는 15자 이하이어야 합니다.",
            },
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
              message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
            },
          })}
          onBlur={() => trigger("password")}
        />
        {errors.password && <Error>{errors.password.message}</Error>}

        <Title>비밀번호 확인</Title>
        <Input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          {...register("confirmPassword", {
            required: "비밀번호를 다시 입력해주세요.",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
          onBlur={() => trigger("confirmPassword")}
        />
        {errors.confirmPassword && (
          <Error>{errors.confirmPassword.message}</Error>
        )}

        <Btn type="submit" onClick={() => navigate("/")}>
          가입하기
        </Btn>
      </JoinBox>
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
  font-size: 45px;
  color: ${(props) => props.theme.colors.red};
`;
const JoinBox = styled.form`
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
const Btn = styled.button`
  height: 38px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.pink};
  margin: 20px 0;
  color: ${(props) => props.theme.colors.white};

  &:hover {
    background-color: ${(props) => props.theme.colors.red};
  }
`;
const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-left: 6px;
  margin-top: 5px;
`;

export default Join;

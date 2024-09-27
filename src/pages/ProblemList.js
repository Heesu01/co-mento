import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProblemList = () => {
  const navigate = useNavigate();

  const problems = [
    {
      id: 1,
      num: 1004,
      title: "두 수 비교하기",
      class: "수학",
      successRate: "89.7%",
      success: true,
    },
    {
      id: 2,
      num: 1005,
      title: "합 구하기",
      class: "수학",
      successRate: "72.4%",
      success: false,
    },
    {
      id: 2,
      num: 1005,
      title: "합 구하기",
      class: "수학",
      successRate: "72.4%",
      success: false,
    },
    {
      id: 2,
      num: 1005,
      title: "합 구하기",
      class: "수학",
      successRate: "72.4%",
      success: true,
    },
    {
      id: 2,
      num: 1005,
      title: "합 구하기",
      class: "수학",
      successRate: "72.4%",
      success: false,
    },
    {
      id: 2,
      num: 1005,
      title: "합 구하기",
      class: "수학",
      successRate: "72.4%",
      success: false,
    },
    {
      id: 2,
      num: 1005,
      title: "합 구하기",
      class: "수학",
      successRate: "72.4%",
      success: false,
    },
    {
      id: 1,
      num: 1004,
      title: "두 수 비교하기",
      class: "수학",
      successRate: "89.7%",
      success: true,
    },
    {
      id: 1,
      num: 1004,
      title: "두 수 비교하기",
      class: "수학",
      successRate: "89.7%",
      success: true,
    },
  ];

  return (
    <Container>
      <SearchBox>
        <Input placeholder="문제를 검색해주세요."></Input>
        <SearchBtn>검색</SearchBtn>
      </SearchBox>
      <SpecificBox></SpecificBox>
      <ListBox>
        <Top>
          <Num>문제번호</Num>
          <Title>문제 제목</Title>
          <Class>분류</Class>
          <Success>정답률</Success>
          <Check>성공여부</Check>
        </Top>
        {problems.map((problem) => (
          <Item key={problem.id} onClick={() => navigate("/problem")}>
            <Num>{problem.num}</Num>
            <Title>{problem.title}</Title>
            <Class>{problem.class}</Class>
            <Success>{problem.successRate}</Success>
            <Check>
              {problem.success ? <FaCheck color="green" /> : <p>X</p>}
            </Check>
          </Item>
        ))}
      </ListBox>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 90px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SearchBox = styled.div`
  display: flex;
  width: 100%;
  height: 35px;
  justify-content: space-between;
`;
const Input = styled.input`
  width: 94%;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  outline: none;
  padding-left: 10px;
`;
const SearchBtn = styled.button`
  width: 5%;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  font-weight: 500;
`;
const SpecificBox = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  padding: 20px 35px;
`;
const ListBox = styled.div`
  width: 100%;
  height: 800px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  padding: 35px;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.red};
`;
const Num = styled.div`
  width: 10%;
`;
const Title = styled.div`
  width: 40%;
`;
const Class = styled.div`
  width: 30%;
`;
const Success = styled.div`
  width: 10%;
`;
const Check = styled.div`
  width: 10%;
  p {
    font-weight: 800;
    color: ${({ theme }) => theme.colors.red};
  }
`;
const Item = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.red};
  cursor: pointer;
`;

export default ProblemList;

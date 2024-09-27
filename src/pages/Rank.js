import React from "react";
import styled from "styled-components";

const Rank = () => {
  const RankData = [
    {
      id: 1,
      rank: 4,
      name: "닉네임3422",
      success: "20",
      exp: "8096",
    },
    {
      id: 2,
      rank: 5,
      name: "닉네임6562",
      success: "18",
      exp: "7023",
    },
    {
      id: 3,
      rank: 6,
      name: "닉네임1234",
      success: "15",
      exp: "6739",
    },
    {
      id: 3,
      rank: 7,
      name: "닉네임1234",
      success: "15",
      exp: "6739",
    },
    {
      id: 3,
      rank: 8,
      name: "닉네임1234",
      success: "15",
      exp: "6739",
    },
    {
      id: 3,
      rank: 8,
      name: "닉네임1234",
      success: "15",
      exp: "6739",
    },
    {
      id: 3,
      rank: 8,
      name: "닉네임1234",
      success: "15",
      exp: "6739",
    },
    {
      id: 3,
      rank: 8,
      name: "닉네임1234",
      success: "15",
      exp: "6739",
    },
    {
      id: 3,
      rank: 8,
      name: "닉네임1234",
      success: "15",
      exp: "6739",
    },
  ];

  return (
    <Container>
      <TopRank></TopRank>
      <ListBox>
        <Top>
          <Num>등수</Num>
          <Name>닉네임</Name>
          <Success>맞은 문제 수</Success>
          <Exp>경험치</Exp>
        </Top>
        {RankData.map((problem) => (
          <Item key={problem.id}>
            <Num>{problem.rank}</Num>
            <Name>{problem.name}</Name>
            <Success>{problem.success}</Success>
            <Exp>{problem.exp}</Exp>
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
const TopRank = styled.div``;
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
const Name = styled.div`
  width: 50%;
`;
const Success = styled.div`
  width: 25%;
`;
const Exp = styled.div`
  width: 15%;
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

export default Rank;

import React, { useState } from "react";
import styled from "styled-components";
import { FaMedal } from "react-icons/fa6";
import Pagination from "../components/Pagination";

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

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Title>Co-Mento 랭킹</Title>
      <TopRank>
        <RankBox>
          <Text>
            <MedalIcon color="#C0C0C0" />
            <TopNum>2</TopNum>
            <Info>
              <p>닉네임3231</p>
              <p>경험치 2923</p>
            </Info>
          </Text>
          <Bar rank={2} h="160px"></Bar>
        </RankBox>
        <RankBox>
          <Text>
            <MedalIcon color="#FFD700" />
            <TopNum>1</TopNum>
            <Info>
              <p>닉네임1234</p>
              <p>경험치 5920</p>
            </Info>
          </Text>
          <Bar rank={1} h="300px"></Bar>
        </RankBox>
        <RankBox>
          <Text>
            <MedalIcon color="#CD7F32" />
            <TopNum>3</TopNum>
            <Info>
              <p>닉네임879</p>
              <p>경험치 1220</p>
            </Info>
          </Text>
          <Bar rank={3} h="120px"></Bar>
        </RankBox>
      </TopRank>
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
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
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

const Title = styled.div`
  ${(props) => props.theme.fonts.title};
  width: 100%;
  text-align: center;
  font-size: 35px;
`;
const TopRank = styled.div`
  width: 100%;
  height: 430px;
  /* border: 1px solid ${({ theme }) => theme.colors.gray2}; */
  display: flex;
  justify-content: center;
`;

const RankBox = styled.div`
  width: 30%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  margin: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  text-align: center;
  gap: 5px;
`;

const MedalIcon = styled(FaMedal)`
  color: ${(props) => props.color};
  font-size: 30px;
  margin-left: 10px;
  margin: auto;
`;

const TopNum = styled.div`
  font-size: 50px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;

const Info = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray1};
  p {
    margin: 5px 0;
  }
`;

const Bar = styled.div`
  width: 11vw;
  height: ${(props) => props.h};
  border-radius: 10px;
  background: ${(props) =>
    props.rank === 1
      ? "linear-gradient(145deg, #FFD700, #FFFACD, #FFA500)"
      : props.rank === 2
      ? "linear-gradient(145deg, #C0C0C0, #F0F0F0, #A9A9A9)"
      : props.rank === 3
      ? "linear-gradient(145deg, #CD7F32, #F4A460, #8B4513)"
      : "linear-gradient(145deg, #90EE90, #C0FFC0, #006400)"};
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

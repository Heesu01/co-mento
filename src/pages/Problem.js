import React from "react";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Problem = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <TopBox>
        <Num>#1234</Num>
        <Name>
          <span>문제이름</span>
        </Name>
        <Like>
          <FaRegHeart />
        </Like>
      </TopBox>
      <StatisticsBox>
        <Statistic>
          <TitleBox>
            <Title>시간 제한</Title>
            <Title>메모리 제한</Title>
            <Title>제출</Title>
            <Title>정답</Title>
            <Title>맞힌 사람</Title>
            <Title>정답률</Title>
          </TitleBox>
          <InfoBox>
            <Info>2초</Info>
            <Info>128MB</Info>
            <Info>1156442</Info>
            <Info>453490</Info>
            <Info>310806</Info>
            <Info>38.829%</Info>
          </InfoBox>
        </Statistic>
      </StatisticsBox>
      <BoxContainer>
        <ProblemBox>
          <TextTitle>문제</TextTitle>
          <TextContents>
            <p>
              두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을
              작성하시오.
            </p>
          </TextContents>
        </ProblemBox>
        <ProblemBox>
          <TextTitle>입력</TextTitle>
          <TextContents>
            <p>
              두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을
              작성하시오.
            </p>
          </TextContents>
        </ProblemBox>
        <ProblemBox>
          <TextTitle>출력</TextTitle>
          <TextContents>
            <p>
              두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을
              작성하시오.
            </p>
          </TextContents>
        </ProblemBox>
      </BoxContainer>
      <AllExampleBox>
        <ExampleBox>
          <TextTitle>입력 예시</TextTitle>
          <SmallContents>
            <p>1 3</p>
          </SmallContents>
        </ExampleBox>
        <ExampleBox>
          <TextTitle>출력 예시</TextTitle>
          <SmallContents>
            <p>1 3</p>
          </SmallContents>
        </ExampleBox>
      </AllExampleBox>
      <BottomBox>
        <Source>출처: 백준 10000</Source>
        <Button
          children="문제풀기"
          bgc={({ theme }) => theme.colors.deepPink}
          hoverColor={({ theme }) => theme.colors.pink}
          onClick={() => navigate("/submit")}
        />
      </BottomBox>
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
const TopBox = styled.div`
  display: flex;
  font-size: 24px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.red};
  padding: 0 10px;
  padding-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;
const Num = styled.div`
  font-weight: 700;
`;
const Name = styled.div`
  font-weight: 500;
  font-size: 30px;
`;
const Like = styled.div`
  cursor: pointer;
`;
const StatisticsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Statistic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 40px 0;
  gap: 8px;
`;
const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.red};
  padding-bottom: 5px;
`;
const Title = styled.p`
  width: 80px;
  text-align: center;
`;
const InfoBox = styled.div`
  padding-top: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Info = styled.p`
  width: 80px;
  text-align: center;
`;
const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 40px;
`;
const ProblemBox = styled.div``;
const TextTitle = styled.p`
  margin-bottom: 15px;
  font-weight: 700;
  border-bottom: 2px solid ${({ theme }) => theme.colors.red};
  padding-bottom: 10px;
`;
const TextContents = styled.div`
  box-shadow: 0px 5px 5px -1px ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  min-height: 150px;
  line-height: 1.3em;
`;
const AllExampleBox = styled.div`
  display: flex;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;
const ExampleBox = styled.div`
  width: 42%;
`;
const SmallContents = styled.div`
  width: 100%;
  box-shadow: 0px 5px 5px -1px ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  padding: 20px;
  min-height: 150px;
  margin-top: 20px;
  line-height: 1.3em;
`;
const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Source = styled.div`
  margin-left: 10px;
  color: ${(props) => props.theme.colors.gray};
`;

export default Problem;

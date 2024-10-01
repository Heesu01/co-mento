import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

const problems = [
  {
    num: 1393,
    title: "음하철도 구구팔",
    language: "JAVA",
    memory: "16012KB",
    time: "116ms",
    submitter: "테스터",
    success: true,
  },
];

const yourCode = `
import java.io.*;
import java.util.*;


public class Main {
    private static int endPointX, endPointY;
    private static int startPointX, startPointY;
    private static int moveX, moveY;


    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        StringTokenizer stringTokenizer = new StringTokenizer(br.readLine());
        endPointX = Integer.parseInt(stringTokenizer.nextToken());
        endPointY = Integer.parseInt(stringTokenizer.nextToken());

        stringTokenizer = new StringTokenizer(br.readLine());

        startPointX = Integer.parseInt(stringTokenizer.nextToken());

            return;
        }
        int i=2;
`;

const Mycode = () => {
  return (
    <Container>
      <SolveInfo>
        <SolveInfoTitle>풀이 정보</SolveInfoTitle>
        <StatisticsBox>
          {problems.map((problem, index) => (
            <Statistic key={index}>
              <TitleBox>
                <Title>문제 번호</Title>
                <Title>문제 제목</Title>
                <Title>언어</Title>
                <Title>메모리</Title>
                <Title>시간</Title>
                <Title>제출자</Title>
                <Title>결과</Title>
              </TitleBox>
              <InfoBox>
                <Info>{problem.num}</Info>
                <Info>{problem.title}</Info>
                <Info>{problem.language}</Info>
                <Info>{problem.memory}</Info>
                <Info>{problem.time}</Info>
                <Info>{problem.submitter}</Info>
                <Info>
                  {problem.success ? <FaCheck color="green" /> : <p>X</p>}
                </Info>
              </InfoBox>
            </Statistic>
          ))}
        </StatisticsBox>
      </SolveInfo>
      <MainCode>
        <SourceInfoTitle>소스 코드</SourceInfoTitle>
        <TextContents>
          <p>
            <pre>
              <code>{yourCode}</code>
            </pre>
          </p>
        </TextContents>
      </MainCode>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SolveInfo = styled.div``;

const SolveInfoTitle = styled.h2`
  font-weight: 600;
  font-size: 20px;
  margin-left: 55px;
  color: ${({ theme }) => theme.colors.black};
`;

const TitleBox = styled.div`
  width: 100%;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.colors.red};
  padding-bottom: 5px;
`;

const Title = styled.p`
  width: 130px;
  margin-bottom: 5px;
  text-align: center;
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

const InfoBox = styled.div`
  padding-top: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Info = styled.p`
  width: 130px;
  text-align: center;
`;

const MainCode = styled.div`
  width: 90%;
  margin-left: 60px;
  align-items: center;
  height: auto;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.beige};
  box-shadow: 0px 5px 5px -1px ${(props) => props.theme.colors.gray};
`;

const SourceInfoTitle = styled.h2`
  font-weight: 600;
  font-size: 20px;
  margin-left: 20px;
  padding: 11px;
  color: ${({ theme }) => theme.colors.black};
`;

const TextContents = styled.div`
  border-radius: 15px;
  width: 99%;
  padding: 10px 20px 30px 20px;
  margin: 5px 5px;
  background-color: ${({ theme }) => theme.colors.white};
  min-height: 400px;
`;

export default Mycode;

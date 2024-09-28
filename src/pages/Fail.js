import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

const Fail = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <BoxContainer>
        <ProblemBox>
          <TextTitle>#1004 두 수 비교하기</TextTitle>
          <TextContents>
            <p>
              최백준은 음하철도 구구팔에 탔다. 문제는 구구팔의 기장인 조교
              김재홍이 반쯤 미쳐서 열차를 멈추지 않는다는 것이다. 그래서
              최백준은 달리고 있는 열차에서 뛰어내려야 한다. 그런데 뛰어내릴 때
              정류장 까지 거리가 너무 멀면 마이 아플 수 있다. 그래서 철도가
              정류장에 가장 많이 근접했을 때 뛰어내리고자 한다. 어디서
              뛰어내려야 하는가?
            </p>
          </TextContents>
        </ProblemBox>
        <AllExampleBox>
          <ExampleBox>
            <TextTitle>입력</TextTitle>
            <SmallContents>
              <p>
                첫번째 줄에는 xs와 ys가 주어진다. 이는 정류장의 위치가 (xs,
                ys)임을 의미한다. 두번째 줄에는 xe, ye, dx, dy가 주어진다. 이는
                현재 열차 위치가 (xe, ye)이고, 열차가 1초마다 x가 증가하는
                방향으로 dx만큼, y가 증가하는 방향으로 dy만큼 이동함을 의미한다
                주어지는 모든 수는 -100이상, 100이하의 정수이다.
              </p>
            </SmallContents>
          </ExampleBox>
          <ExampleBox>
            <TextTitle>출력</TextTitle>
            <SmallContents>
              <p>
                최백준이 뛰어내릴 위치의 x좌표와 y좌표를 출력한다. 뛰어내릴
                위치의 좌표가 항상 정수인 입력만 주어진다.
              </p>
            </SmallContents>
          </ExampleBox>
        </AllExampleBox>
        <FailureMessage>
          <p>틀렸습니다! 다시 제출해 주세요.</p>
        </FailureMessage>
      </BoxContainer>

      <BottomBox>
        <Button
          children="문제로 돌아가기"
          bgc={({ theme }) => theme.colors.deepPink}
          hoverColor={({ theme }) => theme.colors.pink}
          onClick={() => navigate("/problem")}
        />
      </BottomBox>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`;

const ProblemBox = styled.div`
  line-height: 1.3em;
`;

const TextTitle = styled.p`
  ${({ theme }) => theme.fonts.logo};
  margin-bottom: 15px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.red};
  padding-bottom: 20px;
`;

const TextContents = styled.div`
  box-shadow: 0px 5px 5px -1px ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  min-height: 150px;
`;
const AllExampleBox = styled.div`
  display: flex;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;
const ExampleBox = styled.div`
  width: 48%;
  line-height: 1.3em;
`;
const SmallContents = styled.div`
  width: 100%;
  box-shadow: 0px 5px 5px -1px ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  padding: 20px;
  min-height: 150px;
  margin-top: 20px;
`;

const FailureMessage = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.red};
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export default Fail;

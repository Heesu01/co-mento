import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import AiIcon from "../assets/ai.svg";

const Review = () => {
  const navigate = useNavigate();
  const [showAIReview, setShowAIReview] = useState(false);

  const handleBackgroundClick = () => {
    setShowAIReview((prev) => !prev);
  };

  return (
    <Container>
      <BoxContainer>
        <ProblemBox>
          <TextTitle>#1004 두 수 비교하기</TextTitle>
          <TextContents>
            <p>
              최백준은 음하철도 구구팔에 탔다. 문제는 구구팔의 기장인 조교
              김재홍이 반쯤 미쳐서 열차를 멈추지 않는다는 것이다.
              그래서 최백준은 달리고 있는 열차에서 뛰어내려야 한다. 그런데
              뛰어내릴 때 정류장 까지 거리가 너무 멀면 마이 아플 수 있다. 그래서
              철도가 정류장에 가장 많이 근접했을 때 뛰어내리고자 한다. 어디서
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
      </BoxContainer>
      <ReviewTitle>
        <p>제출코드</p>
        <p>
          <Icon src={AiIcon} alt="아이콘" />
          AI 리뷰
        </p>
      </ReviewTitle>
      <ReviewBox>
        <SubmitBox>
          <p>
            import java.io.*; import java.util.*; public class endPointX,
            endPointY; private static int startPointX, startPointY; private
            static int moveX, moveY; public static void main(String[] args)
            throws IOException new BufferedReader(new
            InputStreamReader(System.in)) StringTokenizer stringTokenizer = new
            StringTokenizer(br.readLine()); endPointX =
            Integer.parseInt(stringTokenizer.nextToken()); endPointY =
            Integer.parseInt(stringTokenizer.nextToken()); stringTokenizer = new
            StringTokenizer(br.readLine()); startPointX =
            Integer.parseInt(stringTokenizer.nextToken()); startPointY =
            Integer.parseInt(stringTokenizer.nextToken()); moveX =
            Integer.parseInt(stringTokenizer.nextToken()); moveY =
            Integer.parseInt(stringTokenizer.nextToken()); optimization(); //
            증가하는 dx, dy를 가장 작은 수로 나타냄. findJumpingPoint(); // 최소
            거리 지점을 찾아내어 출력
          </p>
        </SubmitBox>

        <AI onClick={handleBackgroundClick}>
          {!showAIReview && (
            <AIReviewText>리뷰를 보려면 이곳을 누르세요.</AIReviewText>
          )}

          {showAIReview && (
            <p>
              이 코드는 최백준이 열차에서 뛰어내릴 가장 적합한 위치를 찾기 위한
              알고리즘을 구현한 것입니다. 그러나 몇 가지 개선할 점이 있습니다.
              아래에 그 이유와 함께 설명하겠습니다. 1. 최적화 함수의 간결성 현재
              optimization 함수는 dx와 dy의 최대공약수를 찾기 위해 반복문을
              사용하고 있습니다. 이는 효율적이지 않고, 코드가 복잡해 보입니다.
              대신, Java의 BigInteger 클래스를 사용하여 최대공약수를 간단하게
              구할 수 있습니다. java 2. 거리 계산의 효율성 거리 계산을 위해 매번
              제곱을 계산하고 있습니다. 이는 불필요한 연산입니다. Math.hypot
              메서드를 사용하여 두 점 간의 거리를 더 직관적으로 계산할 수
              있습니다. 3. 무한 루프 방지 현재 findJumpingPoint 함수는 무한
              루프에 빠질 위험이 있습니다. 열차가 정류장을 지나칠 경우
              이론적으로 계속해서 좌표를 증가시키기 때문에 이를 방지하기 위해
              특정 범위 내에서만 반복하도록 조정할 수 있습니다. 예를 들어,
              열차가 정류장에 도달했거나 지나쳤을 때 루프를 종료하도록 조건을
              추가합니다. 4. 주석 개선 및 코드 가독성 주석이 코드의 흐름을
              설명하는 데 도움이 되지만, 더 간결하고 명확하게 작성하는 것이
              좋습니다. 예를 들어, 변수 이름을 좀 더 직관적으로 만들어 코드를
              읽기 쉽게 할 수 있습니다. 수정된 코드 예시 아래는 위 개선점을
              반영한 코드 예시입니다
            </p>
          )}
        </AI>
      </ReviewBox>
      <BottomBox>
        <Button
          children="문제로"
          bgc={({ theme }) => theme.colors.deepPink}
          hoverColor={({ theme }) => theme.colors.deepPink}
          onClick={() => navigate("/problem")}
        />
        <Button
          children="다시풀기"
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
const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`;
const ProblemBox = styled.div``;
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
`;
const SmallContents = styled.div`
  width: 100%;
  box-shadow: 0px 5px 5px -1px ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  padding: 20px;
  min-height: 150px;
  margin-top: 20px;
`;
const ReviewTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    width: 50%;
    ${({ theme }) => theme.fonts.logo};
    margin-left: 10px;
    display: flex;
  }
  margin-top: 20px;
`;
const Icon = styled.img`
  width: 30px;
  height: 100%;
  margin-right: 5px;
`;
const AIReviewText = styled.p`
  width: 100%;
  margin: 0;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.gray};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  cursor: pointer;
`;
const ReviewBox = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.beige2};
  box-shadow: 0px 5px 5px -1px ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  padding: 6px;
  min-height: 700px;
  display: flex;
  position: relative;
`;
const SubmitBox = styled.div`
  width: 48.5%;
  min-height: 696px;
  border-radius: 10px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.white};
  word-break: break-word;
`;
const AI = styled.div`
  width: 47%;
  padding: 20px 10px;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
`;
const BottomBox = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
`;

export default Review;

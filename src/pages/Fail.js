import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { Axios } from "../api/Api";

const Fail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { solutionId } = location.state || {};
  const { problemId } = useParams();
  const [problemData, setProblemData] = useState(null);
  const [aiFeedback, setAiFeedback] = useState("");
  const [loadingReview, setLoadingReview] = useState(false);

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const response = await Axios.get(`/problems/${problemId}`);
        setProblemData(response.data.data);
      } catch (error) {
        console.error("문제 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchProblemData();
  }, [problemId]);

  const handleAiReview = async () => {
    if (!solutionId) {
      setAiFeedback("유효한 solution ID를 찾을 수 없습니다.");
      return;
    }

    try {
      setLoadingReview(true);
      const response = await Axios.get(`/solutions/${solutionId}/ai-review`);
      setAiFeedback(
        response.data.data.aiFeedback || "AI 리뷰를 가져올 수 없습니다."
      );
    } catch (error) {
      console.error("AI 리뷰 요청 중 오류 발생:", error);
      setAiFeedback("AI 리뷰 요청 중 오류가 발생했습니다.");
    } finally {
      setLoadingReview(false);
    }
  };

  if (!problemData) {
    return <LoadingText>문제를 불러오는 중...</LoadingText>;
  }

  return (
    <Container>
      <FailureMessage>
        <p>틀렸습니다! 다시 제출해 주세요.</p>
      </FailureMessage>

      <BoxContainer>
        <ProblemBox>
          <TextTitle>{`# ${
            problemData.title || "문제 제목을 불러올 수 없습니다."
          }`}</TextTitle>
          <TextContents>
            <p>{problemData.content || "문제 설명이 없습니다."}</p>
          </TextContents>
        </ProblemBox>
        <AllExampleBox>
          <ExampleBox>
            <TextTitle>입력</TextTitle>
            <SmallContents>
              <p>{problemData.inputExplain || "입력 설명이 없습니다."}</p>
            </SmallContents>
          </ExampleBox>
          <ExampleBox>
            <TextTitle>출력</TextTitle>
            <SmallContents>
              <p>{problemData.outputExplain || "출력 설명이 없습니다."}</p>
            </SmallContents>
          </ExampleBox>
        </AllExampleBox>
      </BoxContainer>

      <ReviewBox>
        <AiReviewSection>
          <AiReviewButton onClick={handleAiReview} disabled={loadingReview}>
            {loadingReview ? "AI 리뷰 요청 중..." : "AI 리뷰 요청"}
          </AiReviewButton>
          <AiReviewFeedback>
            {aiFeedback || "AI 리뷰를 요청하세요."}
          </AiReviewFeedback>
        </AiReviewSection>
      </ReviewBox>

      <BottomBox>
        <Button
          children="문제로 돌아가기"
          bgc={({ theme }) => theme.colors.pink}
          hoverColor={({ theme }) => theme.colors.pink}
          onClick={() => navigate("/problem")}
        />
        <Button
          children="다시풀기"
          bgc={({ theme }) => theme.colors.deepPink}
          hoverColor={({ theme }) => theme.colors.pink}
          onClick={() => navigate(`/submit/${problemId}`)}
        />
      </BottomBox>
    </Container>
  );
};

const LoadingText = styled.div`
  text-align: center;
  font-size: 18px;
`;

const Container = styled.div`
  width: 80%;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const FailureMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  padding: 15px 20px;
  border-radius: 15px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
`;
const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const ReviewBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const AiReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AiReviewButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkBlue};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
  }
`;

const AiReviewFeedback = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export default Fail;

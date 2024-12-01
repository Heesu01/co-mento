import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coy,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import Button from "../components/Button";
import AiIcon from "../assets/ai.svg";
import { Axios } from "../api/Api";

const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { problemId } = useParams();
  const [problemData, setProblemData] = useState(null);
  const [showAIReview, setShowAIReview] = useState(false);

  const submissionData = location.state || {};
  const { code, aiFeedback } = submissionData;

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

  const handleBackgroundClick = () => {
    setShowAIReview((prev) => !prev);
  };

  if (!problemData) {
    return <LoadingText>문제를 불러오는 중...</LoadingText>;
  }

  return (
    <Container>
      <Message>맞았습니다. AI리뷰를 확인하세요.</Message>
      <BoxContainer>
        <ProblemBox>
          <TextTitle>{`# ${
            problemData.title || "문제 제목을 불러올 수 없습니다."
          }`}</TextTitle>
          <TextContents>
            <p>{problemData.content || "문제 설명이 없습니다."}</p>
          </TextContents>
        </ProblemBox>
        <ProblemBox>
          <TextTitle>입력</TextTitle>
          <TextContents>
            <p>{problemData.inputExplain || "입력 설명이 없습니다."}</p>
          </TextContents>
        </ProblemBox>
        <ProblemBox>
          <TextTitle>출력</TextTitle>
          <TextContents>
            <p>{problemData.outputExplain || "출력 설명이 없습니다."}</p>
          </TextContents>
        </ProblemBox>
      </BoxContainer>
      <AllExampleBox>
        <ExampleBox>
          <TextTitle>입력 예시</TextTitle>
          <SmallContents>
            <p>{problemData.inputExample || "입력 예시가 없습니다."}</p>
          </SmallContents>
        </ExampleBox>
        <ExampleBox>
          <TextTitle>출력 예시</TextTitle>
          <SmallContents>
            <p>{problemData.outputExample || "출력 예시가 없습니다."}</p>
          </SmallContents>
        </ExampleBox>
      </AllExampleBox>
      <ReviewTitle>
        <p>제출코드</p>
        <p>
          <Icon src={AiIcon} alt="아이콘" />
          AI 리뷰
        </p>
      </ReviewTitle>
      <ReviewBox>
        <SubmitBox>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={coy}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ fontSize: "14px", lineHeight: "1.3" }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {`\`\`\`javascript\n${code || "제출된 코드가 없습니다."}\n\`\`\``}
          </ReactMarkdown>
        </SubmitBox>

        <AI onClick={handleBackgroundClick}>
          {!showAIReview && (
            <AIReviewText>리뷰를 보려면 이곳을 누르세요.</AIReviewText>
          )}

          {showAIReview && (
            <Feedback>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {aiFeedback || "AI 리뷰를 불러올 수 없습니다."}
              </ReactMarkdown>
            </Feedback>
          )}
        </AI>
      </ReviewBox>
      <BottomBox>
        <Button
          children="문제목록으로"
          bgc={({ theme }) => theme.colors.beige2}
          hoverColor={({ theme }) => theme.colors.beige2}
          onClick={() => navigate(`/problemlist`)}
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
const Message = styled.div`
  background-color: ${({ theme }) => theme.colors.beige2};
  color: black;
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
  white-space: pre-wrap;
  word-wrap: break-word;
`;
const AllExampleBox = styled.div`
  display: flex;
  width: 100%;
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
  white-space: pre-wrap;
  word-wrap: break-word;
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
const ReviewBox = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.beige2};
  box-shadow: 0px 5px 5px -1px ${(props) => props.theme.colors.gray};
  border-radius: 15px;
  padding: 6px;
  min-height: 700px;
  display: flex;
  position: relative;
  line-height: 1.3em;
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
const Feedback = styled.div`
  padding: 10px;
  line-height: 1.5;
  font-size: 14px;
`;
const BottomBox = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-top: 10px;
`;

export default Review;

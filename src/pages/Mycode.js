import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy, twilight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { fetchSolutionDetail } from "../api/UserApi";

const Mycode = () => {
  const { solutionId } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const data = await fetchSolutionDetail(solutionId);
        setProblem(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [solutionId]);

  if (loading) return <p>Loading...</p>;
  if (!problem) return <p>Problem not found.</p>;

  return (
    <Container>
      <SolveInfo>
        <SolveInfoTitle>풀이 정보</SolveInfoTitle>
        <StatisticsBox>
          <Statistic>
            <TitleBox>
              <Title>문제 번호</Title>
              <Title>문제 제목</Title>
              <Title>언어</Title>
              <Title>제출자</Title>
              <Title>결과</Title>
            </TitleBox>
            <InfoBox>
              <Info>{problem.problemId}</Info>
              <Info>{problem.problemTitle}</Info>
              <Info>{problem.language}</Info>
              <Info>{problem.userName}</Info>
              <Info>
                {problem.correct ? <FaCheck color="green" /> : <p>X</p>}
              </Info>
            </InfoBox>
          </Statistic>
        </StatisticsBox>
      </SolveInfo>
      <ContentWrapper>
        <MainCode>
          <SourceInfoTitle>소스 코드</SourceInfoTitle>
          <TextContents>
            <SyntaxHighlighter
              style={coy}
              language={problem.language || "plaintext"}
              PreTag="div"
            >
              {problem.code || "// 코드가 없습니다."}
            </SyntaxHighlighter>
          </TextContents>
        </MainCode>
        <Feedback>
          <FeedbackTitle>AI 피드백</FeedbackTitle>
          <MarkdownWrapper>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={twilight}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ fontSize: "14px" }}
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
              {problem.aiFeedback || "AI 리뷰를 불러올 수 없습니다."}
            </ReactMarkdown>
          </MarkdownWrapper>
        </Feedback>
      </ContentWrapper>
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
  text-align: center;
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

const ContentWrapper = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
`;

const MainCode = styled.div`
  width: 48%;
  align-items: center;
  height: 100%;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.beige};
  box-shadow: 0px 5px 5px -1px ${(props) => props.theme.colors.gray};
  padding: 20px 10px 10px 10px;
`;

const SourceInfoTitle = styled.h2`
  font-weight: 600;
  font-size: 20px;
  margin-left: 15px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.black};
`;

const TextContents = styled.div`
  border-radius: 15px;
  width: 99%;
  padding: 10px 20px 30px 20px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.white};
  min-height: 400px;
`;

const Feedback = styled.div`
  width: 48%;
  align-items: center;
  height: auto;
  border-radius: 15px;
  box-shadow: 0px 5px 5px -1px ${(props) => props.theme.colors.gray};
  padding: 20px 10px 10px 10px;
  background-color: ${(props) => props.theme.colors.beige};
`;

const FeedbackTitle = styled.h2`
  font-weight: 600;
  font-size: 20px;
  margin-left: 15px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.black};
`;

const MarkdownWrapper = styled.div`
  width: 100%;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  line-height: 1.3em;
`;

export default Mycode;

import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../api/Api";

const Problem = () => {
  const navigate = useNavigate();
  const { problemId } = useParams();
  const [problemData, setProblemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likedProblemIds, setLikedProblemIds] = useState([]);

  const toggleHeart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (isLiked) {
        await Axios.delete(`/problems/${problemId}/like`, config);
        setIsLiked(false);
        setLikedProblemIds(likedProblemIds.filter((id) => id !== problemId));
        console.log("좋아요 삭제되었습니다.");
      } else {
        await Axios.post(`/problems/${problemId}/like`, {}, config);
        setIsLiked(true);
        setLikedProblemIds([...likedProblemIds, problemId]);
        console.log("좋아요 추가되었습니다.");
      }
    } catch (error) {
      console.error("좋아요 상태 변경 중 오류 발생:", error);
      alert("좋아요 상태 변경에 실패했습니다.");
    }
  };

  const fetchProblem = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await Axios.get(`/problems/${problemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const problemData = response.data.data;
      setProblemData(problemData);
      setIsLiked(problemData.hasLiked);
    } catch (error) {
      console.error("문제 조회 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  }, [problemId]);

  useEffect(() => {
    fetchProblem();
  }, [fetchProblem]);

  if (isLoading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  if (!problemData) {
    return <ErrorText>문제를 불러오는 데 실패했습니다.</ErrorText>;
  }

  return (
    <Container>
      <TopBox>
        <Num>#{problemData.id}</Num>
        <Name>
          <span>{problemData.title}</span>
        </Name>
        <Like onClick={toggleHeart}>
          {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
        </Like>
      </TopBox>
      <StatisticsBox>
        <Statistic>
          <TitleBox>
            <Title>시간 제한</Title>
            <Title>메모리 제한</Title>
            <Title>제출</Title>
            <Title>맞힌 사람</Title>
            <Title>정답률</Title>
          </TitleBox>
          <InfoBox>
            <Info>{problemData.timeLimit}초</Info>
            <Info>{problemData.memoryLimit}KB</Info>
            <Info>{problemData.numberOfProblemSolution}</Info>
            <Info>{problemData.numberOfCorrectUser}</Info>
            <Info>
              {problemData.numberOfProblemSolution > 0
                ? (
                    (problemData.numberOfCorrectUser /
                      problemData.numberOfProblemSolution) *
                    100
                  ).toFixed(2) + "%"
                : "0%"}
            </Info>
          </InfoBox>
        </Statistic>
      </StatisticsBox>
      <BoxContainer>
        <ProblemBox>
          <TextTitle>문제</TextTitle>
          <TextContents>
            <p>{problemData.content}</p>
          </TextContents>
        </ProblemBox>
        <ProblemBox>
          <TextTitle>입력</TextTitle>
          <TextContents>
            <p>{problemData.inputExplain}</p>
          </TextContents>
        </ProblemBox>
        <ProblemBox>
          <TextTitle>출력</TextTitle>
          <TextContents>
            <p>{problemData.outputExplain}</p>
          </TextContents>
        </ProblemBox>
      </BoxContainer>
      <AllExampleBox>
        <ExampleBox>
          <TextTitle>입력 예시</TextTitle>
          <SmallContents>
            <p>{problemData.inputExample}</p>
          </SmallContents>
        </ExampleBox>
        <ExampleBox>
          <TextTitle>출력 예시</TextTitle>
          <SmallContents>
            <p>{problemData.outputExample}</p>
          </SmallContents>
        </ExampleBox>
      </AllExampleBox>
      <BottomBox>
        <Source isHidden={!problemData.source}>
          출처: {problemData.source || ""}
        </Source>
        <Button
          children="문제풀기"
          bgc={({ theme }) => theme.colors.deepPink}
          hoverColor={({ theme }) => theme.colors.pink}
          onClick={() => navigate(`/submit/${problemData.id}`)}
        />
      </BottomBox>
    </Container>
  );
};

const LoadingText = styled.div`
  text-align: center;
  font-size: 18px;
`;

const ErrorText = styled.div`
  text-align: center;
  font-size: 18px;
  color: red;
`;

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
  font-size: 25px;
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
  color: ${(props) =>
    props.isHidden ? props.theme.colors.white : props.theme.colors.gray};
`;

export default Problem;

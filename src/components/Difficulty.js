import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Axios } from "../api/Api";

const Difficulty = () => {
  const navigate = useNavigate();
  const [difficulties, setDifficulties] = useState([]);
  const observerRefs = useRef({});
  const isFetching = useRef({});

  const fetchDifficulties = useCallback(async (level, page = 0) => {
    if (isFetching.current[level]) return;
    isFetching.current[level] = true;

    try {
      const response = await Axios.get(`/problems`, {
        params: { level, page },
      });
      const { previewList, paginationResponse } = response.data.data;

      setDifficulties((prev) => {
        const updatedDifficulties = [...prev];
        const difficultyIndex = updatedDifficulties.findIndex(
          (difficulty) => difficulty.level === level
        );

        if (difficultyIndex === -1) {
          updatedDifficulties.push({
            level,
            problems: previewList,
            currentPage: paginationResponse.currentPage,
            totalPage: paginationResponse.totalPage,
          });
        } else {
          const existingProblemIds = new Set(
            updatedDifficulties[difficultyIndex].problems.map(
              (problem) => problem.problemId
            )
          );

          const newProblems = previewList.filter(
            (problem) => !existingProblemIds.has(problem.problemId)
          );

          updatedDifficulties[difficultyIndex].problems = [
            ...updatedDifficulties[difficultyIndex].problems,
            ...newProblems,
          ];
          updatedDifficulties[difficultyIndex].currentPage =
            paginationResponse.currentPage;
        }

        return updatedDifficulties;
      });
    } catch (error) {
      console.error(`난이도 ${level}의 문제를 가져오는 중 오류 발생:`, error);
    } finally {
      isFetching.current[level] = false;
    }
  }, []);

  const initializeDifficulties = useCallback(() => {
    try {
      const levels = [1, 2, 3];
      levels.forEach((level) => fetchDifficulties(level));
    } catch (error) {
      console.error("난이도별 초기 데이터를 가져오는 중 오류 발생:", error);
    }
  }, [fetchDifficulties]);

  const handleObserver = useCallback(
    (entries, level) => {
      const target = entries[0];
      if (target.isIntersecting) {
        const difficulty = difficulties.find((d) => d.level === level);
        if (difficulty && difficulty.currentPage + 1 < difficulty.totalPage) {
          fetchDifficulties(level, difficulty.currentPage + 1);
        }
      }
    },
    [difficulties, fetchDifficulties]
  );

  useEffect(() => {
    const currentObservers = {};

    difficulties.forEach((difficulty) => {
      if (!observerRefs.current[difficulty.level]) {
        observerRefs.current[difficulty.level] = new IntersectionObserver(
          (entries) =>
            handleObserver(
              entries,
              observerRefs.current[difficulty.level],
              difficulty.level
            )
        );
      }
      currentObservers[difficulty.level] =
        observerRefs.current[difficulty.level];
    });

    return () => {
      Object.values(currentObservers).forEach((observer) =>
        observer.disconnect()
      );
    };
  }, [difficulties, handleObserver]);

  useEffect(() => {
    initializeDifficulties();
  }, [initializeDifficulties]);

  return (
    <Container>
      <Top>
        <p>난이도별 보기</p>
        <p onClick={() => navigate(`/problemlist`)}>문제 더보기</p>
      </Top>
      <ItemBox>
        {difficulties.map((difficulty) => (
          <Item key={difficulty.level}>
            <Title>
              <p>
                {difficulty.level === 1
                  ? "기초"
                  : difficulty.level === 2
                  ? "초급"
                  : "중급"}
              </p>
            </Title>
            <List>
              {difficulty.problems.map((problem) => (
                <Problem
                  key={problem.problemId}
                  onClick={() => navigate(`/problem/${problem.problemId}`)}
                >
                  {`#${problem.problemId} ${problem.title}`}
                </Problem>
              ))}
              <div
                ref={(el) => {
                  if (observerRefs.current[difficulty.level] && el) {
                    observerRefs.current[difficulty.level].observe(el);
                  }
                }}
              />
            </List>
          </Item>
        ))}
      </ItemBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: ${(props) => props.theme.colors.beige2};
  border-radius: 5px;
  padding: 40px 40px;
  padding-bottom: 0;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 18px;
  p {
    cursor: pointer;
  }
`;

const ItemBox = styled.div`
  padding: 40px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Item = styled.div`
  background-color: ${(props) => props.theme.colors.black2};
  width: 31%;
  height: auto;
  border-radius: 10px;
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
`;

const Title = styled.div`
  color: ${(props) => props.theme.colors.white};
  height: 40px;
  display: flex;
  font-size: 20px;
  font-weight: 600;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.white};
`;

const List = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white};
  line-height: 2em;
  overflow-y: auto;
  max-height: 300px;
`;

const Problem = styled.div`
  cursor: pointer;
  &:hover {
    color: #ffd700;
  }
`;

export default Difficulty;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Axios } from "../api/Api";

const Difficulty = () => {
  const navigate = useNavigate();
  const [difficulties, setDifficulties] = useState([]);

  const fetchDifficulties = async () => {
    try {
      const levels = [1, 2, 3];
      const promises = levels.map((level) =>
        Axios.get(`/problems`, { params: { level } })
      );

      const responses = await Promise.all(promises);

      const fetchedDifficulties = responses.map((response, index) => ({
        level: index + 1,
        problems: response.data.data.previewList,
      }));

      setDifficulties(fetchedDifficulties);
    } catch (error) {
      console.error("난이도별 문제를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchDifficulties();
  }, []);

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
              {/* <p
                onClick={() =>
                  navigate(`/problemlist?level=${difficulty.level}`)
                }
              >
                더보기
              </p> */}
            </Title>
            <List>
              {difficulty.problems.slice(0, 5).map((problem) => (
                <Problem
                  key={problem.problemId}
                  onClick={() => navigate(`/problem/${problem.problemId}`)}
                >
                  {problem.title}
                </Problem>
              ))}
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
  align-items: center;
  justify-content: space-between;
`;

const Item = styled.div`
  background-color: ${(props) => props.theme.colors.black2};
  width: 31%;
  height: 400px;
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
  /* p {
    cursor: pointer;
  } */
  border-bottom: 1px solid ${(props) => props.theme.colors.white};
`;

const List = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white};
  line-height: 2em;
`;

const Problem = styled.div`
  cursor: pointer;
  &:hover {
    color: #ffd700;
  }
`;

export default Difficulty;

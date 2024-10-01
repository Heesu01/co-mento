import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Book = () => {
  const navigate = useNavigate();

  const problems = [
    "0000 두수비교하기",
    "0001 A+B",
    "0002 큰수비교",
    "0003 구간합",
    "0004 소수판별",
  ];

  const books = [
    { title: "정렬 탐색 완전정복", tags: "#수학 #정렬 #탐색 #트리" },
    { title: "그래프 마스터", tags: "#그래프 #DFS #BFS #최단경로" },
    { title: "동적 계획법", tags: "#DP #최적화 #재귀" },
  ];

  return (
    <Container>
      <Top>
        <p>문제집</p>
      </Top>
      <ItemBox>
        {books.map((book, index) => (
          <Item key={index}>
            <List>
              {problems.map((problem, i) => (
                <Problem key={i} onClick={() => navigate("/problem")}>
                  {problem}
                </Problem>
              ))}
            </List>
            <Cover>
              <Title>{book.title}</Title>
              <Tag>{book.tags}</Tag>
            </Cover>
          </Item>
        ))}
      </ItemBox>
      <ItemBox>
        {books.map((book, index) => (
          <Item key={index}>
            <List>
              {problems.map((problem, i) => (
                <Problem key={i} onClick={() => navigate("/problem")}>
                  {problem}
                </Problem>
              ))}
            </List>
            <Cover>
              <Title>{book.title}</Title>
              <Tag>{book.tags}</Tag>
            </Cover>
          </Item>
        ))}
      </ItemBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: ${(props) => props.theme.colors.deepPink};
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
  width: 30%;
  height: 100%;
  height: 400px;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white};
  line-height: 2em;
  padding: 20px;
`;
const Problem = styled.div`
  cursor: pointer;
  &:hover {
    color: #ffd700;
  }
`;
const Cover = styled.div`
  width: 100%;
  height: 50%;
  border-radius: 0 0 10px 10px;
  background-color: ${(props) => props.theme.colors.beige};
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
`;
const Tag = styled.p`
  font-weight: 500;
  font-size: 15px;
`;

export default Book;

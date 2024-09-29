import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Difficulty = () => {
  const navigate = useNavigate();

  const difficulties = [
    {
      level: "기초",
      problems: [
        "0000 두수비교하기",
        "0001 A+B",
        "0002 큰수비교",
        "0003 구간합",
        "0004 소수판별",
        "0004 소수판별",
        "0004 소수판별",
      ],
    },
    {
      level: "초급",
      problems: [
        "0000 두수비교하기",
        "0001 A+B",
        "0002 큰수비교",
        "0003 구간합",
        "0004 소수판별",
        "0004 소수판별",
        "0004 소수판별",
      ],
    },
    {
      level: "중급",
      problems: [
        "0000 두수비교하기",
        "0001 A+B",
        "0002 큰수비교",
        "0003 구간합",
        "0004 소수판별",
        "0004 소수판별",
        "0004 소수판별",
      ],
    },
  ];

  return (
    <Container>
      <Top>
        <p>난이도별 보기</p>
        <p>더보기</p>
      </Top>
      <ItemBox>
        {difficulties.map((difficulty, index) => (
          <Item key={index}>
            <Title>
              <p>{difficulty.level}</p>
              <p>더보기</p>
            </Title>
            <List>
              {difficulty.problems.map((problem, i) => (
                <Problem key={i} onClick={() => navigate("/problem")}>
                  {problem}
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
`;
const Title = styled.div`
  color: ${(props) => props.theme.colors.white};
  height: 60px;
  display: flex;
  justify-content: space-between;
  p {
    cursor: pointer;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white};
  line-height: 2em;
`;
const Problem = styled.div`
  cursor: pointer;
`;

export default Difficulty;

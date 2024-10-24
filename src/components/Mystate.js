import React from "react";
import styled, { keyframes } from "styled-components";

const Mystate = () => {
  return (
    <Container>
      <Top>
        <p>진행도</p>
        <p>더보기</p>
      </Top>
      <ItemBox>
        <Item>
          <Title>레벨</Title>
          <CircleBox>
            <CircularProgressComponent percentage={30} />
          </CircleBox>
        </Item>
        <Item>
          <Title>진행률</Title>
          <CircleBox>
            <CircularProgressComponent percentage={60} />
          </CircleBox>
        </Item>
        <Item>
          <Title>진행률</Title>
          <CircleBox>
            <CircularProgressComponent percentage={80} />
          </CircleBox>
        </Item>
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
  height: 200px;
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
`;
const CircleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
`;

const CircularProgressComponent = ({ percentage }) => (
  <CircularProgress>
    <BackgroundCircle cx="50" cy="50" r="45" />
    <Circle cx="50" cy="50" r="45" percentage={percentage} />
    <Percentage x="50" y="50">
      {percentage}%
    </Percentage>
  </CircularProgress>
);

const CircularProgress = styled.svg`
  height: 100px;
  width: 100px;
  transform: rotate(-90deg);
  position: relative;
`;
const BackgroundCircle = styled.circle`
  fill: none;
  stroke: ${(props) => props.theme.colors.gray3};
  stroke-width: 10;
`;
const Circle = styled.circle`
  fill: none;
  stroke: ${(props) => props.theme.colors.red};
  stroke-width: 10;
  stroke-dasharray: 283;
  animation: ${(props) => keyframes`
    from {
      stroke-dashoffset: 283;
    }
    to {
      stroke-dashoffset: ${283 - (props.percentage / 100) * 283};
    }
  `}
    2s ease-out forwards;
`;
const Percentage = styled.text`
  font-size: 20px;
  fill: ${(props) => props.theme.colors.white};
  font-weight: bold;
  text-anchor: middle;
  dominant-baseline: central;
  transform-origin: center;
  transform: rotate(90deg);
`;

export default Mystate;

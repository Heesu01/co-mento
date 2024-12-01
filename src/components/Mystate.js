import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { fetchUserProfile, fetchCollectionProgress } from "../api/UserApi";

const Mystate = () => {
  const [experience, setExperience] = useState(0);
  const [collectionProgresses, setCollectionProgresses] = useState([]);
  const [ranking, setRanking] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userProfileId = localStorage.getItem("userProfileId");
        if (!userProfileId) {
          console.error("userProfileId가 로컬스토리지에 없습니다.");
          return;
        }

        const userProfile = await fetchUserProfile(userProfileId);
        setExperience(userProfile.data.experience);
        setRanking(userProfile.data.ranking);
      } catch (error) {
        console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    const fetchProgress = async () => {
      try {
        const progresses = await fetchCollectionProgress();
        setCollectionProgresses(progresses);
      } catch (error) {
        console.error("문제집 진행도를 가져오는 중 오류 발생:", error);
      }
    };

    fetchUserData();
    fetchProgress();
  }, []);

  return (
    <Container>
      <Top>
        <p>진행도</p>
      </Top>
      <ItemBox>
        <Item>
          <Title>경험치</Title>
          <ExperienceBox>
            <ExperienceValue>{experience}</ExperienceValue>
            {experience > 0 ? (
              <Label>Co-Mento 랭킹 {ranking || "N/A"}위</Label>
            ) : (
              <Label>문제를 풀어 경험치를 올리세요!</Label>
            )}
          </ExperienceBox>
        </Item>
        {collectionProgresses.length > 0 ? (
          collectionProgresses.map((collection) => (
            <Item key={collection.id}>
              <Title>{collection.name}</Title>
              <CircleBox>
                <CircularProgressComponent percentage={collection.progress} />
              </CircleBox>
            </Item>
          ))
        ) : (
          <NoProgressMessage>
            더 많은 진행 정보를 확인하려면 문제집 풀이에 도전하세요!
          </NoProgressMessage>
        )}
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
  min-height: 300px;
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
  width: 100%;
  padding: 40px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-content: flex-start;
`;

const Item = styled.div`
  background-color: ${(props) => props.theme.colors.black2};
  flex: 1 1 calc(25% - 20px);
  min-width: 250px;
  max-width: 300px;
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
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
`;
const ExperienceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%;
  gap: 10px;
`;
const ExperienceValue = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.red};
`;

const Label = styled.div`
  margin-top: 10px;
  font-size: 16px;
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

const NoProgressMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  color: ${(props) => props.theme.colors.red};
  font-weight: 600;
  margin-left: 5vw;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.beige};
  border: 2px solid ${(props) => props.theme.colors.red};
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: ${keyframes`
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `} 0.7s ease-out;
`;

export default Mystate;

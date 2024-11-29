import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchUserProfile } from "../api/UserApi";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Axios } from "../api/Api";

const Mypage = () => {
  const { userProfileId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("myActivity");
  const [likedProblemTitles, setLikedProblemTitles] = useState([]);
  const [solvedProblemTitles, setSolvedProblemTitles] = useState([]);
  const [failedProblemTitles, setFailedProblemTitles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userProfileId) {
          alert("사용자 정보가 없습니다.");
          return;
        }
        const response = await fetchUserProfile(userProfileId);
        setUserData(response.data);

        const likedProblemIds = response.data.likedProblemIds;
        const solvedProblemIds = response.data.solvedProblemIds;
        const failedProblemIds = response.data.failedProblemIds;

        const problemTitles = await Promise.all(
          likedProblemIds.map(async (id) => {
            const response = await Axios.get(`/problems/${id}`);
            return { id, title: response.data.data.title };
          })
        );
        setLikedProblemTitles(problemTitles);

        const solvedProblems = await Promise.all(
          solvedProblemIds.map(async (id) => {
            const response = await Axios.get(`/problems/${id}`);
            return { id, title: response.data.data.title };
          })
        );
        setSolvedProblemTitles(solvedProblems);

        const failedProblems = await Promise.all(
          failedProblemIds.map(async (id) => {
            const response = await Axios.get(`/problems/${id}`);
            return { id, title: response.data.data.title };
          })
        );
        setFailedProblemTitles(failedProblems);
      } catch (error) {
        console.error("유저 데이터를 불러오지 못했습니다:", error);
      }
    };

    fetchData();
  }, [userProfileId]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmittedListClick = () => {
    navigate(`/mycodelist/${userProfileId}`);
  };

  return (
    <Container>
      <UserInfo>
        <Level>경험치: {userData ? userData.experience : "0"}</Level>
        <UserName>{userData ? userData.name : "유저이름"}</UserName>
      </UserInfo>

      <MainContents>
        <MyAccount>
          <ButtonContainer>
            <Button
              active={activeTab === "myActivity"}
              onClick={() => handleTabClick("myActivity")}
            >
              나의활동
            </Button>
            <Button onClick={handleSubmittedListClick}>제출한 목록보기</Button>
          </ButtonContainer>
        </MyAccount>

        <ContentArea>
          {activeTab === "myActivity" && (
            <MyWorks>
              <ProblemBox>
                <TextTitle>즐겨찾는 문제</TextTitle>
                <TextContents>
                  {userData?.likedProblemIds?.length ? (
                    likedProblemTitles.map(({ id, title }, index) => (
                      <Text key={index}>
                        <Link to={`/problem/${id}`}>
                          #{id} {title}
                        </Link>
                      </Text>
                    ))
                  ) : (
                    <Text>즐겨찾는 문제가 없습니다.</Text>
                  )}
                </TextContents>
              </ProblemBox>

              <ProblemBox>
                <TextTitle>맞은 문제</TextTitle>
                <TextContents>
                  {solvedProblemTitles.length ? (
                    solvedProblemTitles.map((problem, index) => (
                      <Text key={index}>
                        <Link to={`/problem/${problem.id}`}>
                          #{problem.id} {problem.title}
                        </Link>
                      </Text>
                    ))
                  ) : (
                    <Text>맞은 문제가 없습니다.</Text>
                  )}
                </TextContents>
              </ProblemBox>

              <ProblemBox>
                <TextTitle>틀린 문제</TextTitle>
                <TextContents>
                  {failedProblemTitles.length ? (
                    failedProblemTitles.map((problem, index) => (
                      <Text key={index}>
                        <Link to={`/problem/${problem.id}`}>
                          #{problem.id} {problem.title}
                        </Link>
                      </Text>
                    ))
                  ) : (
                    <Text>틀린 문제가 없습니다.</Text>
                  )}
                </TextContents>
              </ProblemBox>
            </MyWorks>
          )}
        </ContentArea>
      </MainContents>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainContents = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  line-height: 1.5em;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  gap: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  width: 12vw;
  background-color: ${({ active }) => (active ? "#FF4444" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: 1px solid ${({ active }) => (active ? "#FF4444" : "#ccc")};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #ff4444;
    color: #fff;
  }
`;

const MyAccount = styled.div`
  width: 25%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 0;
`;

const ContentArea = styled.div`
  width: 75%;
  padding: 20px;
`;

const MyWorks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 20px;
`;

const Level = styled.div`
  padding: 12px 20px;
  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  font-weight: bold;
  font-size: 20px;
  margin-right: 20px;
`;

const UserName = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const ProblemBox = styled.div`
  margin-bottom: 20px;
  width: 97%;
`;

const TextTitle = styled.p`
  margin-bottom: 10px;
  font-size: 22px;
  padding-left: 5px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.red};
  padding-bottom: 10px;
`;

const TextContents = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 15px;
  min-height: 150px;
`;

const Text = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

export default Mypage;

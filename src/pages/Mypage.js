import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchUserProfile } from "../api/UserApi";
import { useParams } from "react-router-dom";

const Mypage = () => {
  const { userProfileId } = useParams();
  const [activeTab, setActiveTab] = useState("myActivity");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userProfileId) {
          alert("사용자 정보가 없습니다.");
          return;
        }
        const response = await fetchUserProfile(userProfileId);
        setUserData(response.data);
      } catch (error) {
        console.error("유저 데이터를 불러오지 못했습니다:", error);
      }
    };

    fetchData();
  }, [userProfileId]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <UserInfo>
        <Level>경험치: {userData ? userData.experience : "-----"}</Level>
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

            <Button
              active={activeTab === "accountManagement"}
              onClick={() => handleTabClick("accountManagement")}
            >
              계정관리
            </Button>
          </ButtonContainer>
        </MyAccount>

        {activeTab === "myActivity" && (
          <MyWorks>
            <ProblemBox>
              <TextTitle>즐겨찾는 문제</TextTitle>
              <TextContents>
                {userData?.likedProblemIds?.length ? (
                  userData.likedProblemIds.map((id, index) => (
                    <Text key={index}>문제 ID: {id}</Text>
                  ))
                ) : (
                  <Text>즐겨찾는 문제가 없습니다.</Text>
                )}
              </TextContents>
            </ProblemBox>

            <ProblemBox>
              <TextTitle>맞은 문제</TextTitle>
              <TextContents>
                {userData?.solvedProblemIds?.length ? (
                  userData.solvedProblemIds.map((id, index) => (
                    <Text key={index}>문제 ID: {id}</Text>
                  ))
                ) : (
                  <Text>맞은 문제가 없습니다.</Text>
                )}
              </TextContents>
            </ProblemBox>

            <ProblemBox>
              <TextTitle>틀린 문제</TextTitle>
              <TextContents>
                {userData?.failedProblemIds?.length ? (
                  userData.failedProblemIds.map((id, index) => (
                    <Text key={index}>문제 ID: {id}</Text>
                  ))
                ) : (
                  <Text>틀린 문제가 없습니다.</Text>
                )}
              </TextContents>
            </ProblemBox>
          </MyWorks>
        )}

        {activeTab === "accountManagement" && (
          <MyWorks>
            <ProblemBox>
              <TextTitle>계정 정보</TextTitle>
              <TextContents>
                <Text>유저이름: {userData?.name || "유저이름"}</Text>
                <Text>이메일: example@example.com</Text>
                {/* 이메일 정보는 받아오는 데이터에 추가 필요 */}
              </TextContents>
            </ProblemBox>
          </MyWorks>
        )}
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
  line-height: 1.3em;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  width: 120px;
  background-color: ${({ theme }) => theme.colors.white};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border: none;
  outline: none;
`;

const MyAccount = styled.div`
  width: 20%;
  height: 50px;
  text-align: center;
  flex-direction: column;
`;

const MyWorks = styled.div`
  width: 80%;
  height: auto;
  padding-left: 40px;
  border-left: 1px solid ${({ theme }) => theme.colors.gray};
  padding-top: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.red};
`;

const Level = styled.div`
  border-bottom: 1px solid ccccc;
  padding: 10px 30px;
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.pink};
  font-weight: bold;
  text-align: center;
  font-size: 28px;
  border-radius: 8px;
  color: white;
  margin-left: 40px;
`;

const UserName = styled.div`
  font-size: 28px;
  margin-left: 20px;
`;

const ProblemBox = styled.div``;

const TextTitle = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
  text-align: center;
  width: 120px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.red};
  padding-bottom: 10px;
`;

const TextContents = styled.div`
  box-shadow: 0px 5px 5px -1px ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0;
  margin-bottom: 30px;
  min-height: 150px;
`;

const Text = styled.p``;

export default Mypage;

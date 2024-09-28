import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const [activeTab, setActiveTab] = useState("myActivity");
  const navigate = useNavigate();

  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="contents">
      <User_info>
        <Level>LV. -----</Level>
        <User_name>유저이름</User_name>
      </User_info>

      <Main_contents>
        <My_account>
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
        </My_account>

        
        {activeTab === "myActivity" && (
          <My_works>
            <ProblemBox>
              <TextTitle>즐겨찾기 문제</TextTitle>
              <TextContents>
                <Text>000 음하철도 구구팔</Text>
              </TextContents>
            </ProblemBox>
            <ProblemBox>
              <TextTitle>맞은 문제</TextTitle>
              <TextContents>
                <Text>000 두 수 비교하기</Text>
              </TextContents>
            </ProblemBox>
            <ProblemBox>
              <TextTitle>틀린 문제</TextTitle>
              <TextContents>
                <Text>000 Hello World!</Text>
              </TextContents>
            </ProblemBox>
          </My_works>
        )}

        {activeTab === "accountManagement" && (
          <My_works>
            <ProblemBox>
              <TextTitle>계정 정보</TextTitle>
              <TextContents>
                <Text>유저이름: 유저이름</Text>
                <Text>이메일: example@example.com</Text>
              </TextContents>
            </ProblemBox>
          </My_works>
        )}
      </Main_contents>
    </div>
  );
};

const Main_contents = styled.div`
  display: flex;
  width: 900px;
  height: auto;
  margin-top: 45px;
  margin-left: 300px;
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
  background-color: #fff;
  font-weight: ${(props) => (props.active ? "bold" : "normal")}; 
  border: none; 
  outline: none; 
`;

const My_account = styled.div`
  width: 300px;
  height: 50px;
  text-align: center;
  flex-direction: column;
`;

const My_works = styled.div`
  width: 800px;
  height: auto;
  padding-left: 40px;
  border-left: 1px solid ${({ theme }) => theme.colors.red};
`;

const User_info = styled.div`
  display: flex;
  align-items: center;
  margin-left: 300px;
  margin-top: 40px;
  width: 900px;
  padding-bottom: 15px;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.red};
`;

const Level = styled.div`
  border-bottom: 1px solid ccccc;
  width: 150px;
  height: 45px;
  line-height: 45px;
  background-color: #fba6aa;
  font-weight: bold;
  text-align: center;
  font-size: 28px;
  border-radius: 8px;
  color: white;
  margin-left: 40px;
`;

const User_name = styled.div`
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

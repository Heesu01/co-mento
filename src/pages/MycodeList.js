import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const Mycode = () => {
  const navigate = useNavigate();
  const problemsPerPage = 5; // 한 페이지에 표시할 문제 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  const problems = [
    {
      id: 2,
      num: 1393,
      title: "음하철도 구구팔",
      language: "JAVA",
      memory: "16012KB",
      time: "116ms",
      submitter: "테스터",
      subtime: "1분 전",
      success: true,
    },
    {
      id: 1,
      num: 1394,
      title: "a+b",
      language: "C",
      memory: "1612KB",
      time: "500ms",
      submitter: "테스터리",
      subtime: "10분 전",
      success: false,
    },
    {
      num: 1393,
      title: "음하철도 구구팔",
      language: "JAVA",
      memory: "16012KB",
      time: "116ms",
      submitter: "테스터",
      subtime: "1분 전",
      success: true,
    },
    {
      num: 1393,
      title: "음하철도 구구팔",
      language: "JAVA",
      memory: "16012KB",
      time: "116ms",
      submitter: "테스터",
      subtime: "1분 전",
      success: true,
    },
    {
      num: 1393,
      title: "음하철도 구구팔",
      language: "JAVA",
      memory: "16012KB",
      time: "116ms",
      submitter: "테스터",
      subtime: "1분 전",
      success: true,
    },
    {
        num: 1393,
        title: "음하철도 구구팔",
        language: "JAVA",
        memory: "16012KB",
        time: "116ms",
        submitter: "테스터",
        subtime: "1분 전",
        success: true,
      },
  ];

  // 페이지별 문제 목록을 계산합니다.
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(indexOfFirstProblem, indexOfLastProblem);

  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <ListBoxTitle>내가 제출한 코드</ListBoxTitle>
      <ListBox>
        <Top>
          <ClassNum>문제 번호</ClassNum>
          <ClassTit>문제 제목</ClassTit>
          <ClassLang>사용 언어</ClassLang>
          <ClassMem>메모리</ClassMem>
          <ClassTime>시간</ClassTime>
          <ClassStime>제출 시간</ClassStime>
          <ClassSub>제출자</ClassSub>
          <Check>결과</Check>
        </Top>
        {currentProblems.map((problem) => (
          <Item key={problem.id} onClick={() => navigate("/mycode")}>
            <ClassNum>{problem.num}</ClassNum>
            <ClassTit>{problem.title}</ClassTit>
            <ClassLang>{problem.language}</ClassLang>
            <ClassMem>{problem.memory}</ClassMem>
            <ClassTime>{problem.time}</ClassTime>
            <ClassStime>{problem.subtime}</ClassStime>
            <ClassSub>{problem.submitter}</ClassSub>
            <Check>
              {problem.success ? <FaCheck color="green" /> : <p>X</p>}
            </Check>
          </Item>
        ))}
      </ListBox>

      {/* 페이지네이션 버튼 */}
      <Pagination>
        {Array.from({ length: Math.ceil(problems.length / problemsPerPage) }, (_, i) => (
          <PageButton
            key={i + 1}
            onClick={() => paginate(i + 1)}
            active={currentPage === i + 1}
          >
            {i + 1}
          </PageButton>
        ))}
      </Pagination>
    </Container>
  );
};


const Container = styled.div`
  width: 80%;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListBoxTitle = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
`;

const ListBox = styled.div`
  width: 100%;
  height: auto;
  padding: 35px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.red};
`;

const Item = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.red};
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.deepPink};
  }
`;

const ClassNum = styled.div`
  width: 10%;
`;
const ClassTit = styled.div`
  width: 20%;
`;
const ClassLang = styled.div`
  width: 10%;
`;
const ClassMem = styled.div`
  width: 10%;
`;
const ClassTime = styled.div`
  width: 10%;
`;
const ClassStime = styled.div`
  width: 10%;
`;
const ClassSub = styled.div`
  width: 10%;
`;
const Check = styled.div`
  width: 10%;
  p {
    font-weight: 800;
    color: ${({ theme }) => theme.colors.red};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 5px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ active, theme }) => (active ? theme.colors.white : theme.colors.black)};
  background-color: ${({ active, theme }) => (active ? theme.colors.red : "transparent")};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default Mycode;

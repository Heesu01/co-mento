import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { fetchUserSolutions } from "../api/UserApi";

const MycodeList = () => {
  const { userProfileId } = useParams();
  const navigate = useNavigate();
  const problemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const solutionList = await fetchUserSolutions(userProfileId);
        setProblems(solutionList);
      } catch (error) {
        console.error("제출문제 조회 에러:", error);
      }
    };

    loadProblems();
  }, [userProfileId]);

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(
    indexOfFirstProblem,
    indexOfLastProblem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <ListBoxTitle>내가 제출한 코드</ListBoxTitle>
      <ListBox>
        <Top>
          <ClassNum>문제 번호</ClassNum>
          <ClassTit>문제 제목</ClassTit>
          <ClassLang>사용 언어</ClassLang>
          {/* <ClassMem>메모리</ClassMem>
          <ClassTime>시간</ClassTime> */}
          <ClassStime>제출 시간</ClassStime>
          <ClassSub>제출자</ClassSub>
          <Check>결과</Check>
        </Top>
        {currentProblems.map((problem) => (
          <Item
            key={problem.solutionId}
            onClick={() => navigate(`/mycode/${problem.solutionId}`)}
          >
            <ClassNum>{problem.num}</ClassNum>
            <ClassTit>{problem.title}</ClassTit>
            <ClassLang>{problem.language}</ClassLang>
            {/* <ClassMem>{problem.memory}</ClassMem>
            <ClassTime>{problem.time}</ClassTime> */}
            <ClassStime>{problem.subtime}</ClassStime>
            <ClassSub>{problem.submitter}</ClassSub>
            <Check>
              {problem.success ? <FaCheck color="green" /> : <p>X</p>}
            </Check>
          </Item>
        ))}
      </ListBox>

      <Pagination>
        {Array.from(
          { length: Math.ceil(problems.length / problemsPerPage) },
          (_, i) => (
            <PageButton
              key={i + 1}
              onClick={() => paginate(i + 1)}
              active={currentPage === i + 1}
            >
              {i + 1}
            </PageButton>
          )
        )}
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
  width: 30%;
`;
const ClassLang = styled.div`
  width: 10%;
`;
// const ClassMem = styled.div`
//   width: 10%;
// `;
// const ClassTime = styled.div`
//   width: 10%;
// `;
const ClassStime = styled.div`
  width: 20%;
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
  color: ${({ active, theme }) =>
    active ? theme.colors.white : theme.colors.black};
  background-color: ${({ active, theme }) =>
    active ? theme.colors.red : "transparent"};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default MycodeList;

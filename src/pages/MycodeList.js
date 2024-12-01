import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { fetchUserSolutions } from "../api/UserApi";
import Pagination from "../components/Pagination";

const MycodeList = () => {
  const { userProfileId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [problems, setProblems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoading(true);
        const { solutions, totalPages } = await fetchUserSolutions(
          userProfileId,
          currentPage
        );
        setProblems(solutions);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("제출문제 조회 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, [userProfileId, currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <Container>
      <ListBoxTitle>제출 코드 목록</ListBoxTitle>
      <ListBox>
        <Top>
          <ClassNum>문제 번호</ClassNum>
          <ClassTit>문제 제목</ClassTit>
          <ClassLang>사용 언어</ClassLang>
          <ClassStime>제출 시간</ClassStime>
          <ClassSub>제출자</ClassSub>
          <Check>결과</Check>
        </Top>
        {loading ? (
          <Message>제출 코드를 불러오고 있습니다...</Message>
        ) : problems.length > 0 ? (
          problems.map((problem) => (
            <Item
              key={problem.solutionId}
              onClick={() => navigate(`/mycode/${problem.solutionId}`)}
            >
              <ClassNum>{problem.num}</ClassNum>
              <ClassTit>{problem.title}</ClassTit>
              <ClassLang>{problem.language}</ClassLang>
              <ClassStime>{problem.subtime}</ClassStime>
              <ClassSub>{problem.submitter}</ClassSub>
              <Check>
                {problem.success ? <FaCheck color="green" /> : <p>X</p>}
              </Check>
            </Item>
          ))
        ) : (
          <EmptyMessage>제출한 코드가 없습니다.</EmptyMessage>
        )}
      </ListBox>

      <PaginationContainer>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </PaginationContainer>
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
  padding-bottom: 0px;
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

const Message = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  margin: 20px 0;
`;

const EmptyMessage = styled(Message)`
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 100px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default MycodeList;

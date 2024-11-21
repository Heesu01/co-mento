import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { Axios } from "../api/Api";

const ProblemList = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [algorithmChoseBox, setAlgorithmChoseBox] = useState(false);
  const [inputAlgorithm, setInputAlgorithm] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [successStatus, setSuccessStatus] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    selectedCategoryIds: [],
    difficulty: "",
    successStatus: "",
    searchKeyword: "",
  });

  const fetchCategories = async () => {
    try {
      const response = await Axios.get(`/problems/categories`);
      const categoryData = response.data.data.categoryResponseList;
      setCategories(categoryData);
    } catch (error) {
      console.error("카테고리 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const fetchProblems = useCallback(
    async (page) => {
      try {
        setIsLoading(true);

        const response = await Axios.get(`/problems`, {
          params: {
            page: page - 1,
            level: filters.difficulty
              ? convertDifficultyToLevel(filters.difficulty)
              : undefined,
            category:
              filters.selectedCategoryIds.length > 0
                ? filters.selectedCategoryIds.join(",")
                : undefined,
            "is-solved":
              filters.successStatus !== ""
                ? filters.successStatus === "성공"
                : undefined,
            keyword: filters.searchKeyword || undefined,
            size: 10,
          },
        });

        const { previewList, paginationResponse } = response.data.data;

        setProblems(previewList);
        setCurrentPage(paginationResponse.currentPage + 1);
        setTotalPages(paginationResponse.totalPage);
      } catch (error) {
        console.error("문제를 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProblems(currentPage);
  }, [currentPage, fetchProblems]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const AlgorithmInputClick = () => {
    setAlgorithmChoseBox(!algorithmChoseBox);
  };

  const ChangeAlgorithm = (e) => {
    setInputAlgorithm(e.target.value);
  };

  const CategoryClick = (category) => {
    setSelectedCategoryIds((prev) => {
      if (!prev.includes(category.id)) {
        return [...prev, category.id];
      }
      return prev;
    });
  };

  const DeleteCategory = (id) => {
    setSelectedCategoryIds((prev) =>
      prev.filter((categoryId) => categoryId !== id)
    );
  };

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
  };

  const handleSuccessStatusChange = (value) => {
    setSuccessStatus(value);
  };

  const handleKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const applyFilters = () => {
    setFilters({
      selectedCategoryIds,
      difficulty,
      successStatus,
      searchKeyword,
    });
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategoryIds([]);
    setDifficulty("");
    setSuccessStatus("");
    setSearchKeyword("");
    setFilters({
      selectedCategoryIds: [],
      difficulty: "",
      successStatus: "",
      searchKeyword: "",
    });
    setCurrentPage(1);
  };

  const convertDifficultyToLevel = (difficulty) => {
    switch (difficulty) {
      case "쉬움":
        return 1;
      case "보통":
        return 2;
      case "어려움":
        return 3;
      default:
        return undefined;
    }
  };

  return (
    <Container>
      <SearchBox>
        <Input
          placeholder="문제를 검색해주세요."
          value={searchKeyword}
          onChange={handleKeywordChange}
        />
        <SearchBtn onClick={applyFilters}>검색</SearchBtn>
      </SearchBox>
      <SpecificBox>
        <p>알고리즘 분류</p>
        <AlgorithmListBox>
          {selectedCategoryIds.map((id) => {
            const category = categories.find((cat) => cat.id === id);
            return (
              <LiBox key={id}>
                <AlgorithmList>{category?.name}</AlgorithmList>
                <Delete onClick={() => DeleteCategory(id)}>X</Delete>
              </LiBox>
            );
          })}
        </AlgorithmListBox>
        <AlgorithmInputBox
          placeholder="알고리즘"
          value={inputAlgorithm}
          onClick={AlgorithmInputClick}
          onChange={(e) => ChangeAlgorithm(e)}
        />
        {algorithmChoseBox && (
          <ChoseBox>
            {categories
              .filter((category) =>
                category.name
                  .toLowerCase()
                  .includes(inputAlgorithm.toLowerCase())
              )
              .map((category) => (
                <Algorithm
                  key={category.id}
                  onClick={() => CategoryClick(category)}
                >
                  {category.name}
                </Algorithm>
              ))}
          </ChoseBox>
        )}
        <BottomBox>
          <LeftBox>
            <CheckBoxs>
              <p>난이도</p>
              <CheckBoxGroup>
                <CustomCheckbox
                  label="쉬움"
                  value="쉬움"
                  isChecked={difficulty === "쉬움"}
                  onChange={() => handleDifficultyChange("쉬움")}
                />
                <CustomCheckbox
                  label="보통"
                  value="보통"
                  isChecked={difficulty === "보통"}
                  onChange={() => handleDifficultyChange("보통")}
                />
                <CustomCheckbox
                  label="어려움"
                  value="어려움"
                  isChecked={difficulty === "어려움"}
                  onChange={() => handleDifficultyChange("어려움")}
                />
              </CheckBoxGroup>
            </CheckBoxs>
            <CheckBoxs>
              <p>성공 여부</p>
              <CheckBoxGroup>
                <CustomCheckbox
                  label="성공"
                  value="성공"
                  isChecked={successStatus === "성공"}
                  onChange={() => handleSuccessStatusChange("성공")}
                />
                <CustomCheckbox
                  label="실패"
                  value="실패"
                  isChecked={successStatus === "실패"}
                  onChange={() => handleSuccessStatusChange("실패")}
                />
              </CheckBoxGroup>
            </CheckBoxs>
          </LeftBox>
          <RightBox>
            <ButtonBox>
              <ApplyBtn onClick={applyFilters}>적용</ApplyBtn>
              <ResetBtn onClick={resetFilters}>초기화</ResetBtn>
            </ButtonBox>
          </RightBox>
        </BottomBox>
      </SpecificBox>
      {isLoading ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        <ListBox>
          <Top>
            <Num>문제번호</Num>
            <Title>문제 제목</Title>
            <Class>분류</Class>
            <Success>정답률</Success>
            <Check>성공여부</Check>
          </Top>
          {problems.map((problem) => (
            <Item
              key={problem.problemId}
              onClick={() => navigate(`/problem/${problem.problemId}`)}
            >
              <Num>{problem.problemId}</Num>
              <Title>{problem.title}</Title>
              <Class>{problem.categories.join(", ")}</Class>
              <Success>{problem.successRate}</Success>
              <Check>
                {problem.hasSolved ? <FaCheck color="green" /> : <p>X</p>}
              </Check>
            </Item>
          ))}
        </ListBox>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 90px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SearchBox = styled.div`
  display: flex;
  width: 100%;
  height: 35px;
  justify-content: space-between;
`;
const Input = styled.input`
  width: 94%;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  outline: none;
  padding-left: 10px;
`;
const SearchBtn = styled.button`
  width: 5%;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  font-weight: 500;
`;

const SpecificBox = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  padding: 20px 35px;
`;
const AlgorithmListBox = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
const LiBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.deepPink};
  padding: 3px 7px 3px 10px;
  border-radius: 8px;
`;
const AlgorithmList = styled.div`
  font-size: 13px;
`;
const Delete = styled.p`
  margin-left: 10px;
  font-size: 11px;
  cursor: pointer;
`;
const AlgorithmInputBox = styled.input`
  width: 100%;
  padding: 5px 10px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
`;
const ChoseBox = styled.div`
  width: 100%;
  height: 130px;
  background-color: white;
  overflow-y: scroll;
  border-left: 1px solid ${({ theme }) => theme.colors.gray2};
  border-right: 1px solid ${({ theme }) => theme.colors.gray2};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  padding-top: 3px;
`;
const Algorithm = styled.p`
  font-size: 14px;
  margin-bottom: 6px;
  padding: 3px 10px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray3};
  }
`;
const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  margin-top: 10px;
`;
const LeftBox = styled.div`
  display: flex;
  gap: 40px;
`;
const CheckBoxs = styled.div`
  p {
    margin-bottom: 10px;
  }
`;
const CheckBoxGroup = styled.div`
  display: flex;
  gap: 10px;
`;
const CustomCheckbox = ({ label, value, isChecked, onChange }) => {
  return (
    <CheckboxWrapper>
      <HiddenCheckbox type="checkbox" checked={isChecked} onChange={onChange} />
      <StyledCheckbox isChecked={isChecked} onClick={onChange}>
        {isChecked && <CheckMark />}
      </StyledCheckbox>
      <span>{label}</span>
    </CheckboxWrapper>
  );
};
const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 14px;
`;
const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;
const StyledCheckbox = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${({ isChecked, theme }) =>
    isChecked ? theme.colors.gray : theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CheckMark = styled.div`
  width: 8px;
  height: 8px;
`;
const RightBox = styled.div`
  height: 100%;
  display: flex;
  align-items: end;
`;
const ButtonBox = styled.div`
  display: flex;
  gap: 7px;
`;
const ApplyBtn = styled.button`
  padding: 3px 8px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: white;
`;
const ResetBtn = styled.button`
  padding: 3px 8px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.red};
  color: white;
`;
const ListBox = styled.div`
  width: 100%;
  height: 800px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  padding: 35px;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.red};
`;
const Num = styled.div`
  width: 10%;
`;
const Title = styled.div`
  width: 40%;
`;
const Class = styled.div`
  width: 30%;
`;
const Success = styled.div`
  width: 10%;
`;
const Check = styled.div`
  width: 10%;
  p {
    font-weight: 800;
    color: ${({ theme }) => theme.colors.red};
  }
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
const LoadingText = styled.div`
  text-align: center;
  font-size: 18px;
`;

export default ProblemList;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Axios } from "../api/Api";
import Select from "react-select";

const ProblemBook = () => {
  const navigate = useNavigate();
  const [problemSets, setProblemSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);

  const fetchProblemBooks = async () => {
    try {
      const response = await Axios.get("/problems/collections");
      const collections = response.data.data.collections;

      const fetchedProblemSets = await Promise.all(
        collections.map(async (collection) => {
          const problemResponse = await Axios.get("/problems", {
            params: { collection: collection.id },
          });

          const problems = problemResponse.data.data.previewList.map(
            (problem) => `${problem.problemId} ${problem.title}`
          );

          return {
            value: collection.id,
            label: collection.name,
            problems,
          };
        })
      );

      setProblemSets(fetchedProblemSets);
    } catch (error) {
      console.error("문제집 또는 문제 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchProblemBooks();
  }, []);

  const customStyles = {
    control: (base) => ({
      ...base,
      outline: "none",
      boxShadow: "none",
      borderColor: "#ddd",
      borderRadius: "8px",
      cursor: "pointer",
      "&:hover": { borderColor: "#aaa" },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#888",
      cursor: "pointer",
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "#f0f0f0" : "white",
      color: "black",
      cursor: "pointer",
      padding: "12px 15px",
    }),
  };

  const onChangeSelect = (selectedOption) => {
    setSelectedSet(selectedOption);
  };

  return (
    <Container>
      <Header>
        <h2>코딩 문제집</h2>
        <p>다양한 알고리즘 문제를 풀고 실력을 키워보세요!</p>
      </Header>
      <SelectContainer>
        <Select
          onChange={onChangeSelect}
          options={problemSets}
          placeholder="문제집을 선택하세요"
          styles={customStyles}
        />
      </SelectContainer>
      {selectedSet && (
        <ProblemsList>
          <h3>{selectedSet.label}</h3>
          {selectedSet.problems.map((problem, index) => (
            <ProblemItem
              key={index}
              onClick={() => navigate(`/problem/${problem.split(" ")[0]}`)}
            >
              <span>{problem.split(" ").slice(1).join(" ")}</span>
            </ProblemItem>
          ))}
        </ProblemsList>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 75%;
  margin: 100px auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
`;

const Header = styled.div`
  text-align: center;
  h2 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  p {
    font-size: 18px;
    color: ${(props) => props.theme.colors.gray};
    margin-top: -8px;
  }
`;

const SelectContainer = styled.div`
  width: 100%;
`;

const ProblemsList = styled.div`
  padding: 25px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.gray3};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  h3 {
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 600;
    text-align: center;
  }
`;

const ProblemItem = styled.div`
  padding: 12px 15px;
  border-radius: 10px;
  margin: 8px 0;
  background-color: #fafafa;
  border: 1px solid ${(props) => props.theme.colors.gray3};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.black2};
    color: ${(props) => props.theme.colors.white};
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

export default ProblemBook;

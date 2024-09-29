import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const ProblemBook = () => {
  const navigate = useNavigate();
  const [selectedSet, setSelectedSet] = useState(null);

  const problemSets = [
    {
      value: "set1",
      label: "그리디",
      problems: [
        "#1002 문제1",
        "#2312 문제2",
        "#2131 문제3",
        "#2131 문제3",
        "#2131 문제3",
        "#2131 문제3",
        "#2131 문제3",
        "#2131 문제3",
        "#2131 문제3",
        "#2131 문제3",
        "#2131 문제3",
        "#2131 문제3",
      ],
    },
    {
      value: "set2",
      label: "수학",
      problems: [
        "#1234 수 비교하기",
        "#1434 기본연산",
        "#4893 수학",
        "#4893 수학",
        "#4893 수학",
        "#4893 수학",
        "#4893 수학",
        "#4893 수학",
        "#4893 수학",
      ],
    },
    {
      value: "set3",
      label: "문자열",
      problems: [
        "#1231 문자열 이어붙이기",
        "#1312 문제8",
        "#12 문제9",
        "#1231 문자열 이어붙이기",
        "#1231 문자열 이어붙이기",
        "#1231 문자열 이어붙이기",
        "#1231 문자열 이어붙이기",
        "#1231 문자열 이어붙이기",
        "#1231 문자열 이어붙이기",
        "#1231 문자열 이어붙이기",
        "#1231 문자열 이어붙이기",
        "#1231 문자열 이어붙이기",
      ],
    },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      outline: "none",
      boxShadow: "none",
      borderColor: "#dcdcdc",
      cursor: "pointer",
      "&:hover": { borderColor: "#b0b0b0" },
    }),
    placeholder: (base) => ({
      ...base,
      color: "gray",
      cursor: "pointer",
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "#f0f0f0" : "white",
      color: "black",
      cursor: "pointer",
      padding: "10px",
    }),
  };

  const onChangeSelect = (selectedOption) => {
    setSelectedSet(selectedOption);
  };

  return (
    <Container>
      <Header>
        <h2>문제집</h2>
        <p>다양한 난이도의 코딩 문제를 풀어보세요!</p>
      </Header>
      <SelectContainer>
        <Select
          onChange={onChangeSelect}
          options={problemSets}
          placeholder="문제집 선택"
          styles={customStyles}
        />
      </SelectContainer>
      {selectedSet && (
        <ProblemsList>
          <h3>{selectedSet.label}</h3>
          {selectedSet.problems.map((problem, index) => (
            <ProblemItem key={index} onClick={() => navigate("/problem")}>
              <span>{problem}</span>
            </ProblemItem>
          ))}
        </ProblemsList>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 90px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fafafa;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px 20px;
`;

const Header = styled.div`
  text-align: center;
  h2 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #333;
  }
  p {
    font-size: 18px;
    color: gray;
  }
`;

const SelectContainer = styled.div`
  width: 100%;
`;

const ProblemsList = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  h3 {
    margin: 0 0 15px;
    font-size: 24px;
    color: #333;
    text-align: center;
  }
`;

const ProblemItem = styled.div`
  padding: 10px;
  border-radius: 8px;
  margin: 5px 0;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  transition: background-color 0.3s, transform 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.red};
    transform: translateY(-2px);
    border-color: #b2ebf2;
    color: ${(props) => props.theme.colors.white};
  }
`;

export default ProblemBook;

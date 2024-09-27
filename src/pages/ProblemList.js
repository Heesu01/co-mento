import React from "react";
import styled from "styled-components";

const ProblemList = () => {
  return (
    <Container>
      <SearchBox>
        <Input placeholder="문제를 검색해주세요."></Input>
        <SearchBtn>검색</SearchBtn>
      </SearchBox>
      <SpecificBox></SpecificBox>
      <ListBox></ListBox>
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
  height: 200px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  padding: 20px 35px;
`;

const ListBox = styled.div`
  width: 100%;
  height: 800px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  padding: 35px;
`;

export default ProblemList;

import React from "react";
import styled from "styled-components";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationBox>
      <PaginationList>
        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationButton
              onClick={() => onPageChange(number)}
              active={currentPage === number}
            >
              {number}
            </PaginationButton>
          </PaginationItem>
        ))}
      </PaginationList>
    </PaginationBox>
  );
};

const PaginationBox = styled.nav`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PaginationList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
`;

const PaginationItem = styled.li`
  display: inline-block;
`;

const PaginationButton = styled.button`
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${(props) =>
    props.active ? props.theme.colors.red : props.theme.colors.black};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;
`;

export default Pagination;

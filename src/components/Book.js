import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Axios } from "../api/Api";

const Book = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await Axios.get("/problems/collections");
      const fetchedBooks = response.data.data.collections;

      const bookDataWithProblems = await Promise.all(
        fetchedBooks.map(async (book) => {
          const problemResponse = await Axios.get("/problems", {
            params: { collection: book.id },
          });
          const problems = problemResponse.data.data.previewList.map(
            (problem) => ({
              problemId: problem.problemId,
              title: problem.title,
            })
          );
          return { title: book.name, tags: book.description, problems };
        })
      );

      setBooks(bookDataWithProblems);
    } catch (error) {
      console.error("문제집 또는 문제 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Container>
      <Top>
        <p>문제집</p>
        <p onClick={() => navigate(`/book`)}>더보기</p>
      </Top>
      <ItemBox>
        {books.map((book, index) => (
          <Item key={index}>
            <List>
              {book.problems.map((problem) => (
                <Problem
                  key={problem.problemId}
                  onClick={() => navigate(`/problem/${problem.problemId}`)}
                >
                  {problem.title}
                </Problem>
              ))}
            </List>
            <Cover>
              <Title>{book.title}</Title>
              <Tag>{book.tags}</Tag>
            </Cover>
          </Item>
        ))}
      </ItemBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: ${(props) => props.theme.colors.deepPink};
  border-radius: 5px;
  padding: 40px 40px;
  padding-bottom: 0;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 18px;
  p {
    cursor: pointer;
  }
`;

const ItemBox = styled.div`
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
`;

const Item = styled.div`
  background-color: ${(props) => props.theme.colors.black2};
  flex: 1 1 calc(33.33% - 20px);
  min-width: 250px;
  height: 400px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white};
  line-height: 2em;
  padding: 20px;
`;

const Problem = styled.div`
  cursor: pointer;
  &:hover {
    color: #ffd700;
  }
`;

const Cover = styled.div`
  width: 100%;
  height: 40%;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 10px 10px;
  background-color: ${(props) => props.theme.colors.beige};
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
`;

const Tag = styled.p`
  font-weight: 500;
  font-size: 15px;
  color: ${(props) => props.theme.colors.gray};
`;

export default Book;

import React from "react";
import styled from "styled-components";
import Banner from "../components/Banner";
import Mystate from "../components/Mystate";
import Difficulty from "../components/Difficulty";
import Book from "../components/Book";
import { useAuth } from "../context/AuthContext";

const Main = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Container>
      <Banner />
      <Under>
        {isLoggedIn && <Mystate />}
        <Difficulty />
        <Book />
      </Under>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 70px;
`;
const Under = styled.div`
  padding-top: 100px;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

export default Main;

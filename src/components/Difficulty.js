import React from "react";
import styled from "styled-components";

const Difficulty = () => {
  return (
    <Container>
      <Top>
        <p>난이도별 보기</p>
        <p>더보기</p>
      </Top>
      <ItemBox>
        <Item>
          <Title>
            <p>기초</p>
            <p>더보기</p>
          </Title>
          <List>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
          </List>
        </Item>
        <Item>
          <Title>
            <p>초급</p>
            <p>더보기</p>
          </Title>
          <List>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
          </List>
        </Item>
        <Item>
          <Title>
            <p>중급</p>
            <p>더보기</p>
          </Title>
          <List>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
          </List>
        </Item>
      </ItemBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: #d5907d;
  border-radius: 5px;
  padding: 40px 20px;
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
`;
const Item = styled.div`
  background-color: #2e2e2e;
  width: 31%;
  height: 400px;
  border-radius: 10px;
  padding: 20px;
`;
const Title = styled.div`
  color: ${(props) => props.theme.colors.white};
  height: 60px;
  display: flex;
  justify-content: space-between;
  p {
    cursor: pointer;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white};
  line-height: 2em;
`;
const Problem = styled.div`
  cursor: pointer;
`;

export default Difficulty;

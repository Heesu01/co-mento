import React from "react";
import styled from "styled-components";

const Book = () => {
  return (
    <Container>
      <Top>
        <p>문제집</p>
      </Top>
      <ItemBox>
        <Item>
          <List>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
          </List>
          <Cover>
            <Title>정렬 탐색 완전정복</Title>
            <Tag>#수학 #정렬 #탐색 #트리</Tag>
          </Cover>
        </Item>
        <Item>
          <List>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
          </List>
          <Cover>
            <Title>정렬 탐색 완전정복</Title>
            <Tag>#수학 #정렬 #탐색 #트리</Tag>
          </Cover>
        </Item>
        <Item>
          <List>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
          </List>
          <Cover>
            <Title>정렬 탐색 완전정복</Title>
            <Tag>#수학 #정렬 #탐색 #트리</Tag>
          </Cover>
        </Item>
      </ItemBox>
      <ItemBox>
        <Item>
          <List>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
          </List>
          <Cover>
            <Title>정렬 탐색 완전정복</Title>
            <Tag>#수학 #정렬 #탐색 #트리</Tag>
          </Cover>
        </Item>
        <Item>
          <List>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
          </List>
          <Cover>
            <Title>정렬 탐색 완전정복</Title>
            <Tag>#수학 #정렬 #탐색 #트리</Tag>
          </Cover>
        </Item>
        <Item>
          <List>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
            <Problem>0000 두수비교하기</Problem>
          </List>
          <Cover>
            <Title>정렬 탐색 완전정복</Title>
            <Tag>#수학 #정렬 #탐색 #트리</Tag>
          </Cover>
        </Item>
      </ItemBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: ${(props) => props.theme.colors.pink};
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
  height: 100%;
  height: 400px;
  border-radius: 10px;
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
`;
const Cover = styled.div`
  width: 100%;
  height: 50%;
  border-radius: 0 0 10px 10px;
  background-color: #f6e4db;
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
`;

export default Book;

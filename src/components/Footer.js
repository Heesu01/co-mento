import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <Team>TEAM |||</Team>
      <P>2024 2학기 명지대학교 정보통신공학과 캡스톤디자인2 (1235) 3조</P>
      <P>60201919 김재헌 60205205 김희수 60191926 서윤석 60202346 양석재</P>
    </Container>
  );
};

const Container = styled.div`
  height: 200px;
  background-color: ${(props) => props.theme.colors.black2};
  padding: 50px 150px;
  color: ${(props) => props.theme.colors.white};
`;
const Team = styled.div`
  ${(props) => props.theme.fonts.logo};
  margin-bottom: 30px;
`;

const P = styled.div`
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: 10px;
  ${(props) => props.theme.fonts.default};
`;
export default Footer;

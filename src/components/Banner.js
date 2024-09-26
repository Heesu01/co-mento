import React from "react";
import styled from "styled-components";

const Banner = () => {
  return (
    <Container>
      <Text>
        알고리즘 문제해결
        <br />
        이제 AI 피드백과 함께
      </Text>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.beige};
  height: 250px;
  padding: 50px 80px;
`;
const Text = styled.div`
  font-size: 30px;
  line-height: 1.5em;
  font-weight: 600;
`;

export default Banner;

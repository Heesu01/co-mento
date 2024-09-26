import React from "react";
import styled from "styled-components";

const Button = ({ children, onClick, bgc, hoverColor }) => {
  return (
    <Btn onClick={onClick} bgc={bgc} hoverColor={hoverColor}>
      {children}
    </Btn>
  );
};

const Btn = styled.button`
  width: 180px;
  height: 50px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black};
  box-shadow: 0px 5px 5px -1px ${(props) => props.theme.colors.gray};
  background-color: ${(props) => props.bgc || props.theme.colors.beige};
  &:hover {
    background-color: ${(props) =>
      props.hoverColor || props.theme.colors.beige2};
  }
`;

export default Button;

import { css } from "styled-components";

export const Theme = {
  fonts: {
    logo: css`
      font-family: "", sans-serif;
      font-size: 30px;
    `,
    default: css`
      font-family: "", sans-serif;
      font-size: 20px;
    `,
    title: css`
      font-family: "", sans-serif;
      font-style: normal;
      font-size: 54px;
    `,
    other: css`
      font-family: "", sans-serif;
      font-weight: 300;
      font-style: normal;
    `,
  },
  colors: {
    white: "#fff",
    gray: "#9A9A9A",
    gray2: "#E9E9E9",
    black: "#000",
    red: "#FF4040",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "850px",
    desktop: "1024px",
  },
};

import { css } from "styled-components";
import "./font.css";

export const Theme = {
  fonts: {
    logo: css`
      font-family: "Pretendard";
      font-size: 26px;
      font-weight: 600;
    `,
    default: css`
      font-family: "Pretendard", sans-serif;
      font-size: 13px;
    `,
    title: css`
      font-family: "Pretendard", sans-serif;
      font-size: 30px;
    `,
    other: css`
      font-family: "", sans-serif;
    `,
  },
  colors: {
    white: "#fff",
    black: "#000",
    gray: "#9A9A9A",
    gray2: "#E9E9E9",
    red: "#FF4444",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "850px",
    desktop: "1024px",
  },
};

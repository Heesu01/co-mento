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
      font-size: 35px;
      font-weight: 600;
    `,
    other: css`
      font-family: "", sans-serif;
    `,
  },
  colors: {
    white: "#fff",
    black: "#000",
    black2: "#333332",
    gray: "#9A9A9A",
    gray2: "#c4c4c4",
    gray3: "#E9E9E9",
    red: "#FF4444",
    pink: "#FF8F8F",
    deepPink: "#eab8b5",
    beige: "#f6e4db",
    beige2: "#efd3c4;",
    blue: "#0076c0",
    yellow: "#f0ad4e",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "850px",
    desktop: "1024px",
  },
};

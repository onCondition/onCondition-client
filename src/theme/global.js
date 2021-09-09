import { createGlobalStyle } from "styled-components";
import FONTS from "../constants/webFontUrl";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: center;
  }

  @font-face {
    font-family: "Nanum Gothic", sans-serif;
    src: url(${FONTS.NANUM_GOTHIC});
  }

  @font-face {
    font-family: "Carrois Gothic SC", sans-serif;
    src: url(${FONTS.CARROIS_GOTHIC_SC});
  }

  ::-webkit-scrollbar {
    width: 0.4em;
    height: 0.4em;
    border: 0.5em solid transparent;
    background: transparent;
  }

  * {
    font-family: "Nanum Gothic", sans-serif;
  }

  button {
    font-family: "Carrois Gothic SC", sans-serif;
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.5em;
    background-color: #B0B0B0;
  }

  ::-webkit-scrollbar-track-piece:end {
    background: transparent;
    margin-bottom: 0.5em;
  }

  ::-webkit-scrollbar-track-piece:start {
    background: transparent;
    margin-top: 0.5em;
  }

  ::-webkit-scrollbar-corner {
    display: none;
  }
`;

export default GlobalStyle;

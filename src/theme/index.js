import SIZE from "../constants/numbers";

const calcRem = (size) => `${size / SIZE.TEXT.DIVIDE_OCTUPLE}rem`;

const gaps = {
  small: calcRem(SIZE.GAP.SMALL),
  medium: calcRem(SIZE.GAP.MEDIUM),
  large: calcRem(SIZE.GAP.LARGE),
  xLarge: calcRem(SIZE.GAP.X_LARGE),
};

const fontSizes = {
  small: calcRem(SIZE.TEXT.SMALL),
  medium: calcRem(SIZE.TEXT.MEDIUM),
  large: calcRem(SIZE.TEXT.LARGE),
  xLarge: calcRem(SIZE.TEXT.X_LARGE),
  titleSize: calcRem(SIZE.TEXT.TITLE),
};

const pinkColors = {
  mainPink: "#F97171",
  lightPink: "#FB9C9C",
};

const mintColors = {
  mainMint: "#8AD6CC",
  darkMint: "#539A92",
};

const greyScaleColors = {
  white: "#FFFFFF",
  lightGrey: "#F5F6F6",
  mediumGrey: "#B0B0B0",
  darkGrey: "E6B0B0B0",
  fadeWhite: "#E6FFFFFF",
  fadeGrey: "4DF5F6F6",
  fadeLightGrey: "E6F5F6F6",
  black: "#000000",
};

const background = {
  main: pinkColors.lightPink,
  sub: mintColors.mainMint,
  modal: "rgba(0, 0, 0, 0.8)",
};

const innerColors = {
  button: "#FFFFFF",
};

const theme = {
  gaps,
  fontSizes,
  pinkColors,
  mintColors,
  greyScaleColors,
  background,
  innerColors,
};

export default theme;

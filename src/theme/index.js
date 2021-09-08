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
  lightGrey: "#F5F6F6",
  mediumGrey: "#B0B0B0",
  darkGrey: "E6B0B0B0",
  fadeWhite: "#E6FFFFFF",
  fadeGrey: "4DF5F6F6",
  fadeLightGrey: "E6F5F6F6",
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
  innerColors,
};

export default theme;

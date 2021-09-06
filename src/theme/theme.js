const SIZE = import("../constants/numbers");
const calcRem = (size) => `${size / SIZE.DIVIDE_OCTUPLE}rem`;

const fontSizes = {
  small: calcRem(SIZE.SMALL),
  medium: calcRem(SIZE.MEDIUM),
  large: calcRem(SIZE.LARGE),
  xLarge: calcRem(SIZE.X_LARGE),
  titleSize: calcRem(SIZE.TITLE),
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

const theme = {
  fontSizes,
  pinkColors,
  mintColors,
  greyScaleColors,
};

export default theme;

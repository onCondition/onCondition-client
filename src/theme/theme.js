const { TEXT_SIZE, GAP_SIZE } = import("../constants/numbers");
const calcRem = (size) => `${size / TEXT_SIZE.DIVIDE_OCTUPLE}rem`;

const gaps = {
  small: calcRem(GAP_SIZE.SMALL),
  medium: calcRem(GAP_SIZE.MEDIUM),
  large: calcRem(GAP_SIZE.LARGE),
  xLarge: calcRem(GAP_SIZE.X_LARGE),
};

const fontSizes = {
  small: calcRem(TEXT_SIZE.SMALL),
  medium: calcRem(TEXT_SIZE.MEDIUM),
  large: calcRem(TEXT_SIZE.LARGE),
  xLarge: calcRem(TEXT_SIZE.X_LARGE),
  titleSize: calcRem(TEXT_SIZE.TITLE),
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
  gaps,
  fontSizes,
  pinkColors,
  mintColors,
  greyScaleColors,
};

export default theme;

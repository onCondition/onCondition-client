import {
  pinkColors,
  mintColors,
  greyScaleColors,
} from "./colors";
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

const background = {
  main: pinkColors.lightPink,
  sub: mintColors.mainMint,
  modal: greyScaleColors.opaqueGrey,
  innerModal: greyScaleColors.fadeWhite,
  input: greyScaleColors.white,
};

const text = {
  main: pinkColors.lightPink,
  sub: mintColors.mainMint,
  button: greyScaleColors.white,
  input: greyScaleColors.black,
};

const point = {
  main: pinkColors.mainPink,
};

const shadow = {
  main: "0.3rem 0.3rem 1rem " + greyScaleColors.darkGrey,
  sub: "0.3rem 0.3rem 1rem " + greyScaleColors.lightGrey,
};

const theme = {
  gaps,
  fontSizes,
  background,
  text,
  point,
  shadow,
};

export default theme;

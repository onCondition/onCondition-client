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
  graph: greyScaleColors.lightGrey,
  graphData: pinkColors.fadePink,
};

const text = {
  main: greyScaleColors.white,
  sub: mintColors.mainMint,
  button: greyScaleColors.white,
  input: greyScaleColors.black,
};

const point = {
  main: pinkColors.mainPink,
};

const shadow = {
  main: "0 0.3rem 0.5rem " + greyScaleColors.mediumGrey,
  sub: "0 0.3rem 0.5rem " + greyScaleColors.darkGrey,
  range: "inset 0.1rem 0.1rem 0.3rem" + greyScaleColors.darkGrey,
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

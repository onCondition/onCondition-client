import React from "react";
import PropTypes from "prop-types";

import Wrapper from "./Wrapper";
import ImgWrapper from "./ImageWrapper";
import TextContainer from "./TextContainer";
import HeartCounter from "./HeartCounter";
import COLORS from "../constants/colors";

function ContentContainer({
  color,
  date,
  heartCount,
  url,
  text,
  hasPicture,
}) {
  return (
    <Wrapper color={color}>
      <div className="background">
        <div>
          {date}
          <HeartCounter count={heartCount} />
        </div>
        {hasPicture && <ImgWrapper>
          <img src={url} />
        </ImgWrapper>}
        <TextContainer>{text}</TextContainer>
      </div>
    </Wrapper>
  );
}

ContentContainer.propTypes = {
  color: PropTypes.oneOf([COLORS.MAIN_CORAL, COLORS.MAIN_MINT]),
  date: PropTypes.string.isRequired,
  heartCount: PropTypes.number,
  url: PropTypes.string,
  text: PropTypes.string,
  hasPicture: PropTypes.bool,
};

ContentContainer.defaultProps = {
  color: COLORS.MAIN_MINT,
  heartCount: 0,
  url: "img/add-picture.png",
  text: "",
  hasPicture: false,
};

export default ContentContainer;

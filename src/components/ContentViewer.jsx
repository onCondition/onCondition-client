import React from "react";
import PropTypes from "prop-types";

import Wrapper from "./Wrapper";
import ImgWrapper from "./ImageWrapper";
import TextContainer from "./TextContainer";
import HeartCounter from "./HeartCounter";
import theme from "../theme";

function ContentViewer({
  color,
  date,
  heartCount,
  url,
  text,
  hasPicture,
}) {
  return (
    <Wrapper color={color}>
      <div>
        {date + " "}
        <HeartCounter count={heartCount} />
      </div>
      {hasPicture && <ImgWrapper>
        <img src={url} />
      </ImgWrapper>}
      <TextContainer>{text}</TextContainer>
    </Wrapper>
  );
}

ContentViewer.propTypes = {
  color: PropTypes.oneOf(Object.values(theme.background)),
  date: PropTypes.string.isRequired,
  heartCount: PropTypes.number,
  url: PropTypes.string,
  text: PropTypes.string,
  hasPicture: PropTypes.bool,
};

ContentViewer.defaultProps = {
  color: theme.background.main,
  heartCount: 0,
  url: "/img/add-picture.png",
  text: "",
  hasPicture: false,
};

export default ContentViewer;

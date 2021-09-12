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
  hasText,
  isDescription,
}) {
  return (
    <Wrapper color={color} isShrink={!hasText}>
      <div>
        {date + " "}
        <HeartCounter count={heartCount} />
      </div>
      {!isDescription && <div>
        <ImgWrapper>
          <img src={url} />
        </ImgWrapper>
        {hasText && <TextContainer>{text}</TextContainer>}
      </div>
      }
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
  hasText: PropTypes.bool,
  isDescription: PropTypes.bool,
};

ContentViewer.defaultProps = {
  color: theme.background.main,
  heartCount: 0,
  url: "/img/add-picture.png",
  text: "",
  hasText: true,
  isDescription: false,
};

export default ContentViewer;

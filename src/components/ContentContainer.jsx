import React from "react";
import PropTypes from "prop-types";

import Wrapper from "./Wrapper";
import ImgWrapper from "./ImgWrapper";
import TextContainer from "./TextContainer";
import HeartCounter from "./HeartCounter";

function ContentContainer({
  color,
  date,
  heartCount,
  url,
  text,
  hasPicture,
}) {
  const COLORS = {
    mint: "#8AD6CC",
    coral: "#FB9C9C",
  };

  return (
    <Wrapper color={COLORS[color]}>
      <div className="background">
        <div>
          {date}
          <HeartCounter count={heartCount} />
        </div>
        { hasPicture && <ImgWrapper>
          <img src={url} />
        </ImgWrapper>}
        <TextContainer>{text}</TextContainer>
      </div>
    </Wrapper>
  );
}

ContentContainer.propTypes = {
  color: PropTypes.oneOf(["coral", "mint"]),
  date: PropTypes.string,
  heartCount: PropTypes.number,
  url: PropTypes.string,
  text: PropTypes.string,
  hasPicture: PropTypes.bool,
};

ContentContainer.defaultProps = {
  color: "coral",
  date: "2021 / 8 / 31  12 : 45 PM",
  heartCount: 0,
  url: "img/add-picture.png",
  text: "",
  hasPicture: false,
};

export default ContentContainer;

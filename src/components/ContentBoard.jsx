import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../theme";

const SIZE_UNIT = "px";

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-sizing: border-box;
  box-shadow: 5px 5px 10px ${({ theme }) => theme.greyScaleColors.darkGrey};
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => String(props.widthSize) + SIZE_UNIT};
  height: ${(props) => String(props.heightSize) + SIZE_UNIT};
  border-radius: 10px;
  padding: 25px 20px 20px 20px;
`;

const Inner = styled.div`
  flex-direction: row;
  flex-grow: 1;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.greyScaleColors.fadeWhite};
  border-radius: 10px;
  padding: 20px;
  font-size: 1.2rem;
`;

const Heading = styled.p`
  margin: 0 0 10px 0;
  color: ${({ theme }) => theme.greyScaleColors.fadeWhite};
  font-size: 1.5rem;
`;

function ContentBoard({
  backgroundColor,
  width,
  height,
  heading,
  text,
  children,
}) {
  return (
    <Outer
      widthSize={width}
      heightSize={height}
      backgroundColor={backgroundColor}
    >
      {heading && <Heading>{heading}</Heading>}
      <Inner>
        {text}
      </Inner>
      {children}
    </Outer>
  );
}

ContentBoard.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.oneOf(theme.background),
  heading: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.element,
};

ContentBoard.defaultProps = {
  backgroundColor: theme.background.main,
  heading: "",
  width: 480,
  height: 360,
};

export default ContentBoard;

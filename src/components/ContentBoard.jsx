import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../theme";

const Outer = styled.div`
  box-sizing: border-box;
  box-shadow: 5px 5px 10px ${({ theme }) => theme.greyScaleColors.darkGrey};
  background-color: ${(props) => props.backgroundColor};
  width: -webkit-fit-content;
  height: -webkit-fit-content;
  border-radius: 10px;
  padding: 25px 20px 20px 20px;
`;

const Inner = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.greyScaleColors.fadeWhite};
  border-radius: 10px;
  width: ${(props) => props.widthSize};
  height: ${(props) => props.heightSize};
  margin: auto;
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
    <Outer backgroundColor={backgroundColor}>
      {heading && <Heading>{heading}</Heading>}
      <Inner widthSize={width} heightSize={height}>
        {text}
      </Inner>
      {children}
    </Outer>
  );
}

ContentBoard.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  heading: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.element,
};

ContentBoard.defaultProps = {
  backgroundColor: theme.pinkColors.lightPink,
  heading: "",
  width: "480px",
  height: "360px",
};

export default ContentBoard;

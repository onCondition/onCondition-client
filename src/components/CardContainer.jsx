import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../theme";

const CardWrapper = styled.div`
  background-color: ${(props) => props.color};
  margin: 10px;
  padding: 30px;
  width: 300px;
  height: 420px;
  border-radius: 30px;
  color: ${({ theme }) => theme.text.sub};
  font-size: ${( { theme }) => theme.fontSizes.small};
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  padding: 0 30px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.background.innerModal};

  p {
    margin: 5%;
  }
`;

function CardContainer({ color, children }) {
  return (
    <CardWrapper color={color}>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </CardWrapper>
  );
}

CardContainer.propTypes = {
  color: PropTypes.oneOf(theme.background),
  children: PropTypes.arrayOf(PropTypes.element),
};

export default CardContainer;

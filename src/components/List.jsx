import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../theme";

const Li = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 10px auto;
  line-height: 4rem;
  min-width: 435px;
  max-width: 630px;
  border-radius: 30px;
  box-shadow: 0 3px 5px ${({ theme }) => theme.shadow.main};
  background: ${(props) => props.color};
  color: ${({ theme }) => theme.text.button};
  list-style: none;

  img {
    margin: 0 auto;
    width: 80px;
    height: 3rem;
    object-fit: cover;
  }
`;

function List({
  color,
  children,
  key,
  onClick,
}) {
  return (
    <Li
      color={color}
      key={key}
      onClick={onClick}
    >
      {children}
    </Li>
  );
}

List.propTypes = {
  color: PropTypes.oneOf(Object.values(theme.background)),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
  ]),
  key: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default List;

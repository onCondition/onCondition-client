import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Li = styled.li`
  margin: 10px auto;
  line-height: 4rem;
  max-width: 630px;
  border-radius: 30px;
  box-shadow: 0 3px 5px gray;
  background: ${props => props.color};
  color: white;
  list-style: none;
`;

function List({
  color,
  children,
  key,
  onClick
}) {
  const COLORS = {
    mint: "#8AD6CC",
    coral: "#FB9C9C",
  };

  return (
    <Li
      color={COLORS[color]}
      key={key}
      onClick={onClick}
    >
      {children}
    </Li>
  );
}

List.propTypes = {
  color: PropTypes.oneOf(["coral", "mint"]),
  children: PropTypes.element,
  key: PropTypes.string,
  onClick: PropTypes.func,
};

export default List;

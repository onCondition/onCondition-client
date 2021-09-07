import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  BsHeartFill, BsHeartHalf, BsHeart,
} from "react-icons/bs";

const HeartWrapper = styled.span`
  margin: 0 auto;

  div {
    display: inline-block;
    transform: translateY(3px);
  }
`;

function HeartCounter({ count, color }) {
  const numberOfHearts = 5;
  const countPerHeart = 2;
  const half = 0.5;
  const COLORS = {
    white: "#ffffff",
    deepMint: "#539A92",
  };

  const hearts = [...new Array(numberOfHearts)].map((_, i) => {
    if (i + half > count / countPerHeart) {
      return <BsHeart />;
    } else if (i + half === count / countPerHeart) {
      return <BsHeartHalf />;
    } else {
      return <BsHeartFill />;
    }
  });

  return (
    <HeartWrapper color={COLORS[color]} >
      <div>{hearts}</div>
    </HeartWrapper>
  );
}

HeartCounter.propTypes = {
  count: PropTypes.number.isRequired,
  color: PropTypes.oneOf(["white", "deepMint"]),
};

HeartCounter.defaultProps = {
  color: "white",
};

export default HeartCounter;

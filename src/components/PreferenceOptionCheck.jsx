import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import RadioComponent from "./Radiobutton";

const ImageWrapper = styled.div`
  width: 98%;
  height: 100%;
  overflow: hidden;
  place-self: start end;

  img {
    max-height: auto;
    width: 100%;
    display: block;
  }
`;

function PreferenceOptionCheck({
  className,
  imageSrc,
  id,
  value,
  color,
}) {
  return (
    <div>
      <ImageWrapper>
        <RadioComponent
          className={className}
          value={value}
          color={color}
          id={id}
        />
        <img src={imageSrc} />
      </ImageWrapper>
    </div>
  );
}

PreferenceOptionCheck.propTypes = {
  className: PropTypes.string,
  imageSrc: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
};

export default PreferenceOptionCheck;

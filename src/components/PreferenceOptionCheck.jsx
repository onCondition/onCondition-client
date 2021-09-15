import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import RadioComponent from "./Radiobutton";

const PreferenceOptionCheckWrapper = styled.div`
  height: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  place-self: start end;

  img {
    height: 70%;
    object-fit: contain;
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
    <PreferenceOptionCheckWrapper>
      <ImageWrapper>
        <RadioComponent
          className={className}
          value={value}
          color={color}
          id={id}
        />
        <img src={imageSrc} />
      </ImageWrapper>
    </PreferenceOptionCheckWrapper>
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

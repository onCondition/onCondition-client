import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Wrapper from "./Wrapper";
import ImageWrapper from "./ImageWrapper";
import HeartCounter from "./HeartCounter";
import Button from "./SButton";
import COLORS from "../constants/colors";
import getImageUrl from "../utils/getImageUrl";

const Input = styled.input`
  width: 205px;
  border-radius: 5px;
  border: solid 1px transparent;

  :focus {
    outline: none;
  }
`;

const HeartInputWrapper = styled.div`
  display: inline-flex;
  width: 90px;
  flex-direction: column;
  align-items: center;

  input {
    width: 80px;
    -webkit-appearance: none;
  }

  input::-webkit-slider-thumb {
    width: 10px;
    -webkit-appearance: none;
    height: 10px;
    cursor: pointer;
    background: ${COLORS.DARK_GREY};
  }

  input::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    margin-top: -1px;
  }
`;

function HeartInput({ count, onChange }) {
  const handleCountChange = function ({ target }) {
    onChange(Number(target.value));
  };

  return (
    <span>
      <HeartInputWrapper>
        <HeartCounter count={count} />
        <input
          type="range"
          name="heartCount"
          min="0"
          max="10"
          value={count}
          onChange={handleCountChange}
        />
      </HeartInputWrapper>
    </span>
  );
}

HeartInput.propTypes = {
  count: PropTypes.number,
  onChange: PropTypes.func,
};

const Textarea = styled.textarea`
  flex-grow: 1;
  margin: 5px 20px 20px 20px;
  padding: 5px 15px;
  min-height: 5rem;
  line-height: 2rem;
  border-radius: 7px;
  border-style: hidden;
  background: ${COLORS.WHITE};
  color: ${COLORS.BLACK};
  text-align: left;
  resize: none;

  :focus {
    outline: none;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 630px;
  margin: 0 auto;

  button {
    flex: 1;
  }
`;

function ContentForm({
  color,
  hasPicture,
  onSubmit,
  submitButtonText,
  additionalButton,
}) {
  const defaultCount = 0;
  const imageInput = useRef(null);
  const [date, setDate] = useState("");
  const [heartCount, setHeartCounts] = useState(defaultCount);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleCountChange = function (value) {
    setHeartCounts(value);
  };

  const handleDateChange = function ({ target }) {
    setDate(target.value);
  };

  const addImage = function () {
    if (image) {
      setImage(null);
    }

    imageInput.current.click();
  };

  const handleTextChange = function ({ target }) {
    setText(target.value);
  };

  const handleSubmitbutton = async function () {
    setDate("");
    setHeartCounts(defaultCount);
    setText("");
    setImage(null);

    let url;

    if (image) {
      url = await getImageUrl(image);
    }

    onSubmit({
      date, heartCount, text, url,
    });
  };

  const onImageChange = function ({ target }) {
    if (!target.files.length) {
      return;
    }

    const urlReader = new FileReader();
    const uploadedImage = [...target.files].pop();

    if (uploadedImage) {
      setImage(uploadedImage);

      urlReader.onload = function ({ target }) {
        setImageUrl(target.result);
      };

      urlReader.readAsDataURL(uploadedImage);
    }
  };

  return (
    <form>
      <Wrapper color={color}>
        <div>
          <Input
            type="datetime-local"
            value={date}
            onChange={handleDateChange}
          />
          <HeartInput count={heartCount} onChange={handleCountChange}/>
        </div>
        <HiddenInput ref={imageInput} type="file"
          className="imageInput" accept="image/*"
          name="file" onChange={onImageChange}
        />
        {hasPicture
          && <ImageWrapper onClick={addImage}>
            {image
              ? <img src={imageUrl} />
              : <img src="img/add-picture.png" />
            }
          </ImageWrapper>
        }
        <Textarea
          placeholder="내용을 입력해주세요"
          value={text}
          onChange={handleTextChange} />
      </Wrapper>
      <ButtonWrapper>
        <Button text={submitButtonText} onClick={handleSubmitbutton} />
        {additionalButton}
      </ButtonWrapper>
    </form>
  );
}

ContentForm.propTypes = {
  color: PropTypes.oneOf([COLORS.MAIN_CORAL, COLORS.MAIN_MINT]),
  hasPicture: PropTypes.bool,
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
  additionalButton: PropTypes.element,
};

ContentForm.defaultProps = {
  color: COLORS.MAIN_CORAL,
  hasPicture: false,
};

export default ContentForm;

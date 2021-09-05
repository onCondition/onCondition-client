import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Wrapper from "./Wrapper";
import ImgWrapper from "./ImgWrapper";
import HeartCounter from "./HeartCounter";
import Button from "./SButton";

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
    background: #434343;
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
  background: white;
  opacity: 0.9;
  color: black;
  text-align: left;
  resize: none;

  :focus {
    outline: none;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

function ContentForm({ color, hasPicture, onSubmit }) {
  const COLORS = {
    mint: "#8AD6CC",
    coral: "#FB9C9C",
  };

  const defaultCount = 0;

  const imgInput = useRef(null);
  const [date, setDate] = useState("");
  const [heartCount, setHeartCounts] = useState(defaultCount);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [uploadedImgUrl, setUploadedImgUrl] = useState("");

  const handleCountChange = function (value) {
    setHeartCounts(value);
  };

  const handleDateChange = function ({ target }) {
    setDate(target.value);
  };

  const addImage = function () {
    if (uploadedImgUrl) {
      setImage(null);
      setUploadedImgUrl("");
      return;
    }

    imgInput.current.click();
  };

  const handleTextChange = function ({ target }) {
    setText(target.value);
  };

  const handleSubmitbutton = function () {
    setDate("");
    setHeartCounts(defaultCount);
    setText("");
    setImage(null);
    setUploadedImgUrl("");

    onSubmit({
      date, heartCount, text, image
    });
  };

  const onImgChange = function (ev) {
    const reader = new FileReader();
    const uploadedImg = [...ev.target.files].pop();

    if (uploadedImg) {
      setImage(uploadedImg);

      reader.onload = function ({ target }) {
        setUploadedImgUrl(target.result);
      };

      reader.readAsDataURL(uploadedImg);
    }
  };

  return (
    <form>
      <Wrapper color={COLORS[color]}>
        <div>
          <Input
            type="datetime-local"
            value={date}
            onChange={handleDateChange}
          />
          <HeartInput count={heartCount} onChange={handleCountChange}/>
        </div>
        <HiddenInput ref={imgInput} type="file"
          className="imgInput" accept="image/*"
          name="file" onChange={onImgChange}
        />
        { hasPicture
          && <ImgWrapper onClick={addImage}>
            {uploadedImgUrl
              ? <img src={uploadedImgUrl} />
              : <img src="img/add-picture.png" />
            }
          </ImgWrapper>
        }
        <Textarea
          placeholder="내용을 입력해주세요"
          value={text}
          onChange={handleTextChange} />
      </Wrapper>
      <Button text="add" onClick={handleSubmitbutton} />
    </form>
  );
}

ContentForm.propTypes = {
  color: PropTypes.oneOf(["coral", "mint"]),
  onSubmit: PropTypes.func,
  hasPicture: PropTypes.bool,
};

ContentForm.defaultProps = {
  color: "coral",
  onSubmit: (value) => console.log(value),
  hasPicture: false,
};

export default ContentForm;

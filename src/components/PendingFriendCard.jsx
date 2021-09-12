import React from "react";
import PropTypes from "prop-types";

import theme from "../theme";
import CardContainer from "./CardContainer";
import ProfileImageWrapper from "./ProfileImageWrapper";
import styled from "styled-components";

const Button = styled.button`
  border-radius: 10px;
  margin: -2% 3% 6% 3%;
  padding: 3% 7%;
  border: none;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.background.main};
  color: white;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.small};
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
`;

const PendingFilter = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 300px;
  height: 420px;
  margin: 10px;
  padding: 30px;
  transform: translate(-40px, -40px);
  backdrop-filter: grayscale(100%);
`;

function PendingCard({
  profileUrl,
  name,
  onAceeptButtonClick,
  onDenyButtonClick,
  isSender,
}) {
  return (
    <CardContainer color={theme.background.main}>
      <ProfileImageWrapper>
        <img src={profileUrl} />
      </ProfileImageWrapper>
      <p>{name}</p>
      <PendingFilter>
        <p>{isSender ? "친구 요청" : "친구 요청 중"}</p>
        {isSender
          && <div>
            <Button onClick={onAceeptButtonClick}>수락</Button>
            <Button onClick={onDenyButtonClick}>거절</Button>
          </div>
        }
      </PendingFilter>
    </CardContainer>
  );
}

PendingCard.propTypes = {
  profileUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onAceeptButtonClick: PropTypes.func,
  onDenyButtonClick: PropTypes.func,
  isSender: PropTypes.bool,
};

export default PendingCard;

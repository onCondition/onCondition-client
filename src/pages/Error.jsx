import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import Modal from "../components/modalComponent";
import { removeError } from "../features/errorSlice";

function Error({ statusCode, message }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleConform = function () {
    dispatch(removeError());
  };

  const handleCancle = function () {
    dispatch(removeError());
    if (history.length > 1) {
      history.goBack();
    } else {
      history.push("/myConditoin");
    }
  };

  return (
    <Modal
      innerText={`${statusCode}: ${message}`}
      cancelText="Go back"
      onConfirm={handleConform}
      onCancel={handleCancle}
      width={200}
    />
  );
}

Error.propTypes = {
  statusCode: PropTypes.number,
  message: PropTypes.string,
};

export default Error;

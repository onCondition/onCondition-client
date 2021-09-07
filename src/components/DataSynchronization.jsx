import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { postGoogleToken } from "../utils/auth";
import { getGoogleTokenRequestUrl, parseGoogleToken } from "../utils/tokens";
import { ERROR } from "../constants/messages";

function DataSynchronization({ onSuccess, onFail }) {
  const queryString = window.location.hash.substr(1);
  const token = parseGoogleToken(queryString);

  useEffect(async () => {
    if (token) {
      try {
        const res = await postGoogleToken(token);

        if (res.status) {
          onFail(ERROR.DATA_FETCH_FAIL);

          return;
        }

        onSuccess();
      } catch (err) {
        onFail(err);
      }
    } else {
      window.location.assign(getGoogleTokenRequestUrl());
    }
  }, [token]);

  return (
    <>
      {token ? (
        <p>데이터를 가져오고 있습니다</p>
      ) : (
        <p>정보 확인이 필요합니다</p>
      )}
    </>
  );
}

DataSynchronization.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
};

export default DataSynchronization;

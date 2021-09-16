import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import firebase from "../config/firebase";
import Button from "./Button";
import { logout } from "../features/userSlice";

function Logout({ onLogout }) {
  const dispatch = useDispatch();

  function logoutWithGoogle() {
    firebase.auth().signOut();
    dispatch(logout());
    onLogout();
  }

  return (
    <div>
      <Button
        onClick={logoutWithGoogle}
        text="logout"
      />
    </div>
  );
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Logout;

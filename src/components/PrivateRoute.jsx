import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function PrivateRoute({ children, ...rest }) {
  const hasLoggedIn = useSelector(state => state.user.hasLoggedIn);

  return (
    <Route {...rest}>
      {hasLoggedIn
        ? children
        : <Redirect to="/login" />}
    </Route>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;

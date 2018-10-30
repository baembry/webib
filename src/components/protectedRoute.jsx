import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoute = ({ path, component: Component }) => {
  return (
    <Route
      path={path}
      render={props => {
        if (auth.userIsLoggedIn()) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/auth" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;

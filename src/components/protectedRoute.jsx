import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoute = ({
  path,
  component: Component,
  flashMessage,
  toggleLoading
}) => {
  return (
    <Route
      path={path}
      render={props => {
        console.log(props);
        if (auth.userIsLoggedIn()) {
          return (
            <Component
              {...props}
              flashMessage={flashMessage}
              toggleLoading={toggleLoading}
            />
          );
        } else {
          return <Redirect to="/auth" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;

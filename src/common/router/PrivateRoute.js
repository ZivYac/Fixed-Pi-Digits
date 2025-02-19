import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

/**
 * Private route.
 *
 * @param {*} param0.component The component to display for this route.
 * @param {*} param0.options The rest of props to send for Route.
 *
 * @returns The specified component or a redirect to Login if the user is not authenticated.
 */
const PrivateRoute = ({ component: Component, ...options }) => {
  const { loggedIn } = useSelector((state) => state.auth);
  return (
    <Route
      {...options}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;

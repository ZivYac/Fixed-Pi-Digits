import React from "react";
import { Route } from "react-router-dom";

/**
 * Public route.
 *
 * @param {*} param0.component The component to display for this route.
 * @param {*} param0.options The rest of props to send for Route.
 *
 * @returns The specified component.
 */
const PublicRoute = ({ component: Component, ...options }) => {
  return <Route {...options} render={(props) => <Component {...props} />} />;
};

export default PublicRoute;

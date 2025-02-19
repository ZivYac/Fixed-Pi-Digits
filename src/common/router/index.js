import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../../pages/Login";
import Pi from "../../pages/Pi";
import ScrollToTop from "../../components/ScrollToTop";

const MindRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <PublicRoute exact path="/" component={Login} />

        <PrivateRoute exact path="/home" component={Pi} />
      </Switch>
    </Router>
  );
};

export default MindRouter;

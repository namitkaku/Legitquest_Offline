import React from "react";
import { Switch, Route } from "react-router";
import { HashRouter, Link } from "react-router-dom";

import ROUTES from "Constants/routes";
import loadable from "@loadable/component";
import Home from "../pages/home/Home";
import CaseDetail from "../pages/detail/CaseDetail";
import Login from "../pages/login";
import Welcome from "../pages/home/Welcome";
import NotFound from "../pages/error/NotFound";
import SetUp from "../pages/setup/SetUp";
import SearchForm from "../pages/search/SearchForm";
import ActList from '../pages/actlist/ActList';

/* SetUp */
class Routes extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path={"/"} component={Login}></Route>   
          <Route exact path={"/setup/:reSetup?"} component={SetUp}></Route> 
          <Route exact path={"/search"} component={SearchForm}></Route> 
          
          <Route exact path={"/welcome"} component={Welcome}></Route>
          <Route exact path={"/home"} component={Home}></Route>
          <Route exact path={'/act-list'} component={ActList}></Route>
          <Route
            exact
            path={"/case-detail/:casetext/:cased"}
            component={CaseDetail}></Route>
          <Route path={"*"} exact insecure component={NotFound}></Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default Routes;

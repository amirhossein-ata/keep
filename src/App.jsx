import React from "react";
import { Switch, Route, Router } from "react-router-dom";

import history from "core/modules/history";

//style
import "view/styles/main.scss";
import "antd/dist/antd.css";
import Home from "view/scripts/pages/home/Home";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default App;

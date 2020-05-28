import React from "react";
import { Switch, Route, Router } from "react-router-dom";

import history from "core/modules/history";
//pages
import "view/scripts/pages/Notes";

//style
import "view/styles/main.scss";
import "antd/dist/antd.css";
import Notes from "view/scripts/pages/Notes";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Notes} />
      </Switch>
    </Router>
  );
};

export default App;

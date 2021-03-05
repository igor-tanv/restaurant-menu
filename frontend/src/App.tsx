import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Menu from "./features/menu";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Menu />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Order from "./features/order";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Order />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

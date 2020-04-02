import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import createStore from "./slomux/createStore";
import { Provider } from "./slomux/connect";
import Timer from "./components/Timer";

ReactDOM.render(
  <Provider store={createStore()}>
    <Timer />
  </Provider>,
  document.getElementById("root")
);

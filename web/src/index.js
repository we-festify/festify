import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/styles/variables.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/redux/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register({
  bypassNodeEnvProduction: true,
});

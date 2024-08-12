import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/styles/variables.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/redux/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import WebSocketProvider from "./state/context/WebSocket";
import InAppNotificationsProvider from "./state/context/InAppNotifications";
import AuthProvider from "./state/context/Auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <WebSocketProvider>
          <InAppNotificationsProvider>
            <Router>
              <App />
            </Router>
          </InAppNotificationsProvider>
        </WebSocketProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// register service worker
serviceWorkerRegistration.register({
  bypassNodeEnvProduction: true,
});
// register firebase messaging service worker
serviceWorkerRegistration.register({
  bypassNodeEnvProduction: true,
  serviceWorkerUrl: "/firebase-messaging-sw.js",
});

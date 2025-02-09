import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <FpjsProvider
      loadOptions={{
        apiKey: "jqjbpBQOsCgR7uYFyOf9",
      }}
    >
      <App />
    </FpjsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app
reportWebVitals();

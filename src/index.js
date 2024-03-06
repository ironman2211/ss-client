import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

import PersistStore from "./persistStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PersistStore>
    <GoogleOAuthProvider clientId="991394593430-url2umkei8dju2shaceb6sh4l1put414.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </PersistStore>
);

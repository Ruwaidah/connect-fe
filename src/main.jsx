import { StrictMode } from "react";
import { useRoutes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./store.jsx";
import "./index.css";
import App from "./App.jsx";


console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId="717012086922-uf8isvro4hqgnspuhfo5lr6fg015mnp2.apps.googleusercontent.com">
    <BrowserRouter>
      <Provider store={store}>
        <App />
    </Provider>
   </BrowserRouter> 
  </GoogleOAuthProvider>
  // </StrictMode>
);

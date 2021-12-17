import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App /* , { authLink } */ from "./App";
import ApolloClientProvider from "./contexts/ApolloClientProvider";
import LoginContextProvider from "./contexts/LoginContext";
import NavContextProvider from "./contexts/NavContext";
import ToastContextProvider from "./contexts/ToastContext";
import UserContextProvider from "./contexts/UserContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ApolloClientProvider>
        <LoginContextProvider>
          <NavContextProvider>
            <BrowserRouter>
              <ToastContextProvider>
                <App />
              </ToastContextProvider>
            </BrowserRouter>
          </NavContextProvider>
        </LoginContextProvider>
      </ApolloClientProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

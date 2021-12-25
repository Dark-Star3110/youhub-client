import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ApolloClientProvider from "./contexts/ApolloClientProvider";
import ExtraNavContextProvider from "./contexts/ExtraNavContext";
import NavContextProvider from "./contexts/NavContext";
import ToastContextProvider from "./contexts/ToastContext";
import UserContextProvider from "./contexts/UserContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ApolloClientProvider>
        <NavContextProvider>
          <ExtraNavContextProvider>
            <BrowserRouter>
              <ToastContextProvider>
                <App />
              </ToastContextProvider>
            </BrowserRouter>
          </ExtraNavContextProvider>
        </NavContextProvider>
      </ApolloClientProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./UserContext";

import "./assets/styles/index.css";
import App from "./App";

ReactDOM.render(
    <BrowserRouter>
        <UserProvider>
            <App/>
        </UserProvider>
    </BrowserRouter>,
    document.getElementById("root")
);

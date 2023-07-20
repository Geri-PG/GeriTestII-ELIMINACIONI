import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import Store from "./components/store/Store";
import {
    RouterProvider,
} from "react-router-dom";
import Router from './router/routes';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={Store}>
            <RouterProvider router={Router} />
        </Provider>
    </React.StrictMode>
);

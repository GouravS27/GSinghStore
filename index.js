import React from "react";
import ReactDOM from "react-dom/client";
import "./src/index.css"
import App from "./src/App";
import reportWebVitals from "./src/reportWebVitals";
import { AppProvider } from "./src/context/productcontext";
import { FilterContextProvider } from "./src/context/filter_context";
import { CartProvider } from "./src/context/cart_context";

const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(
    <AppProvider>
        <FilterContextProvider>
            <CartProvider>
               <App />
            </CartProvider>
        </FilterContextProvider>
    </AppProvider>
    );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

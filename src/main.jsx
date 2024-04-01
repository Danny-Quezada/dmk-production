import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'sonner';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster richColors/>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

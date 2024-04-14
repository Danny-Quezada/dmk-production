import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./Layouts/User/UserLayout.jsx";

import ErrorPage from "./pages/error-page.jsx";
import Inventory from "./pages/User/Inventory/Inventory.jsx";
import CalculatorPage from "./pages/User/Calculator/CalculatorPage.jsx";
import AuthLayout from "./Layouts/Auth/AuthLayout.jsx";
import Login from "./pages/Auth/Login.jsx";
import React from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>

        <Route path="/" element={<UserLayout />}>
          <Route path="inventory" element={<Inventory />} />
          <Route path="equation" element={<CalculatorPage />} />
        </Route>
    
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />}></Route>
      </Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;

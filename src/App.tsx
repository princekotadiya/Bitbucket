import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApiQuestion from "./componet/ApiQuestion";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ApiQuestion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

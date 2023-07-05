import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sales from "./components/pages/sales/Sales";
import Saleform from "./components/pages/sales/Saleform";
import Items from "./components/pages/items/Items";
import Company from "./components/pages/company/Company";
import Printbill from "./components/pages/sales/Printbill";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Sales />} />
      <Route path="/sales/add" element={<Saleform />} />
      <Route path="/sales/update/:id" element={<Saleform />} />
      <Route path="/sales/print-bill/:id" element={<Printbill />} />
      <Route path="/masters/items" element={<Items />} />
      <Route path="/masters/company" element={<Company />} />
    </Routes>
  );
}

export default App;

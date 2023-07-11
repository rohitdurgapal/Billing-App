import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Sales from "./components/pages/sales/Sales";
import Saleform from "./components/pages/sales/Saleform";
import Items from "./components/pages/items/Items";
import Company from "./components/pages/company/Company";
import Printbill from "./components/pages/sales/Printbill";
import AdminCheck from "./components/auth/AdminCheck";
import Category from "./components/pages/category/Category";
import SubCategory from "./components/pages/subcategory/SubCategory";
function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/" element={<AdminCheck />}>
        <Route path="/admin/masters/category" element={<Category />} />
        <Route path="/admin/masters/subcategory" element={<SubCategory />} />
        <Route path="/admin/sales" element={<Sales />} />
        <Route path="/admin/sales/add" element={<Saleform />} />
        <Route path="/admin/sales/update/:id" element={<Saleform />} />
        <Route path="/admin/sales/print-bill/:id" element={<Printbill />} />
        <Route path="/admin/masters/items" element={<Items />} />
        <Route path="/admin/masters/company" element={<Company />} />
      </Route>
    </Routes>
  );
}

export default App;

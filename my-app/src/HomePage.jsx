import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./Componts/PageNotFound";
import LoginPage from "./Componts/Login/LoginPage";
import RegistrationForm from "./Componts/Login/RegistrationForm";
import GetExpenseData from "./Componts/GetExpenseData";
import ExpenseForm from "./Componts/ExpenseForm";
import UpdateExpensedata from "./Componts/UpdateExpensedata";
import Footer from "./Componts/Footer";
import NavigationBar from "./Componts/NavigationBar";
import HomePageinside from "./Componts/HomePageInside";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <NavigationBar setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/Home" element={<HomePageinside />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/reportdata"
          element={<GetExpenseData searchQuery={searchQuery} />}
        />
        <Route path="/newdata" element={<ExpenseForm />} />
        <Route path="/editdate" element={<UpdateExpensedata />} />
      </Routes>
      <Footer />
    </div>
  );
}

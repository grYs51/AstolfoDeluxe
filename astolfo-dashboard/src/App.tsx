import React from "react";
import { Route, Routes } from "react-router-dom";
import { CategoryPage } from "./pages/CategoryPage";
import { GuildPrefixPage } from "./pages/GuildPrefixPage";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { WelcomeMessagePage } from "./pages/WelcomeMessagePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      {/* <Route path="/dashboard" element={<HomePage />} /> */}
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/guild/update/prefix" element={<GuildPrefixPage />} />
      <Route path="/guild/update/message" element={<WelcomeMessagePage />} />
    </Routes>
  );
}

export default App;

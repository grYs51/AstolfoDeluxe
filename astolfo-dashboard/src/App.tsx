import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CategoryPage } from "./pages/CategoryPage";
import { GuildPrefixPage } from "./pages/GuildPrefixPage";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { WelcomeMessagePage } from "./pages/WelcomeMessagePage";
import { GuildContext } from "./utils/contexts/GuildContext";

function App() {
  const [guildId, setGuildId] = useState('');
  const updateGuildId = (id: string) => setGuildId(id);

  return (
    <GuildContext.Provider value={{ guildId, updateGuildId }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        {/* <Route path="/dashboard" element={<HomePage />} /> */}
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/guild/update/prefix" element={<GuildPrefixPage />} />
        <Route path="/guild/update/message" element={<WelcomeMessagePage />} />
      </Routes>
    </GuildContext.Provider>
  );
}

export default App;

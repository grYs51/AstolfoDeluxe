import { useContext } from "react";
import { GuildContext } from "../utils/contexts/GuildContext";

export const CategoryPage = () => {
  const { guildId } = useContext(GuildContext);
  return <div> CategoryPage: {guildId}</div>;
};

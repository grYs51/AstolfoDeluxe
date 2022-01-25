import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GuildContext } from "../utils/contexts/GuildContext";
import { mockGuilds } from "../__mocks__/guilds";

export const MenuPage = () => {
  const navigate = useNavigate();
  const { updateGuildId } = useContext(GuildContext);

  return (
    <div>
      <ul>
        {mockGuilds.map((guild) => (
          <li
            onClick={() => {
              updateGuildId(guild.id);
              navigate("/categories");
            }}
          >
            {guild.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

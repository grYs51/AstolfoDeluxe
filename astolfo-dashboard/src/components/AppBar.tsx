import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GuildContext } from "../utils/contexts/GuildContext";
import { getIconUrl } from "../utils/helpers";
import { AppBarStyle } from "../utils/styles";

export const AppBar = () => {
  const { guild } = useContext(GuildContext);

  return guild ? (
    <AppBarStyle>
      <h1 style={{ fontWeight: "normal", fontSize: "20px" }}>
        Configuring: {guild!.name}
      </h1>
      <img
        src={getIconUrl(guild)}
        alt={guild.name}
        height={55}
        width={55}
        style={{
          borderRadius: "50px",
        }}
      />
    </AppBarStyle>
  ) : (
    <Navigate replace to={"/menu"} />
  );
};

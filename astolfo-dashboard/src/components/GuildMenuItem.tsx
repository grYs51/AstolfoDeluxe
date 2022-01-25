import { GuildMenuItemStyle } from "../utils/styles";

type Props = {
  guild: {
    id: string;
    name: string;
    iconUrl: string;
  };
};
export const GuildMenuItem = ({ guild }: Props) => (
  <GuildMenuItemStyle>
    <img
      style={{ borderRadius: "40px" }}
      width={40}
      height={40}
      src={guild.iconUrl}
      alt={guild.name}
    />
    <p>{guild.name}</p>
  </GuildMenuItemStyle>
);

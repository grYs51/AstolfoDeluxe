import { getIconUrl } from "../utils/helpers";
import { GuildMenuItemStyle } from "../utils/styles";
import { PartialGuild } from "../utils/types";

type Props = {
  guild: PartialGuild;
};
export const GuildMenuItem = ({ guild }: Props) => (
  <GuildMenuItemStyle>
    <img
      style={{ borderRadius: "40px" }}
      width={40}
      height={40}
      src={getIconUrl(guild)}
      alt={guild.name}
    />
    <p>{guild.name}</p>
  </GuildMenuItemStyle>
);

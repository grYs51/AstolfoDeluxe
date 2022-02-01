// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberUpdate
import { GuildMember } from "discord.js";
import BaseEvent from "../../../utils/structures/BaseEvent";
import DiscordClient from "../../../client/client";

export default class GuildMemberUpdateEvent extends BaseEvent {
  constructor() {
    super("guildMemberUpdate");
  }

  async run(
    client: DiscordClient,
    oldMember: GuildMember,
    newMember: GuildMember
  ) {
    console.log(
      oldMember.guild.name,
      oldMember.displayName,
      newMember.displayName
    );
  }
}

import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { getRepository, Repository } from "typeorm";
import { GuildBanLog } from "../../typeOrm/entities/GuildBanLog";
import { ModerationLog } from "../../typeOrm/entities/ModerationLog";

export default class BanCommand extends BaseCommand {
  constructor(
    private readonly modLogReposity: Repository<ModerationLog> = getRepository(
      ModerationLog
    )
  ) {
    super("ban", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const [memberId, ...rest] = args;
    const reason = rest.join(" ");
    try {
      const member = await message.guild?.members.fetch(memberId)!;
      await member.ban({ reason });
      const guildBan = this.modLogReposity.create({
        guildId: message.guildId!,
        memberId: memberId,
        issuedBy: message.author.id,
        reason,
        issuedOn: new Date(),
        type: "ban",
      });

      await this.modLogReposity.save(guildBan);
      message.react("✅");
    } catch (err) {
      console.log(err);
    }
  }
}

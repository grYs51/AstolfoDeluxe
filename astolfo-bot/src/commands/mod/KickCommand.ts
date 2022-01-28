import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { getRepository, Repository } from "typeorm";
import { GuildBanLog } from "../../typeOrm/entities/GuildBanLog";
import { ModerationLog } from "../../typeOrm/entities/ModerationLog";

export default class KickCommand extends BaseCommand {
  constructor(
    private readonly modLogRepository: Repository<ModerationLog> = getRepository(
      ModerationLog
    )
  ) {
    super("kick", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const [memberId, ...rest] = args;
    const reason = rest.join(" ");
    try {
      const member = await message.guild?.members.fetch(memberId)!;
      await member.kick(reason);
      const guildBan = this.modLogRepository.create({
        guildId: message.guildId!,
        memberId: memberId,
        issuedBy: message.author.id,
        reason,
        issuedOn: new Date(),
        type: "kick",
      });
      await this.modLogRepository.save(guildBan);
      message.react("✅");
    } catch (err) {
      console.log(err);
    }
  }
}

import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { getRepository, Repository } from "typeorm";
import { GuildBanLog } from "../../typeOrm/entities/GuildBanLog";
import { ModerationLog } from "../../typeOrm/entities/ModerationLog";

export default class TimeoutCommand extends BaseCommand {
  constructor(
    private readonly modLogRepository: Repository<ModerationLog> = getRepository(
      ModerationLog
    )
  ) {
    super("timeout", "mod", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const [memberId, timeoutStr, ...rest] = args;
    const reason = rest.join(" ");

    const duration = parseInt(timeoutStr);
    if (isNaN(duration)) {
      message.reply("Invalid Time!");
      return;
    }
    if (duration < 5 || duration > 300) {
      message.reply("Choose a time between 5s and 5m");
      return;
    }
    try {
      const member = await message.guild?.members.fetch(memberId)!;
      await member.timeout(duration * 1000, reason);
      const guildBan = this.modLogRepository.create({
        guildId: message.guildId!,
        MemberId: memberId,
        issuedBy: message.author.id,
        reason,
        issuedOn: new Date(),
        type: "timeout",
        duration,
      });
      await this.modLogRepository.save(guildBan);
      message.react("✅");
      return;
    } catch (err) {
      console.log(err);
      message.reply("Seems like I can't... <:AstolfCrying:936591595116044358>");
    }
  }
}

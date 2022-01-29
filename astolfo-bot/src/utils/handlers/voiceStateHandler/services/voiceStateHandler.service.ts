import { GuildAuditLogsResolvable, VoiceState } from "discord.js";
import { getRepository } from "typeorm";
import client from "../../../../client/client";
import { GuildStatsLog } from "../../../../typeOrm/entities/GuildsStatsLog";
import { IVoiceStateHandler } from "../interfaces/voiceStateHandler";

export class VoiceStateHandler implements IVoiceStateHandler {
  constructor(
    private readonly guildStatRepository = getRepository(GuildStatsLog)
  ) { }

  async memberAbused(
    oldState: VoiceState,
    newState: VoiceState,
    type: GuildAuditLogsResolvable
  ) {
    try {
      const fetchedLogs = await newState.guild.fetchAuditLogs({
        limit: 1,
        type,
      });

      const disconnectLog = fetchedLogs.entries.first();
      const { executor, createdAt } = disconnectLog!;

      if (executor!.id === oldState.member?.id) {
        return;
      }

      if (Math.abs(new Date().valueOf() - createdAt.valueOf()) / 1000 < 1) {
        console.log(
          `${executor!.username} ${type} ${oldState!.member?.user.username
          }`
        );

        this.guildStatRepository.save({
          guildId: oldState.guild.id,
          issuedBy: executor!.id,
          issuedOn: new Date(),
          memberId: oldState.member!.user.id,
          type: type!.toString(),
        });
        return;
      }

      console.log(`${oldState!.member?.user.username} ${type} himself`);
      return;
    } catch (error: any) {
      console.log(error.message);
    }
  }

}

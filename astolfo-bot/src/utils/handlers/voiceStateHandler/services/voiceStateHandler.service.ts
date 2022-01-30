import { GuildAuditLogsResolvable, User, VoiceState } from "discord.js";
import { getRepository } from "typeorm";
import { GuildStatsLog } from "../../../../typeOrm/entities/GuildsStatsLog";
import { IVoiceStateHandler } from "../interfaces/voiceStateHandler";

export class VoiceStateHandler implements IVoiceStateHandler {
  constructor(
    private readonly guildStatRepository = getRepository(GuildStatsLog)
  ) {}

  async memberAbused(oldState: VoiceState, newState: VoiceState, type: string) {
    const guildId = oldState.guild.id;
    const memberId = oldState.member?.id;
    try {
      const fetchedLogs = await newState.guild.fetchAuditLogs({
        limit: 1,
        type: type as GuildAuditLogsResolvable,
      });

      const disconnectLog = fetchedLogs.entries.first();
      if (disconnectLog?.changes) {
        type += `_${disconnectLog.changes[0].key.toString().toUpperCase()}`;
      }
      const { executor, createdAt } = disconnectLog!;

      if (executor!.id === oldState.member?.id) {
        return;
      }

      if (Math.abs(new Date().valueOf() - createdAt.valueOf()) / 1000 < 1) {
        console.log(
          `${executor!.username} ${type} ${oldState!.member?.user.username}`
        );

        await this.saveRepository(guildId, executor!.id, memberId!, type);
        return;
      }

      // console.log(`${oldState!.member?.user.username} ${type} himself`);
      return;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async memberHimself(
    oldState: VoiceState,
    newState: VoiceState,
    type: string
  ) {
    try {
      await this.saveRepository(
        oldState.guild.id,
        undefined,
        oldState.member!.id,
        type
      );
    } catch (e) {}
  }

  private async saveRepository(
    guildId: string,
    issuedBy: string | undefined,
    memberId: string,
    type: string,
    issuedOn = new Date()
  ) {
    await this.guildStatRepository.save({
      guildId,
      issuedBy,
      issuedOn,
      memberId,
      type,
    });
  }
}

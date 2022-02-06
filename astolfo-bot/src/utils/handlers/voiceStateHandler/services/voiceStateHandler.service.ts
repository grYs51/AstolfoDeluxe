import {
  GuildAuditLogsResolvable,
  NewsChannel,
  User,
  VoiceState,
} from "discord.js";
import { getRepository, Repository } from "typeorm";
import { GuildStatsLog } from "../../../../typeOrm/entities/GuildsStatsLog";
import { VoiceType } from "../../../types";
import { IVoiceStateHandler } from "../interfaces/voiceStateHandler";

export class VoiceStateHandler implements IVoiceStateHandler {
  constructor(
    private readonly guildStatRepository: Repository<GuildStatsLog> = getRepository(
      GuildStatsLog
    )
  ) {}

  async memberAbused(
    oldState: VoiceState,
    newState: VoiceState,
    type: VoiceType
  ) {
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
      let newChannel: string | undefined = undefined;
      if (type === "MEMBER_MOVE") {
        newChannel = newState.channelId!;
      }

      if (Math.abs(new Date().valueOf() - createdAt.valueOf()) / 1000 < 1) {
        console.log(
          `${executor!.username} ${type} ${oldState!.member?.user.username}`
        );

        await this.saveRepository(
          guildId,
          memberId!,
          executor!.id,
          oldState.channelId!,
          newChannel,
          type
        );
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
    type: VoiceType
  ) {
    try {
      await this.saveRepository(
        oldState.guild.id,
        oldState.member!.id,
        undefined,
        oldState.channelId!,
        undefined,
        type
      );
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async saveRepository1(guildLog: GuildStatsLog) {
    await this.guildStatRepository.save(guildLog);
  }
  async saveRepository(
    guildId: string,
    memberId: string,
    issuedBy: string | undefined,
    channel: string,
    newChannel: string | undefined,
    type: VoiceType,
    issuedOn = new Date()
  ) {
    await this.guildStatRepository.save({
      guildId,
      memberId,
      issuedBy,
      channel,
      newChannel,
      issuedOn,
      type,
    });
  }
}

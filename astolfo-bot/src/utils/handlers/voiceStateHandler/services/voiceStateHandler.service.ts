import { Client, GuildAuditLogsResolvable, VoiceState } from 'discord.js';
import { getRepository, Repository } from 'typeorm';
import { GuildStatsLog } from '../../../../typeOrm/entities/GuildsStatsLog';
import { Info, VoiceType } from '../../../types';
import { IVoiceStateHandler } from '../interfaces/voiceStateHandler';

export class VoiceStateHandler implements IVoiceStateHandler {
  constructor(
    private readonly guildStatRepository: Repository<GuildStatsLog> = getRepository(
      GuildStatsLog,
    ),
  ) {}

  async memberAbused(
    oldState: VoiceState,
    newState: VoiceState,
    type: VoiceType,
    date: Date,
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
      if (type === 'MEMBER_MOVE') {
        newChannel = newState.channelId!;
      }

      if (Math.abs(date.valueOf() - createdAt.valueOf()) / 1000 < 1) {
        console.log(
          `${executor!.username} ${type} ${oldState!.member?.user.username}`,
        );

        await this.saveRepository(
          guildId,
          memberId!,
          executor!.id,
          oldState.channelId!,
          newChannel,
          type,
        );
        return;
      }
      return;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async memberHimself(
    oldState: VoiceState,
    newState: VoiceState,
    type: VoiceType,
    date: Date,
  ) {
    try {
      await this.saveRepository(
        oldState.guild.id,
        oldState.member!.id,
        undefined,
        oldState.channelId!,
        undefined,
        type,
        date,
      );
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async saveRepository1(guildLog: GuildStatsLog) {
    try {
      await this.guildStatRepository.save(guildLog);
    } catch (e) {
      console.log(e);
    }
  }
  async saveRepository(
    guildId: string,
    memberId: string,
    issuedBy: string | undefined,
    channel: string,
    newChannel: string | undefined,
    type: VoiceType,
    issuedOn = new Date(),
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
  async getAudit(userInfo: Info, type: VoiceType, voiceState: VoiceState) {
    try {
      const fetchedLogs = await voiceState.guild.fetchAuditLogs({
        limit: 1,
        type: type as GuildAuditLogsResolvable,
      });
      type = type.slice(0, -5) as VoiceType;

      const disconnectLog = fetchedLogs.entries.first();
      if (disconnectLog?.changes) {
        type += `_${disconnectLog.changes[0].key.toString().toUpperCase()}`;
      }
      const { executor, createdAt } = disconnectLog!;

      if (executor!.id === voiceState.member?.id) {
        return;
      }
      let newChannel: string | undefined = undefined;
      if (type === 'MEMBER_MOVE') {
        newChannel = voiceState.channelId!;
      }

      if (Math.abs(new Date().valueOf() - createdAt.valueOf()) / 1000 < 1) {
        console.log(
          `${executor!.username} ${type} ${voiceState!.member?.user.username}`,
        );
        const issuedBy = executor?.id;
        return { issuedBy, newChannel, type };
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

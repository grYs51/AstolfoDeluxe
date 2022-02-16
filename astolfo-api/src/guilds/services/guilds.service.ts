import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ChannelInfo from 'src/utils/typeorm/entities/ChannelInfo';
import GuildConfiguration from 'src/utils/typeorm/entities/GuildConfiguration';
import GuildInfo from 'src/utils/typeorm/entities/GuildInfo';
import GuildMemberInfo from 'src/utils/typeorm/entities/GuildMemberInfo';
import GuildStatsLog from 'src/utils/typeorm/entities/GuildStatsLog';
import ModerationLog from 'src/utils/typeorm/entities/ModerationLog';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { IGuildService } from '../interfaces/guilds';

@Injectable()
export default class GuildService implements IGuildService {
  constructor(
    @InjectRepository(GuildConfiguration)
    private readonly guildConfigRepository: Repository<GuildConfiguration>,
    @InjectRepository(ModerationLog)
    private readonly modLogRepository: Repository<ModerationLog>,
    @InjectRepository(GuildStatsLog)
    private readonly statsLogRepository: Repository<GuildStatsLog>,
    @InjectRepository(GuildMemberInfo)
    private readonly guildMemberRepository: Repository<GuildMemberInfo>,
    @InjectRepository(GuildInfo)
    private readonly guildInfoRepository: Repository<GuildInfo>,
    @InjectRepository(ChannelInfo)
    private readonly channelInfoRepository: Repository<ChannelInfo>,
  ) {}

  async getGuildConfig(guildId: string): Promise<GuildConfiguration> {
    const guildConfig = await this.guildConfigRepository.findOne({ guildId });
    if (!guildConfig) {
      throw new HttpException(
        'Guild configuration was not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return guildConfig;
  }

  async getGuildInfo(guildId: string): Promise<GuildInfo> {
    const guildInfo = await this.guildInfoRepository.findOne(guildId);
    if (!guildInfo) {
      throw new HttpException('Guild Info was not found', HttpStatus.NOT_FOUND);
    }

    return guildInfo;
  }

  async updateGuildPrefix(
    guildId: string,
    prefix: string,
  ): Promise<GuildConfiguration> {
    const guildConfig = await this.getGuildConfig(guildId);
    if (!guildConfig) {
      throw new HttpException(
        'Guild configuration was not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.guildConfigRepository.save({
      ...guildConfig,
      prefix,
    });
  }

  async updateWelcomeChannel(guildId: string, welcomeChannelId: string) {
    const guildConfig = await this.getGuildConfig(guildId);
    if (!guildConfig) {
      throw new HttpException(
        'Guild configuration was not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.guildConfigRepository.save({
      ...guildConfig,
      welcomeChannelId,
    });
  }

  async getGuildLogs(
    guildId: string,
    fromDate?: Date,
  ): Promise<ModerationLog[]> {
    return fromDate
      ? this.modLogRepository.find({
          where: {
            guildId,
            issuedOn: MoreThanOrEqual(fromDate),
          },
        })
      : this.modLogRepository.find({ guildId });
  }

  async getGuildStats(
    guildId: string,
    fromDate?: Date,
  ): Promise<GuildStatsLog[]> {
    return fromDate
      ? this.statsLogRepository.find({
          where: {
            guildId,
            issuedOn: MoreThanOrEqual(fromDate),
          },
        })
      : this.statsLogRepository.find({
          where: {
            guildId,
          },
          relations: [
            'member',
            'member.user',
            'issuedBy',
            'issuedBy.user',
            'channel',
            'newChannel',
          ],
        });
  }

  async getMembers(guildId: string): Promise<GuildMemberInfo[]> {
    return this.guildMemberRepository.find({
      where: {
        guild: guildId,
      },
      relations: ['user'],
    });
  }

  async getChannels(guildId: string): Promise<ChannelInfo[]> {
    return this.channelInfoRepository.find({
      where: {
        guildId,
      },
    });
  }
}

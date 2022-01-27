import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GuildBanLog } from 'src/utils/typeorm/entities/GuildBanLog';
import { GuildConfiguration } from 'src/utils/typeorm/entities/GuildConfiguration';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { IGuildService } from '../interfaces/guilds';

@Injectable()
export class GuildService implements IGuildService {
  constructor(
    @InjectRepository(GuildConfiguration)
    private readonly guildConfigRepository: Repository<GuildConfiguration>,
    @InjectRepository(GuildBanLog)
    private readonly banLogRepository: Repository<GuildBanLog>,
  ) {}

  async getGuildConfig(guildId: string): Promise<GuildConfiguration> {
    const guildConfig = await this.guildConfigRepository.findOne({ guildId });
    if (!guildConfig)
      throw new HttpException(
        'Guild configuration was not found',
        HttpStatus.NOT_FOUND,
      );

    return guildConfig;
  }

  async updateGuildPrefix(
    guildId: string,
    prefix: string,
  ): Promise<GuildConfiguration> {
    const guildConfig = await this.getGuildConfig(guildId);
    if (!guildConfig)
      throw new HttpException(
        'Guild configuration was not found',
        HttpStatus.NOT_FOUND,
      );

    return this.guildConfigRepository.save({
      ...guildConfig,
      prefix,
    });
  }
  async updateWelcomeChannel(guildId: string, welcomeChannelId: string) {
    const guildConfig = await this.getGuildConfig(guildId);
    if (!guildConfig)
      throw new HttpException(
        'Guild configuration was not found',
        HttpStatus.NOT_FOUND,
      );

    return this.guildConfigRepository.save({
      ...guildConfig,
      welcomeChannelId,
    });
  }

  async getGuildBans(guildId: string, fromDate?: Date): Promise<GuildBanLog[]> {
    return this.banLogRepository.find({
      where: {
        guildId,
        issuedOn: MoreThanOrEqual(fromDate),
      },
    });
  }
}

import { Client, ClientOptions, Collection } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import BaseCommand from '../utils/structures/BaseCommand';
import { GuildConfiguration } from '../typeOrm/entities/GuildConfiguration';
import { GuildStatsLog } from '../typeOrm/entities/GuildsStatsLog';

export default class DiscordClient extends Client {
  private _commands = new Collection<string, BaseCommand>();
  private _events = new Collection<string, BaseEvent>();
  private _configs = new Collection<string, GuildConfiguration>();
  private _voiceUsers = new Array<GuildStatsLog>();

  constructor(options: ClientOptions) {
    super(options);
  }

  get commands(): Collection<string, BaseCommand> {
    return this._commands;
  }

  get events(): Collection<string, BaseEvent> {
    return this._events;
  }

  get configs(): Collection<string, GuildConfiguration> {
    return this._configs;
  }

  get voiceUsers(): Array<GuildStatsLog> {
    return this._voiceUsers;
  }

  set configs(guildConfigs: Collection<string, GuildConfiguration>) {
    this._configs = guildConfigs;
  }

  set voiceUsers(GuildStatsLogs: Array<GuildStatsLog>) {
    this._voiceUsers = GuildStatsLogs;
  }
}

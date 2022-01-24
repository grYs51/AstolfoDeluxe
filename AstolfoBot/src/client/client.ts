import { Client, ClientOptions, Collection } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import BaseCommand from '../utils/structures/BaseCommand';
import { GuildConfiguration } from '../typeOrm/entities/GuildConfiguration';

export default class DiscordClient extends Client {

  private _commands = new Collection<string, BaseCommand>();
  private _events = new Collection<string, BaseEvent>();
  private _prefix: string = '!';
  private _configs = new Collection<string, GuildConfiguration>()

  constructor(options: ClientOptions) {
    super(options);
  }

  get commands(): Collection<string, BaseCommand> { return this._commands; }
  get events(): Collection<string, BaseEvent> { return this._events; }
  get prefix(): string { return this._prefix; }
  get configs(): Collection<string, GuildConfiguration> { return this._configs; }

  set prefix(prefix: string) { this._prefix = prefix; }
  set configs(guildConfigs: Collection<string, GuildConfiguration>) { this._configs = guildConfigs }



}

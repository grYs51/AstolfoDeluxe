require('dotenv').config();
import 'reflect-metadata';
import { registerCommands, registerEvents } from './utils/registry';
import config from '../slappey.json';
import DiscordClient from './client/client';
import { Collection, Intents } from 'discord.js';
import { createConnection, getRepository } from 'typeorm';
import { GuildConfiguration } from './typeOrm/entities/GuildConfiguration';
const client = new DiscordClient({
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS]
});

(async () => {
  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [GuildConfiguration]
  })

  // client.prefix = config.prefix || client.prefix;
  const configRepo = getRepository(GuildConfiguration);
  const guildConfigs = await configRepo.find();
  const configs = new Collection<string, GuildConfiguration>();
  guildConfigs.forEach((config) => configs.set(config.guildId, config))
  client.configs = configs;


  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.BOT_TOKEN);
})();
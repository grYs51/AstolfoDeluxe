import { CommandInteraction, CacheType } from 'discord.js';
import { env } from 'process';
import DiscordInteractions, { PartialApplicationCommand } from 'slash-commands';
import client from '../../client/client';
import { InitHandler } from '../../utils/handlers/initHandler/init.service';
import BaseSlash from '../../utils/structures/BaseSlash';

export default class initEvent extends BaseSlash {
  inithandler = new InitHandler();
  constructor() {
    super('init');
  }

  async createInteraction(
    client: client,
    interaction: DiscordInteractions,
  ): Promise<void> {
    const command: PartialApplicationCommand = {
      name: 'init',
      description: 'Initialize the db',
    };

    await interaction
      .createApplicationCommand(command)
      .then(() => {
        console.log('Init command created!');
      })
      .catch(console.error);
  }
  async run(
    client: client,
    interaction: CommandInteraction<CacheType>,
  ): Promise<void> {
    if (interaction.user.id !== process.env.OWNER) {
      return interaction.reply({
        content: 'You are not allowed to do that!',
        ephemeral: true,
      });
    }

    await interaction.reply(
      this.reply(undefined, undefined, undefined, undefined, undefined),
    );

    const users = await this.inithandler.initUsers(client);
    await interaction.editReply(
      this.reply(users, undefined, undefined, undefined, undefined),
    );

    const roles = await this.inithandler.initRoles(client);
    await interaction.editReply(
      this.reply(users, roles, undefined, undefined, undefined),
    );

    const guilds = await this.inithandler.initGuilds(client);
    await interaction.editReply(
      this.reply(users, roles, guilds, undefined, undefined),
    );

    const members = await this.inithandler.initGuildMembers(client);
    await interaction.editReply(
      this.reply(users, roles, guilds, members, undefined),
    );

    const channels = await this.inithandler.initChannels(client);
    await interaction.editReply(
      this.reply(users, roles, guilds, members, channels),
    );
  }

  reply(
    users: init | undefined,
    roles: init | undefined,
    guilds: init | undefined,
    members: init | undefined,
    channels: init | undefined,
  ): string {
    return `
    \`\`\`
  Entities       Amount   Duration  
 -------------- -------- ---------- 
  Users          ${users ? users.total + ' ' : '~'}      ${
      users ? users.duration + 's' : 'Loading'
    }   
  Roles          ${roles ? roles.total + ' ' : '~'}      ${
      roles ? roles.duration + 's' : 'Loading'
    }   
  Guilds         ${guilds ? guilds.total + '  ' : '~'}      ${
      guilds ? guilds.duration + 's' : 'Loading'
    }   
  Members        ${members ? members.total + ' ' : '~'}      ${
      members ? members.duration + 's' : 'Loading'
    }   
  Member Roles   ${members ? members.totalRoles : '~'}      ${
      members ? members.duration + 's' : 'Loading'
    }   
  Channels       ${channels ? channels.total + ' ' : '~'}      ${
      channels ? channels.duration + 's' : 'Loading'
    }   \`\`\`
    `;
  }
}

interface init {
  total: string | number;
  duration: string | number;
  totalRoles?: string | number;
}

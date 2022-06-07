// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-interactionCreate
import { Interaction } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import BaseModal from '../../utils/structures/BaseModal';

export default class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super('interactionCreate');
  }

  async run(client: DiscordClient, interaction: Interaction) {
    if (!interaction.isCommand()) return;
    const slash = client.slashs.get(interaction.commandName);
    if (!slash) return;
    slash.run(client, interaction);
  }
}

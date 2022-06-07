import {
  Modal,
  SelectMenuComponent,
  showModal,
  TextInputComponent,
  ModalSubmitInteraction,
} from 'discord-modals';
import { CacheType, CommandInteraction } from 'discord.js';
import DiscordInteractions, { PartialApplicationCommand } from 'slash-commands';
import client from '../../client/client';
import BaseModal from '../../utils/structures/BaseModal';

const modal = new Modal() 
  .setTitle('Modal')
  .addComponents(
    new TextInputComponent() 
      .setCustomId('name')
      .setLabel('Name')
      .setStyle('SHORT')
      .setPlaceholder('Write your name here')
      .setRequired(true) as any,
    new SelectMenuComponent() 
      .setCustomId('theme')
      .setPlaceholder('What theme of Discord do you like?')
      .addOptions(
        {
          label: 'Dark',
          description: 'The default theme of Discord.',
          value: 'dark',
        },
        {
          label: 'Light',
          description: 'Some people hate it, some people like it.',
          value: 'light',
        },
      ),
  );

export default class ModalEvent extends BaseModal {
  constructor() {
    super('modal');
    modal.setCustomId(this.getName());
  }

  async run(client: client, interaction: CommandInteraction<CacheType>) {
    showModal(modal, { client, interaction });
  }

  async createInteraction(client: client, interaction: DiscordInteractions) {
    const command: PartialApplicationCommand = {
      name: 'modal',
      description: 'Modal!',
    };

    await interaction
      .createApplicationCommand(command)
      .then(() => {
        console.log('Modal command created!');
      })
      .catch(console.error);
  }

  modal(client: client, modal: ModalSubmitInteraction): void {
    modal.reply({
      content: 'Your name is: ' + modal.getTextInputValue('name'),
      ephemeral: true,
    });
  }
}

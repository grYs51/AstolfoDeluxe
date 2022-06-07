
import { ModalSubmitInteraction } from 'discord-modals';
import DiscordClient from '../../client/client';
import BaseSlash from './BaseSlash';

export default abstract class BaseModal extends BaseSlash {
  constructor(name: string) {
    super(name);
  }

  abstract modal(
    client: DiscordClient,
    modal: ModalSubmitInteraction,
  ): void;
}

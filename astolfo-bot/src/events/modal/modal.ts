import { ModalSubmitInteraction } from "discord-modals";
import DiscordClient from "../../client/client";
import BaseEvent from "../../utils/structures/BaseEvent";
import BaseModal from "../../utils/structures/BaseModal";

export default class InteractionCreateEvent extends BaseEvent {
  constructor() {
    super('modalSubmit');
  }

  async run(client: DiscordClient, modal: ModalSubmitInteraction) {
    const slash = client.slashs.get(modal.customId) as BaseModal;
    if(!slash) return;
    slash.modal(client, modal);
  }
}


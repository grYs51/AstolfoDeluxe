// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate
import { VoiceState } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import { VoiceStateHandler } from "../utils/handlers/voiceStateHandler/services/VoiceStateHandler.service";

export default class VoiceStateUpdateEvent extends BaseEvent {
  voiceStateHandler = new VoiceStateHandler();

  constructor() {
    super("voiceStateUpdate");
  }

  async run(client: DiscordClient, oldState: VoiceState, newState: VoiceState) {
    await new Promise((resolve) => setTimeout(resolve, 100));

    // User leaves a voice channel
    if (newState.channel === null) {
      console.log(oldState.member?.user.username + " disconnect");
      this.voiceStateHandler.memberAbused(oldState, newState, "MEMBER_DISCONNECT");
    }

    // User joins a voice channel
    if (oldState.channel === null) {
      console.log(oldState.member?.user.username + " joins");
    }

    // User moves from voice channel
    if (oldState.channel !== null && newState.channel !== null) {
      console.log(oldState.member?.user.username + " moves");
      this.voiceStateHandler.memberAbused(oldState, newState, "MEMBER_MOVE");

    }
  }
}

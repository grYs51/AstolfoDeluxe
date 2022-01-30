// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate
import { GuildAuditLogsResolvable, VoiceState } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import { VoiceStateHandler } from "../utils/handlers/voiceStateHandler/services/voiceStateHandler.service";
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
      this.voiceStateHandler.memberAbused(
        oldState,
        newState,
        "MEMBER_DISCONNECT"
      );
    }

    // User joins a voice channel
    if (oldState.channel === null) {
      console.log(oldState.member?.user.username + " joins");
    }

    // User moves from voice channel
    if (oldState.channel !== null && newState.channel !== null) {
      const user = oldState.member!.user.username;

      const auditlog = this.getResolvable(user, oldState, newState);

      if (!auditlog) return;

      if (auditlog.includes("MEMBER_")) {
        this.voiceStateHandler.memberAbused(oldState, newState, auditlog);
      } else {
        this.voiceStateHandler.memberHimself(oldState, newState, auditlog);
      }
    }
  }

  private getResolvable(
    username: string,
    oldstate: VoiceState,
    newState: VoiceState
  ): string | null {
    const {
      selfDeaf: OldSelfDeaf,
      selfMute: oldSelfMute,
      selfVideo: oldSelfVideo,
      serverDeaf: oldServerDeaf,
      serverMute: oldServerMute,
      streaming: oldStreaming,
    } = oldstate;
    const {
      selfDeaf: newSelfDeaf,
      selfMute: newSelfMute,
      selfVideo: newSelfVideo,
      serverDeaf: newServerDeaf,
      serverMute: newServerMute,
      streaming: newStreaming,
    } = newState;

    if (OldSelfDeaf === false && newSelfDeaf) {
      return "DEAFEN";
    }
    if (oldSelfMute === false && newSelfMute) {
      return "MUTED";
    }
    if (oldSelfVideo === false && newSelfVideo) {
      return "VIDEO";
    }
    if (oldServerDeaf === false && newServerDeaf) {
      return "MEMBER_UPDATE";
    }
    if (oldServerMute === false && newServerMute) {
      return "MEMBER_UPDATE";
    }
    if (oldStreaming === false && newStreaming) {
      return "STREAMING";
    }

    if (oldstate.channelId !== newState.channelId) {
      return "MEMBER_MOVE";
    }

    return null;
  }
}

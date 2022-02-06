// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate
import { Collection, NewsChannel, VoiceState } from "discord.js";
import BaseEvent from "../../utils/structures/BaseEvent";
import DiscordClient from "../../client/client";
import { GuildStatsLog } from "../../typeOrm/entities/GuildsStatsLog";
import { VoiceStateHandler } from "../../utils/handlers/voiceStateHandler/services/voiceStateHandler.service";
import { VoiceType } from "../../utils/types";

const table: any[] = [{}];

export default class VoiceDurationUpdateEvent extends BaseEvent {
  voiceStateHandler = new VoiceStateHandler();
  constructor() {
    super("voiceStateUpdate");
  }

  async run(client: DiscordClient, oldState: VoiceState, newState: VoiceState) {
    await new Promise((resolve) => setTimeout(resolve, 100));

    // User joins a voice channel
    if (oldState.channel === null) {
      // console.log(oldState.member?.user.username + " joins");
      this.setVoiceUser(client.voiceUsers, newState, "VOICE");
    }

    if (newState.channel === null) {
      // console.log(oldState.member?.user.username + " disconnect");
      this.endVoiceUser(client.voiceUsers, oldState);
    }

    if (oldState.channel !== null && newState.channel !== null) {
      if (oldState.channelId !== newState.channelId) {
        await this.endVoiceUser(client.voiceUsers, oldState);
        this.setVoiceUser(client.voiceUsers, newState, "VOICE");
      }
    }
  }
  private async endVoiceUser(
    voiceUsers: GuildStatsLog[],
    oldState: VoiceState
  ) {
    const voiceUser = voiceUsers.filter(
      (voiceUser) => voiceUser.memberId === oldState.member!.id
    );

    voiceUser.forEach((voice) => {
      voice.endedOn = new Date();
    });

    for (let voice of voiceUser) {
      await this.voiceStateHandler.saveRepository1(voice);
    }
    voiceUsers = voiceUsers.filter(
      (voiceUser) => voiceUser.memberId !== oldState.member!.id
    );
  }

  private setVoiceUser(
    voiceUsers: Array<GuildStatsLog>,
    newState: VoiceState,
    type: VoiceType
  ) {
    const guildStat: GuildStatsLog = {
      guildId: newState.guild.id,
      memberId: newState.member!.id,
      channel: newState.channelId!,
      type,
      issuedOn: new Date(),
    };
    voiceUsers.push(guildStat);
  }
}

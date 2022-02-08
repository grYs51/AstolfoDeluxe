// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate
import { Collection, NewsChannel, VoiceState } from 'discord.js';
import BaseEvent from '../../utils/structures/BaseEvent';
import DiscordClient from '../../client/client';
import { GuildStatsLog } from '../../typeOrm/entities/GuildsStatsLog';
import { VoiceStateHandler } from '../../utils/handlers/voiceStateHandler/services/voiceStateHandler.service';
import { VoiceType } from '../../utils/types';

enum types {
  DEAF = 'selfDeaf',
  MUTE = 'selfMute',
  VIDEO = 'selfVideo',
  MEMBER_UPDATE_DEAF = 'serverDeaf',
  MEMBER_UPDATE_MUTE = 'serverMute',
  STREAMING = 'streaming',
}

export default class VoiceDurationUpdateEvent extends BaseEvent {
  voiceStateHandler = new VoiceStateHandler();
  constructor() {
    super('voiceStateUpdate');
  }

  async run(client: DiscordClient, oldState: VoiceState, newState: VoiceState) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const voiceUsers = client.voiceUsers;

    // User joins a voice channel
    if (oldState.channel === null) {
      // console.log(oldState.member?.user.username + " joins");

      this.setVoiceUser(voiceUsers, newState, 'VOICE');
    }

    if (newState.channel === null) {
      // console.log(oldState.member?.user.username + " disconnect");
      this.endVoiceUser(voiceUsers, oldState);
    }

    if (oldState.channel !== null && newState.channel !== null) {
      if (oldState.channelId !== newState.channelId) {
        await this.endVoiceUser(voiceUsers, oldState);
        this.setVoiceUser(voiceUsers, newState, 'VOICE');
        return;
      }
    }
  }
  private async endVoiceUser(
    voiceUsers: GuildStatsLog[],
    oldState: VoiceState,
  ) {
    const voiceUser = voiceUsers
      .filter((voiceUser) => voiceUser.memberId === oldState.member!.id)
      .map((voice) => {
        voice.endedOn = new Date();
        return voice;
      });

    for (let voice of voiceUser) {
      await this.voiceStateHandler.saveRepository1(voice);
    }
    voiceUsers = voiceUsers.filter(
      (voiceUser) => voiceUser.memberId !== oldState.member!.id,
    );
  }

  private setVoiceUser(
    voiceUsers: Array<GuildStatsLog>,
    newState: VoiceState,
    type: VoiceType,
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
  private functor(oldState: boolean, newState: boolean, type: String) {
    if (oldState !== newState) {
      return newState ? type : '';
    } else {
      return null;
    }
  }
}

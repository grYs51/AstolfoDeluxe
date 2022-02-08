// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate
import { Client, Collection, NewsChannel, VoiceState } from 'discord.js';
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
  users: Array<GuildStatsLog>;
  voiceStateHandler = new VoiceStateHandler();
  constructor() {
    super('voiceStateUpdate');
  }

  async run(client: DiscordClient, oldState: VoiceState, newState: VoiceState) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const userInfo: Info = {
      guildId: newState.guild.id,
      memberId: newState.member!.id,
      channel: newState.channelId!,
    };

    // User joins a voice channel
    if (oldState.channel === null) {
      this.setParametersOnConnect(newState, client.voiceUsers, userInfo);
      this.setVoiceUser(client.voiceUsers, userInfo, 'VOICE');
    }

    // User leaves a voice channel
    if (newState.channel === null) {
      this.endVoiceUser(client.voiceUsers, oldState);
    }

    // users stays in a voicechannel
    if (oldState.channel !== null && newState.channel !== null) {
      if (oldState.channelId !== newState.channelId) {
        await this.endVoiceUser(client.voiceUsers, oldState);
        this.setVoiceUser(client.voiceUsers, userInfo, 'VOICE');
        return;
      }

      this.setParametrsOnChange(
        oldState,
        newState,
        client.voiceUsers,
        userInfo,
      );
    }
  }
  private async endVoiceUser(
    voiceUsers: GuildStatsLog[],
    oldState: VoiceState,
  ) {
    // const voiceUser = voiceUsers
    //   .filter((voiceUser) => voiceUser.memberId === oldState.member!.id)
    //   .map((voice) => {
    //     voice.endedOn = new Date();
    //     return voice;
    //   });

    // for (let voice of voiceUser) {
    //   await this.voiceStateHandler.saveRepository1(voice);
    // }
    const endDate = new Date();
    for (let i = voiceUsers.length - 1; i >= 0; i--) {
      const voiceUser = voiceUsers[i];
      if (voiceUser.memberId === oldState.member!.id) {
        voiceUser.endedOn = endDate;
        await this.voiceStateHandler.saveRepository1(voiceUser);
        voiceUsers.splice(i, 1);
      }
    }
  }

  private setVoiceUser(
    voiceUsers: Array<GuildStatsLog>,
    userInfo: Info,
    type: VoiceType,
  ) {
    const guildStat: GuildStatsLog = {
      ...userInfo,
      type,
      issuedOn: new Date(),
    };
    voiceUsers.push(guildStat);
  }

  // Eris Code
  private functor(
    oldState: boolean,
    newState: boolean,
    type: VoiceType,
    voiceUsers: Array<GuildStatsLog>,
    userInfo: Info,
  ) {
    if (oldState !== newState) {
      return newState
        ? this.setVoiceUser(voiceUsers, userInfo, type)
        : this.endState(voiceUsers, userInfo, type);
    } else {
      return null;
    }
  }

  private async endState(
    voiceUsers: GuildStatsLog[],
    userInfo: Info,
    type: VoiceType,
  ) {
    const endDate = new Date();
    console.log(type)
    for (let i = voiceUsers.length - 1; i >= 0; i--) {
      const voiceUser = voiceUsers[i];
      if (voiceUser.memberId === userInfo.memberId && voiceUser.type === type) {
        voiceUser.endedOn = endDate;
        await this.voiceStateHandler.saveRepository1(voiceUser);
        voiceUsers.splice(i, 1);
      }
    }

    // let state = voiceUsers.find(
    //   (user) => user.memberId === userInfo.memberId && user.type === type,
    // );
    // if (!state) return;

    // state.endedOn = new Date();

    // voiceUsers.forEach((user, index) => {
    //   if (user.memberId === userInfo.memberId && user.type === type)
    //     voiceUsers.splice(index, 1);
    // });

    // await this.voiceStateHandler.saveRepository1(state);
  }
  private setParametersOnConnect(
    voicestate: VoiceState,
    voiceUsers: Array<GuildStatsLog>,
    userInfo: Info,
  ) {
    for (let value of enumKeys(types)) {
      (voicestate as any)[types[value]]
        ? this.setVoiceUser(voiceUsers, userInfo, value)
        : null;
    }
  }

  private setParametrsOnChange(
    oldState: VoiceState,
    newState: VoiceState,
    voiceUsers: Array<GuildStatsLog>,
    userInfo: Info,
  ) {
    for (let value of enumKeys(types)) {
      this.functor(
        (oldState as any)[types[value]],
        (newState as any)[types[value]],
        value,
        voiceUsers,
        userInfo,
      );
    }
  }
}

interface Info {
  guildId: string;
  memberId: string;
  channel: string;
}
function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

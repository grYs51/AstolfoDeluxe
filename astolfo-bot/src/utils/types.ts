export type ModerationActionType = 'ban' | 'kick' | 'timeout';

export type VoiceType =
  | 'VOICE'
  | 'MUTE'
  | 'DEAF'
  | 'VIDEO'
  | 'MEMBER_UPDATE'
  | 'STREAMING'
  | 'MEMBER_DISCONNECT'
  | 'MEMBER_UPDATE_DEAF'
  | 'MEMBER_UPDATE_MUTE'
  | 'MEMBER_MOVE';

export interface Info {
  guildId: string;
  memberId: string;
  channel: string;
}

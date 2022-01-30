import { GuildAuditLogsResolvable, VoiceState } from "discord.js";
import DiscordClient from "../../../../client/client";

export interface IVoiceStateHandler {
  memberAbused(oldState: VoiceState, newState: VoiceState, type: string): any;
  memberHimself(oldState: VoiceState, newState: VoiceState, type: string): any;
}

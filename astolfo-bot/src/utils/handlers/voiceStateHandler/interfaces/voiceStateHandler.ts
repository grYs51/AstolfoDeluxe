import { GuildAuditLogsResolvable, VoiceState } from "discord.js";
import DiscordClient from "../../../../client/client";

export interface IVoiceStateHandler {
  memberAbused(
    oldState: VoiceState,
    newState: VoiceState,
    type: GuildAuditLogsResolvable 
  ): any;
}

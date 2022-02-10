/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { guildStats } from 'src/app/shared/Types';

const data: guildStats[] = [
  {
    id: '89237c46-031d-4680-8313-474ff7fdfff8',
    guildId: '773917076824916038',
    newChannel: null,
    type: 'VOICE',
    issuedOn: '2022-02-09T15:48:20.821Z',
    endedOn: '2022-02-09T15:48:24.713Z',
    member: {
      memberId: '148824637004840961773917076824916038',
      guildName: 'GrYs',
      guildAvatar: null,
      guildColor: '#000000',
      joinedAt: '2022-01-24T21:15:55.773Z',
      user: {
        id: '148824637004840961',
        name: 'GrYs',
        discriminator: '0011',
        avatar:
          'https://cdn.discordapp.com/avatars/148824637004840961/a_ee72c73ed71738a0e7e28acc6363e9ca.webp',
        bot: false,
        createdAt: '2016-02-15T16:15:58.490Z',
      },
    },
    issuedBy: null,
    channel: {
      channelId: '773917077840461827',
      guildId: '773917076824916038',
      name: 'General',
      nsfw: null,
      type: 'GUILD_VOICE',
      position: 0,
      createdAt: '2020-11-05T14:30:10.041Z',
      topic: null,
    },
  },
  {
    id: '3ed557ff-bd90-479c-8b41-5e8c395d019e',
    guildId: '773917076824916038',
    newChannel: null,
    type: 'VOICE',
    issuedOn: '2022-02-09T15:48:57.892Z',
    endedOn: '2022-02-09T15:49:04.358Z',
    member: {
      memberId: '181388459070455808773917076824916038',
      guildName: 'uwuc',
      guildAvatar: null,
      guildColor: '#000000',
      joinedAt: '2022-02-01T21:41:04.598Z',
      user: {
        id: '181388459070455808',
        name: 'Gryce',
        discriminator: '8103',
        avatar: null,
        bot: false,
        createdAt: '2016-05-15T12:52:58.677Z',
      },
    },
    issuedBy: null,
    channel: {
      channelId: '773917077840461827',
      guildId: '773917076824916038',
      name: 'General',
      nsfw: null,
      type: 'GUILD_VOICE',
      position: 0,
      createdAt: '2020-11-05T14:30:10.041Z',
      topic: null,
    },
  },
  {
    id: '77a4e7a7-1a3a-4a66-8367-8f944672023e',
    guildId: '773917076824916038',
    newChannel: null,
    type: 'MUTE',
    issuedOn: '2022-02-09T15:48:57.891Z',
    endedOn: '2022-02-09T15:49:04.358Z',
    member: {
      memberId: '181388459070455808773917076824916038',
      guildName: 'uwuc',
      guildAvatar: null,
      guildColor: '#000000',
      joinedAt: '2022-02-01T21:41:04.598Z',
      user: {
        id: '181388459070455808',
        name: 'Gryce',
        discriminator: '8103',
        avatar: null,
        bot: false,
        createdAt: '2016-05-15T12:52:58.677Z',
      },
    },
    issuedBy: null,
    channel: {
      channelId: '773917077840461827',
      guildId: '773917076824916038',
      name: 'General',
      nsfw: null,
      type: 'GUILD_VOICE',
      position: 0,
      createdAt: '2020-11-05T14:30:10.041Z',
      topic: null,
    },
  },
  {
    id: 'b5052f6a-846b-4f63-8770-c803bb3add96',
    guildId: '773917076824916038',
    newChannel: null,
    type: 'MEMBER_UPDATE_MUTE',
    issuedOn: '2022-02-09T15:49:20.445Z',
    endedOn: '2022-02-09T15:49:23.539Z',
    member: {
      memberId: '181388459070455808773917076824916038',
      guildName: 'uwuc',
      guildAvatar: null,
      guildColor: '#000000',
      joinedAt: '2022-02-01T21:41:04.598Z',
      user: {
        id: '181388459070455808',
        name: 'Gryce',
        discriminator: '8103',
        avatar: null,
        bot: false,
        createdAt: '2016-05-15T12:52:58.677Z',
      },
    },
    issuedBy: {
      memberId: '148824637004840961773917076824916038',
      guildName: 'GrYs',
      guildAvatar: null,
      guildColor: '#000000',
      joinedAt: '2022-01-24T21:15:55.773Z',
      user: {
        id: '148824637004840961',
        name: 'GrYs',
        discriminator: '0011',
        avatar:
          'https://cdn.discordapp.com/avatars/148824637004840961/a_ee72c73ed71738a0e7e28acc6363e9ca.webp',
        bot: false,
        createdAt: '2016-02-15T16:15:58.490Z',
      },
    },
    channel: {
      channelId: '773917077840461827',
      guildId: '773917076824916038',
      name: 'General',
      nsfw: null,
      type: 'GUILD_VOICE',
      position: 0,
      createdAt: '2020-11-05T14:30:10.041Z',
      topic: null,
    },
  },
];

@Component({
  selector: 'app-guild-card-stats',
  templateUrl: './guild-stats.component.html',
  styleUrls: ['./guild-stats.component.scss'],
})
export class GuildStatsCardComponent implements OnInit {
  @Input() size: number | undefined;
  displayedColumns: string[] = ['type', 'name', 'issuedBy', 'issuedOn'];
  dataSource = data;

  constructor() {}

  ngOnInit() {}
}

/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/backend/api.service';
import { UserService } from 'src/app/shared/services/user.service';
import { GuildStats } from 'src/app/shared/Types';

@Component({
  selector: 'app-guild-card-stats',
  templateUrl: './guild-stats.component.html',
  styleUrls: ['./guild-stats.component.scss'],
})
export class GuildStatsCardComponent implements OnInit {
  @Input() size: number | undefined;
  @Input() guildId: string | undefined = '571011756181291008';

  user: GuildStats[] | undefined;

  constructor(private userSrv: UserService, private api: ApiService) {}

  async ngOnInit() {
    const temp = await this.api.getGuildStats(
      this.guildId ? this.guildId : '445641752863571978'
    );

    this.user = temp.filter(
      (user) =>
        user.member.user.id ===
        (this.userSrv.user?.discordId as unknown as string)
    );
  }
}

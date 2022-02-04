import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/backend/api.service';
import { IGuildInfo } from 'src/app/shared/Types';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  Guilds: IGuildInfo[] = [];
  loading = false;
  constructor(private api: ApiService, private route: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      this.loading = true;
      this.Guilds = await this.api.getMutualGuilds();
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }

  navigateToGuild(guild: IGuildInfo) {
    console.log(guild);
    this.route.navigate([`dashboard`], { state: { guild } });
  }
}

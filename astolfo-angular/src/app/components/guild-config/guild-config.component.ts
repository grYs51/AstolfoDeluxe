/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/services/backend/api.service';
import {
  IGuildConfig,
  IGuildInfo,
  IPartialGuildChannel,
} from 'src/app/shared/Types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-guild-config',
  templateUrl: './guild-config.component.html',
  styleUrls: ['./guild-config.component.scss'],
})
export class GuildConfigComponent implements OnInit {
  @Input() size: number | undefined;
  @Input() guildInfo!: IGuildInfo;
  guildConfig: IGuildConfig | undefined;
  prefix = '';
  guildChannels: IPartialGuildChannel[] = [];
  welcomeChannel = '';

  userQuestionUpdate = new Subject<any>();

  constructor(private api: ApiService, private snackbar: MatSnackBar) {
    this.userQuestionUpdate
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.inputOnchange(value);
      });
  }

  async ngOnInit(): Promise<void> {
    if (!this.guildInfo) return;
    this.guildConfig = await this.api.getGuildConfig(this.guildInfo.id);
    this.prefix = this.guildConfig!.prefix;
    this.guildChannels = await this.api.getGuildChannels(this.guildInfo.id, 0);
    this.welcomeChannel = this.guildConfig.welcomeChannelId
      ? this.guildChannels.find(
          (channel) => channel.id === this.guildConfig!.welcomeChannelId
        )!.id
      : '';
  }

  async selectOnchange(event: any) {
    await this.api.updateGuildWelcome(this.guildConfig!.guildId, event.value);
    this.snackbar.open('WelcomeChannel Succesfully saved!', undefined, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  async inputOnchange(_event: any) {
    let event = _event.target.value as string;
    event = event.trim();

    if (event.match(/^ *$/) === null) {
      console.log(event);
    }

    await this.api.updateGuildPrefix(this.guildConfig!.guildId, event);
    this.snackbar.open('Prefix Succesfully saved!', undefined, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}

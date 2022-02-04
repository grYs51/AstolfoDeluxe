import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  NgZone,
} from '@angular/core';
import { ApiService } from 'src/app/shared/services/backend/api.service';
import {
  IGuildConfig,
  IGuildInfo,
  IPartialGuildChannel,
} from 'src/app/shared/Types';

@Component({
  selector: 'app-guild-config',
  templateUrl: './guild-config.component.html',
  styleUrls: ['./guild-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuildConfigComponent implements OnInit {
  @Input() size: number | undefined;
  @Input() guildInfo!: IGuildInfo;
  guildConfig: IGuildConfig | undefined;
  prefix: string | undefined;
  guildChannels: IPartialGuildChannel[] = [];
  welcomeChannel = '';
  constructor(private api: ApiService, private ngzone: NgZone) {}

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
    console.log(event.value);
    console.log(
      await this.api.updateGuildPrefix(this.guildConfig!.guildId, event.value)
    );
  }
}

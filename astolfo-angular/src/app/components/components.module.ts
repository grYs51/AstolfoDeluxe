import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuildConfigComponent } from './guild-config/guild-config.component';
import { MatMaterialModule } from '../shared/utils/mat-material/mat-material.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { GuildStatsCardComponent } from './guild-stats/guild-stats.component';
import { MemberStatsComponent } from './guild-stats/member-stats/member-stats.component';
import { GuildStatsComponent } from './guild-stats/guild-stats/guild-stats.component';

@NgModule({
  imports: [CommonModule, MatMaterialModule, PipesModule],
  declarations: [
    GuildConfigComponent,
    GuildStatsCardComponent,
    MemberStatsComponent,
    GuildStatsComponent,
  ],
  exports: [GuildConfigComponent, GuildStatsCardComponent],
})
export class ComponentsModule {}

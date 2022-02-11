import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuildConfigComponent } from './guild-config/guild-config.component';
import { MatMaterialModule } from '../shared/utils/mat-material/mat-material.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { GuildStatsCardComponent } from './guild-stats/guild-stats.component';
import { MemberStatsComponent } from './guild-stats/member-stats/member-stats.component';
import { GuildStatsComponent } from './guild-stats/guild-stats/guild-stats.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [CommonModule, MatMaterialModule, PipesModule, NgChartsModule],
  declarations: [
    GuildConfigComponent,
    GuildStatsCardComponent,
    MemberStatsComponent,
    GuildStatsComponent,
  ],
  exports: [GuildConfigComponent, GuildStatsCardComponent],
})
export class ComponentsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuildConfigComponent } from './guild-config/guild-config.component';
import { MatMaterialModule } from '../shared/utils/mat-material/mat-material.module';
import { PipesModule } from '../shared/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, MatMaterialModule, PipesModule],
  declarations: [GuildConfigComponent],
  exports: [GuildConfigComponent],
})
export class ComponentsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetGuildIconPipe } from './getGuildIcon/GetGuildIcon.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GetGuildIconPipe],
  exports: [ GetGuildIconPipe]
})
export class PipesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { MenuComponent } from './menu/menu.component';
import { MatMaterialModule } from 'src/app/shared/utils/mat-material/mat-material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [HomeComponent, MenuComponent],
  imports: [
    CommonModule,
    BrowserModule,
    MatMaterialModule,
    PipesModule
  ],
  exports: [HomeComponent, MenuComponent],
})
export class PagesModule {}

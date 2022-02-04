import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavRoutingModule } from './nav-routing.module';
import { AuthGuard } from '../shared/auth/Auth.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule, NavRoutingModule],
  providers: [],
})
export class DashboardModule {}

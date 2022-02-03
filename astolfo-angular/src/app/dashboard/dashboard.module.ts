import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AuthGuard } from '../shared/auth/Auth.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule, DashboardRoutingModule],
  providers: [],
})
export class DashboardModule {}

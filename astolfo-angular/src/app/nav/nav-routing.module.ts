import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth/Auth.guard';
import { GetSingleItemResolver } from '../shared/utils/GetSingleItemResolver';
import { NavComponent } from './nav.component';

import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'menu' },
      { path: 'menu', component: MenuComponent },
      {
        path: 'dashboard/:id',
        component: HomeComponent,
        resolve: {
          singleItem: GetSingleItemResolver,
        },
      },
      // { path: 'history', component: HistoryComponent },
      // { path: 'chat', component: ChatComponent },
      // { path: 'about', component: AboutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [GetSingleItemResolver],
})
export class NavRoutingModule {}

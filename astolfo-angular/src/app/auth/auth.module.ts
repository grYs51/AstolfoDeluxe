import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { AuthRouter } from './auth-router.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    AuthRouter,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
  ],
  declarations: [LoginComponent],
})
export class AuthModule {}

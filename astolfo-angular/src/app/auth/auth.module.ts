import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRouter } from './auth-router.module';
import { MatMaterialModule } from '../shared/utils/mat-material/mat-material.module';

@NgModule({
  imports: [CommonModule, AuthRouter, MatMaterialModule],
  declarations: [LoginComponent],
})
export class AuthModule {}

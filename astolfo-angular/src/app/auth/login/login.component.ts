import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ApiService } from 'src/app/shared/services/backend/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private api: ApiService,
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {}

  redirect() {
    window.location.href = 'http://localhost:3001/api/auth/login';
  }

  auth() {}
}

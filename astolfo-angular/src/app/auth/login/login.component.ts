import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/backend/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {}

  redirect() {
    window.location.href = 'http://localhost:3001/api/auth/login';
  }
}

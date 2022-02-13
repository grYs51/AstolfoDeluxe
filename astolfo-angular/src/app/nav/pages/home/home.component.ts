import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGuildConfig, IGuildInfo, IGuildObject } from 'src/app/shared/Types';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  guildInfo: IGuildInfo | null = null;
  guildConfig: IGuildConfig | null = null;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.size = this.getCols(window.innerWidth);
  }
  public size: number | undefined;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.size = this.getCols(window.innerWidth);
    this.getState();
  }

  getState() {
    this.guildInfo = (history.state as IGuildObject).guild;

    if (!this.guildInfo) {
      this.router.navigate(['menu']);
    }
  }
  private getCols(interWidth: number): number {
    return interWidth >= 650 ? (interWidth >= 1200 ? 3 : 2) : 1;
  }
}

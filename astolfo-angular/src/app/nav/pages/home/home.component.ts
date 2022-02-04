import { Component, HostListener, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { IGuildConfig, IGuildInfo, IGuildObject } from 'src/app/shared/Types';
import { Location } from '@angular/common';
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

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 3, rows: 1 },
        { title: 'Card 2', cols: 2, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );

  public size: number | undefined;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}
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

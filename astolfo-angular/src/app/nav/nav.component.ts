import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  routes = [
    { icon: 'home', name: 'menu', route: '' },
    // {icon: 'person', name: 'dashboard'},
    { icon: 'info', name: 'about', route: 'about' },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}
}

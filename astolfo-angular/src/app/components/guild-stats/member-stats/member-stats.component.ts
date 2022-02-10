import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-stats',
  templateUrl: './member-stats.component.html',
  styleUrls: ['./member-stats.component.scss'],
})
export class MemberStatsComponent implements OnInit {
  @Input() size: number | undefined;
  constructor() {}

  ngOnInit() {}
}

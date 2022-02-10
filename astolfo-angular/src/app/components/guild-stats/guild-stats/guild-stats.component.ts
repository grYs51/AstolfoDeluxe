import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-guild-stats',
  templateUrl: './guild-stats.component.html',
  styleUrls: ['./guild-stats.component.scss'],
})
export class GuildStatsComponent implements OnInit {
  @Input() size: number | undefined;
  constructor() {}

  ngOnInit() {}
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { GuildStats } from 'src/app/shared/Types';

@Component({
  selector: 'app-member-stats',
  templateUrl: './member-stats.component.html',
  styleUrls: ['./member-stats.component.scss'],
})
export class MemberStatsComponent {
  @Input() size: number | undefined;
  @Input() user: GuildStats[] | undefined;
  totalTimesInVC: number | null = null;

  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [2, 5, 10] },

    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    if (changes['user']) {
      if (this.user) {
        this.totalTimesInVC = this.user!.filter(
          (states) => states.type === 'VOICE'
        ).length;
      }
    }
    console.log(this.totalTimesInVC)
  }
}

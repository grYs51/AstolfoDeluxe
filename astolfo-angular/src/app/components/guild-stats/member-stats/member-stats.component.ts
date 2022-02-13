/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MemberVoiceStat } from 'src/app/shared/Enums';
import { GuildStats } from 'src/app/shared/Types';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-member-stats',
  templateUrl: './member-stats.component.html',
  styleUrls: ['./member-stats.component.scss'],
})
export class MemberStatsComponent {
  @Input() size: number | undefined;
  @Input() user: GuildStats[] | undefined;
  @ViewChild(BaseChartDirective)
  public chart!: BaseChartDirective; // Now you can reference your chart via `this.chart`
  // Now you can reference your chart via `this.chart`

  public chartOptions: ChartOptions = {
    responsive: true,
  };
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };
  public doughnutChartType: ChartType = 'doughnut';
  showChart = false;

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['user']) {
      this.getUser();
    }
  }
  updateChart() {
    this.chart.chart?.update(); // This re-renders the canvas element.
  }
  getUser() {
    if (this.user) {
      const total: test[] = [];
      for (const enumType in MemberVoiceStat) {
        if (typeof MemberVoiceStat[enumType] === 'string') {
          continue;
        }
        total.push({
          type: enumType,
          length: this.user
            ?.filter((state) => state.type === enumType)
            .map(
              (value) =>
                <test>{
                  type: enumType,
                  length: Math.round(
                    Math.abs(
                      new Date(value.issuedOn).getTime() -
                      new Date(value.endedOn).getTime()
                    ) / 1000
                  ),
                }
            )
            .reduce((acc, val) => (acc += val.length), 0),
        });
      }
      this.doughnutChartData.labels = total.map((value) => value.type);
      this.doughnutChartData.datasets[0].data = total.map(
        (value) => value.length
      );
      this.updateChart();
    }
  }
}

interface test {
  type: string;
  length: number;
}

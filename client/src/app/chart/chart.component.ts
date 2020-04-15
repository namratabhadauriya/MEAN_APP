import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Subject } from "rxjs";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() onUpdateChartSubject: Subject<boolean> = new Subject<boolean>();
  @Input() chartData;

  constructor() { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'NA' },
  ];
  public barChartColors = [
    { backgroundColor: '#76bf43' }
  ]

  ngOnInit() {
    this.onUpdateChartSubject.subscribe(response => {
      if (response) {
        this.chartData = response;
        this.updateChart();
      }
    })
  }

  updateChart() {
    this.barChartLabels = this.chartData['dataLabels'];
    this.barChartData = [
      {
        data: this.chartData['dataValues'],
        label: this.chartData['companyLable']
      },
    ];
  }

}

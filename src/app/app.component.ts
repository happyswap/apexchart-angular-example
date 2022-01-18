import {Component} from "@angular/core";

import {ChartDataProviderService} from "./chart-data-provider.service";
import {IChartViewDefinition} from "./simple-chart/Interface";
import {FormControl, FormGroup} from "@angular/forms";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-task';
  chartDefs:IChartViewDefinition[]= [{
    chart: {
      height: 350,
      type: 'line',
      stacked: false
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },

    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: 'vertical',
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003'
    ],
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      title: {
        text: 'Points'
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter(y) {
          if (typeof y !== 'undefined') {
            return y.toFixed(0) + ' points';
          }
          return y;
        }
      }
    }
  }]

  selectedRange: FormGroup;
  fullRange: FormGroup;

  constructor(private chartDataProvider:ChartDataProviderService) {

  }

  public updateData(){
    this.chartDataProvider.setNewData(
      [
        {
          name: 'TEAM Andrew',
          type: 'column',
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]

        },
        {
          name: 'TEAM Block',
          type: 'area',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        },
        {
          name: 'TEAM C',
          type: 'line',
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]

        }
      ]);
  }

  public onStartDateChange($event){
    console.log('onStartDateChange', $event)
  }
  public onEndDateChange($event){
    console.log('onStartDateChange', $event)
  }
  public onDatePickerApply($event){
    console.log('onDatePickerApply', $event)
  }

  ngOnInit(){
    this.chartDataProvider.fullLabelData$.subscribe(dates=>{

      this.fullRange = new FormGroup({
        start: new FormControl(dates[0]),
        end: new FormControl(dates[dates.length-1]),
      });
    })
    this.chartDataProvider.labelData$.subscribe(dates=>{
      this.selectedRange = new FormGroup({
        start: new FormControl(dates[0]),
        end: new FormControl(dates[dates.length-1]),
      });
    })
  }


}

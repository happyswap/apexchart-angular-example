import {Component} from "@angular/core";

import {ChartDataProviderService} from "./chart-data-provider.service";
import {IChartViewDefinition, TChartLabels} from "./simple-chart/Interface";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector:"app-root",
  templateUrl:"./app.component.html",
  styleUrls:["./app.component.scss"]
})
export class AppComponent {
  title = "test-task";
  chartDefs:IChartViewDefinition[] = [{
    chart:{
      height:350,
      type:"line",
      stacked:false
    },
    stroke:{
      width:[2, 3, 5, 2, 3, 5],
      curve:"smooth"
    },
    plotOptions:{
      bar:{
        columnWidth:"50%"
      }
    },
    fill:{
      opacity:[0.85, 0.25, 1],
      gradient:{
        inverseColors:false,
        shade:"light",
        type:"vertical",
        opacityFrom:0.85,
        opacityTo:0.55,
        stops:[0, 100, 100, 100]
      }
    },
    markers:{
      size:0
    },
    xaxis:{
      type:"datetime"
    },
    yaxis:{
      title:{
        text:"Points"
      },
      min:0
    },
    tooltip:{
      shared:true,
      intersect:false,
      y:{
        formatter(y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        }
      }
    }
  }];

  labels:TChartLabels;
  selectedRange:FormGroup;
  fullRange:FormGroup;
  onlylabelsFilter4Chart:TChartLabels[]=[['TEAM A'],['TEAM B'],];

  constructor(private chartDataProvider:ChartDataProviderService) {}


  /**
   handle Apply button datepicket click which is emitted after start and end change date
   */
  public onDatePickerApply($event) {
    this.chartDataProvider.setRange(this.selectedRange.value.start, this.selectedRange.value.end);
  }

  ngOnInit() {
    this.chartDataProvider.fullLabelData$.subscribe(dates => {
      this.fullRange = new FormGroup({
        start:new FormControl(dates[0]),
        end:new FormControl(dates[dates.length - 1])
      });
    });
    this.chartDataProvider.labelData$.subscribe(dates => {
      this.selectedRange = new FormGroup({
        start:new FormControl(dates[0]),
        end:new FormControl(dates[dates.length - 1])
      });
      this.labels = dates.map(d => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
    });
  }


}

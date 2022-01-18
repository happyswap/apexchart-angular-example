import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ApexAxisChartSeries} from "ng-apexcharts";
import {IChartOptions} from "./simple-chart/Interface";
import {filter} from "rxjs/operators";


@Injectable({
  providedIn:"root"
})
export class ChartDataProviderService {

  private chartData = new BehaviorSubject<ApexAxisChartSeries>(
    [
      {
        name:"TEAM A",
        type:"column",
        data:[30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
      },
      {
        name:"TEAM B",
        type:"area",
        data:[44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
      },
      {
        name:"TEAM C",
        type:"line",
        data:[23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
      }
    ]
  );

  private labelsData = new BehaviorSubject<Date[]>(
    [
        new Date('2021-01-01'),
        new Date('2021-02-01'),
        new Date('2021-03-01'),
        new Date('2021-04-01'),
        new Date('2021-05-01'),
        new Date('2021-06-01'),
        new Date('2021-07-01'),
        new Date('2021-08-01'),
        new Date('2021-09-01'),
        new Date('2021-10-01'),
        new Date('2021-11-01')
    ]
  )

  public chartData$ = this.chartData
    .pipe(filter((value,index)=> this.startIndex >= index && index <= this.endIndex));
  public fullLabelData$ = this.labelsData.asObservable();
  public labelData$ = this.labelsData
    .pipe(filter((value,index)=> this.startIndex >= index && index <= this.endIndex));

  public setNewData(chartSeries:ApexAxisChartSeries){
    this.chartData.next(chartSeries)
  }
  private startIndex=0;
  private endIndex = this.labelsData.value.length-1;

}

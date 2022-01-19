import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {ApexAxisChartSeries} from "ng-apexcharts";
import {map} from "rxjs/operators";


@Injectable({
  providedIn:"root"
})
export class ChartDataProviderService {

  private chartData = new BehaviorSubject<ApexAxisChartSeries>(
    [
      {
        name:"SET #1",
        type:"column",
        color:'#008ffb',
        data:[30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
      },
      {
        name:"SET #2",
        type:"area",
        color: '#00e396',
        data:[44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
      },
      {
        name:"SET #3",
        type:"line",
        color: '#feb019',
        data:[23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
      }
    ]
  );

  private labelsData = new BehaviorSubject<Date[]>(
    [
        new Date('2021-01-01 00:00:00'),
        new Date('2021-01-02 00:00:00'),
        new Date('2021-01-03 00:00:00'),
        new Date('2021-01-04 00:00:00'),
        new Date('2021-01-05 00:00:00'),
        new Date('2021-01-06 00:00:00'),
        new Date('2021-01-07 00:00:00'),
        new Date('2021-01-08 00:00:00'),
        new Date('2021-01-09 00:00:00'),
        new Date('2021-01-10 00:00:00'),
        new Date('2021-01-11 00:00:00')
    ]
  )

  public chartData$:Observable<ApexAxisChartSeries> = this.chartData
    .pipe(
      map((ds)=>{
        const filtered =  ds.map((value,index) =>{
          let data = (value.data as number[]).filter(
            (_,index)=> this.startIndex <= index && index <= this.endIndex
          )
          return {...value, ...{data}}
        })
        return filtered;
      })
    );
  public fullLabelData$ = this.labelsData.asObservable();
  public labelData$ = this.labelsData
    .pipe(map((value)=>{
      return value.filter((_, index) => {
        return this.startIndex <= index && index <= this.endIndex
      });
    }));


  private startIndex=0;
  private endIndex = this.labelsData.value.length-1;
  // TODO change for comparing by YMD from datejs
  setRange(startDate:Date, endDate:Date){
    if(startDate && endDate) {
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();
      let startIndex;
      let endIndex = this.labelsData.value.length - 1;

      if (this.labelsData.value.length <= 2 && startTime >= endTime) {
        // prevent edge cases or wrong params
        startIndex = 0;
      } else {
        this.labelsData.value.forEach((value, index) => {
          const time = value.getTime();

          let nextTick;
          if ((index + 1) < this.labelsData.value.length) {
            nextTick = this.labelsData.value[index + 1];
            if (time === startTime) {
              startIndex = index;
            } else if (nextTick > startTime && time < startTime) {
              startIndex = index + 1;
            }
            if (time === endTime) {
              endIndex = index;
            } else if(time < endTime && endTime < nextTick){
              endIndex = index;
            }
          } else if (startIndex === undefined) {
            startIndex = index;
          }
        })
      }
      this.startIndex = startIndex;
      this.endIndex = endIndex;
      this.labelsData.next(this.labelsData.value);
      this.chartData.next(this.chartData.value);
    }
  }

  public reSendValue(){
    this.chartData.next(this.chartData.value);
  }

}

import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {ChartDataProviderService} from "../chart-data-provider.service";
import {IChartViewDefinition, IOptionsChangeData} from "./Interface";
import {ApexAxisChartSeries, ChartComponent} from "ng-apexcharts";

@Component({
  selector: 'app-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.scss']
})
export class SimpleChartComponent implements OnInit {
  public isDefined:boolean = false;
  private chartOptions: Partial<IChartViewDefinition> = {};

  @Input()
  set options(value:Partial<IChartViewDefinition>){
    if(value){
      this.chartOptions = value;
      this.isDefined=true;
    }else{
      this.isDefined=false;
    }
  };
  get options():Partial<IChartViewDefinition>{
    return this.chartOptions;
  }

  @ViewChild('chart') chart: ChartComponent;

  data:ApexAxisChartSeries;

  constructor(private chartDataProvider:ChartDataProviderService) {

  }

  json(data:any){
    return JSON.stringify(data);
  }

  ngOnInit(): void {
    this.chartDataProvider.chartData$.subscribe(data=>{
      this.data = data;
      console.log(data);

    })
  }

  onTypeChange({value, name}:IOptionsChangeData) {
    this.data = this.data.map(item => {
      if (item.name === name) {
        item.type = value;
      }
      return item;
    });
  }

  onColorChange({value, name}:IOptionsChangeData) {
    this.data = this.data.map(item => {
      if (item.name === name) {
        item.color = value;
      }
      return item;
    });
  }

}

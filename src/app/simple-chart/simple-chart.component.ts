import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {ChartDataProviderService} from "../chart-data-provider.service";
import {IChartViewDefinition, IOptionsChangeData, TChartLabels} from "./Interface";
import {ApexAxisChartSeries, ChartComponent} from "ng-apexcharts";

@Component({
  selector: 'app-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.scss']
})
export class SimpleChartComponent implements OnInit {

  private _options: Partial<IChartViewDefinition>;
  private _labels: TChartLabels ;

  @Input()
  set labels(value:TChartLabels){
    if(value){
      this._labels = value;
    }
  };
  get labels():TChartLabels{
    return this._labels;
  }
  @Input()
  set options(value:Partial<IChartViewDefinition>){
    if(value){
      this._options = value;
    }
  };
  get options():Partial<IChartViewDefinition>{
    return this._options;
  }

  public get isDefined():boolean {
    return this._labels!==undefined && this._options!==undefined;
  };

  @ViewChild('chart') chart: ChartComponent;

  data:ApexAxisChartSeries;

  constructor(private chartDataProvider:ChartDataProviderService) {

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

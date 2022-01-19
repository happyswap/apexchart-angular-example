import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {ChartDataProviderService} from "../chart-data-provider.service";
import {IChartViewDefinition, IOptionsChangeData, TChartLabels} from "./Interface";
import {ApexAxisChartSeries, ChartComponent} from "ng-apexcharts";
import {map, tap} from "rxjs/operators";
import {MatSlideToggle, MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector:"app-simple-chart",
  templateUrl:"./simple-chart.component.html",
  styleUrls:["./simple-chart.component.scss"]
})
export class SimpleChartComponent implements OnInit {


  @ViewChild("chart") chart:ChartComponent;


  @Input() only:string[];
  @Input()
  set options(value:Partial<IChartViewDefinition>) {
    if (value) {
      this._options = value;
    }
  };
  get options():Partial<IChartViewDefinition> {
    return this._options;
  }

  @Input()
  set labels(value:TChartLabels) {
    if (value) {
      this._labels = value;
    }
  };
  get labels():TChartLabels {
    return this._labels;
  }

  public data:ApexAxisChartSeries;
  public chartNames:string[]=[];
  public isOptionsOpen=false;
  private _options:Partial<IChartViewDefinition>;
  private _labels:TChartLabels

  constructor(private chartDataProvider:ChartDataProviderService) {}



  public get isDefined():boolean {
    return this._labels !== undefined && this._options !== undefined;
  }

  public get title():string{
    return this.data.map((item)=>item.name).join(' + ');
  }

  public isChartPresent(name:string){
    if(!this.only) return true;
    return  this.only.includes(name);
  }

  public onViewToggle(item:MatSlideToggleChange){
    if(this.only===undefined){
      this.only=this.chartNames;
    }
    if(item.checked && !this.only.includes(item.source.name)){
      this.only.push(item.source.name);
      this.reRead();
    } else if(!item.checked && this.only.includes(item.source.name)){
      this.only=this.only.filter(name=>name!==item.source.name);
      this.reRead();
    }
  }

  private reRead(){
    this.chartDataProvider.reSendValue();
  }

  ngOnInit():void {
    this.chartDataProvider.chartData$
      .pipe(
        tap(itemSet=>{ this.chartNames=itemSet.map(item=>item.name)}),
        map(itemSet => {
          if (this.only === undefined) {
            return itemSet;
          } else {
            return itemSet.filter(item => this.only.includes(item.name));
          }
        })
      )
      .subscribe(data => {
        this.data = data;
      });
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

import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {IOptionsChangeData} from "../Interfaces";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {ApexAxisChartSeries} from "ng-apexcharts";
// used for material tree
interface IOptionNode {
  name:string;
  index?:number;
  type?:string;
  color?:string;
  children?:IOptionNode[];
}
// used for material tree
interface ITreeFlatNode {
  expandable:boolean;
  name:string;
  type?:string;
  color?:string;
  level:number;
}


@Component({
  selector:"app-chart-options-changer",
  templateUrl:"./chart-options-changer.component.html",
  styleUrls:["./chart-options-changer.component.scss"]
})
export class ChartOptionsChangerComponent implements OnInit {

  @Input() data:ApexAxisChartSeries;
  @Input() chartsNames:string[]=[];
  @Output() typeChange = new EventEmitter<IOptionsChangeData>();
  @Output() colorChange = new EventEmitter<IOptionsChangeData>();
  @Input() graphTypes:string[] = ["column", "line", "area"];
  @Input() graphColors:string[] = ["#feb019", "#00e396", "#008ffb", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];

  public _transformer = (node:IOptionNode, level:number) => {
    return {
      expandable:!!node.children && node.children.length > 0,
      name:node.name,
      type:node.type,
      color:node.color,
      index:node.index,
      level:level
    };
  };
  public treeControl = new FlatTreeControl<ITreeFlatNode>(
    node => node.level, node => node.expandable);
  public   treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);
  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  onColorChange({value}:{ value:string }, {name}:{ name:string }) {
    this.colorChange.emit({name, value});
  }

  onTypeChange({value}:{ value:string }, {name}:{ name:string }) {
    this.typeChange.emit({name, value});
  }

  ngOnInit():void {
    this.dataSource.data = this.prepareTreeData();
  }

  prepareTreeData():IOptionNode[] {
    return [
      {
        name:"Options",
        children:this.data.map(item => {
          return {name:item.name, type:item.type, color:item.color};
        })
      }
    ];
  }

  public hasChild = (_:number, node:ITreeFlatNode) => node.expandable;




}

import {Component, OnInit, Output, EventEmitter, Input} from "@angular/core";
import {IOptionsChangeData} from "../simple-chart/Interface";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {ApexAxisChartSeries} from "ng-apexcharts";

interface IOptionNode {
  name: string;
  index?:number;
  type?: string;
  color?: string;
  children?: IOptionNode[];
}

interface ITreeFlatNode {
  expandable: boolean;
  name: string;
  type?: string;
  color?: string;
  level: number;
}


@Component({
  selector: 'app-chart-options-changer',
  templateUrl: './chart-options-changer.component.html',
  styleUrls: ['./chart-options-changer.component.scss']
})
export class ChartOptionsChangerComponent implements OnInit {

  @Input() data:ApexAxisChartSeries;
  @Output() typeChange = new EventEmitter<IOptionsChangeData>();
  @Output() colorChange = new EventEmitter<IOptionsChangeData>();
  @Input() graphTypes:string[]=['column','line','area'];
  @Input() graphColors:string[]=['#FF0000','#00FF00','#0000FF', '#FFFF00','#FF00FF','#00FFFF'];


  onColorChange({value}:{value:string},{name}:{name:string}){
    this.colorChange.emit({name,value})
  }

  onTypeChange({value}:{value:string},{name}:{name:string}){
    this.typeChange.emit({name,value})
  }
  ngOnInit(): void {
    this.dataSource.data= this.getTreeData(this.data);
  }


  getTreeData(data:ApexAxisChartSeries):IOptionNode[]{
    return [{
      name:'Options',
      children:data.map(item=>{
        return {name:item.name, type:item.type, color:item.color}
      })
    }]
  }
  private _transformer = (node: IOptionNode, level: number) => {
    console.log("node", node);
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      type: node.type,
      color: node.color,
      index:node.index,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ITreeFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ITreeFlatNode) => node.expandable;
}

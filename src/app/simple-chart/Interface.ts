import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexMarkers,
  ApexPlotOptions,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from "ng-apexcharts";

export interface IChartViewDefinition {
  chart:ApexChart;
  xaxis:ApexXAxis;
  yaxis:ApexYAxis | ApexYAxis[];

  stroke:any; // ApexStroke;
  markers:ApexMarkers;
  plotOptions:ApexPlotOptions;
  fill:ApexFill;
  tooltip:ApexTooltip;
}

export type TChartLabels = string[];

export interface IChartOptions extends IChartViewDefinition {
  series:ApexAxisChartSeries;
}

export interface IOptionsChangeData{
  name:string;
  value:string;
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgApexchartsModule} from "ng-apexcharts";
import {MatButtonModule} from "@angular/material/button";
import { SimpleChartComponent } from './simple-chart/simple-chart.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import { ChartOptionsChangerComponent } from './chart-options-changer/chart-options-changer.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    AppComponent,
    SimpleChartComponent,
    ChartOptionsChangerComponent
  ],
  imports:[
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

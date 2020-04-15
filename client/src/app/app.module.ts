import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StockComponent } from './stock/stock.component';
import { ChartComponent } from './chart/chart.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { StockService } from './stock.service';


@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    ChartComponent,
    DropDownComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }

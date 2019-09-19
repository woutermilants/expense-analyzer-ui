import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';
import { CounterpartOverviewComponent } from './counterpart-overview/counterpart-overview.component';
import { SharedModule } from './shared/shared.module';
import { ExpenseService} from './service/expense.service';
import { CounterpartService} from './service/counterpart.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RoutingModule } from './routing/routing.module';
//import { MainNavComponent } from './main-nav/main-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    ListExpensesComponent,
    CounterpartOverviewComponent
    //MainNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RoutingModule
  ],
  providers: [
  ExpenseService,
    CounterpartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

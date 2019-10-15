import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ListExpensesComponent} from './list-expenses/list-expenses.component';
import {CounterpartOverviewComponent} from './counterpart-overview/counterpart-overview.component';
import {CounterpartEditComponent} from './counterpart-edit/counterpart-edit.component';
import {SharedModule} from './shared/shared.module';
import {ExpenseService} from './service/expense.service';
import {CounterpartService} from './service/counterpart.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {RoutingModule} from './routing/routing.module';
import {RecurringPaymentsComponent} from './recurring-payments/recurring-payments.component';
import {ReportService} from "./service/report.service";
import {DatePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ListExpensesComponent,
    CounterpartOverviewComponent,
    CounterpartEditComponent,
    RecurringPaymentsComponent
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
    RoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [
    ExpenseService,
    CounterpartService,
    ReportService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ListExpensesComponent} from './expense-overview/list-expenses/list-expenses.component';
import {CounterpartOverviewComponent} from './counterpart-overview/counterpart-overview.component';
import {SharedModule} from './shared/shared.module';
import {ExpenseService} from './service/expense.service';
import {CounterPartService} from './service/counter-part.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import {RecurringCostService} from "./service/recurring-cost.service";
import {HeaderComponent} from "./header/header.component";
import { RecurringPaymentDetailComponent } from './recurring-payments/recurring-payment-detail/recurring-payment-detail.component';
import { ExpenseOverviewComponent } from './expense-overview/expense-overview.component';
import { ExpenseDetailComponent } from './expense-overview/expense-detail/expense-detail.component';
import { UploadDataComponent } from './upload-data/upload-data.component';

@NgModule({
  declarations: [
    AppComponent,
    ListExpensesComponent,
    CounterpartOverviewComponent,
    RecurringPaymentsComponent,
    HeaderComponent,
    RecurringPaymentDetailComponent,
    ExpenseOverviewComponent,
    ExpenseDetailComponent,
    UploadDataComponent,
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
    FormsModule,
    MatTooltipModule
  ],
  providers: [
    ExpenseService,
    CounterPartService,
    ReportService,
    RecurringCostService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';
import { CounterpartOverviewComponent } from './counterpart-overview/counterpart-overview.component';
import {RecurringPaymentsComponent} from "./recurring-payments/recurring-payments.component";

const routes: Routes = [
{ path: 'list-expenses', component: ListExpensesComponent },
{ path: 'counterpart-overview', component: CounterpartOverviewComponent },
{ path: 'recurring-payments', component: RecurringPaymentsComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

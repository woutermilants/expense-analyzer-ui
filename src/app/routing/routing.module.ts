import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListExpensesComponent } from '../expense-overview/list-expenses/list-expenses.component';
import { CounterpartOverviewComponent } from '../counterpart-overview/counterpart-overview.component';
import {ExpenseOverviewComponent} from "../expense-overview/expense-overview.component";

const routes: Routes = [
  { path: 'list', component: ExpenseOverviewComponent},
  { path: 'counterpart-overview', component: CounterpartOverviewComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }

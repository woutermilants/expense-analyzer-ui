import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';
import { CounterpartOverviewComponent } from './counterpart-overview/counterpart-overview.component';

const routes: Routes = [
{ path: 'list-expenses', component: ListExpensesComponent },
{ path: 'counterpart-overview', component: CounterpartOverviewComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';

const routes: Routes = [
{ path: 'list-expenses', component: ListExpensesComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

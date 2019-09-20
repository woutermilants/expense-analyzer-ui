import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListExpensesComponent } from '../list-expenses/list-expenses.component';
import { CounterpartOverviewComponent } from '../counterpart-overview/counterpart-overview.component';
import { CounterpartEditComponent } from '../counterpart-edit/counterpart-edit.component';

const routes: Routes = [
  { path: 'list', component: ListExpensesComponent},
  { path: 'counterpart-edit', component: CounterpartEditComponent},
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListExpensesComponent } from '../list-expenses/list-expenses.component';

const routes: Routes = [
  { path: 'list', component: ListExpensesComponent},
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

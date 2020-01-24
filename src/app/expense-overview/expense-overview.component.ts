import { Component, OnInit, ViewChild } from '@angular/core';
import {ListExpensesComponent} from "./list-expenses/list-expenses.component";

@Component({
  selector: 'app-expense-overview',
  templateUrl: './expense-overview.component.html',
  styleUrls: ['./expense-overview.component.scss']
})
export class ExpenseOverviewComponent implements OnInit {

  @ViewChild(ListExpensesComponent, {static:false}) listChild:ListExpensesComponent;

  constructor() {
  }

  ngOnInit() {
  }
reloadList() {
    setTimeout(()=> this.listChild.reloadData(), 500)
}
}

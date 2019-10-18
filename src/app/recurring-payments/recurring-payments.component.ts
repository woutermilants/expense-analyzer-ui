import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ReportService} from "../service/report.service";
import {Expense} from "../models/expense.model";
import {CounterPartService} from "../service/counter-part.service";
import {ExpenseService} from "../service/expense.service";
import {RecurringCostService} from "../service/recurring-cost.service";
import {Counterpart} from "../models/counterpart.model";
import {DatePipe} from "@angular/common";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {MatOptionSelectionChange} from "@angular/material/core";

@Component({
  selector: 'app-recurring-payments',
  templateUrl: './recurring-payments.component.html',
  styleUrls: ['./recurring-payments.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RecurringPaymentsComponent implements OnInit, AfterViewInit {

  recurringOptions: string[] = [
    "", "DAILY", "WEEKLY", "MONTHLY", "QUARTERLY", "BIANNUALLY", "YEARLY"
  ];
  currentCostSelection: string;
  expandedElement: any;
  columnsToDisplay: string[] = ['date', 'counterPartName', 'amount', 'statement'];
  innerColumnsToDisplay: string[] = ['recurringOption', 'date', 'amount', 'statement', 'description'];
  monthLabels: Record<string, string> = {
    "01": 'January',
    "02": 'February',
    "03": 'March',
    "04": 'April',
    "05": 'May',
    "06": 'June',
    "07": 'July',
    "08": 'August',
    "09": 'September',
    "10": 'October',
    "11": 'November',
    "12": 'December'
  };
  monthNames: Record<string, number> = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
  };

  reportDatasource = [];

  constructor(private reportService: ReportService,
              private counterpartService: CounterPartService,
              private datepipe: DatePipe,
              private expenseService: ExpenseService,
              private recurringCostService: RecurringCostService,
              private router: Router) {
  }

  ngOnInit() {
    setTimeout(() => this.reloadData());
  }

  ngAfterViewInit() {
    this.reloadData();
  }

  private reloadData() {

    this.reportService.getRecurringPayments()
      .subscribe((object) => {
        var monthlypayments: (Expense | GroupBy)[] = [];

        new Map(Object.entries(object)).forEach((value: Expense[], key) => {
          monthlypayments.push({name: this.monthLabels[key], isGroupBy: true});
          var unsortedInnerExpenses: Expense[] = [];
          value.forEach(value1 => {
            value1.date = this.datepipe.transform(value1.date, 'dd/MM/yyyy').toString();
            unsortedInnerExpenses.push(value1);
          });

          monthlypayments = monthlypayments.concat(
            unsortedInnerExpenses.sort((entry1, entry2) =>
              moment(entry1.date, "DD/MM/YYYY").toDate().getTime() -
              moment(entry2.date, "DD/MM/YYYY").toDate().getTime()
            ));
          this.reportDatasource = monthlypayments;
        });
      });
  }

  isGroup(index, item): boolean {
    return item.isGroupBy;
  }

  isNotGroup(index, item): boolean {
    return !item.isGroupBy;
  }

  isNotRecurring(item): boolean {
    if (item.hasOwnProperty('counterPart')) {
      return !item['counterPart'].recurringCounterPart
    }
    return true;
  }

  setRecurringToFalse(counterPart: Counterpart) {
    counterPart.recurringCounterPart = false;
    this.counterpartService.updateCounterpart(counterPart);
    this.reloadData();
  }

  setRecurringExpenseToFalse(expense: Expense) {
    expense.recurringExpense = false;
    this.expenseService.updateRecurringExpense(expense);
    this.reloadData();
  }

  editCounterPart(accountNumber: string) {
    this.router.navigateByUrl('/counterpart-overview?accountNumber=' + accountNumber);
  }

  getExpensesForCounterPart(expense: Expense) {
    this.expenseService.getExpensesForCounterPart(expense.counterPart.accountNumber, true).subscribe(data => {
      //expense.date = this.datepipe.transform(expense.date, 'dd/MM/yyyy').toString();
      data.forEach(innerExpense => innerExpense.date = this.datepipe.transform(innerExpense.date, 'dd/MM/yyyy').toString());
      data.sort((entry1, entry2) =>
        moment(entry1.date, "DD/MM/YYYY").toDate().getTime() -
        moment(entry2.date, "DD/MM/YYYY").toDate().getTime()
      );
      expense.counterPart.expenses = data;
    });
  }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  createCost(expense: Expense, $event: MatOptionSelectionChange) {
    //this.currentCostSelection = $event.source.value;
    console.log(expense);
    this.recurringCostService.createOrAddCost(expense.counterPart.accountNumber, expense.id, $event.source.value);
  }
}

export interface GroupBy {
  name: string;
  isGroupBy: boolean;
}


//https://stackblitz.com/edit/angular-mattable-with-groupheader?file=app%2Ftable-basic-example.ts
//https://stackblitz.com/edit/angular-material-expandable-table-rows?file=app%2Ftable%2Ftable.component.ts

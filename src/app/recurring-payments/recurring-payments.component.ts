import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ReportService} from "../service/report.service";
import {Expense} from "../models/expense.model";
import {CounterpartService} from "../service/counterpart.service";
import {ExpenseService} from "../service/expense.service";
import {Counterpart} from "../models/counterpart.model";
import {DatePipe} from "@angular/common";
import {animate, state, style, transition, trigger} from '@angular/animations';


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

  expandedElement: any;
  columnsToDisplay: string[] = ['date', 'counterPartName','amount', 'statement'];
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
  monthNames : Record<string, number> = {
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

  constructor(private reportService: ReportService, private counterpartService: CounterpartService, private datepipe: DatePipe, private expenseService: ExpenseService) {
  }

  ngOnInit() {
    setTimeout(() => this.reloadData());
    console.log(this.reportDatasource);
  }

  ngAfterViewInit() {
    this.reloadData();
  }

  private reloadData() {

    this.reportService.getRecurringPayments()
      .subscribe((object) => {
        var monthlypayments : (Expense | GroupBy)[] = [];

        new Map(Object.entries(object)).forEach((value : Expense[], key) => {
          monthlypayments.push({name: this.monthLabels[key], isGroupBy: true});
          value.forEach(value1 => {
            value1.date = this.datepipe.transform(value1.date, 'dd/MM/yyyy').toString();
            monthlypayments.push(value1);
          })

        });
        this.reportDatasource = monthlypayments;
      });
  }

  isGroup(index, item): boolean{
    return item.isGroupBy;
  }

  isNotGroup(index, item): boolean{
    return !item.isGroupBy;
  }

  setRecurringToFalse(counterPart : Counterpart) {
    counterPart.recurringCounterPart = false;
    this.counterpartService.updateCounterpart(counterPart)
  }

  getExpensesForCounterPart(expense : Expense) {
    console.log("get expneses for counterpart " + expense.counterPart.accountNumber);
    this.expenseService.getExpensesForCounterPart(expense.counterPart.accountNumber).subscribe(data => {
      console.log(data);
        console.log(expense.counterPart);
        expense.counterPart.expenses = data ;
    });
  }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
}

export interface GroupBy {
  name: string;
  isGroupBy: boolean;
}


//https://stackblitz.com/edit/angular-mattable-with-groupheader?file=app%2Ftable-basic-example.ts
//https://stackblitz.com/edit/angular-material-expandable-table-rows?file=app%2Ftable%2Ftable.component.ts

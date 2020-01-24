import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ReportService} from '../service/report.service';
import {Expense} from '../models/expense.model';
import {CounterPartService} from '../service/counter-part.service';
import {ExpenseService} from '../service/expense.service';
import {RecurringCostService} from '../service/recurring-cost.service';
import {Counterpart} from '../models/counterpart.model';
import {DatePipe} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {MatOptionSelectionChange} from '@angular/material/core';
import {RecurringCost} from '../models/recurring-cost.model';
import {RecurringOption} from '../models/recurring-option.model';
import {DisplayRecurringCost} from '../models/display-recurring-cost.model';

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
    '', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'BIANNUALLY', 'YEARLY'
  ];
  expandedElement: any;
  columnsToDisplay: string[] = ['description', 'recurringOption', 'amount', 'counterPart'];
  innerColumnsToDisplay: string[] = ['recurringOption', 'date', 'amount', 'statement', 'description'];
  monthLabels: Record<string, string> = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  };
  monthNames: Record<string, number> = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
  };

  reportDatasource = [];
  selectedRecurringCost = undefined;

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
    const recurringCostsByMonth: Map<string, RecurringCost[]> = new Map<string, RecurringCost[]>();
    this.initializeMonths(recurringCostsByMonth);
    this.reportService.getRecurringPayments()
      .subscribe((recurringCosts) => {
        recurringCosts.forEach(recurringCost => {
          const expenseMonths = this.recurringCostService.extractAllMonths(recurringCost.expenses, recurringCost.recurringOption);

          expenseMonths.forEach(month => {
            recurringCostsByMonth.get(month).push(recurringCost);
          });
        });
        console.log(recurringCostsByMonth);
        this.formatDataToDataSource(recurringCostsByMonth);
      });
  }

  private formatDataToDataSource(recurringCostsByMonth: Map<string, RecurringCost[]>) {
    let monthlypayments: (DisplayRecurringCost | GroupBy)[] = [];

    recurringCostsByMonth.forEach((recurringCosts: RecurringCost[], key: string) => {
      monthlypayments.push({name: this.monthLabels[key], isGroupBy: true});

      recurringCosts.forEach(value => {
        const displayRecurringCost =
          new DisplayRecurringCost(value.id, value.description, value.recurringOption, value.expenses, this.recurringCostService.getLastAmount(value.expenses), value.expenses[0].counterPart);
        monthlypayments = monthlypayments.concat(displayRecurringCost);
      });

      this.reportDatasource = monthlypayments;
    });
  }

  isGroup(index, item): boolean {
    return item.isGroupBy;
  }

  isNotGroup(index, item): boolean {
    return !item.isGroupBy;
  }

  openDetails(value) {
    console.log();
  }

  isNotRecurring(item): boolean {
    if (item.hasOwnProperty('counterPart')) {
      return !item.counterPart.recurringCounterPart;
    }
    return true;
  }

  editCounterPart(accountNumber: string) {
    this.router.navigateByUrl('/counterpart-overview?accountNumber=' + accountNumber);
  }

  getExpensesForCounterPart(expense: Expense) {
    this.expenseService.getExpensesForCounterPart(expense.counterPart.accountNumber, true).subscribe(data => {
      // expense.date = this.datepipe.transform(expense.date, 'dd/MM/yyyy').toString();
      data.forEach(innerExpense => innerExpense.date = this.datepipe.transform(innerExpense.date, 'dd/MM/yyyy').toString());
      data.sort((entry1, entry2) =>
        moment(entry1.date, 'DD/MM/YYYY').toDate().getTime() -
        moment(entry2.date, 'DD/MM/YYYY').toDate().getTime()
      );
      expense.counterPart.expenses = data;
    });
  }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  createCost(expense: Expense, $event: MatOptionSelectionChange) {
    // this.currentCostSelection = $event.source.value;
    console.log(expense);
    // this.recurringCostService.createOrAddCost(expense.counterPart.accountNumber, expense.id, $event.source.value);
  }

  private initializeMonths(recurringCostsByMonth: Map<string, RecurringCost[]>) {
    recurringCostsByMonth.set('01', []);
    recurringCostsByMonth.set('02', []);
    recurringCostsByMonth.set('03', []);
    recurringCostsByMonth.set('04', []);
    recurringCostsByMonth.set('05', []);
    recurringCostsByMonth.set('06', []);
    recurringCostsByMonth.set('07', []);
    recurringCostsByMonth.set('08', []);
    recurringCostsByMonth.set('09', []);
    recurringCostsByMonth.set('10', []);
    recurringCostsByMonth.set('11', []);
    recurringCostsByMonth.set('12', []);
  }
}

export interface GroupBy {
  name: string;
  isGroupBy: boolean;
}

// https://stackblitz.com/edit/angular-mattable-with-groupheader?file=app%2Ftable-basic-example.ts
// https://stackblitz.com/edit/angular-material-expandable-table-rows?file=app%2Ftable%2Ftable.component.ts

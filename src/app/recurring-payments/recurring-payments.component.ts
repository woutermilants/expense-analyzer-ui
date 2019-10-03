import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ReportService} from "../service/report.service";
import {Expense} from "../models/expense.model";


@Component({
  selector: 'app-recurring-payments',
  templateUrl: './recurring-payments.component.html',
  styleUrls: ['./recurring-payments.component.scss']
})
export class RecurringPaymentsComponent implements OnInit, AfterViewInit {

  columnsToDisplay: string[] = ['amount', 'counterPartName'];
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

  constructor(private reportService: ReportService) {
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
            monthlypayments.push(value1);
          })

        });
        this.reportDatasource = monthlypayments;
      });
  }

  isGroup(index, item): boolean{
    return item.isGroupBy;
  }
}

export interface GroupBy {
  name: string;
  isGroupBy: boolean;
}


//https://stackblitz.com/edit/angular-mattable-with-groupheader?file=app%2Ftable-basic-example.ts

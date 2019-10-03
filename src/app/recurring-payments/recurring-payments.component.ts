import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ReportService} from "../service/report.service";
import {MonthlyPayment} from "../models/monthPayments.model";


@Component({
  selector: 'app-recurring-payments',
  templateUrl: './recurring-payments.component.html',
  styleUrls: ['./recurring-payments.component.scss']
})
export class RecurringPaymentsComponent implements OnInit, AfterViewInit {

  columnsToDisplay: string[] = ['month', 'expenses'];
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

  reportDatasource = new MatTableDataSource<MonthlyPayment>();

  constructor(private reportService: ReportService) {
    this.reportDatasource = new MatTableDataSource<MonthlyPayment>();
  }

  ngOnInit() {
    setTimeout(() => this.reloadData());
  }

  ngAfterViewInit() {
    this.reloadData();
  }

  private reloadData() {

    this.reportDatasource = new MatTableDataSource<MonthlyPayment>();
    this.reportService.getRecurringPayments()
      .subscribe((object) => {
        var monthlypayments : MonthlyPayment[] = [];

        new Map(Object.entries(object)).forEach((value, key) => {
          monthlypayments.push(new MonthlyPayment(this.monthLabels[key], value));
        });
        this.reportDatasource.data = monthlypayments.sort((n1,n2) => {
          return this.monthNames[n1.activeMonth] - this.monthNames[n2.activeMonth];
        });
      });
  }
}


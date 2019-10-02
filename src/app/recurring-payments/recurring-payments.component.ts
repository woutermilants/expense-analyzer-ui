import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ReportService} from "../service/report.service";
import {MonthPayments} from "../models/monthPayments.model";


@Component({
  selector: 'app-recurring-payments',
  templateUrl: './recurring-payments.component.html',
  styleUrls: ['./recurring-payments.component.scss']
})
export class RecurringPaymentsComponent implements OnInit, AfterViewInit {

  columnsToDisplay: string[] = ['month'];
  reportDatasource = new MatTableDataSource<MonthPayments>();

  constructor(private reportService: ReportService) {
    this.reportDatasource = new MatTableDataSource<MonthPayments>();
  }

  ngOnInit() {
    setTimeout(() => this.reloadData());
    console.log(this.reportDatasource.data)
  }

  ngAfterViewInit() {
    this.reloadData();
  }

  private reloadData() {

    this.reportService.getRecurringPayments()
      .subscribe((object) => {
        new Map(Object.entries(object)).forEach((value, key) => {
          this.reportDatasource.data.push(new MonthPayments(key, value));
        });
      });
  }
}


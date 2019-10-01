import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Counterpart} from '../models/counterpart.model';
import {CounterpartService} from '../service/counterpart.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../models/page.model';
import {PaginationAndSorting} from '../models/pagination-and-sorting.model';
import {tap} from "rxjs/operators";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-counterparts',
  templateUrl: './counterpart-overview.component.html',
  styleUrls: ['./counterpart-overview.component.scss']
})
export class CounterpartOverviewComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  columnsToDisplay: string[] = ['name', 'accountNumber', 'ownAccount', 'recurringCounterPart'];
  page: Page<Counterpart>;
  counterpartsDataSource= new MatTableDataSource<Counterpart>();
  paginationAndSorting: PaginationAndSorting;


  constructor(private counterpartService: CounterpartService) {
    this.counterpartsDataSource  = new MatTableDataSource<Counterpart>();
  }

  ngOnInit() {
    setTimeout(() => this.reloadData());
    this.paginationAndSorting = new PaginationAndSorting(0, 10, null, 'asc');
    //this.counterpartsDataSource.loadProducts("id", "ASC", 0);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((pageEvent) => {
      this.paginationAndSorting =
        new PaginationAndSorting(pageEvent.pageIndex, pageEvent.pageSize, this.matSort.active, this.matSort.direction);
      this.reloadData();
    });
    this.matSort.sortChange.subscribe((sortEvent) => {
      this.paginationAndSorting =
        new PaginationAndSorting(this.paginator.pageIndex, this.paginator.pageSize, sortEvent.active, sortEvent.direction);
      this.reloadData();
    });
  }

  private reloadData() {
    this.counterpartService.getCounterparts(this.paginationAndSorting)
      .subscribe((page) => {
        this.page = page;
        this.counterpartsDataSource.data = page.content;
        this.paginator.length = this.page ? this.page.totalElements : undefined;
      });
  }

  updateOwnAccount(counterpart : Counterpart, $event: MatCheckboxChange) {
    counterpart.ownAccount = $event.checked;
    console.log(counterpart);
    this.counterpartService.updateCounterpart(counterpart)
  }

  updateRecurringAccount(counterpart : Counterpart, $event: MatCheckboxChange) {
    counterpart.recurringCounterPart = $event.checked;
    console.log(counterpart);
    this.counterpartService.updateCounterpart(counterpart)
  }
}

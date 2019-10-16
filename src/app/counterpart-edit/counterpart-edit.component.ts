import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Counterpart} from '../models/counterpart.model';
import {CounterPartService} from '../service/counter-part.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../models/page.model';
import {PaginationAndSorting} from '../models/pagination-and-sorting.model';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-counterparts',
  templateUrl: './counterpart-edit.component.html',
  styleUrls: ['./counterpart-edit.component.scss']
})
export class CounterpartEditComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  columnsToDisplay: string[] = ['name', 'accountNumber', 'ownAccount', 'recurringCounterPart'];
  page: Page<Counterpart>;
  counterpartsDataSource= new MatTableDataSource<Counterpart>();
  paginationAndSorting: PaginationAndSorting;


  constructor(private counterpartService: CounterPartService) {
    this.counterpartsDataSource  = new MatTableDataSource<Counterpart>();
  }

  ngOnInit() {
    setTimeout(() => this.reloadData());
    this.paginationAndSorting = new PaginationAndSorting(0, 10, null, 'asc');
    //this.reportDatasource.loadProducts("id", "ASC", 0);
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
}

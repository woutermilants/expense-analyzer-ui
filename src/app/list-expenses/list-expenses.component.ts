import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Expense} from '../models/expense.model';
import {ExpenseService} from '../service/expense.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../models/page.model';
import {PaginationAndSorting} from '../models/pagination-and-sorting.model';
import {tap} from "rxjs/operators";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.scss']
})
export class ListExpensesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  columnsToDisplay: string[] = ['date','counterPartName', 'amount', 'statement'];
  page: Page<Expense>;
  expensesDataSource= new MatTableDataSource<Expense>();
  paginationAndSorting: PaginationAndSorting;


  constructor(private expenseService: ExpenseService, private datepipe: DatePipe,) {
    this.expensesDataSource  = new MatTableDataSource<Expense>();
  }

  ngOnInit() {
    setTimeout(() => this.reloadData());
    this.paginationAndSorting = new PaginationAndSorting(0, 10, null, 'asc');
    //this.expensesDataSource.loadProducts("id", "ASC", 0);
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
    this.expenseService.getExpenses(this.paginationAndSorting)
      .subscribe((page) => {
        this.page = page;
        this.expensesDataSource.data = page.content;
        this.expensesDataSource.data.forEach(expense => expense.date = this.datepipe.transform(expense.date, 'dd/MM/yyyy').toString())
        this.paginator.length = this.page ? this.page.totalElements : undefined;
      });
  }
}

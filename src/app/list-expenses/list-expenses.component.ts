import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Expense} from '../models/expense.model';
import {ExpenseService} from '../service/expense.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../models/page.model';
import {PaginationAndSorting} from '../models/pagination-and-sorting.model';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.scss']
})
export class ListExpensesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  columnsToDisplay: string[] = ['counterPartName', 'amountInCents'];
  page: Page<Expense>;
  expensesDataSource= new MatTableDataSource<Expense>();
  paginationAndSorting: PaginationAndSorting;


  constructor(private expenseService: ExpenseService) {
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
        this.paginator.length = this.page ? this.page.totalElements : undefined;
      });
  }

  /*
    ngOnInit() {
      this.paginationAndSorting = new PaginationAndSorting(0, 10, null, 'asc');
      this.reloadData();
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

    getCounterPartName(expense: Expense): string {
      return expense.counterPartName.trim() ? expense.counterPartName : expense.counterPartAccount;
    }

    getAmount(expense: Expense): number {
      return expense.amountInCents / 100;
    }

    private reloadData() {
      this.expenseService.getExpenses(this.paginationAndSorting)
        .subscribe((page) => {
          this.page = page;
          this.expensesDataSource.data = page.content;
          this.paginator.length = this.page ? this.page.totalElements : undefined;
        });
    }

    ngAfterViewInit() {
      this.expensesDataSource.paginator = this.paginator;
      this.paginator.page.subscribe((pageEvent) => {
        this.paginationAndSorting =
          new PaginationAndSorting(pageEvent.pageIndex, pageEvent.pageSize, this.matSort.active, this.matSort.direction);
        this.reloadData();
      });
    }*/
}

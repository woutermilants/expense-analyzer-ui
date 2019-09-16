import { Component, OnInit, ViewChild } from '@angular/core';
import { Expense } from '../models/expense.model';
import {Page} from '../models/page.model';
import {PaginationAndSorting} from '../models/pagination-and-sorting.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ExpenseService} from '../service/expense.service';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.scss']
})
export class ListExpensesComponent implements OnInit {

 /*  @ViewChild(MatSort, {static: false} ) matSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
 */
  columnsToDisplay: string[] = ['counterpart', 'amount'];
  page: Page<Expense>;
  expensesDataSource = new MatTableDataSource<Expense>();
  private paginationAndSorting: PaginationAndSorting;
  private paginator: MatPaginator;
  private sort: MatSort;

  constructor(private expenseService : ExpenseService) {
  }

  ngOnInit() {
   this.paginationAndSorting = new PaginationAndSorting(0, 10, null, 'asc');
      this.reloadData();
      this.paginator = this.expensesDataSource.paginator;
      this.paginator.page.subscribe((pageEvent) => {
        this.paginationAndSorting =
          new PaginationAndSorting(pageEvent.pageIndex, pageEvent.pageSize, this.matSort.active, this.matSort.direction);
        this.reloadData();
      })
  }

 getCounterPartName(expense: Expense): string {
    return expense.counterPartName;
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

    @ViewChild(MatSort, {static: false}) set matSort(ms: MatSort) {
        this.sort = ms;
        this.setDataSourceAttributes();
    }

    @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.setDataSourceAttributes();
    }

    setDataSourceAttributes() {
        this.expensesDataSource.paginator = this.paginator;
        this.expensesDataSource.sort = this.sort;

        /* if (this.paginator && this.sort) {
            this.applyFilter('');
        } */
    }
}

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Expense} from '../models/expense.model';
import {Page} from '../models/page.model';
import {PaginationAndSorting} from '../models/pagination-and-sorting.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}),
};

@Injectable()
export class ExpenseService {

  //private expenseUrl = environment.expenseApiUrl + '/expenses';
  //private expenseUrl = 'http://192.168.0.56:8089' + '/expenses';
  //private expenseUrl = 'http://84.194.148.237:8089' + '/expenses';
  private expenseUrl = 'http://localhost:8089' + '/expenses';

  constructor(private http: HttpClient) {
  }

  public getExpenses(paginationAndSorting: PaginationAndSorting): Observable<Page<Expense>> {
    const params = this.createHttpParams(paginationAndSorting);
    return this.http.get<Page<Expense>>(this.expenseUrl, httpOptions['params'] = {params});
  }

  public getExpensesForCounterPart(accountNumber : string, onlyRecurring: boolean): Observable<Expense[]> {
    let url = this.expenseUrl + '/counterpart/' + accountNumber + '?onlyRecurring=' + onlyRecurring;
    let expenses = this.http.get<Expense[]>(url, httpOptions);
    return expenses;
  }

  public getExpense(id: number): Observable<Expense> {
    return this.http.get<Expense>(this.expenseUrl + '/' + id);
  }

  public createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.expenseUrl, expense, httpOptions);
  }

  public updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(this.expenseUrl + '/' + expense.id, expense, httpOptions);
  }

  public deleteExpense(id: number): Observable<any> {
    return this.http.delete(this.expenseUrl + '/' + id);
  }

  private createHttpParams(paginationAndSorting: PaginationAndSorting): HttpParams {
    let params = new HttpParams();
    if (paginationAndSorting.page) {
      params = params.append('page', paginationAndSorting.page + '');
    }
    if (paginationAndSorting.size) {
      params = params.append('size', paginationAndSorting.size + '');
    }
    if (paginationAndSorting.sortColumn) {
      params = params.append('sortColumn', paginationAndSorting.sortColumn);
    }
    if (paginationAndSorting.direction) {
      params = params.append('direction', paginationAndSorting.direction);
    }

    return params;
  }

  updateRecurringExpense(expense: Expense) {
    var expenseRecurring = {"recurringExpense" : false};
    return this.http.patch(this.expenseUrl + '/expense/' + expense.id, expenseRecurring);
  }
}

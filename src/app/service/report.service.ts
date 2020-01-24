import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../models/page.model';
import {PaginationAndSorting} from '../models/pagination-and-sorting.model';
import {Expense} from "../models/expense.model";
import {environment} from "../../environments/environment";
import {RecurringCost} from '../models/recurring-cost.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};

@Injectable()
export class ReportService {

  private reportUrl = environment.backendUrl;

  constructor(private http: HttpClient) {
  }

  public getRecurringPayments(): Observable<RecurringCost[]> {
    return  this.http.get<RecurringCost[]>(this.reportUrl + '/recurringcost');
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
}

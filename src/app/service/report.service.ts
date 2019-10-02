import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../models/page.model';
import {PaginationAndSorting} from '../models/pagination-and-sorting.model';
import {Expense} from "../models/expense.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};

@Injectable()
export class ReportService {

  //private reportUrl = environment.reportApiUrl + '/reports';
  private reportUrl = 'http://localhost:8089' + '/reports';
  //private reportUrl = 'http://192.168.0.56:8089' + '/reports';
 // private reportUrl = 'http://84.194.148.237:8089' + '/reports';

  constructor(private http: HttpClient) {
  }

  public getRecurringPayments(): Observable<Map<String, Array<Expense>>> {
    let observable = this.http.get<Map<String, Array<Expense>>>(this.reportUrl + "/recurringPayments");
    console.log(observable);
    return observable;
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

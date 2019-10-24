import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Expense} from '../models/expense.model';
import {Page} from '../models/page.model';
import {PaginationAndSorting} from '../models/pagination-and-sorting.model';
import {RecurringOption} from "../models/recurring-option.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}),
};

@Injectable()
export class RecurringCostService {

  private recurringCostUrl = environment.backendUrl + '/recurringcost';

  constructor(private http: HttpClient) {
  }

  public createOrAddCost(counterPartAccountNumber: string, expenseId : number, recurringOption: string): any {
    let recurringOption1 = new RecurringOption(recurringOption);
    let objectObservable = this.http.post<any>(this.recurringCostUrl + '/counterpart/' + counterPartAccountNumber + '/expense/' + expenseId,
      recurringOption1 ,httpOptions);
    objectObservable.subscribe(data => {
      console.log(data);
    });
  }
}

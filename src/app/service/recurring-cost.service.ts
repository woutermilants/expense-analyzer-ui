import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Expense} from '../models/expense.model';
import {Page} from '../models/page.model';
import {PaginationAndSorting} from '../models/pagination-and-sorting.model';
import {RecurringOption} from '../models/recurring-option.model';
import {DatePipe} from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}),
};

@Injectable()
export class RecurringCostService {

  private recurringCostUrl = environment.backendUrl + '/recurringcost';

  constructor(private http: HttpClient,
              private datepipe: DatePipe) {
  }

  public createCost(description: string, expenseIds: [], recurringOption: string): Observable<any> {
    const createCost = {
      description,
      expenseIds,
      recurringOption
    };
    console.log('before post recurring');
    return this.http.post<any>(this.recurringCostUrl, createCost, httpOptions);
  }

  public extractAllMonths(expenses: Expense[], recurringOption: string) {
    const months: string[] = [];
    expenses.forEach(ex => months.push(this.datepipe.transform(ex.date, 'dd/MM/yyyy').toString().substr(3, 2)));

    //do we have the exact amount of months ?
    const uniqueMonths = months.filter(onlyUnique);
    // console.log('uniquemonthus' + uniqueMonths);
    // if ('MONTHLY' === recurringOption) {
    //   return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    //
    if (uniqueMonths.length === 12 / this.determineStepSize(recurringOption)) {
      return uniqueMonths;
    }

    return months.filter(onlyUnique);
  }

  private checkInterval(uniqueMonths: string[], recurringOption: string) {
  }

  private determineStepSize(recurringOption: string) {
    if (recurringOption === 'MONTHLY') {
      return 1;
    } else if (recurringOption === 'QUARTERLY') {
      return 3;
    } else if (recurringOption === 'BIANNUALLY') {
      return 6;
    } else if (recurringOption === 'YEARLY') {
      return 12;
    }
  }

  getLastAmount(expenses: Expense[]) {
    const  sortedExpenses = expenses.sort((a, b) => {
      if (new Date(b.date).getTime() < new Date(a.date).getTime()) {
        return -1;
      } else if (new Date(b.date).getTime() > new Date(a.date).getTime()) {
        return 1;
      } else {
        return 0;
      }
    });

    return sortedExpenses[0].amount.toString();
  }
}


function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


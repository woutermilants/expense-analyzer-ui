import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Counterpart} from '../models/counterpart.model';
import {Page} from '../models/page.model';
import {PaginationAndSorting} from '../models/pagination-and-sorting.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable()
export class CounterpartService {

  //private counterpartUrl = environment.counterpartApiUrl + '/counterparts';
  private counterpartUrl = 'http://192.168.0.56:8089' + '/counterparts';
 // private counterpartUrl = 'http://84.194.148.237:8089/counterparts';

  constructor(private http: HttpClient) {
  }

  public getCounterparts(paginationAndSorting: PaginationAndSorting): Observable<Page<Counterpart>> {
    const params = this.createHttpParams(paginationAndSorting);
    return this.http.get<Page<Counterpart>>(this.counterpartUrl, {params});
  }

  public getCounterpart(id: number): Observable<Counterpart> {
    return this.http.get<Counterpart>(this.counterpartUrl + '/' + id);
  }

  public createCounterpart(counterpart: Counterpart): Observable<Counterpart> {
    return this.http.post<Counterpart>(this.counterpartUrl, counterpart, httpOptions);
  }

  public updateCounterpart(counterpart: Counterpart): Observable<Counterpart> {
    return this.http.put<Counterpart>(this.counterpartUrl + '/' + counterpart.accountNumber, counterpart, httpOptions);
  }

  public deleteCounterpart(id: number): Observable<any> {
    return this.http.delete(this.counterpartUrl + '/' + id);
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

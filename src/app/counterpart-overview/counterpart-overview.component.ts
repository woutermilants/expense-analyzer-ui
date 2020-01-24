import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Counterpart} from '../models/counterpart.model';
import {CounterPartService} from '../service/counter-part.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../models/page.model';
import {PaginationAndSorting} from '../models/pagination-and-sorting.model';
import {tap} from "rxjs/operators";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-counterparts',
  templateUrl: './counterpart-overview.component.html',
  styleUrls: ['./counterpart-overview.component.scss']
})
export class CounterpartOverviewComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, {static: false}) matSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  columnsToDisplay: string[] = ['name', 'accountNumber', 'totalAmountReceived', 'totalAmountSpent'];
  page: Page<Counterpart>;
  counterpartsDataSource= new MatTableDataSource<Counterpart>();
  paginationAndSorting: PaginationAndSorting;
  requestedAccountNumber: string;

  constructor(private counterpartService: CounterPartService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private activatedRoute: ActivatedRoute) {
    this.counterpartsDataSource  = new MatTableDataSource<Counterpart>();
   // matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityResourceUrl('/assets/mdi.svg'));

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.requestedAccountNumber = params['accountNumber'];
    });
    setTimeout(() => this.reloadData());
    this.paginationAndSorting = new PaginationAndSorting(0, 500, null, 'asc');
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
    if (this.requestedAccountNumber) {
      this.applyFilter(this.requestedAccountNumber);
    }
  }

  private reloadData() {
      this.counterpartService.getCounterparts(this.paginationAndSorting).subscribe((page) => {
        this.page = page;
        this.counterpartsDataSource.data = page.content;
        this.paginator.length = this.page ? this.page.totalElements : undefined;
      });
  }

  applyFilter(filterValue: string) {
    this.counterpartsDataSource.filter = filterValue.trim().toLowerCase();
  }

  updateName(counterPart : Counterpart, counterPartName: string) {
    counterPart.name = counterPartName.trim();
    this.counterpartService.updateCounterpart(counterPart)

  }
}

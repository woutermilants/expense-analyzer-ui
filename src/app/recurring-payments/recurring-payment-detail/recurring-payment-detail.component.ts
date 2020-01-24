import {Component, Input, OnInit} from '@angular/core';
import {Expense} from '../../models/expense.model';
import {RecurringCost} from '../../models/recurring-cost.model';
import {DisplayRecurringCost} from '../../models/display-recurring-cost.model';

@Component({
  selector: 'app-recurring-payment-detail',
  templateUrl: './recurring-payment-detail.component.html',
  styleUrls: ['./recurring-payment-detail.component.scss']
})
export class RecurringPaymentDetailComponent implements OnInit {

  @Input() public recurringCost: DisplayRecurringCost;

  constructor() { }

  ngOnInit() {
  }

}

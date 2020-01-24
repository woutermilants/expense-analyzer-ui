import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormArray, FormControl, FormBuilder} from '@angular/forms';
import {Expense} from '../../models/expense.model';
import {ExpenseService} from '../../service/expense.service';
import {CounterPartService} from '../../service/counter-part.service';
import {Counterpart} from '../../models/counterpart.model';
import {DatePipe} from '@angular/common';
import {RecurringCostService} from '../../service/recurring-cost.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.scss']
})
export class ExpenseDetailComponent implements OnInit, OnChanges {

  @Input() public expense: Expense;
  @Output() expenseChanged = new EventEmitter<void>();
  otherExpenses: Expense[];
  form: FormGroup;
  recurringOptions = ['MONTHLY', 'QUARTERLY', 'BIANNUALLY', 'YEARLY'];

  constructor(
    private expenseService: ExpenseService,
    private counterPartService: CounterPartService,
    private recurringCostService: RecurringCostService,
    private datepipe: DatePipe,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      description: new FormControl(),
      expensesMostLikely: new FormArray([]),
      expensesLikely: new FormArray([]),
      expensesUnlikely: new FormArray([]),
      recurringOption: new FormControl()
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expense) {
      (this.form.controls.description as FormControl).setValue(this.expense.counterPart.name);
      this.loadOtherExpenses();
    }
  }

  loadOtherExpenses() {
    this.expenseService.getExpensesForCounterPart(this.expense.counterPart.accountNumber, false).subscribe(data => {

      this.otherExpenses = data.sort((a, b) => {
        if (new Date(b.date).getTime() < new Date(a.date).getTime()) {
          return -1;
        } else if (new Date(b.date).getTime() > new Date(a.date).getTime()) {
          return 1;
        } else {
          return 0;
        }
      });
      this.otherExpenses.forEach(innerExpense => innerExpense.date = this.datepipe.transform(innerExpense.date, 'dd/MM/yyyy').toString());
      this.addDataToForm(this.otherExpenses);
    });
  }

  get formExpenses() {
    return this.form.get('expenses') as FormArray;
  }

  addDataToForm(otherExpenses: Expense[]) {
    (this.form.controls.expensesMostLikely as FormArray).clear();
    (this.form.controls.expensesLikely as FormArray).clear();
    (this.form.controls.expensesUnlikely as FormArray).clear();
    otherExpenses.forEach((o, i) => {
      if (this.expense.amount === o.amount) {
        (this.form.controls.expensesMostLikely as FormArray).push(this.createItem(o));
      } else if (this.expense.amount < o.amount * 1.1 && this.expense.amount > o.amount * 0.9) {
        (this.form.controls.expensesLikely as FormArray).push(this.createItem(o));
      } else {
        (this.form.controls.expensesUnlikely as FormArray).push(this.createItem(o));
      }
    });
  }

  createItem(expense: Expense): FormGroup {
    return this.formBuilder.group({
      selected: false,
      name: expense.statement,
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      id: expense.id,
      recurringOption: expense.recurringOption
    });
  }

  setRecurringExpenseToFalse(expenseId: string) {
    this.expenseChanged.emit();
    console.log('non recurring expense');
    this.expenseService.updateRecurringExpense(expenseId).subscribe(() => this.loadOtherExpenses());
  }

  setRecurringCounterpartToFalse(counterPart: Counterpart) {
    this.expenseChanged.emit();
    counterPart.recurringCounterPart = false;
    this.counterPartService.updateCounterpart(counterPart);
  }

  selectAllOtherExpenses() {
    this.formExpenses.controls.forEach(item => (item as FormControl).get('selected').setValue(true));
  }

  submitForm(value) {
    this.expenseChanged.emit();
    console.log(value);
    const description = value.description;
    const expenseIds = value.expensesMostLikely.filter(expense => expense.selected === true).map(expense => expense.id);
    expenseIds.concat(value.expensesLikely.filter(expense => expense.selected === true).map(expense => expense.id));
    expenseIds.concat(value.expensesUnlikely.filter(expense => expense.selected === true).map(expense => expense.id));
    const recurringOption = value.recurringOption;

    console.log(description + ' ' + expenseIds + ' ' + recurringOption);
    this.recurringCostService.createCost(description, expenseIds, recurringOption).subscribe(() => this.loadOtherExpenses());
  }
}

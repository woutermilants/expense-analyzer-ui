import {Expense} from './expense.model';
import {Counterpart} from './counterpart.model';

export class DisplayRecurringCost {
  id: number;
  description: string;
  recurringOption: string;
  expenses: Expense[];
  amount: string;
  counterPart: Counterpart;


  constructor(id: number, description: string, recurringOption: string, expenses: Expense[], amount: string, counterPart: Counterpart) {
    this.id = id;
    this.description = description;
    this.recurringOption = recurringOption;
    this.expenses = expenses;
    this.amount = amount;
    this.counterPart = counterPart;
  }
}


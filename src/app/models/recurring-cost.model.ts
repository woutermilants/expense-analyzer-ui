import {Expense} from './expense.model';

export class RecurringCost {
  id: number;
  description: string;
  recurringOption: string;
  expenses: Expense[];
}


import {Expense} from "./expense.model";

export class MonthPayments {

  constructor(month: string, expenses: Expense[]) {
    this.month = month;
    this.expenses = expenses;
  }

  month: string;
  expenses: Expense[]
}

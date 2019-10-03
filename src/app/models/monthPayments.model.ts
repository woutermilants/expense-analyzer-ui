import {Expense} from "./expense.model";

export class MonthlyPayment {

  constructor(activeMonth: string, expenses: Expense[]) {
    this.activeMonth = activeMonth;
    this.expenses = expenses;
  }

  activeMonth: string;
  expenses: Expense[]
}

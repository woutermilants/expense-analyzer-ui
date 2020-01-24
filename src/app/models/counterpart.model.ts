import {Expense} from "./expense.model";

export class Counterpart {
  accountNumber: string;
  name: string;
  totalAmountSpent: number;
  totalAmountReceived: number;
  expenses: Expense[];
}

import {Expense} from "./expense.model";

export class Counterpart {
  accountNumber: string;
  name: string;
  recurringCounterPart: boolean;
  ownAccount: boolean;
  totalAmountSpent: number;
  totalAmountReceived: number;
  expenses: Expense[];
}

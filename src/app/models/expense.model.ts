import {Counterpart} from "./counterpart.model";

export class Expense {
  id: number;
  accountNumber: string;
  accountName: string;
  currency: string;
  date: string;
  description: string;
  statement: string;
  amount: number;
  counterPart: Counterpart;
  recurringOption: string;
  recurringExpense: boolean;
}

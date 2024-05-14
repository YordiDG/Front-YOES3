
import {PeriodicExpenses} from "./periodic-expenses";
import {InitialExpenses} from "./initial-expenses";
import {Plan} from "./plan";

export interface PaymentData {
  salary: number;
  car_price: number;
  rate: number;
  plan: Plan;
  initial_fee: number;
  final_fee: number;
  initial_expenses: InitialExpenses;
  monthly_expenses: PeriodicExpenses;
  periods: Array<string>;
}

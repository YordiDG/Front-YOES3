import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PaymentData} from "./model/payment.service";
import {Plan} from "./model/plan";

@Component({
  selector: 'app-dialog-log',
  templateUrl: './dialog-log.component.html',
  styleUrls: ['./dialog-log.component.css']
})
export class DialogLogComponent {

  data_form: FormGroup = new FormGroup({
    salary: new FormControl('', [Validators.required, Validators.min(1500)]),
    car_price: new FormControl('', [Validators.required]),
    rate: new FormControl('Efectiva', [Validators.required]),
    coin: new FormControl('Soles'),
    plan: new FormControl('plan24'),
    initial_fee_percentage: new FormControl('20', [Validators.required]),
    final_fee_percentage: new FormControl ('30', [Validators.required]),
    interest_rate_percentage: new FormControl('8.49', [Validators.required]),
    risk_insurance_percentage: new FormControl('0.029', [Validators.required]),
    disgrace_insurance_percentage: new FormControl('0.049', [Validators.required]),
    type_period: new FormControl(''),
    grace_period: new FormControl('0')
  });

  seasons: string[] = ['Nominal', 'Efectiva'];
  coins: string[] = ['Soles', 'Dolares'];

  enableGracePeriod(): boolean {
    return this.data_form.get('type_period')?.value == 'total' || this.data_form.get('type_period')?.value == 'parcial';
  }

  convertNominalToEffectiveAnnualRate(nominal_rate: number): number {
    const compounding_periods = 365;
    const decimal_rate = nominal_rate / 100;
    const effective_rate = Math.pow(1 + decimal_rate / compounding_periods, compounding_periods) - 1;
    return effective_rate * 100;
  }

  convertAnnualToMonthlyEffectiveRate(annual_rate: number): number {
    const compounding_periods_per_year = 12;
    const decimal_rate = annual_rate / 100;
    const monthly_rate = Math.pow(1 + decimal_rate, 1 / compounding_periods_per_year) - 1;
    return monthly_rate * 100;
  }

  calculateRate(rate_porcentage: number): number {
    if (this.data_form.get('rate')?.value == 'Nominal') {
      const annual_rate: number = this.convertNominalToEffectiveAnnualRate(rate_porcentage);
      return this.convertAnnualToMonthlyEffectiveRate(annual_rate);
    } else {
      return this.convertAnnualToMonthlyEffectiveRate(rate_porcentage);
    }
  }

  determinatePlanData(type_plan: string): Plan {
    if (type_plan == 'plan24') {
      return {
        fees_year: 12,
        fees_total: 24,
        years: 2
      }
    }
    return {
      fees_year: 6,
      fees_total: 36,
      years: 3
    }
  }

  determinateInitialFee(car_price: number, porcentage: number): number {
    return car_price * porcentage / 100;
  }

  determinateFinalFee(car_price: number, porcentage: number): number {
    return car_price * porcentage / 100;
  }

  getPeriods(fees_total: number, type_period: String, grace_period: number): Array<string> {
    const filledArray = new Array<string>(fees_total+1).fill('S');
    filledArray[0] = "";
    if(type_period == 'total'){
      const changedArray = filledArray.fill('T', 1, grace_period+1);
      return changedArray
    }
    if(type_period == 'parcial'){
      const changedArray = filledArray.fill('P', 1, grace_period+1);
      return changedArray
    }
    return filledArray
  }

  onSubmit(): void {
    const plan = this.determinatePlanData(this.data_form.get('plan')?.value);
    const payload: PaymentData = {
      salary: this.data_form.get('salary')?.value,
      car_price: this.data_form.get('car_price')?.value,
      rate: this.calculateRate(this.data_form.get('interest_rate_percentage')?.value),
      plan: plan,
      initial_fee: this.determinateInitialFee(this.data_form.get('car_price')?.value, this.data_form.get('initial_fee_percentage')?.value),
      final_fee: this.determinateFinalFee(this.data_form.get('car_price')?.value, this.data_form.get('final_fee_percentage')?.value),
      initial_expenses: {
        notarial_costs: 100,
        registration_costs: 75,
        appraisal: 10,
        study_commission: 10,
        activation_commission: 10
      },
      monthly_expenses:{
        gps: 20,
        portes: 3.50,
        administrative_expenses: 3.50,
        indemnity_insurance: this.data_form.get('disgrace_insurance_percentage')?.value,
        risk_insurance: this.data_form.get('risk_insurance_percentage')?.value
      },
      periods: this.getPeriods(plan.fees_total, this.data_form.get('type_period')?.value, this.data_form.get('grace_period')?.value)
    };
    console.log(payload);
  }
}

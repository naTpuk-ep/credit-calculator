import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


export interface IMonthlyAmountArguments {
  totalAmount: number;
  loanRate: number;
  months: number;
}

@Injectable()
export class CalcService {
  getMonthlyAmount({
    totalAmount,
    months,
    loanRate,
  }: IMonthlyAmountArguments) {
    const shareRate = loanRate / 100 / 12;
    const monthlyAmount = totalAmount * shareRate / (1 - (1 + shareRate) ** (-months));
    return Math.ceil(monthlyAmount);
  }
}

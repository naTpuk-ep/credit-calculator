import { Injectable } from '@angular/core';
import { IFormValue } from '../../app.component';

@Injectable()
export class CalcService {
  loanRate = 15.9;

  getMonthlyAmount({
    totalAmount,
    months,
  }: IFormValue) {
    const shareRate = this.loanRate / 100 / 12;
    const monthlyAmount = totalAmount * shareRate / (1 - (1 + shareRate) ** (-months));
    return Math.ceil(monthlyAmount);
  }
}

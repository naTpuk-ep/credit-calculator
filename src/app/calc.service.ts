import { Injectable } from '@angular/core';
import { IFormValue } from './app.component';

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

  numWord(value: number, words: string[]): string {
    value = Math.abs(value) % 100;
    const num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalcService } from './calc.service';


interface IFormValue {
  totalAmount: number;
  months: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CalcService],
})
export class AppComponent implements OnInit {
  formGroup!: FormGroup;
  totalAmountStep = 50e3;
  minTotalAmount = 30e3;
  maxTotalAmount = 7e6;
  minMonths = 6;
  maxMonths = 84;
  private initialTotalAmount = 1.5e6;
  private initialMonths = 60;
  private fb = new FormBuilder();

  constructor(private calcService: CalcService) {
    this.transformMonths = this.transformMonths.bind(this);
  }

  log() {
    console.log(this.formValue);
  }

  ngOnInit() {
    this.initFormGroup();
  }

  transformLoanRate(value: number): string {
    return value.toLocaleString('ru') + ' %';
  }

  transformAmountValue(value: number) {
    return value.toLocaleString('ru') + ' ₽';
  }

  transformMonths(value: number) {
    const years = Math.floor(value / 12);
    const months = value % 12;
    return (years ? `${years} ${this.calcService.numWord(
      years,
      [
        'год',
        'года',
        'лет',
      ],
      )}` : '')
      + ' ' +
      (months ? `${months} ${this.calcService.numWord(
        months,
        [
          'месяц',
          'месяца',
          'месяцев',
        ],
      )}` : '');
  }

  get formValue() {
    return this.formGroup.value as IFormValue;
  }

  get monthLyAmount() {
    return this.calcService.getMonthlyAmount({
      months: this.formValue.months,
      totalAmount: this.formValue.totalAmount,
    });
  }

  get loanRate() {
    return this.calcService.loanRate;
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      totalAmount: [this.initialTotalAmount],
      months: [this.initialMonths],
      switch: false,
    });
  }
}

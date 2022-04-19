import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalcService } from './shared/services/calc.service';
import { NumWordPipe } from './shared/pipes/num-word.pipe';
import { LocalePipe } from './shared/pipes/locale.pipe';


export interface IFormValue {
  totalAmount: number;
  months: number;
  switch: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CalcService, NumWordPipe, LocalePipe],
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

  constructor(private calcService: CalcService, private numWord: NumWordPipe, public localePipe: LocalePipe) {
    this.transformMonths =  this.transformMonths.bind(this);
    this.transformAmountValue = this.transformAmountValue.bind(this);
  }

  ngOnInit() {
    this.initFormGroup();
  }

  transformAmountValue(value: number) {
    return this.localePipe.transform(value, '₽');
  }

  transformMonths(value: number) {
    const years = Math.floor(value / 12);
    const months = value % 12;
    return (
        this.numWord.transform(years, ['год', 'года', 'лет'])
        + ' '
        + this.numWord.transform(months, ['месяц', 'месяца', 'месяцев'])
    )
  }

  get formValue() {
    return this.formGroup.value as IFormValue;
  }

  get monthLyAmount() {
    return this.calcService.getMonthlyAmount(this.formValue);
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

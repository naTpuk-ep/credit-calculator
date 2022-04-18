import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { CalcService } from './calc.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


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
  loanRate = 15.9;
  totalAmountStep = 50e3;
  minTotalAmount = 30e3;
  maxTotalAmount = 7e6;
  minMonths = 6;
  maxMonths = 84;
  monthLyAmount$!: Observable<number>;
  private initialTotalAmount = 1.5e6;
  private initialMonths = 60;
  private fb = new FormBuilder();

  constructor(private calcService: CalcService) {}

  log() {
    console.log(this.formValue);
  }

  ngOnInit() {
    this.initFormGroup();
  }

  transformTotalAmountValue(value: number) {
    return `${value} - ${value}`;
  }

  get formValue() {
    return this.formGroup.value as IFormValue;
  }

  get monthLyAmount() {
    return this.calcService.getMonthlyAmount({
      months: this.formValue.months,
      totalAmount: this.formValue.totalAmount,
      loanRate: this.loanRate,
    })
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      totalAmount: [this.initialTotalAmount],
      months: [this.initialMonths],
    });
  }
}

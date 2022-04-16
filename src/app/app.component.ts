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


interface IFormValue {
  totalAmount: number;
  months: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @ViewChildren('inputNumber') inputNumberList!: QueryList<InputNumber>;
  formGroup!: FormGroup;
  totalAmountStep = 50e3;
  minTotalAmount = 30e3;
  maxTotalAmount = 7e6;
  minMonths = 6;
  maxMonths = 84;
  private initialTotalAmount = 1.5e6;
  private initialMonths = 60;
  private fb = new FormBuilder();

  constructor() {
  }

  ngOnInit() {
    this.initFormGroup();
  }

  get formValue() {
    return this.formGroup.value as IFormValue;
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      totalAmount: [this.initialTotalAmount],
      months: [this.initialMonths],
    });
  }
}

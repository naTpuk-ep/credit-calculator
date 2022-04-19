import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';


@Component({
  selector: 'app-calc-input',
  templateUrl: './calc-input.component.html',
  styleUrls: ['./calc-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalcInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalcInputComponent implements ControlValueAccessor, OnInit {
  @ViewChild('inputNumber') inputNumber!: InputNumber;
  @Input() min!: number;
  @Input() max!: number;
  @Input() step!: number;
  @Input() viewTransformer!: (value: number) => string;
  valueFormControl = new FormControl();
  focus = false;
  maxlength!: number;

  private onChange!: (value: number) => void;
  private onTouched!: () => void;

  ngOnInit(): void {
    this.maxlength = `${this.max}`.length;
  }

  inputChange({ value }: { value: number }) {
    if (this.max && value && ((value > this.max) || `${value}`.length > this.maxlength)) {
      value = this.max;
    }
    if (!value || value <= this.min) {
      return;
    }
    this.valueFormControl.patchValue(value);
    this.onChange(value);
  }


  focusInput() {
    this.focus = true;
    this.inputNumber.input.nativeElement.focus();
  }

  inputOnblur() {
    if (!this.valueFormControl.value || this.valueFormControl.value <= this.min) {
      this.valueFormControl.patchValue(this.min);
      this.onChange(this.min);
    }
    this.focus = false;
  }

  writeValue(value: number) {
    this.valueFormControl.setValue(value);
  }

  registerOnChange(fn: (value: number) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}

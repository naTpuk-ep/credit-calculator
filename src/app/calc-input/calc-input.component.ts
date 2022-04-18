import {
  ChangeDetectionStrategy, ChangeDetectorRef,
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
  valueFormControl = new FormControl();
  @Input() min!: number;
  @Input() max!: number;
  @Input() maxlength!: number;
  @Input() step!: number;
  @Input() viewTransformer!: (value: number) => string;
  focus = false;

  private onChange!: (value: number) => void;
  private onTouched!: () => void;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  inputChange({ value }: { value: number }) {
    if (this.max && value > this.max) value = this.max;
    if (this.maxlength && this.max && `${value}`.length > this.maxlength) value = this.max;
    this.valueFormControl.patchValue(value);
    this.onChange(value);
  }


  hideInputView(event: MouseEvent) {
    this.focus = true;
    this.inputNumber.input.nativeElement.focus();
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

  inputOnblur() {
    if (!this.min || this.valueFormControl.value <= this.min) {
      this.onChange(this.min);
    }
    this.focus = false;
  }
}

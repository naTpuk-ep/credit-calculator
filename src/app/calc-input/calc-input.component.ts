import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  ]
})
export class CalcInputComponent implements ControlValueAccessor, OnInit {
  @Input() min!: number;
  @Input() max!: number;
  @Input() maxlength!: number
  @Input() step!: number
  @Input() viewTransformer!: (value: number) => string;
  value!: number;

  focus = false;
  private onChange!: (value: number) => void;
  private onTouched!: () => void;

  constructor() { }

  ngOnInit(): void {
  }

  inputChange({ value }: { value: number }) {
    this.onChange(value);
  }


  hideInputView(event: MouseEvent) {

  }

  writeValue(value: number) {
    this.value = value;
  }

  registerOnChange(fn: (value: number) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

}

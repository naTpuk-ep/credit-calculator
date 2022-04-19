import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CalcInputComponent } from './calc-input.component';
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputNumber } from 'primeng/inputnumber';


describe('CalcInputComponent', () => {
  let component: CalcInputComponent;
  let fixture: ComponentFixture<CalcInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalcInputComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcInputComponent);
    component = fixture.componentInstance;
    component.viewTransformer = (value) => `${value} !!!`;

    component.max = 84;
    component.min = 6;
    component.focus = false;
    component.valueFormControl = new FormControl();
    (component as any).onChange = function (value: number) {}
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  it('ngOnInit should set maxLength', () => {
    expect(component.maxlength)
      .toBe(2);
  });

  it('inputChange', () => {
    component.min = 6;
    component.max = 84;
    component.inputChange({ value: 20 });
    // tick()
    expect(component.valueFormControl.value).toBe(20);
  });

  it('inputChange', () => {
    component.min = 6;
    component.max = 84;
    component.valueFormControl.setValue(20);
    fixture.detectChanges()
    component.inputChange({ value: 1 });
    // tick()
    expect(component.valueFormControl.value).toBe(20);
  });

  it('inputChange max', () => {
    component.valueFormControl.setValue(20);
    component.inputChange({ value: 90 });
    // tick()
    expect(component.valueFormControl.value).toBe(component.max);
  });

  it('inputChange max-length', () => {
    component.valueFormControl.setValue(20);
    component.inputChange({ value: 1000 });
    expect(component.valueFormControl.value).toBe(component.max);
  });

  it('hideInputView',  () => {
    component.inputNumber = <InputNumber>{
      input: {
        nativeElement: {
          focus() {}
        }
      }
    }
    component.focusInput();
    expect(component.focus)
      .toBe(true);
  });

  it('input focus event',  () => {
    fakeAsync(() => {
      const inputView = fixture.debugElement.query(By.css('.input-view'));
      inputView.nativeNode.click();
      tick();
      expect(component.focus).toBe(true);
    })
  });

  it('input focus',  () => {
    fakeAsync(() => {
      const inputView = fixture.debugElement.query(By.css('.input-view'));
      inputView.nativeNode.click();
      tick();
      expect(component.focus).toBe(true);
    })
  });

  it('input blur',  () => {
    component.valueFormControl.setValue(0);
    fixture.detectChanges()
    component.inputOnblur();
    expect(component.valueFormControl.value)
      .toBe(component.min);

    component.valueFormControl.setValue(1);
    fixture.detectChanges();
    component.inputOnblur();
    expect(component.valueFormControl.value)
      .toBe(component.min);

    component.valueFormControl.setValue(20);
    fixture.detectChanges();
    component.inputOnblur();
    expect(component.focus)
      .toBe(false);
  });
});

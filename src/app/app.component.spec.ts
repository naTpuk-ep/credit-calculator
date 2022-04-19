import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent, IFormValue } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalcService } from './calc.service';


describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [CalcService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    appComponent.totalAmountStep = 50e3;
    appComponent.minTotalAmount = 30e3;
    appComponent.maxTotalAmount = 7e6;
    appComponent.minMonths = 6;
    appComponent.maxMonths = 84;
    (appComponent as any).initialTotalAmount = 1.5e6;
    (appComponent as any).initialMonths = 60;
    (appComponent as any).fb = new FormBuilder();
  });

  it('should create the app', () => {
    expect(appComponent)
      .toBeTruthy();
  });

  it('ngOnInit should init form-group', () => {
    appComponent.ngOnInit();
    expect(appComponent.formGroup.value)
      .toEqual(<IFormValue>{
        totalAmount: (appComponent as any).initialTotalAmount,
        months: (appComponent as any).initialMonths,
        switch: false,
      });
  });

  it('transformLoanRate should return locale string', () => {
    const loanRateString = appComponent.transformLoanRate(appComponent.loanRate);
    expect(loanRateString)
      .toBe('15,9 %');
  });

  it('transformAmountValue should return locale string', () => {
    const amountString = appComponent.transformAmountValue((appComponent as any).initialTotalAmount);
    expect(amountString)
      .toBe('1 500 000 ₽');
  });

});

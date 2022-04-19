import { TestBed } from '@angular/core/testing';

import { CalcService } from './calc.service';


describe('CalcService', () => {
  let calcService: CalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcService]
    });
    calcService = TestBed.inject(CalcService);
  });

  it('CalcService should be created', () => {
    expect(calcService)
      .toBeTruthy();
  });

  it('getMonthlyAmount should calculate', function () {
    let monthlyAmount = calcService.getMonthlyAmount({
      totalAmount: 30000,
      months: 6,
      switch: false,
    });
    expect(monthlyAmount)
      .toBe(5235);

    monthlyAmount = calcService.getMonthlyAmount({
      totalAmount: 7000000,
      months: 84,
      switch: false,
    });
    expect(monthlyAmount)
      .toBe(138637);
  });
});

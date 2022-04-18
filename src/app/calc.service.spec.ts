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
    });
    expect(monthlyAmount)
      .toBe(5235);

    monthlyAmount = calcService.getMonthlyAmount({
      totalAmount: 7000000,
      months: 84,
    });
    expect(monthlyAmount)
      .toBe(138637);
  });

  it('numWord should choose the right string', function () {
    const words = ['год', 'года', 'лет'];
    let word = calcService.numWord(1, words);
    expect(word)
      .toBe('год');

    word = calcService.numWord(2, words);
    expect(word)
      .toBe('года');

    word = calcService.numWord(5, words);
    expect(word)
      .toBe('лет');

    word = calcService.numWord(12, words);
    expect(word)
      .toBe('лет');
  });

});

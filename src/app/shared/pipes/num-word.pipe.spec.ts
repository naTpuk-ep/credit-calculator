import { NumWordPipe } from './num-word.pipe';

describe('NumWordPipe', () => {

  let pipe: NumWordPipe;

  beforeEach(() => {
    pipe = new NumWordPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('numWord should choose the right string', function () {
    const words = ['год', 'года', 'лет'];
    let word = pipe.transform(1, words);
    expect(word)
      .toBe('1 год');

    word = pipe.transform(2, words);
    expect(word)
      .toBe('2 года');

    word = pipe.transform(5, words);
    expect(word)
      .toBe('5 лет');

    word = pipe.transform(12, words);
    expect(word)
      .toBe('12 лет');
  });

});

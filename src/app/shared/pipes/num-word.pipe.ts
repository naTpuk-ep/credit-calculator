import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numWord'
})
export class NumWordPipe implements PipeTransform {

  transform(value: number, words: string[]): string {
    return value ? `${value} ${this.numWord(value, words)}` : '';
  }

  private numWord(value: number, words: string[]): string {
    value = Math.abs(value) % 100;
    const num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];
    return words[2];
  }
}

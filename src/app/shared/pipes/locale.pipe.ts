import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locale'
})
export class LocalePipe implements PipeTransform {

  transform(value: number, postfix: string): string {
    return `${value.toLocaleString('ru')} ${postfix}`.replace(/ /g, ' ');;
  }

}

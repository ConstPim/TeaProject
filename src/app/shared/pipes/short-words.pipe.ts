import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortWords'
})
export class ShortWordsPipe implements PipeTransform {

  transform(value: string, limit: number = 0): string {
    if (!value) return '';

    const words: string[] = value.split(' ');
    if (words.length <= limit) {
      return value;
    }

    return words.slice(0, limit).join(' ') + '...';
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeDate',
})
export class LocaleDatePipe implements PipeTransform {
  transform(value: number): string {
    const date: Date = new Date(value);

    const localeDateString: string =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    return localeDateString;
  }
}

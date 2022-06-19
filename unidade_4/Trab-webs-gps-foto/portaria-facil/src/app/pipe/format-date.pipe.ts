import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: Date | string, isFormat = false): string {
    if (!isFormat) {
      return value ? moment(value).format('DD/MM/YYYY HH:mm') : '00/00/0000, 00:00';
    } else {
      return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY HH:mm') : '00/00/0000, 00:00';
    }
  }

}

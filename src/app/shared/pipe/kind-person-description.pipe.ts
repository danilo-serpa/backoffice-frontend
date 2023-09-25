import { Pipe, PipeTransform } from '@angular/core';
import { KindPerson, KindPersonLabel } from '../enum/kind-person';

@Pipe({
  name: 'kindPersonDescription'
})
export class KindPersonDescriptionPipe implements PipeTransform {

  transform(value: KindPerson): string {
    return KindPersonLabel.get(value)?.toString() || '';
  }

}

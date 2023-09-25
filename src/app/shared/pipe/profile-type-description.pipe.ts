import { Pipe, PipeTransform } from '@angular/core';
import { ProfileType, ProfileTypeLabel } from '../enum/profile-type';

@Pipe({
  name: 'profileTypeDescription'
})
export class ProfileTypeDescriptionPipe implements PipeTransform {

  transform(value: ProfileType): string {
    return ProfileTypeLabel.get(value)?.toString() || '';
  }

}

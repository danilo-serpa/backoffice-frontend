import { KindPerson } from '../../shared/enum/kind-person';
import { ProfileType } from '../../shared/enum/profile-type';
import { BsaeModel } from '../../shared/model/bsae.model.ts';

export class People extends BsaeModel {
  public kindPerson: KindPerson = KindPerson.physicalPerson;
  public document: string = '';
  public name: string = '';
  public nickname: string = '';
  public address: string = '';
  public profileType: ProfileType = ProfileType.client;
}

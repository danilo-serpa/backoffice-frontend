import { KindPerson } from '../../shared/enum/kind-person';
import { ProfileType } from '../../shared/enum/profile-type';
import { BaseModel } from '../../shared/model/base.model.ts';

export class People extends BaseModel {
  public kindPerson: KindPerson = KindPerson.physicalPerson;
  public document: string = '';
  public name: string = '';
  public nickname: string = '';
  public address: string = '';
  public profileType: ProfileType = ProfileType.client;
}

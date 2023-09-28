import { BaseModel } from 'src/app/shared/model/base.model.ts';
import { People } from "../people/people.model";

export class Department extends BaseModel{
  public name: string = '';
  public peopleId: number = 0;
  public people: People = new People();
}

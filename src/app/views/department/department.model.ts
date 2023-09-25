import { BsaeModel } from "src/app/shared/model/bsae.model.ts";
import { People } from "../people/people.model";

export class Department extends BsaeModel{
  public name: string = '';
  public peopleId: number = 0;
  public people: People = new People();
}

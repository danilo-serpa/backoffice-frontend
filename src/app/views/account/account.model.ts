import { FormControl } from "@angular/forms";

export class LoginUser {
  public email!: string;
  public password!: string;
}

export class RegisterUser {
  public email!: string;
  public password!: string;
  public confirmPassword!: string;
}

export class UserToken {
  public token!: string;
  public expiration!: Date;
}

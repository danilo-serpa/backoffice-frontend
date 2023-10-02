import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AlertModel } from 'src/app/shared/model/alert.model.ts';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { RegisterUser } from '../account.model';
import { AlertService } from 'src/app/shared/service/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public alerts: AlertModel[] = [];
  public loader: boolean = false;

  public formAccount!: FormGroup;
  public validationForm = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.createForm(new RegisterUser());
  }

  createForm(registerUser: RegisterUser) {
    this.formAccount = new FormGroup({
      userName: new FormControl(registerUser.userName, [Validators.required]),
      email: new FormControl(registerUser.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(registerUser.password, [Validators.required]),
      confirmPassword: new FormControl(registerUser.confirmPassword, [
        Validators.required,
        this.passwordValidator('password', 'confirmPassword'),
      ]),
    });
  }

  passwordValidator(password: string, confirmPassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const match = password === confirmPassword;
      return match ? { match: true } : { match: false };
    };
  }

  onSubmit() {
    if (this.formAccount.invalid) {
      this.validationForm = true;
      return;
    }

    this.loader = true;
    this.accountService.register(this.formAccount.value).subscribe({
      next: (result) => {
        this.loader = false;
        this.router.navigate(['/dashboard']);
      },
      error: (e) => {
        this.loader = false;
        this.alertService.updateAlert({ type: 'danger', message: e });
      },
    });
  }
}

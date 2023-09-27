import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AlertModel } from 'src/app/shared/model/alert.model.ts';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { RegisterUser } from '../account.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public alerts: AlertModel[] = [];
  public loader: boolean = false;

  public formAccount!: FormGroup;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.createForm(new RegisterUser());
  }

  createForm(registerUser: RegisterUser) {
    this.formAccount = new FormGroup({
      email: new FormControl(registerUser.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(registerUser.password, [Validators.required]),
      confirmPassword: new FormControl(registerUser.confirmPassword, [
        Validators.required,
      ]),
      // validators: [this.confirmPasswordValidator],
    });
  }

  // confirmPasswordValidator(confirm: AbstractControl): ValidatorFN {
  //   if (confirm.value === this.formAccount.get('password')?.value) {
  //     return null;
  //   }

  //   confirm.setErrors({ passwordMismatch: true });
  //   return { invalid: true};
  // }

  onSubmit() {
    if (this.formAccount.invalid) {
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
        this.alerts.push({ type: 'danger', message: e });
      },
    });
  }
}

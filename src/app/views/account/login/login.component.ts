import { AlertService } from './../../../shared/service/alert.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from '../account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loader: boolean = false;

  public formAccount!: FormGroup;
  public validationForm = false;

  constructor(private accountService: AccountService, private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {
    localStorage.setItem('token', '');
    this.createForm(new LoginUser());
  }

  createForm(loginUser: LoginUser) {
    this.formAccount = new FormGroup({
      email: new FormControl(loginUser.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(loginUser.password, [Validators.required]),
    });
  }

  login() {
    if (this.formAccount.invalid) {
      this.validationForm = true;
      return;
    }

    this.loader = true;
    this.accountService.login(this.formAccount.value).subscribe({
      next: (result) => {
        localStorage.setItem('token', result.token);
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

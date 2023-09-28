import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PeopleService } from '../people.service';
import { People } from '../people.model';
import { AlertModel } from 'src/app/shared/model/alert.model.ts';
import { ActivatedRoute } from '@angular/router';
import { KindPerson } from 'src/app/shared/enum/kind-person';
import { ProfileType } from 'src/app/shared/enum/profile-type';
import { AlertService } from 'src/app/shared/service/alert.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public loader: boolean = false;
  public peopleForm!: FormGroup;

  public validationForm = false;

  public kindPerson = Object.values(KindPerson)
    .filter((k) => Number.isInteger(k))
    .map((k) => Number.parseInt(k.toString()));
  public profileType = Object.values(ProfileType)
    .filter((k) => Number.isInteger(k))
    .map((k) => Number.parseInt(k.toString()));

  public people: People = new People();

  constructor(
    private peopleService: PeopleService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.createForm(this.people);
  }

  getParams() {
    this.route.queryParams.subscribe((params) => {
      this.people = JSON.parse(params['peopleInput']);
    });
  }

  createForm(people: People) {
    this.peopleForm = this.formBuilder.group({
      id: new FormControl(people.id),
      kindPerson: new FormControl(people.kindPerson, [Validators.required]),
      document: new FormControl(people.document, [Validators.required]),
      name: new FormControl(people.name, [Validators.required]),
      nickname: new FormControl(people.nickname),
      address: new FormControl(people.address, [Validators.required]),
      profileType: new FormControl(people.profileType, [Validators.required]),
    });
  }

  onSubmit() {

    if (this.peopleForm.invalid) {
      this.validationForm = true;
      return;
    }

    this.loader = true;

    if (this.peopleForm.value.id > 0) {
      this.peopleService.update(this.peopleForm.value).subscribe({
        next: () => {
          this.loader = false;
          this.alertService.updateAlert({
            type: 'success',
            message: 'Altualizado com sucesso!',
          });
        },
        error: (e) => {
          this.loader = false;
          this.alertService.updateAlert({ type: 'danger', message: e });
        },
      });
    } else {
      this.peopleForm.value.id = 0;
      this.peopleService.save(this.peopleForm.value).subscribe({
        next: () => {
          this.loader = false;
          this.alertService.updateAlert({
            type: 'success',
            message: 'Sslvo com sucesso!',
          });
        },
        error: (e) => {
          this.loader = false;
          this.alertService.updateAlert({ type: 'danger', message: e });
        },
      });
    }
  }
}

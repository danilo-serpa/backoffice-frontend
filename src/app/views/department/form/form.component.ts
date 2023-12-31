import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { PeopleService } from '../../people/people.service';
import { People } from '../../people/people.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Department } from '../department.model';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/service/alert.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public peoples: People[] = [];
  public loader: boolean = false;
  public departmentForm!: FormGroup;
  public validationForm = false;

  public department: Department = new Department();

  constructor(
    private departmentService: DepartmentService,
    private peopleService: PeopleService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.createForm(this.department);
    this.getPeoples();
  }

  getParams() {
    this.route.queryParams.subscribe((params) => {
      this.department = JSON.parse(params['departmentInput']);
    });
  }

  createForm(department: Department) {
    this.departmentForm = this.formBuilder.group({
      id: new FormControl(department.id),
      name: new FormControl(department.name, [Validators.required]),
      peopleId: new FormControl(department.peopleId, [Validators.required]),
    });
  }

  getPeoples() {
    this.loader = true;
    this.peopleService.getAllColaborator().subscribe({
      next: (result) => {
        this.loader = false;
        this.peoples = result;
      },
      error: (e) => {
        this.loader = false;
        this.alertService.updateAlert({ type: 'danger', message: e });
      },
    });
  }

  onSubmit() {
    if (this.departmentForm.invalid) {
      this.validationForm = true;
      return;
    }

    this.loader = true;

    if (this.departmentForm.value.id > 0) {
      this.departmentService.update(this.departmentForm.value).subscribe({
        next: () => {
          this.loader = false;
          this.alertService.updateAlert({
            type: 'success',
            message: 'Atualizado com sucesso!',
          });
        },
        error: (e) => {
          this.loader = false;
          this.alertService.updateAlert({ type: 'danger', message: e });
        },
      });
    } else {
      this.departmentForm.value.id = 0;
      this.departmentService.save(this.departmentForm.value).subscribe({
        next: () => {
          this.loader = false;
          this.alertService.updateAlert({
            type: 'success',
            message: 'Salvo com sucesso!',
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

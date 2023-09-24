import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { PeopleService } from '../../people/people.service';
import { People } from '../../people/people.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Department } from '../department.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public peoples: People[] = [];
  public alerts: { type: string; message: string }[] = [];
  public departmentForm!: FormGroup;

  constructor(
    private departmentService: DepartmentService,
    private peopleService: PeopleService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm(new Department());
    this.getPeoples();
  }

  createForm(department: Department) {
    this.departmentForm = this.formBuilder.group({
      id: new FormControl(department.id),
      name: new FormControl(department.name),
      peopleId: new FormControl(department.peopleId),
    });
  }

  getPeoples() {
    this.peopleService.getAll().subscribe({
      next: (result) => {
        this.peoples = result;
      },
      error: (e) => {
        this.alerts.push({ type: 'danger', message: e.message });
      },
    });
  }

  onSubmit() {
    this.departmentService.save(this.departmentForm.value).subscribe({
      next: () => {
        this.alerts.push({ type: 'success', message: 'Salvo com sucesso!' });
      },
      error: (e) => {
        this.alerts.push({ type: 'danger', message: e });
      },
    });
  }
}

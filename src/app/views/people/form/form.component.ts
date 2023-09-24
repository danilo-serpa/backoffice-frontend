import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PeopleService } from '../people.service';
import { People } from '../people.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  public alerts: { type: string; message: string }[] = [];
  public peopleForm!: FormGroup;

  constructor(
    private peopleService: PeopleService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm(new People());
  }

  createForm(department: People) {
    this.peopleForm = this.formBuilder.group({
      id: new FormControl(department.id),
      document: new FormControl(department.document),
      name: new FormControl(department.name),
      nickname: new FormControl(department.nickname),
      address: new FormControl(department.address),
    });
  }

  onSubmit() {
    this.peopleService.save(this.peopleForm.value).subscribe({
      next: () => {
        this.alerts.push({ type: 'success', message: 'Salvo com sucesso!' });
      },
      error: (e) => {
        this.alerts.push({ type: 'danger', message: e });
      },
    });
  }
}

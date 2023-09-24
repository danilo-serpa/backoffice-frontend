import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule, ButtonModule, FormModule, GridModule, TableModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentService } from './department.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeopleService } from '../people/people.service';
import { IconModule } from '@coreui/icons-angular';

const routes: Routes = [
  { path: 'list-department', component: ListComponent },
  { path: 'form-department', component: FormComponent },
];

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TableModule,
    HttpClientModule,
    FormModule,
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    ButtonModule,
    AlertModule,
    IconModule
  ],
  providers: [
    DepartmentService,
    PeopleService
  ]
})
export class DepartmentModule {}

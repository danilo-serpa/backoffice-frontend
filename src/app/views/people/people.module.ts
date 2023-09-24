import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule, ButtonModule, FormModule, GridModule, TableModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { PeopleService } from './people.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';

const routes: Routes = [
  { path: 'list-people', component: ListComponent },
  { path: 'form-people', component: FormComponent },
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
    PeopleService
  ]
})
export class PeopleModule {}

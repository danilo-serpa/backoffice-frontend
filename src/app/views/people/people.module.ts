import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule, ButtonModule, FormModule, GridModule, SpinnerModule, TableModule, ToastModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { PeopleService } from './people.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { KindPersonDescriptionPipe } from 'src/app/shared/pipe/kind-person-description.pipe';
import { ProfileTypeDescriptionPipe } from 'src/app/shared/pipe/profile-type-description.pipe';

const routes: Routes = [
  { path: 'list-people', component: ListComponent },
  { path: 'form-people', component: FormComponent },
];

@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    KindPersonDescriptionPipe,
    ProfileTypeDescriptionPipe,
  ],
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
    IconModule,
    SpinnerModule,
    ToastModule,
  ],
  providers: [PeopleService],
})
export class PeopleModule {}

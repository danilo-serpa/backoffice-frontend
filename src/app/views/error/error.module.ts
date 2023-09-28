import { Page500Component } from './../pages/page500/page500.component';
import { Page404Component } from './../pages/page404/page404.component';
import { CardModule } from '@coreui/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'page404', component: Page404Component },
  { path: 'page500', component: Page500Component },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class ErrorModule { }

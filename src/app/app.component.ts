import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { AlertService } from './shared/service/alert.service';
import { Observable } from 'rxjs';
import { AlertModel } from './shared/model/alert.model.ts';

@Component({
  selector: 'app-root',
  template: `
    <c-toaster
      placement="top-end"
      position="absolute"
      *ngIf="alert.message"
    >
      <c-toast
        [autohide]="true"
        [color]="alert.type"
        visible
      >
        <c-toast-header>Alerta!</c-toast-header>
        <c-toast-body>{{ alert.message }}</c-toast-body>
      </c-toast>
    </c-toaster>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  title = 'Back Office';

  public alert!: AlertModel;

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private alertService: AlertService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.alertService.getAlert().subscribe((result) => {
      this.alert = result;
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}

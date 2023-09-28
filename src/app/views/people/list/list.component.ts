import { Component, OnInit } from '@angular/core';
import { People } from '../people.model';
import { PeopleService } from '../people.service';
import { AlertModel } from 'src/app/shared/model/alert.model.ts';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/service/alert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public loader: boolean = false;
  public peoples: People[] = [];

  constructor(
    private peopleService: PeopleService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getPeoples();
  }

  getPeoples(): void {
    this.loader = true;
    this.peopleService.getAll().subscribe({
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

  edit(people: People) {
    this.router.navigate(['/people/form-people'], {
      queryParams: { peopleInput: JSON.stringify(people) },
    });
  }

  remove(id?: number) {
    this.loader = true;
    this.peopleService.Remove(id).subscribe({
      next: () => {
        this.loader = false;
        this.getPeoples();
        this.alertService.updateAlert({
          type: 'success',
          message: 'Excluído com sucesso!',
        });
      },
      error: (e) => {
        this.loader = false;
        this.alertService.updateAlert({ type: 'danger', message: e });
      },
    });
  }
}

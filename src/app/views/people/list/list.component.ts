import { Component } from '@angular/core';
import { People } from '../people.model';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public peoples: People[] = [];

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.getPeoples();
  }

  getPeoples(): void {
    this.peopleService.getAll().subscribe({
      next: (result) => {
        this.peoples = result;
      },
      error: (e) => {
        alert(e.message);
      },
    });
  }
}

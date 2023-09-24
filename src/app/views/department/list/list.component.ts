import { Component, OnInit } from '@angular/core';
import { Department } from '../department.model';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  public alerts: { type: string; message: string }[] = [];

  public departments: Department[] = [];

  constructor(private departmentService: DepartmentService) {};

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this.departmentService.getAll().subscribe({
      next: (result) => {
        this.departments = result;
      },
      error: (e) => {
        alert(e.message);
      }
    })
  }

  remove(id: number) {
    this.departmentService.Remove(id).subscribe({
      next: () => {
        this.getDepartments();
        this.alerts.push({ type: 'success', message: 'Excuído com sucesso!' });
      },
      error: (e) => {
        this.alerts.push({ type: 'danger', message: e });
      },
    })
  }

}

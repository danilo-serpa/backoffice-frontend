import { Component, OnInit } from '@angular/core';
import { Department } from '../department.model';
import { DepartmentService } from '../department.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/service/alert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  public loader: boolean = false;
  public departments: Department[] = [];

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private alertService: AlertService
  ) {};

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this.loader = true;
    this.departmentService.getAll().subscribe({
      next: (result) => {
        this.loader = false;
        this.departments = result;
      },
      error: (e) => {
        this.loader = false;
        this.alertService.updateAlert({ type: 'danger', message: e });
      }
    })
  }

  edit(department: Department) {
    this.router.navigate(
      ['/department/form-department'],
      { queryParams: { departmentInput: JSON.stringify(department) } }
    );
  }

  remove(id?: number) {
    this.loader = true;
    this.departmentService.Remove(id).subscribe({
      next: () => {
        this.loader = false;
        this.getDepartments();
        this.alertService.updateAlert({
          type: 'success',
          message: 'Excluído com sucesso!',
        });
      },
      error: (e) => {
        this.loader = false;
        this.alertService.updateAlert({ type: 'danger', message: e });
      },
    })
  }

}

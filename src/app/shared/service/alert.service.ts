import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertModel } from '../model/alert.model.ts';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert = new BehaviorSubject(new AlertModel());

  getAlert(): Observable<AlertModel> {
    return this.alert;
  }

  updateAlert(value: AlertModel): void {
    this.alert.next(new AlertModel());
    setTimeout(() => {
      this.alert.next(value);
    }, 0);
  }
}

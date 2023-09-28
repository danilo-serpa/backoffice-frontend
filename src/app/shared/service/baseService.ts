import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class BaseService {
  error(error: HttpErrorResponse) {
    let errorMessage = '';

    errorMessage =
      error.error.error[0] ??
      `Error Code: ${error.status}\nMessage: ${error.message}`;

    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

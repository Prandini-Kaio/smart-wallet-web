import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface ErrorOutput {
  message: string,
  code: number,
  status: string,
  timestamp: Date,
  description: string,
  errors: string[]
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toasterService: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          let errorMsg = '';

          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error?.message}`;
          } else {
            errorMsg = `${error.error?.message}`;
          }
          this.toasterService.error(errorMsg, error.error?.code)
          return throwError(errorMsg);
        })
      )
  }
}

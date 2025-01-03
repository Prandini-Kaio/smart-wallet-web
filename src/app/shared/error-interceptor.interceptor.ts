import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ToastrService} from "./services/toastr.service";

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

          let errorMsg = ''
          errorMsg = `${error.error?.message}`;
          this.toasterService.error(errorMsg, 3000)
          return throwError(errorMsg);
        })
      )
  }
}

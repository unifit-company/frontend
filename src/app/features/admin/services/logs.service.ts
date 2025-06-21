import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '@core/services/error-handler.service';
import { createENV } from '@shared/utils/helpers';
import { catchError, Observable } from 'rxjs';
import { LogModel } from '../domain/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private readonly API_URL: string = createENV('/audition');

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getLogs(): Observable<LogModel[]> {
    return this.http
      .get<LogModel[]>(this.API_URL)
      .pipe(catchError(this.errorHandler.handle));
  }
}

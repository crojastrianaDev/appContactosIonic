import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ITipoId } from '../models/itipo-id.ts';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TipoidService {
  private tipoUrl = 'api/tipoId';

  constructor(private http: HttpClient) {}
  private log(message: string) {
    console.log(`TipoIdService ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getTiposIds(): Observable<ITipoId[]> {
    return this.http.get<ITipoId[]>(this.tipoUrl).pipe(
      tap((_) => this.log('Tipos almacenados')),
      catchError(this.handleError('GetTipos', []))
    );
  }
}

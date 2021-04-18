import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IParentesco } from '../models/iparentesco.ts';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ParentescoService {
  private parentescoUrl = 'api/parentesco';

  constructor(private http: HttpClient) {}
  private log(message: string) {
    console.log(`Tipo parentesco ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (erro: any): Observable<T> => {
      console.error(erro);
      this.log(`${operation} failed${erro.message}`);
      return of(result as T);
    };
  }
  getParentescos(): Observable<IParentesco[]> {
    return this.http.get<IParentesco[]>(this.parentescoUrl).pipe(
      tap(() => this.log('Parentescos almacenados')),
      catchError(this.handleError('GetTipos', []))
    );
  }
}

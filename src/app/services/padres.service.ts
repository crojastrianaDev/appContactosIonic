import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { IPadre } from '../models/ipadre.ts';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PadresService {
  private padresUrl = 'api/padres';

  constructor(private http: HttpClient) {}

  private log(message: string) {
    console.log(`Padres service ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getPadres(hijoId: number): Observable<IPadre[]> {
    const url = `${this.padresUrl}? hijoId= ${hijoId}`;
    return this.http.get<IPadre[]>(url).pipe(
      tap((_) => this.log('Padres encontrados')),
      catchError(this.handleError('Get pasdres', []))
    );
  }
}

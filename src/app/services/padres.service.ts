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
    const url = `${this.padresUrl}/?hijoId=${hijoId}`;
    return this.http.get<IPadre[]>(url).pipe(
      tap((_) => this.log('Padres encontrados')),
      catchError(this.handleError('Get pasdres', []))
    );
  }

  addPadre(padre: IPadre): Observable<IPadre> {
    return this.http.post<IPadre>(this.padresUrl, padre, httpOptions).pipe(
      tap((padre: IPadre) =>
        this.log(`Nuevo padre con id= ${padre.id} del hijo=${padre.hijoId}`)
      ),
      catchError(this.handleError('Error crerando padre'))
    );
  }

  borrar(padre: IPadre | number): Observable<IPadre> {
    const id = typeof padre == 'number' ? padre : padre.id;
    const url = `${this.padresUrl}/${id}`;
    return this.http.delete<IPadre>(url, httpOptions).pipe(
      tap(() => this.log(`Padre ${id} borradp`)),
      catchError(this.handleError('Borrando padre'))
    );
  }
  /**
   * 
   * @param padre getContacto(id: number): Observable<Icontacts> {
    const url = `${this.contactosUrl}/${id}`;
    return this.http.get<Icontacts>(url).pipe(
      tap((_) => this.log(`Contacto ${id} encontrado`)),
      catchError(this.handleError(`Contacto ${id}`))
    );
  }
   * @returns 
   */
  getPadre(id: number): Observable<IPadre> {
    const url = `${this.padresUrl}/${id}`;
    return this.http.get<IPadre>(url).pipe(
      tap(() => this.log(`Padre ${id} enocntrado`)),
      catchError(this.handleError('Padre'))
    );
  }
  editar(padre: IPadre): Observable<IPadre> {
    return this.http.put<IPadre>(this.padresUrl, padre, httpOptions).pipe(
      tap(() => this.log(`Padre ${padre.id} editado`)),
      catchError(this.handleError('Editando padre'))
    );
  }
}

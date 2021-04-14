import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Icontacts } from '../models/icontacts.ts';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'aplication/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  private contactosUrl = 'api/contactos';

  constructor(private http: HttpClient) {}
  private log(message: string) {
    console.log(`Contacto Service error ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getContactos(): Observable<Icontacts[]> {
    return this.http.get<Icontacts[]>(this.contactosUrl).pipe(
      tap((_) => this.log('Contactos Almacenados')),
      catchError(this.handleError('GetContactos', []))
    );
  }
  borrar(contacto: Icontacts | number): Observable<Icontacts> {
    const id = typeof contacto === 'number' ? contacto : contacto.id;
    const url = `${this.contactosUrl}/${id}`;
    return this.http.delete<Icontacts>(url, httpOptions).pipe(
      tap((_) => this.log(`Contacto ${id} borrado`)),
      catchError(this.handleError('Borrar'))
    );
  }
  crearContacto(contacto: Icontacts): Observable<Icontacts> {
    return this.http
      .post<Icontacts>(this.contactosUrl, contacto, httpOptions)
      .pipe(
        tap((contacto: Icontacts) =>
          this.log(`Nuevo contactato w/ id ${contacto.id}`)
        ),
        catchError(this.handleError('Crear contacto'))
      );
  }
  getContacto(id: number): Observable<Icontacts> {
    const url = `${this.contactosUrl}/${id}`;
    return this.http.get<Icontacts>(url).pipe(
      tap((_) => this.log(`Contacto ${id} encontrado`)),
      catchError(this.handleError(`Contacto ${id}`))
    );
  }
  editarContacto(contacto: Icontacts): Observable<any> {
    return this.http.put(this.contactosUrl, contacto, httpOptions).pipe(
      tap((_) => this.log(`COntacto ${contacto.id} editado `)),
      catchError(this.handleError('Editar contacto'))
    );
  }
}

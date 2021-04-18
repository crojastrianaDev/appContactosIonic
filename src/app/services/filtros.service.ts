import { Injectable } from '@angular/core';
import { Icontacts } from '../models/icontacts.ts';
import { ContactoService } from './contacto.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FiltrosService {
  contactos: Icontacts[] = [];
  contactosFiltrados: Icontacts[] = [];
  constructor(
    private contactoService: ContactoService,
    public http: HttpClient
  ) {
    this.getContactos();
  }
  getContactos() {
    return new Promise((resolve, rejec) => {
      this.contactoService.getContactos().subscribe((resp) => {
        this.contactos = resp;
        //console.log('getCOntactos: ', this.contactos);
        resolve();
      });
    });
  }

  buscarContacto(termino: string) {
    //console.log('ingreso a buscar', termino);

    if (this.contactos.length == 0) {
      this.getContactos().then(() => {
        this.filtrarContactos(termino);
      });
    } else {
      this.filtrarContactos(termino);
    }
  }
  private filtrarContactos(termino: string) {
    // console.log('Ingrese a filtro', termino);
    //contactos.filter( contracto => { if })

    this.contactosFiltrados = [];
    termino.toLowerCase();
    //console.log('Antes for', termino, this.contactos);
    this.contactos.forEach((contact) => {
      //console.log('En el for', termino);
      const nombreLower = contact.nombre.toLowerCase();
      const apellidoLowe = contact.apellido.toLowerCase();
      if (
        apellidoLowe.indexOf(termino) >= 0 ||
        nombreLower.indexOf(termino) >= 0
      ) {
        this.contactosFiltrados.push(contact);
        //console.log('Filtrado', this.contactosFiltrados);
      }
    });
    //console.log('No ingrese', termino);
  }
}

import { Injectable } from '@angular/core';
import { Icontacts } from '../models/icontacts.ts';
import { IPadre } from '../models/ipadre.ts';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDataService {
  constructor() {}
  createDb() {
    let contactos = [
      {
        id: 1,
        identificacion: '1025485',
        tipoId: 1,
        nombre: 'Alejandro',
        apellido: 'Rojas',
        empresa: 'Hornet estudio',
        telefono: '3053801745',
        correo: 'crojas@gmail.com',
      },
      {
        id: 2,
        identificacion: '1025486',
        tipoId: 2,
        nombre: 'Luisa',
        apellido: 'Losada',
        empresa: 'Hornet estudio',
        telefono: '3053801744',
        correo: 'lfolo@gmail.com',
      },
      {
        id: 3,
        identificacion: '1025285',
        tipoId: 1,
        nombre: 'Danna',
        apellido: 'Rojas',
        empresa: 'Hornet estudio',
        telefono: '3053801723',
        correo: 'daro@gmail.com',
      },
      {
        id: 4,
        identificacion: '1025455',
        tipoId: 2,
        nombre: 'Juan',
        apellido: 'Guzman',
        empresa: 'Hornet estudio',
        telefono: '3055401745',
        correo: 'jg@gmail.com',
      },
    ];
    let padres = [
      {
        id: 1,
        identificacion: '6464674',
        nombrePadre: 'Alexander ROjas',
        parentesco: 2,
        hijoId: 1,
        descripcion: 'Es un carpintero',
      },

      {
        id: 3,
        identificacion: '64646743',
        nombrePadre: 'Lorena Artunduaga',
        parentesco: 1,
        hijoId: 2,
        descripcion: 'Comerciante',
      },
      {
        id: 4,
        identificacion: '3546464674',
        nombrePadre: 'Gabriel Losada',
        parentesco: 2,
        hijoId: 2,
        descripcion: 'Comerciante',
      },
      {
        id: 5,
        identificacion: '6454646743',
        nombrePadre: 'Juan Rojas',
        parentesco: 2,
        hijoId: 3,
        descripcion: 'Desarrollador',
      },
      {
        id: 6,
        identificacion: '53546464674',
        nombrePadre: 'Marcela Cruz',
        parentesco: 1,
        hijoId: 3,
        descripcion: 'Empresaria',
      },
    ];
    let parentesco = [
      { id: 1, parentesco: 'Madre' },
      { id: 2, parentesco: 'Padre' },
    ];
    let tipoId = [
      { id: 1, nTipoId: 'CC' },
      { id: 2, nTipoId: 'TI' },
      { id: 3, nTipoId: 'PS' },
    ];
    return { contactos, padres, parentesco, tipoId };
  }
  getId(contactos: Icontacts[]): number {
    return contactos.length > 0
      ? Math.max(...contactos.map((contacto) => contacto.id)) + 1
      : 11;
  }
  getIdPadre(padres: IPadre[]): number {
    return padres.length > 0
      ? Math.max(...padres.map((padre) => padre.id)) + 1
      : 11;
  }
}

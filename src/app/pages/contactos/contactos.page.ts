import { Component, OnInit } from '@angular/core';
import { ContactoService } from '../../services/contacto.service';
import { Icontacts } from '../../models/icontacts.ts';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {
  contactos: Icontacts[] = [];

  constructor(
    private contactsService: ContactoService,
    public alertController: AlertController
  ) {}

  getContactos() {
    this.contactsService.getContactos().subscribe((resp) => {
      this.contactos = resp;
      //ordenamos el arreglo de contactos en orden alfabetico
      const contactoOrdenados: Icontacts[] = this.contactos.sort(function (
        a,
        b
      ) {
        if (a.apellido > b.apellido) {
          return 1;
        }
        if (a.apellido < b.apellido) {
          return -1;
        }
        return 0;
      });

      console.log(contactoOrdenados);
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.getContactos();
  }
  async borrar(contacto: Icontacts) {
    const alert = await this.alertController.create({
      header: 'Borrar!',
      message: '¿Esta seguro que desea borrar el contacto?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm cancel: blah');
          },
        },
        {
          text: 'Si',
          handler: () => {
            this.contactos = this.contactos.filter((e) => e !== contacto);
            this.contactsService.borrar(contacto).subscribe();
          },
        },
      ],
    });
    await alert.present();
  }
}

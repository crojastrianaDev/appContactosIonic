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
    this.contactsService
      .getContactos()
      .subscribe((resp) => (this.contactos = resp));
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

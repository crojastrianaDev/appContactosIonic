import { Component, OnInit } from '@angular/core';
import { Icontacts } from '../../models/icontacts.ts';
import { IPadre } from '../../models/ipadre.ts';
import { ContactoService } from '../../services/contacto.service';
import { PadresService } from '../../services/padres.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-padres',
  templateUrl: './padres.page.html',
  styleUrls: ['./padres.page.scss'],
})
export class PadresPage implements OnInit {
  id;
  any;
  contacto: Icontacts;
  seleccionado: Icontacts;
  padres: IPadre[] = [];

  constructor(
    private contactoService: ContactoService,
    private padresService: PadresService,
    public alerController: AlertController,
    private route: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.contactoService
        .getContacto(params['id'])
        .subscribe((e) => (this.seleccionado = e));
      this.padresService
        .getPadres(params['id'])
        .subscribe((e) => (this.padres = e));
    });
    console.log(this.padres);
  }

  regresar() {
    this.router.navigate(['tabs/contactos']);
  }
  async selectPadre(padre: any) {
    const actionsheet = await this.actionSheetController.create({
      header: '¿Qué desea realizar?',
      buttons: [
        {
          text: 'Boorar padre',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            alert('Borrar ' + padre);
          },
        },
        {
          text: 'Modificar padre',
          icon: 'share',
          handler: () => {
            alert('Modificar ' + padre);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado cliked');
          },
        },
      ],
    });
    await actionsheet.present();
  }
}

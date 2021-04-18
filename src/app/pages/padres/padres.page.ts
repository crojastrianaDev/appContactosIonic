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
  id: any;
  contacto: Icontacts;
  seleccionado: Icontacts;
  padres: IPadre[] = [];
  bandera = false;

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
      // console.log(params['id']);

      this.contactoService
        .getContacto(params['id'])
        .subscribe((e) => (this.seleccionado = e));
      this.padresService.getPadres(params['id']).subscribe((e) => {
        this.padres = e;
        //Bandera verdadera si el hijo no tiene padres
        let padresArray = this.padres.length > 0;
        if (!padresArray) {
          console.log('Sin padres');
          this.bandera = true;
          //si el hijo tiene un padre
        } else if (this.padres.length == 1) {
          this.bandera = true;
          //si ya tiene dos no puede agregar más
        } else {
          // console.log(this.padres);
        }
      });
    });
  }

  regresar() {
    this.router.navigate(['tabs/contactos']);
  }
  async selectPadre(padre: any) {
    const actionsheet = await this.actionSheetController.create({
      header: '¿Qué desea realizar?',
      //(click)="borrar(item); $event.stopImmediatePropagation()"
      buttons: [
        {
          text: 'Borar padre',

          role: 'destructive',
          icon: 'trash',

          handler: () => {
            // (click)="borrar(item); $event.stopImmediatePropagation()"
            this.borrar(padre);
            //alert('Borrar ' + padre);
          },
        },
        {
          text: 'Modificar padre',
          icon: 'share',
          handler: () => {
            // alert('Modificar ' + padre);
            console.log('Modificar', padre);
            this.router.navigate([`/tabs/editarpadre/${padre}`]);
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
  async borrar(padre: IPadre) {
    const alert = await this.alerController.create({
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
            this.padres = this.padres.filter((e) => e !== padre);
            this.padresService.borrar(padre).subscribe();
            this.ngOnInit();
          },
        },
      ],
    });
    await alert.present();
  }
}

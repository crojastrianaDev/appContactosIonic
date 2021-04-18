import { Component, OnInit } from '@angular/core';
import { IPadre } from '../../models/ipadre.ts';
import {
  AlertController,
  ActionSheetController,
  ToastController,
} from '@ionic/angular';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IParentesco } from '../../models/iparentesco.ts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PadresService } from '../../services/padres.service';
import { ParentescoService } from '../../services/parentesco.service';

@Component({
  selector: 'app-nuevo-padre',
  templateUrl: './nuevo-padre.page.html',
  styleUrls: ['./nuevo-padre.page.scss'],
})
export class NuevoPadrePage implements OnInit {
  idHijo: any;
  parentescos: IParentesco[];
  padre: IPadre;
  padres: IPadre[] = [];
  nuevoForm: FormGroup;
  isSubmited = false;

  constructor(
    private alertController: AlertController,
    private ctionSheetController: ActionSheetController,
    private router: Router,
    private padresService: PadresService,
    private parentescosIds: ParentescoService,
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.forEach((parms: Params) => {
      this.idHijo = parms['id'];
      console.log(this.idHijo);
    });
    this.createForm();
    this.getParentescosIds();
    this.getPadres(this.idHijo);
    //console.log(this.padres);
  }

  regresar(): void {
    this.router.navigate(['tabs/contactos']);
  }
  getParentescosIds(): void {
    this.parentescosIds.getParentescos().subscribe((ids) => {
      //console.log(ids);

      this.parentescos = ids;
    });
  }
  private createForm() {
    this.nuevoForm = this.formBuilder.group({
      identificacion: ['', Validators.required],
      nombrePadre: ['', Validators.required],
      parentesco: ['', Validators.required],
      hijoId: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  async mostrarMensaje(mensaje) {
    const toas = await this.toastController.create({
      message: mensaje,
      duration: 2500,
    });
    toas.present();
  }
  getPadres(idHijo: number): void {
    this.padresService
      .getPadres(idHijo)
      .subscribe((resp) => (this.padres = resp));
  }
  guardar() {
    this.isSubmited = true;
    if (!this.nuevoForm.valid) {
      this.mostrarMensaje('Diligencie el formulario completo, por favor');
      //control de 2 padres
    } else if (this.padres.length > 1) {
      this.mostrarMensaje('No puedes agregar más padres!');
    } else {
      this.padre = this.nuevoForm.value;
      this.padresService.addPadre(this.padre).subscribe((padre) => {
        this.mostrarMensaje('Padre guardado');
        this.padres.push(padre);
        padre = null;
        this.resetForm();
      });
    }
  }
  resetForm() {
    this.nuevoForm.reset();
  }
}

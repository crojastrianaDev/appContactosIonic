import { Component, OnInit } from '@angular/core';
import { IPadre } from '../../models/ipadre.ts';
import { IParentesco } from '../../models/iparentesco.ts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { PadresService } from '../../services/padres.service';
import { ParentescoService } from '../../services/parentesco.service';

@Component({
  selector: 'app-editar-padre',
  templateUrl: './editar-padre.page.html',
  styleUrls: ['./editar-padre.page.scss'],
})
export class EditarPadrePage implements OnInit {
  id: any;
  padre: IPadre;
  parentesco: IParentesco[];
  editarForm: FormGroup;
  seleccionado: IPadre;
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    private padreService: PadresService,
    private parentescosService: ParentescoService,
    private formBuild: FormBuilder
  ) {}
  regresar(): void {
    this.router.navigate(['tabs/contactos']);
  }

  getParentescos(): void {
    this.parentescosService
      .getParentescos()
      .subscribe((resp) => (this.parentesco = resp));
  }

  ngOnInit() {
    this.getParentescos();
    this.route.params.forEach((params: Params) => {
      this.padreService.getPadre(params['id']).subscribe((seleccionado) => {
        this.seleccionado = seleccionado;
        this.editarForm = this.formBuild.group({
          identificacion: [
            this.seleccionado.identificacion,
            Validators.required,
          ],
          nombrePadre: [this.seleccionado.nombrePadre, Validators.required],
          parentesco: [this.seleccionado.parentesco, Validators.required],
          hijoId: [this.seleccionado.hijoId, Validators.required],
          descripcion: [this.seleccionado.descripcion, Validators.required],
        });
      });
    });
  }

  async mostrarMensaje(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
    });
    toast.present();
  }
  guardar() {
    this.isSubmitted = true;
    if (!this.editarForm.valid) {
      this.mostrarMensaje('Debes llenar todos los campos');
      return false;
    } else {
      this.padre = this.editarForm.value;
      this.padre.id = this.seleccionado.id;
      this.padreService.editar(this.padre).subscribe(
        () => {
          this.mostrarMensaje('Contacto actualizado');
        },
        (erro) => {
          this.mostrarMensaje('Problemas actualizando el contacto');
        }
      );
      this.resetForm();
      this.regresar();
    }
  }
  resetForm() {
    this.editarForm.reset();
  }
}

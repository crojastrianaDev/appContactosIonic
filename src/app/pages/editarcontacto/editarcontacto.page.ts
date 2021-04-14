import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Icontacts } from '../../models/icontacts.ts';
import { ITipoId } from '../../models/itipo-id.ts';
import { ContactoService } from '../../services/contacto.service';
import { TipoidService } from '../../services/tipoid.service';

@Component({
  selector: 'app-editarcontacto',
  templateUrl: './editarcontacto.page.html',
  styleUrls: ['./editarcontacto.page.scss'],
})
export class EditarcontactoPage implements OnInit {
  id: any;
  contacto: Icontacts;
  tipoIds: ITipoId[];
  editarForm: FormGroup;
  seleccionado: Icontacts;
  isSubmit = false;

  constructor(
    private router: Router,
    public toastController: ToastController,
    private nav: NavController,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private contactoService: ContactoService,
    private tipoIdService: TipoidService,
    private formBuilder: FormBuilder
  ) {}
  regresar(): void {
    this.router.navigate(['tabs/contactos']);
  }

  getTipoIds(): void {
    this.tipoIdService.getTiposIds().subscribe((e) => (this.tipoIds = e));
  }

  ngOnInit() {
    this.getTipoIds();
    this.route.params.forEach((parms: Params) => {
      this.contactoService.getContacto(parms['id']).subscribe((e) => {
        console.log(e);

        this.seleccionado = e;
        this.editarForm = this.formBuilder.group({
          identificacion: [
            this.seleccionado.identificacion,
            Validators.required,
          ],
          tipoid: [this.seleccionado.tipoId, Validators.required],
          nombre: [this.seleccionado.nombre, Validators.required],
          apellido: [this.seleccionado.apellido, Validators.required],
          telefono: [this.seleccionado.telefono, Validators.required],
          empresa: [this.seleccionado.empresa, Validators.required],
          correo: [this.seleccionado.correo, Validators.required],
        });
      });
    });
  }
  async mostrarMensaje(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }
  guardar() {
    this.isSubmit = true;
    if (!this.editarForm.valid) {
      this.mostrarMensaje('No olvides los campos obligatorios');
      return false;
    } else {
      this.contacto = this.editarForm.value;
      this.contacto.id = this.seleccionado.id;
      this.contactoService.editarContacto(this.contacto).subscribe(
        (e) => {
          this.mostrarMensaje('Contacto actualizado');
        },
        (err) => {
          this.mostrarMensaje('Problemas al actualizar');
        }
      );
      this.regresar();
    }
  }
}

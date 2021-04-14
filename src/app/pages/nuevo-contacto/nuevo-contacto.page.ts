import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Icontacts } from '../../models/icontacts.ts';
import { ITipoId } from '../../models/itipo-id.ts';
import { ContactoService } from '../../services/contacto.service';
import { TipoidService } from '../../services/tipoid.service';

@Component({
  selector: 'app-nuevo-contacto',
  templateUrl: './nuevo-contacto.page.html',
  styleUrls: ['./nuevo-contacto.page.scss'],
})
export class NuevoContactoPage implements OnInit {
  contactos: Icontacts[];
  tipoIds: ITipoId[];
  contacto: Icontacts;
  nuevoForm: FormGroup;
  issSubmitted = false;

  constructor(
    private router: Router,
    private contactoService: ContactoService,
    private tipoIdService: TipoidService,
    public toasController: ToastController,
    public formBuild: FormBuilder
  ) {}
  private createForm() {
    this.nuevoForm = this.formBuild.group({
      identificacion: [
        '',
        Validators.required,
        // Validators.pattern(/^[0-9]\d*$/),
      ],
      tipoid: ['', Validators.required],
      nombre: [
        '',
        Validators.required, //Validators.min(3)
      ],
      apellido: [
        '',
        Validators.required, //Validators.min(3)
      ],
      telefono: [
        '',
        Validators.required, //Validators.pattern('[- +()0-9]+')
      ],
      empresa: [''],
      correo: ['', Validators.email],
    });
  }
  regresar(): void {
    this.router.navigate(['tabs/contactos']);
  }
  getContacts(): void {
    this.contactoService
      .getContactos()
      .subscribe((resp) => (this.contactos = resp));
  }
  getTipoIds(): void {
    this.tipoIdService.getTiposIds().subscribe((resp) => (this.tipoIds = resp));
  }

  ngOnInit() {
    this.createForm();
    this.getContacts();
    this.getTipoIds();
  }
  async mensaje(mensaje) {
    const toast = await this.toasController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }

  guardar() {
    this.issSubmitted = true;
    if (!this.nuevoForm.valid) {
      this.mensaje('Ingrese los campos obligatorios por favor');
      return false;
    } else {
      this.contacto = this.nuevoForm.value;
      this.contactoService.crearContacto(this.contacto).subscribe((resp) => {
        this.contactos.push(resp);
        this.resetForm();
        this.mensaje('Contacto registrado exitosamente!');
      });
    }
  }
  resetForm() {
    this.nuevoForm.reset();
  }
}

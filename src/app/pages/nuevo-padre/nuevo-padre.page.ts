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
  padres: IPadre[];
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
  }

  regresar(): void {
    this.router.navigate(['tabs/contactos']);
  }
  getParentescosIds(): void {
    this.parentescosIds.getParentescos().subscribe((ids) => {
      console.log(ids);

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
}

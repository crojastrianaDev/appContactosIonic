import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPadrePageRoutingModule } from './editar-padre-routing.module';

import { EditarPadrePage } from './editar-padre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPadrePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EditarPadrePage],
})
export class EditarPadrePageModule {}

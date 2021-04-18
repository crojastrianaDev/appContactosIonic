import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPadrePageRoutingModule } from './editar-padre-routing.module';

import { EditarPadrePage } from './editar-padre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPadrePageRoutingModule
  ],
  declarations: [EditarPadrePage]
})
export class EditarPadrePageModule {}

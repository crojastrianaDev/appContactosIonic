import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoPadrePageRoutingModule } from './nuevo-padre-routing.module';

import { NuevoPadrePage } from './nuevo-padre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoPadrePageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [NuevoPadrePage],
})
export class NuevoPadrePageModule {}

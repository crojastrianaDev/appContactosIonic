import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarcontactoPageRoutingModule } from './editarcontacto-routing.module';

import { EditarcontactoPage } from './editarcontacto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditarcontactoPageRoutingModule,
  ],
  declarations: [EditarcontactoPage],
})
export class EditarcontactoPageModule {}

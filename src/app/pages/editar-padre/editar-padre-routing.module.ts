import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPadrePage } from './editar-padre.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPadrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPadrePageRoutingModule {}

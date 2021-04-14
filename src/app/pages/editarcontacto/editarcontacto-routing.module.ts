import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarcontactoPage } from './editarcontacto.page';

const routes: Routes = [
  {
    path: '',
    component: EditarcontactoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarcontactoPageRoutingModule {}

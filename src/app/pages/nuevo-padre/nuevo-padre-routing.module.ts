import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoPadrePage } from './nuevo-padre.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoPadrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoPadrePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PadresPage } from './padres.page';

const routes: Routes = [
  {
    path: '',
    component: PadresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PadresPageRoutingModule {}

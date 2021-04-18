import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'tab2/:termino',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: 'contactos',
        loadChildren: () =>
          import('../pages/contactos/contactos.module').then(
            (m) => m.ContactosPageModule
          ),
      },
      {
        path: 'nuevocontacto',
        loadChildren: () =>
          import('../pages/nuevo-contacto/nuevo-contacto.module').then(
            (m) => m.NuevoContactoPageModule
          ),
      },
      {
        path: 'editarcontacto/:id',
        loadChildren: () =>
          import('../pages/editarcontacto/editarcontacto.module').then(
            (m) => m.EditarcontactoPageModule
          ),
      },
      {
        path: 'padres/:id',
        loadChildren: () =>
          import('../pages/padres/padres.module').then(
            (m) => m.PadresPageModule
          ),
      },
      {
        path: 'nuevopadre/:id',
        loadChildren: () =>
          import('../pages/nuevo-padre/nuevo-padre.module').then(
            (m) => m.NuevoPadrePageModule
          ),
      },
      {
        path: 'editarpadre/:id',
        loadChildren: () =>
          import('../pages/editar-padre/editar-padre.module').then(
            (m) => m.EditarPadrePageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

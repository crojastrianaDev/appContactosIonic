import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'contactos',
    loadChildren: () => import('./pages/contactos/contactos.module').then( m => m.ContactosPageModule)
  },
  {
    path: 'nuevo-contacto',
    loadChildren: () => import('./pages/nuevo-contacto/nuevo-contacto.module').then( m => m.NuevoContactoPageModule)
  },
  {
    path: 'editarcontacto',
    loadChildren: () => import('./pages/editarcontacto/editarcontacto.module').then( m => m.EditarcontactoPageModule)
  },
  {
    path: 'padres',
    loadChildren: () => import('./pages/padres/padres.module').then( m => m.PadresPageModule)
  },
  {
    path: 'nuevo-padre',
    loadChildren: () => import('./pages/nuevo-padre/nuevo-padre.module').then( m => m.NuevoPadrePageModule)
  },
  {
    path: 'editar-padre',
    loadChildren: () => import('./pages/editar-padre/editar-padre.module').then( m => m.EditarPadrePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

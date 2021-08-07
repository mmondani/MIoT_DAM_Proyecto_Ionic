import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispositivoPage } from './dispositivo.page';

const routes: Routes = [
  {
    path: '',
    component: DispositivoPage
  },
  {
    path: 'mediciones',
    loadChildren: () => import('../mediciones/mediciones.module').then( m => m.MedicionesPageModule)
  },
  {
    path: ':valvulaId/riegos',
    loadChildren: () => import('../riegos/riegos.module').then( m => m.RiegosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispositivoPageRoutingModule {}

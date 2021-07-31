import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispositivoPage } from './dispositivo.page';
import { DetalleSensorPage } from '../detalle-sensor/detalle-sensor.page';

const routes: Routes = [
  {
    path: '',
    component: DispositivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispositivoPageRoutingModule {}

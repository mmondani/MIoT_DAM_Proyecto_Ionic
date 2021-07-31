import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleSensorPage } from './detalle-sensor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    DetalleSensorPage
  ],
  declarations: [DetalleSensorPage]
})
export class DetalleSensorPageModule {}

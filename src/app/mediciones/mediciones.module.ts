import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicionesPageRoutingModule } from './mediciones-routing.module';

import { MedicionesPage } from './mediciones.page';
import { FechaPipe } from '../pipes/fecha.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicionesPageRoutingModule,
    SharedModule
  ],
  declarations: [
    MedicionesPage
  ]
})
export class MedicionesPageModule {}

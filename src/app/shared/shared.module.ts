import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaPipe } from '../pipes/fecha.pipe';
import { BoldDirective } from '../directives/bold.directive';



@NgModule({
  declarations: [FechaPipe, BoldDirective],
  imports: [
    CommonModule
  ],
  exports: [
    FechaPipe,
    BoldDirective
  ]
})
export class SharedModule { }

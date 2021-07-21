import { Component } from '@angular/core';
import { Dispositivo } from '../dispositivo';
import { DispositivoService } from '../services/dispositivo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listadoDispositivos: Array<Dispositivo>;

  constructor(private dispositivoService: DispositivoService) {
    this.listadoDispositivos = dispositivoService.getDispositivos();
  }

}

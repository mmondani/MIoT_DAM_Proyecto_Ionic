import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dispositivo } from '../services/dispositivo';
import { DispositivoService } from '../services/dispositivo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public listadoDispositivos: Array<Dispositivo>;

  constructor(private dispositivoService: DispositivoService) {
  }

  async ngOnInit()  {
    try{
      this.listadoDispositivos = await this.dispositivoService.getDispositivos()
    }
    catch(error) {
      console.log(error)
    }
  }

  ngOnDestroy(): void {
  }

}

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
  private dispositivosSubscription: Subscription;

  constructor(private dispositivoService: DispositivoService) {
  }

  ngOnInit(): void {
    this.dispositivoService.dispositivosSubject.subscribe({
      next: (value: Array<Dispositivo>) => {
        this.listadoDispositivos = value
      }
    });

    this.dispositivoService.getDispositivos();
  }

  ngOnDestroy(): void {
    this.dispositivosSubscription.unsubscribe();
  }

}

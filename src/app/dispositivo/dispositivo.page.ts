import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../services/dispositivo';
import { Riego } from '../services/riego';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit, OnDestroy {

  private dispositivo: Dispositivo;
  private ultimoRiego: Riego;
  private dispositivoSubscription: Subscription;
  private ultimoRiegoSubscription: Subscription;


  constructor(private route: ActivatedRoute, private dispositivoService: DispositivoService) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get("id"));

    this.ultimoRiegoSubscription = this.dispositivoService.ultimoRiegoSubject.subscribe({
      next: (riego: Riego) => {
        this.ultimoRiego = riego;
      }
    });

    this.dispositivoSubscription = this.dispositivoService.dispositivoSubject.subscribe({
      next: (disp: Dispositivo) => {
        this.dispositivo = disp;
        this.dispositivoService.getUltimoRiego(id);
      }
    })

    this.dispositivoService.getDispositivo(id); 
  }

  ionViewWillEnter() {

  }

  ngOnDestroy(): void {
    this.ultimoRiegoSubscription.unsubscribe();
    this.dispositivoSubscription.unsubscribe();
  }

}

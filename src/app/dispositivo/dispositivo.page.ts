import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../services/dispositivo';
import { Riego } from '../services/riego';
import { Subscription } from 'rxjs';
import { RiegoPost } from '../services/riegopost';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit, OnDestroy {

  private id;
  private dispositivo: Dispositivo;
  private ultimoRiego: Riego;
  private dispositivoSubscription: Subscription;
  private ultimoRiegoSubscription: Subscription;
  private riegoPostSubscription: Subscription;
  private medicionPostSubscription: Subscription;


  constructor(private route: ActivatedRoute, private dispositivoService: DispositivoService) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));

    this.ultimoRiegoSubscription = this.dispositivoService.ultimoRiegoSubject.subscribe({
      next: (riego: Riego) => {
        this.ultimoRiego = riego;
      }
    });

    this.dispositivoSubscription = this.dispositivoService.dispositivoSubject.subscribe({
      next: (disp: Dispositivo) => {
        this.dispositivo = disp;
        this.dispositivoService.getUltimoRiego(this.dispositivo.electrovalvulaId);
      }
    })

    this.riegoPostSubscription = this.dispositivoService.riegoPostSubject.subscribe({
      next: () => {
        this.dispositivoService.getUltimoRiego(this.dispositivo.electrovalvulaId);
      }
    });

    this.medicionPostSubscription = this.dispositivoService.medicionPostSubject.subscribe({
      next: () => {
        this.dispositivoService.getUltimaMedicion(this.id)
      }
    });

    this.dispositivoService.getDispositivo(this.id); 
  }

  ionViewWillEnter() {

  }

  ngOnDestroy(): void {
    this.ultimoRiegoSubscription.unsubscribe();
    this.dispositivoSubscription.unsubscribe();
    this.riegoPostSubscription.unsubscribe();
    this.medicionPostSubscription.unsubscribe();
  }


  abrirValvula() {
    this.dispositivoService.newRiego({
      id: this.dispositivo.electrovalvulaId, 
      apertura: 1
    });
  }

  cerrarValvula() {
    this.dispositivoService.newRiego({
      id: this.dispositivo.electrovalvulaId, 
      apertura: 0
    });

    this.dispositivoService.newMedicion({
      id: this.dispositivo.dispositivoId,
      valor: (Math.random() * 100).toFixed(0).toString()
    });
  }

}

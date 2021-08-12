import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../services/dispositivo';
import { Riego } from '../services/riego';
import { Subscription } from 'rxjs';
import { RiegoPost } from '../services/riegopost';
import { Medicion } from '../services/medicion';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit, OnDestroy {

  private id;
  private dispositivo: Dispositivo;
  private ultimoRiego: Riego;
  private ultimaMedicion: number


  constructor(private route: ActivatedRoute, private dispositivoService: DispositivoService) { }

  async ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));

    try {
      this.dispositivo = await this.dispositivoService.getDispositivo(this.id);
      this.ultimoRiego = await this.dispositivoService.getUltimoRiego(this.dispositivo.electrovalvulaId);
      let medicion = await this.dispositivoService.getUltimaMedicion(this.id);
      this.ultimaMedicion = parseInt(medicion.valor);
    }
    catch(error) {
      console.log(error)
    }
  }

  ionViewWillEnter() {

  }

  ngOnDestroy(): void {
  }


  async abrirValvula() {
    await this.dispositivoService.newRiego({
      id: this.dispositivo.electrovalvulaId, 
      apertura: 1
    });

    this.ultimoRiego = await this.dispositivoService.getUltimoRiego(this.dispositivo.electrovalvulaId);
  }

  async cerrarValvula() {
    await this.dispositivoService.newRiego({
      id: this.dispositivo.electrovalvulaId, 
      apertura: 0
    });

    this.ultimoRiego = await this.dispositivoService.getUltimoRiego(this.dispositivo.electrovalvulaId);



    await this.dispositivoService.newMedicion({
      id: this.dispositivo.dispositivoId,
      valor: (Math.random() * 100).toFixed(0).toString()
    });

    let medicion = await this.dispositivoService.getUltimaMedicion(this.id);
    this.ultimaMedicion = parseInt(medicion.valor);
  }

}

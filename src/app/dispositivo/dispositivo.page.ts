import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../dispositivo';
import { Riego } from '../services/riego';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  private dispositivo: Dispositivo;
  private ultimoRiego: Riego;


  constructor(private route: ActivatedRoute, private dispositivoService: DispositivoService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    //this.dispositivo = this.dispositivoService.getDispositivo(id);
    this.dispositivoService.getDispositivo(id)
      .subscribe(resp => {
          if (resp.status === 200) {
            this.dispositivo = resp.body;

            this.dispositivoService.getUltimoRiego(id)
              .subscribe(resp => {
                  if (resp.status === 200) {
                    this.ultimoRiego = resp.body;
                  }
              });
          }
      });
  }

}

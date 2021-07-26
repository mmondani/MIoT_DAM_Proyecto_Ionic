import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../dispositivo';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  private dispositivo: Dispositivo;


  constructor(private route: ActivatedRoute, private dispositivoService: DispositivoService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.dispositivo = this.dispositivoService.getDispositivo(id);
  }

}

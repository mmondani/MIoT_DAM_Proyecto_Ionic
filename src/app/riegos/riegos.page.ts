import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DispositivoService } from '../services/dispositivo.service';
import { Riego } from '../services/riego';

@Component({
  selector: 'app-riegos',
  templateUrl: './riegos.page.html',
  styleUrls: ['./riegos.page.scss'],
})
export class RiegosPage implements OnInit {

  public listaRiegos: Array<Riego> = [];
  private idValvula;

  constructor(private route: ActivatedRoute, private dispositivoService: DispositivoService) { }

  async ngOnInit() {
    this.idValvula = this.route.snapshot.params["valvulaId"];
    
    this.listaRiegos = await this.dispositivoService.getRiegos(this.idValvula);
  }

}

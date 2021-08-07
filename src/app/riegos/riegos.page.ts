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
  private riegosSubscription: Subscription;

  constructor(private route: ActivatedRoute, private dispositivoService: DispositivoService) { }

  ngOnInit() {
    this.idValvula = this.route.snapshot.params["valvulaId"];
    
    this.riegosSubscription = this.dispositivoService.riegosSubject.subscribe({
      next: (riegos: Array<Riego>) => {
        this.listaRiegos = riegos;
      }
    });
    
    this.dispositivoService.getRiegos(this.idValvula);
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DispositivoService } from '../services/dispositivo.service';
import { Medicion } from '../services/medicion';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit, OnDestroy {

  public listaMediciones: Array<Medicion> = [];
  private medicionesSubscription: Subscription;


  constructor(private route: ActivatedRoute, private dispositivoService: DispositivoService) { }


  ngOnInit() {
    let id = this.route.snapshot.params["id"];

    this.medicionesSubscription = this.dispositivoService.medicionesSubject.subscribe({
      next: (mediciones: Array<Medicion>) => {
        this.listaMediciones = mediciones;
      }
    });
    this.dispositivoService.getMediciones(id);
  }


  ngOnDestroy(): void {
    this.medicionesSubscription.unsubscribe();
  }
}

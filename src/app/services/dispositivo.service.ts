import { Injectable } from '@angular/core';
import { Dispositivo } from '../dispositivo';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  private listadoDispositivos: Array<Dispositivo>;

  constructor() {
    this.listadoDispositivos = [
      new Dispositivo(1, "Sensor 1", "Patio", 1),
      new Dispositivo(2, "Sensor 2", "Cocina", 2),
      new Dispositivo(3, "Sensor 3", "Jardin Delantero", 3),
      new Dispositivo(4, "Sensor 4", "Living", 4)
    ];
  }

  public getDispositivos(): Array<Dispositivo> {
    return this.listadoDispositivos;
  }

  public getDispositivo(id: number): Dispositivo {
    let filteredList = this.listadoDispositivos.filter(disp => {
      if (disp.dispositivoId === id)
        return disp;
    });

    return filteredList[0];
  }
}

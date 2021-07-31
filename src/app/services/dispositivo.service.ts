import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Dispositivo } from '../dispositivo';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Medicion } from './medicion';
import { Riego } from './riego';


@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  private listadoDispositivos: Array<Dispositivo>;

  constructor(private http: HttpClient) {
    this.listadoDispositivos = [
      new Dispositivo(1, "Sensor 1", "Patio", 1),
      new Dispositivo(2, "Sensor 2", "Cocina", 2),
      new Dispositivo(3, "Sensor 3", "Jardin Delantero", 3),
      new Dispositivo(4, "Sensor 4", "Living", 4)
    ];
  }

  public getDispositivos(): Observable<HttpResponse<Array<Dispositivo>>> {
    let options = {
      observe: 'response' as const
    };

    return this.http.get<Array<Dispositivo>>("http://localhost:8000/dispositivo", options);
  }

  public getDispositivo(id: number): Observable<HttpResponse<Dispositivo>> {
    let options = {
      observe: 'response' as const
    };

    return this.http.get<Dispositivo>(`http://localhost:8000/dispositivo/${id}`, options);
  }

  public getUltimaMedicion(id: number): Observable<HttpResponse<Medicion>> {
    let options = {
      observe: 'response' as const
    };

    return this.http.get<Medicion>(`http://localhost:8000/medicion/last/${id}`, options);
  }

  public getUltimoRiego(id: number): Observable<HttpResponse<Riego>> {
    let options = {
      observe: 'response' as const
    };

    return this.http.get<Riego>(`http://localhost:8000/riego/last/${id}`, options);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Dispositivo } from './dispositivo';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, pluck, filter } from 'rxjs/operators';
import { Medicion } from './medicion';
import { Riego } from './riego';
import { RiegoPost } from './riegopost';
import { MedicionPost } from './medicionpost';


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

  public getDispositivos(): Promise<Array<Dispositivo>> {
    let options = {
      observe: 'response' as const
    };

    return this.http
      .get<Array<Dispositivo>>("http://localhost:8000/dispositivo", options)
      .pipe(
        filter(resp => resp.status == 200),
        pluck("body"))
      .toPromise();
  }

  public getDispositivo(id: number): Promise<Dispositivo> {
    let options = {
      observe: 'response' as const
    };

    return this.http
      .get<Dispositivo>(`http://localhost:8000/dispositivo/${id}`, options)
      .pipe(
        filter(resp => resp.status == 200),
        pluck("body"))
      .toPromise();
  }

  public getUltimaMedicion(id: number): Promise<Medicion> {
    let options = {
      observe: 'response' as const
    };

    return this.http
    .get<Medicion>(`http://localhost:8000/medicion/last/${id}`, options)
    .pipe(
      filter(resp => resp.status == 200),
      pluck("body"))
    .toPromise();
  }

  public getUltimoRiego(valvulaId: number): Promise<Riego> {
    let options = {
      observe: 'response' as const
    };

    return this.http
      .get<Riego>(`http://localhost:8000/riego/last/${valvulaId}`, options)
      .pipe(
        filter(resp => resp.status == 200),
        pluck("body"))
      .toPromise();
  }

  public getMediciones(id: number): Promise<Array<Medicion>> {
    let options = {
      observe: 'response' as const
    };

    return this.http
      .get<Array<Medicion>>(`http://localhost:8000/medicion/${id}`, options)
      .pipe(
        filter(resp => resp.status == 200),
        pluck("body"))
      .toPromise();
  }

  public getRiegos(valvulaId: number): Promise<Array<Riego>> {
    let options = {
      observe: 'response' as const
    };

    return this.http
      .get<Array<Riego>>(`http://localhost:8000/riego/${valvulaId}`, options)
      .pipe(
        filter(resp => resp.status == 200),
        pluck("body"))
      .toPromise();
  }

  public newRiego(riegoPost: RiegoPost): Promise<void> {
    let options = {
      observe: 'response' as const
    };

    return this.http
      .post<void>(`http://localhost:8000/riego`, riegoPost, options)
      .pipe(
        filter(resp => resp.status == 200),
        pluck("body"))
      .toPromise();
  }


  public newMedicion(medicionPost: MedicionPost): Promise<void> {
    let options = {
      observe: 'response' as const
    };

    return this.http
      .post<void>(`http://localhost:8000/medicion`, medicionPost, options)
      .pipe(
        filter(resp => resp.status == 200),
        pluck("body"))
      .toPromise();
  }
}
